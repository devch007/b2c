import { searchApi } from '../api/search.api.js';
import { CONFIG } from '../config.js';

/**
 * High-performance, debounced, keyboard-navigable Search Bar component
 */
export class SearchBarComponent {
  constructor(options = {}) {
    this.searchInput = document.querySelector(options.inputSelector || '.nav-search-input');
    this.searchForm = document.querySelector(options.formSelector || '#searchBar');
    this.searchContainer = document.querySelector(options.containerSelector || '.signed-out-nav-search-bar-container');
    
    this.debounceTimeout = null;
    this.abortController = null;
    this.dropdown = null;
    this.selectedIndex = -1;
    this.results = [];

    this.init();
  }

  init() {
    if (!this.searchInput || !this.searchContainer) return;
    this._createDropdown();
    this._bindEvents();
  }

  _createDropdown() {
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'eb-search-suggestions';
    this.dropdown.setAttribute('role', 'listbox');
    this.dropdown.style.cssText = `
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.15);
      border: 2px solid #e0f2fe;
      overflow: hidden;
      z-index: 1000;
      display: none;
      max-height: 380px;
      overflow-y: auto;
    `;
    this.searchContainer.appendChild(this.dropdown);
  }

  _bindEvents() {
    this.searchInput.addEventListener('input', (e) => this._onInput(e.target.value));
    this.searchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) this._onInput(e.target.value);
    });

    this.searchInput.addEventListener('keydown', (e) => this._onKeyDown(e));

    document.addEventListener('click', (e) => {
      if (!this.searchContainer.contains(e.target)) {
        this.hideDropdown();
      }
    });

    if (this.searchForm) {
      this.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = this.searchInput.value.trim();
        if (q) {
          window.location.href = `/search?q=${encodeURIComponent(q)}`;
        }
      });
    }
  }

  _onInput(query) {
    clearTimeout(this.debounceTimeout);
    if (this.abortController) {
      this.abortController.abort();
    }

    if (!query.trim()) {
      this.hideDropdown();
      return;
    }

    this.debounceTimeout = setTimeout(async () => {
      this.abortController = new AbortController();
      try {
        const results = await searchApi.searchSkills(query, this.abortController.signal);
        this.results = results || [];
        this.selectedIndex = -1;
        this._renderResults(query, this.results);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('[Edubull Search] Failed to fetch search results', err);
        }
      }
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  }

  _onKeyDown(e) {
    if (this.dropdown.style.display === 'none' || this.results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.results.length;
      this._updateActiveOption();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.results.length) % this.results.length;
      this._updateActiveOption();
    } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
      e.preventDefault();
      const selectedItem = this.results[this.selectedIndex];
      if (selectedItem && selectedItem.url) {
        window.location.href = selectedItem.url;
      }
    } else if (e.key === 'Escape') {
      this.hideDropdown();
    }
  }

  _updateActiveOption() {
    const items = this.dropdown.querySelectorAll('.eb-search-item');
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.style.background = '#f0f9ff';
        item.focus();
      } else {
        item.style.background = 'transparent';
      }
    });
  }

  _renderResults(query, results) {
    if (results.length === 0) {
      this.dropdown.innerHTML = `
        <div style="padding: 16px; text-align: center; color: #64748b; font-size: 13px; font-family: 'Quicksand', sans-serif;">
          No matching topics found for "<strong>${query}</strong>". Try searching for <em>Maths</em>, <em>Class 10</em>, or <em>Fractions</em>.
        </div>
      `;
    } else {
      this.dropdown.innerHTML = results.map((item, idx) => `
        <a href="${item.url || '/maths'}" class="eb-search-item" data-index="${idx}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; text-decoration: none; border-bottom: 1px solid #f1f5f9; transition: background 0.15s; font-family: 'Quicksand', sans-serif;">
          <div>
            <div style="font-weight: 700; color: #0f172a; font-size: 14px;">${item.title}</div>
            <div style="font-size: 12px; color: #0ea5e9; font-weight: 700; margin-top: 2px;">${item.category} • ${item.grade}</div>
          </div>
          <span style="font-size: 16px; color: #f59e0b; font-weight: bold;">➔</span>
        </a>
      `).join('');

      this.dropdown.querySelectorAll('.eb-search-item').forEach(link => {
        link.addEventListener('mouseenter', () => {
          this.selectedIndex = parseInt(link.dataset.index, 10);
          this._updateActiveOption();
        });
      });
    }
    this.dropdown.style.display = 'block';
  }

  hideDropdown() {
    if (this.dropdown) this.dropdown.style.display = 'none';
  }
}
