/**
 * Edubull Frontend Configuration
 * Manages environment endpoints, caching parameters, and API versions.
 * Scalable for multi-environment deployments (local, staging, production CDN).
 */
export const CONFIG = {
  API_BASE_URL: (typeof window !== 'undefined' && window.EDUBULL_API_URL) || '/api/v1',
  CACHE_TTL_MS: 60 * 1000, // 60 seconds client-side cache for high-traffic queries
  SEARCH_DEBOUNCE_MS: 250, // Debounce input to reduce redundant network calls
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 300,
  ENABLE_LOCAL_FALLBACK: true, // Fallback gracefully if backend API is offline or cold starting
};
