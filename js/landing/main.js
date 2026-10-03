import { content as c } from './content.js';
import { esc } from '../ui/dom.js';
import { Button, SectionTitle, WavyDivider, Stars, FeatureRow, TestimonialCard, StoreButtons } from './components.js';
import * as art from './art.js';

const $ = sel => document.querySelector(sel);

/* 1. Navbar */
$('#nav').innerHTML = `
  <div class="nav-bar">
    <div class="lwrap nav-inner">
      <a class="brand" href="#top" aria-label="${esc(c.brand)} home">
        <span class="brand-icon">${art.bunny({ size: 34, label: '' })}</span>${esc(c.brand)}
      </a>
      <button class="burger" aria-expanded="false" aria-controls="navMenu" aria-label="Open menu"><span></span><span></span><span></span></button>
      <nav id="navMenu" class="nav-menu" aria-label="Main">
        ${c.nav.map((l, i) => `<a href="${esc(l.href)}"${i === 0 ? ' class="active"' : ''}>${esc(l.label)}</a>`).join('')}
        ${Button({ ...c.cta, variant: 'white' })}
      </nav>
    </div>
  </div>
  ${WavyDivider({ color: 'url(#navGrad)', flip: true, className: 'nav-wave' })}
  <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="navGrad" x1="0" x2="1"><stop offset="0" stop-color="#6D28D9"/><stop offset="1" stop-color="#A855F7"/></linearGradient></defs></svg>`;

const burger = $('.burger'), menu = $('#navMenu');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', open);
  menu.classList.toggle('open', open);
});
menu.addEventListener('click', e => { if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); } });

/* 2. Hero */
$('#hero').innerHTML = `
  <div class="lwrap hero2">
    <div class="hero2-text reveal">
      <h1>${c.hero.lines.map(esc).join('<br>')}<br><span>${esc(c.hero.highlight)}</span></h1>
      <p>${esc(c.hero.body)}</p>
      <div class="hero2-cta">
        ${Button({ ...c.cta })}
        ${Button({ label: c.hero.secondary, href: '', variant: 'outline', attrs: 'data-open-video' })}
      </div>
      <div class="rating"><strong>${esc(c.hero.rating.score)}</strong> ${Stars(5)} <span>${esc(c.hero.rating.note)}</span></div>
    </div>
    <div class="hero2-art floaty">
      ${art.heroChild()}
      <div class="hero2-bunny">${art.bunny({ size: 150, label: 'Bunny mascot holding letter blocks' })}</div>
      <div class="hero2-blocks">${art.blocks()}</div>
    </div>
  </div>`;

/* 3. Learning road */
const STOPS = [[330, 130], [660, 130], [790, 390], [500, 390], [210, 390], [340, 650], [660, 650]];
$('#learn').innerHTML = `
  <div class="lwrap">
    ${SectionTitle(c.learn.title, { id: "learn-title" })}
    <div class="road">
      <svg class="road-svg" viewBox="0 0 1000 780" preserveAspectRatio="none" aria-hidden="true">
        <path class="road-base" pathLength="1" d="M20 130H800C960 130 960 390 800 390H200C40 390 40 650 200 650H980"/>
        <path class="road-line" pathLength="1" d="M20 130H800C960 130 960 390 800 390H200C40 390 40 650 200 650H980"/>
      </svg>
      <ol class="stops">
        ${c.learn.stops.map((s, i) => `
          <li class="stop" style="--x:${STOPS[i][0] / 10}%;--y:${STOPS[i][1] / 7.8}%;--c:${s.color};--d:${i * 120}ms">
            <span class="stop-icon">${art.stopIcon(s.icon)}</span>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.text)}</p>
          </li>`).join('')}
      </ol>
    </div>
  </div>`;

/* 4. Why parents trust us */
const trustArt = { family: art.familyArt(), gift: art.giftArt(), offline: art.offlineArt() };
$('#trust').innerHTML = `
  ${WavyDivider({ color: '#FDF2FA', scallop: true })}
  <div class="stripes">
    <div class="lwrap">
      ${c.trust.map((r, i) => FeatureRow({
        title: r.heading, titleTag: i === 0 ? 'h2' : 'h3', text: r.text,
        art: trustArt[r.art], reverse: i % 2 === 1, className: i === 0 ? 'trust-lead' : ''
      })).join('')}
    </div>
  </div>
  ${WavyDivider({ color: '#FDF2FA', scallop: true, flip: true })}`;

