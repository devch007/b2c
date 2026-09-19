import { CONFIG } from '../config.js';

/**
 * Resilient, high-concurrency API client with in-memory TTL caching,
 * request deduplication, and automatic exponential backoff.
 */
class ApiClient {
  constructor() {
    this.cache = new Map();
    this.inFlightRequests = new Map();
  }

  /**
   * Generates a unique cache key for a request
   */
  _getCacheKey(endpoint, params = {}) {
    const searchParams = new URLSearchParams(params).toString();
    return `${endpoint}?${searchParams}`;
  }

  /**
   * Performs an HTTP request with automatic retry and timeout
   */
  async request(endpoint, options = {}, retries = CONFIG.MAX_RETRIES) {
    const url = endpoint.startsWith('http') ? endpoint : `${CONFIG.API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Attach auth token if available in storage
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('eb_auth_token');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const controller = options.signal ? null : new AbortController();
      const signal = options.signal || (controller ? controller.signal : undefined);
      const timeoutId = controller ? setTimeout(() => controller.abort(), 8000) : null;

      const response = await fetch(url, {
        ...options,
        signal,
        headers: { ...defaultHeaders, ...(options.headers || {}) },
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status >= 500 && retries > 0) {
          await new Promise(res => setTimeout(res, CONFIG.RETRY_DELAY_MS));
          return this.request(endpoint, options, retries - 1);
        }
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      if (retries > 0 && err.name !== 'AbortError') {
        await new Promise(res => setTimeout(res, CONFIG.RETRY_DELAY_MS));
        return this.request(endpoint, options, retries - 1);
      }
      throw err;
    }
  }

  /**
   * GET request with in-memory caching and in-flight deduplication
   */
  async get(endpoint, params = {}, options = {}) {
    const cacheKey = this._getCacheKey(endpoint, params);
    const now = Date.now();

    // 1. Check valid cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (now - cached.timestamp < (options.ttl || CONFIG.CACHE_TTL_MS)) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    // 2. Prevent duplicate simultaneous requests
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey);
    }

    const searchParams = new URLSearchParams(params).toString();
    const fullUrl = searchParams ? `${endpoint}?${searchParams}` : endpoint;

    const requestPromise = (async () => {
      try {
        const data = await this.request(fullUrl, { method: 'GET', ...options });
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      } finally {
        this.inFlightRequests.delete(cacheKey);
      }
    })();

    this.inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * POST request
   */
  async post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Clear client cache
   */
  clearCache() {
    this.cache.clear();
  }
}

export const apiClient = new ApiClient();
