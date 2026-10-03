import { SearchBarComponent } from '../components/search-bar.js';
import { esc } from './dom.js';

/**
 * Renders the shared site header and footer into
 * <header data-site-header> and <footer data-site-footer>.
 */
function currentUser() {
  try { return JSON.parse(localStorage.getItem('eb_user') || 'null'); } catch { return null; }
}

function renderHeader(el) {
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/index';
  const link = (href, label) =>
    `<a href="${href}"${path.endsWith(href.replace('.html', '')) ? ' aria-current="page"' : ''}>${label}</a>`;
  const user = currentUser();
  const name = user && (user.firstName || user.username);

  el.className = 'site-header';
  el.innerHTML = `
    <div class="wrap">
      <a class="logo" href="/" aria-label="Edubull home"><span class="logo-mark">eb</span>edubull</a>
      <nav class="nav-links" aria-label="Main">
        ${link('/class.html', 'Curriculum')}
        ${link('/app.html', 'Practice')}
        <a href="/#how">How it works</a>
      </nav>
      <form class="nav-search" role="search" data-search>
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <label class="sr-only" for="navSearch">Search skills</label>
        <input id="navSearch" class="search-input" type="search" placeholder="Search skills, e.g. fractions" autocomplete="off">
      </form>
      <div class="nav-actions">
        ${name
          ? `<span class="btn btn-ghost" aria-label="Signed in">Hi, ${esc(name)}</span>
             <button class="btn btn-primary" data-signout>Sign out</button>`
          : `<a class="btn btn-ghost" href="/login.html">Sign in</a>
             <a class="btn btn-primary" href="/signup.html">Start free</a>`}
      </div>
    </div>`;

  el.querySelector('[data-signout]')?.addEventListener('click', () => {
    localStorage.removeItem('eb_user');
    localStorage.removeItem('eb_auth_token');
    location.href = '/';
  });

  const form = el.querySelector('[data-search]');
  new SearchBarComponent({ form, input: form.querySelector('input') });
}

function renderFooter(el) {
  el.className = 'site-footer';
  el.innerHTML = `
    <div class="wrap">
      <a class="logo" href="/"><span class="logo-mark">eb</span>edubull</a>
      <nav aria-label="Footer">
        <a href="/class.html">Curriculum</a>
        <a href="/app.html">Practice</a>
        <a href="/signup.html">Create account</a>
      </nav>
      <span>© ${new Date().getFullYear()} Edubull</span>
    </div>`;
}

document.querySelectorAll('[data-site-header]').forEach(renderHeader);
document.querySelectorAll('[data-site-footer]').forEach(renderFooter);