/* 5. Feature showcase */
const showcase = screen => `
  <div class="showcase">
    <div class="blob"></div>
    <div class="peek peek-l">${art.bunny({ cap: 'grad', size: 110, label: '' })}</div>
    <div class="tablet">${art.tablet(screen, 'App screen preview')}</div>
    <div class="peek peek-r">${art.fox({ size: 90, label: '' })}</div>
  </div>`;
$('#features').innerHTML = `
  <div class="lwrap">
    ${SectionTitle(c.features.title)}
    ${c.features.rows.map((r, i) => FeatureRow({ title: r.title, text: r.text, art: showcase(r.screen), reverse: i % 2 === 0, className: 'feature' })).join('')}
  </div>`;

/* 6. Newsletter */
$('#newsletter').innerHTML = `
  <div class="lwrap news-inner">
    <div><h2>${esc(c.newsletter.title)}</h2><p>${esc(c.newsletter.text)}</p></div>
    <form class="news-form" novalidate>
      <label class="sr-only" for="newsEmail">Email address</label>
      <input id="newsEmail" type="email" placeholder="${esc(c.newsletter.placeholder)}" required>
      <button type="submit">${esc(c.newsletter.button)}</button>
    </form>
  </div>`;
$('.news-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#newsEmail');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
  toast(ok ? c.newsletter.success : c.newsletter.error, ok);
  if (ok) input.value = '';
  else input.focus();
});

/* 7. Testimonials */
$('#reviews').innerHTML = `
  <div class="doodle doodle-planet">${art.doodles.planet}</div>
  <div class="doodle doodle-blocks">${art.blocks()}</div>
  <div class="doodle doodle-pencil">${art.doodles.pencil}</div>
  <div class="lwrap">
    <h2 class="section-title reveal">${esc(c.testimonials.headline)}</h2>
    <p class="reviews-sub reveal">${esc(c.testimonials.sub)} <a href="${esc(c.testimonials.stores.appStore)}">App Store</a> and <a href="${esc(c.testimonials.stores.googlePlay)}">Google Play</a>.</p>
    <div class="tcards">${c.testimonials.items.map(TestimonialCard).join('')}</div>
    ${StoreButtons(c.testimonials.stores)}
  </div>`;

/* 8. Footer */
$('#footer').innerHTML = `
  <div class="foot-doodles" aria-hidden="true">${art.doodles.crayons}${art.blocks()}${art.doodles.pencil}</div>
  <div class="lwrap foot-cols">
    <div class="foot-brand">
      <a class="brand" href="#top"><span class="brand-icon">${art.bunny({ size: 34, label: '' })}</span>${esc(c.brand)}</a>
      <p>${esc(c.footer.about)}</p>
      ${StoreButtons(c.testimonials.stores)}
    </div>
    ${c.footer.columns.map(col => `
      <div><h3>${esc(col.title)}</h3><ul>${col.links.map(([l, h]) => `<li><a href="${esc(h)}">${esc(l)}</a></li>`).join('')}</ul></div>`).join('')}
    <div><h3>Connect With Us</h3><ul>
      ${c.footer.social.map(s => `<li><a href="${esc(s.href)}" class="social"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">${art.socialIcon[s.icon]}</svg>${esc(s.label)}</a></li>`).join('')}
    </ul></div>
  </div>
  <div class="lwrap foot-bar">
    <nav aria-label="Legal">${c.footer.legal.map(([l, h]) => `<a href="${esc(h)}">${esc(l)}</a>`).join('<span aria-hidden="true">·</span>')}</nav>
    <span>© ${new Date().getFullYear()} ${esc(c.brand)}. All Rights Reserved.</span>
  </div>`;

/* Video modal */
const modal = $('#videoModal');
document.querySelector('[data-open-video]').addEventListener('click', () => {
  $('#videoBody').innerHTML = c.previewVideoUrl
    ? `<iframe src="${esc(c.previewVideoUrl)}" title="${esc(c.brand)} preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    : `<div class="video-soon">${art.bunny({ cap: 'grad', size: 140, label: '' })}<p>Our preview video is coming soon!</p></div>`;
  modal.showModal();
});
modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) modal.close(); });
modal.addEventListener('close', () => { $('#videoBody').innerHTML = ''; });

/* Toast */
function toast(msg, ok) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = `toast show ${ok ? 'ok' : 'err'}`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* Scroll reveal (once) */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal, .road').forEach(el => io.observe(el));

/* Sticky nav shadow */
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 10), { passive: true });
