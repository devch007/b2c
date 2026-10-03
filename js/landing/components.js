import { esc } from '../ui/dom.js';
import { storeBadge } from './art.js';

/** Small HTML-string components used by the landing page. */

export function Button({ label, href = '#', variant = 'primary', attrs = '' }) {
  const tag = href ? 'a' : 'button';
  const target = href ? `href="${esc(href)}"` : 'type="button"';
  return `<${tag} class="lbtn lbtn-${variant}" ${target} ${attrs}>${esc(label)}</${tag}>`;
}

export function SectionTitle(text, { id = '' } = {}) {
  return `<h2 class="section-title reveal"${id ? ` id="${id}"` : ''}>${esc(text)}</h2>`;
}

/** Wavy (or scalloped) edge. `flip` puts it on the bottom of a section. */
export function WavyDivider({ color, flip = false, scallop = false, className = '' }) {
  const d = scallop
    ? 'M0 40V20' + Array.from({ length: 24 }, (_, i) => `a30 20 0 0 1 60 0`).join('') + 'V40z'
    : 'M0 40V18C120 0 240 36 360 18S600 0 720 18 960 36 1080 18 1320 0 1440 18V40z';
  return `<svg class="wavy ${flip ? 'wavy-flip' : ''} ${className}" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="${color}"/></svg>`;
}

export function Stars(n = 5) {
  return `<span class="stars" aria-label="${n} out of 5 stars">${'★'.repeat(n)}</span>`;
}

/** Two-column alternating row. `reverse` puts the art on the right. */
export function FeatureRow({ title, titleTag = 'h3', text, art, reverse = false, className = '' }) {
  const heading = Array.isArray(title) ? title.map(esc).join('<br>') : esc(title);
  return `
    <div class="frow ${reverse ? 'frow-rev' : ''} ${className}">
      <div class="frow-art reveal ${reverse ? 'from-right' : 'from-left'}">${art}</div>
      <div class="frow-text reveal ${reverse ? 'from-left' : 'from-right'}">
        <${titleTag}>${heading}</${titleTag}>
        <p>${esc(text)}</p>
      </div>
    </div>`;
}

export function TestimonialCard({ text, name, source }) {
  return `
    <figure class="tcard reveal">
      <span class="tcard-quote" aria-hidden="true">“</span>
      <blockquote>${esc(text)}</blockquote>
      <figcaption>
        <span><strong>${esc(name)}</strong> <small>(${esc(source)})</small></span>
        ${Stars(5)}
      </figcaption>
    </figure>`;
}

export function StoreButtons({ appStore = '#', googlePlay = '#' } = {}) {
  return `
    <div class="stores">
      <a class="store" href="${esc(googlePlay)}">${storeBadge.google}<span><small>GET IT ON</small>Google Play</span></a>
      <a class="store" href="${esc(appStore)}">${storeBadge.apple}<span><small>Download on the</small>App Store</span></a>
    </div>`;
}
