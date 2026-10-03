import { searchApi } from '../api/search.api.js';
import { CONFIG } from '../config.js';
import { esc } from '../ui/dom.js';

/**
 * Debounced, keyboard-navigable skill search with a results dropdown.
 */
export class SearchBarComponent {
  constructor({ form, input }) {
    this.form = form;
    this.input = input;
    if (!form || !input) return;

    this.timer = null;
    this.abort = null;
    this.results = [];
    this.active = -1;

    this.list = document.createElement('div');
    this.list.className = 'search-results';
    this.list.setAttribute('role', 'listbox');
    this.list.hidden = true;
    form.appendChild(this.list);

    input.addEventListener('input', () => this.onInput());
    input.addEventListener('focus', () => input.value.trim() && this.onInput());
    input.addEventListener('keydown', e => this.onKey(e));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const pick = this.results[this.active] || this.results[0];
      if (pick) location.href = pick.url;
    });
    document.addEventListener('click', e => { if (!form.contains(e.target)) this.hide(); });
  }

  onInput() {
    clearTimeout(this.timer);
    this.abort?.abort();
    const q = this.input.value.trim();
    if (!q) return this.hide();

    this.timer = setTimeout(async () => {
      this.abort = new AbortController();
      try {
        this.results = await searchApi.searchSkills(q, this.abort.signal) || [];
        this.active = -1;
        this.render(q);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('[search]', err);
      }
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  }

  onKey(e) {
    if (this.list.hidden || !this.results.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = this.results.length;
      this.active = (this.active + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
      this.list.querySelectorAll('.search-item').forEach((el, i) => el.classList.toggle('active', i === this.active));
    } else if (e.key === 'Escape') {
      this.hide();
    }
  }

  render(q) {
    this.list.innerHTML = this.results.length
      ? this.results.map(r => `
          <a class="search-item" role="option" href="${esc(r.url || '/class.html')}">
            <strong>${esc(r.title)}</strong>
            <span>${esc(r.grade)} · ${esc(r.category)}</span>
          </a>`).join('')
      : `<div class="search-empty">No skills match “${esc(q)}”. Try “addition” or “Class 5”.</div>`;
    this.list.hidden = false;
  }

  hide() { this.list.hidden = true; }
}
