/**
 * Inline SVG illustrations: mascots, road-stop icons, tablet screens and doodles.
 * All are decorative vector placeholders; swap any for real artwork later.
 */

export function bunny({ cap = 'cap', size = 160, label = 'Bunny mascot' } = {}) {
  const hat = cap === 'grad'
    ? `<path d="M40 52l60-22 60 22-60 22z" fill="#1F1B2E"/><rect x="72" y="58" width="56" height="18" rx="4" fill="#1F1B2E"/><path d="M150 56v26" stroke="#FFC107" stroke-width="4"/><circle cx="150" cy="86" r="6" fill="#FFC107"/>`
    : `<path d="M52 70c0-30 22-44 48-44s48 14 48 44z" fill="#3B82F6"/><path d="M140 66c18 0 32 4 36 10-10 4-26 4-40 2z" fill="#2563EB"/><circle cx="100" cy="28" r="6" fill="#2563EB"/>`;
  return `<svg viewBox="0 0 200 230" width="${size}" role="img" aria-label="${label}">
    <ellipse cx="74" cy="40" rx="15" ry="40" fill="#fff" stroke="#E9D5FF" stroke-width="3" transform="rotate(-12 74 40)"/>
    <ellipse cx="126" cy="40" rx="15" ry="40" fill="#fff" stroke="#E9D5FF" stroke-width="3" transform="rotate(12 126 40)"/>
    <ellipse cx="74" cy="44" rx="7" ry="26" fill="#FBCFE8" transform="rotate(-12 74 44)"/>
    <ellipse cx="126" cy="44" rx="7" ry="26" fill="#FBCFE8" transform="rotate(12 126 44)"/>
    <ellipse cx="100" cy="190" rx="50" ry="38" fill="#fff" stroke="#E9D5FF" stroke-width="3"/>
    <ellipse cx="100" cy="196" rx="28" ry="22" fill="#FDF2FA"/>
    <circle cx="100" cy="112" r="56" fill="#fff" stroke="#E9D5FF" stroke-width="3"/>
    ${hat}
    <circle cx="78" cy="112" r="20" fill="#E0F2FE" stroke="#7C3AED" stroke-width="6"/>
    <circle cx="122" cy="112" r="20" fill="#E0F2FE" stroke="#7C3AED" stroke-width="6"/>
    <path d="M98 112h4" stroke="#7C3AED" stroke-width="6"/>
    <circle cx="80" cy="114" r="7" fill="#1F1B2E"/><circle cx="120" cy="114" r="7" fill="#1F1B2E"/>
    <circle cx="83" cy="111" r="2.5" fill="#fff"/><circle cx="123" cy="111" r="2.5" fill="#fff"/>
    <ellipse cx="100" cy="138" rx="6" ry="4" fill="#F472B6"/>
    <path d="M92 146q8 8 16 0" stroke="#1F1B2E" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="64" cy="140" r="7" fill="#FBCFE8"/><circle cx="136" cy="140" r="7" fill="#FBCFE8"/>
  </svg>`;
}

export function fox({ size = 120, label = 'Fox mascot' } = {}) {
  return `<svg viewBox="0 0 160 170" width="${size}" role="img" aria-label="${label}">
    <path d="M30 20l34 40H22z" fill="#FB923C"/><path d="M130 20l-34 40h42z" fill="#FB923C"/>
    <path d="M36 34l18 22H30z" fill="#FED7AA"/><path d="M124 34l-18 22h24z" fill="#FED7AA"/>
    <ellipse cx="80" cy="140" rx="40" ry="30" fill="#FB923C"/>
    <ellipse cx="80" cy="148" rx="22" ry="20" fill="#FFF7ED"/>
    <path d="M18 70c0-26 28-36 62-36s62 10 62 36c0 30-30 52-62 52S18 100 18 70z" fill="#FB923C"/>
    <path d="M30 84c14 0 30 6 50 30 20-24 36-30 50-30-6 22-26 38-50 38S36 106 30 84z" fill="#FFF7ED"/>
    <circle cx="58" cy="74" r="8" fill="#1F1B2E"/><circle cx="102" cy="74" r="8" fill="#1F1B2E"/>
    <circle cx="61" cy="71" r="3" fill="#fff"/><circle cx="105" cy="71" r="3" fill="#fff"/>
    <ellipse cx="80" cy="100" rx="7" ry="5" fill="#1F1B2E"/>
    <path d="M72 108q8 7 16 0" stroke="#1F1B2E" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* Road-stop icons, drawn in a 100×100 box */
const ICONS = {
  abc: `<text x="50" y="64" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="36"><tspan fill="#EF4444">A</tspan><tspan fill="#2563EB">B</tspan><tspan fill="#16A34A">C</tspan></text>`,
  num: `<text x="50" y="64" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="36" fill="#fff">123</text>`,
  book: `<path d="M20 30q15-6 30 2v44q-15-8-30-2z" fill="#fff"/><path d="M80 30q-15-6-30 2v44q15-8 30-2z" fill="#FDE68A"/><path d="M50 32v44" stroke="#7C3AED" stroke-width="3"/><circle cx="72" cy="22" r="6" fill="#FFD43B"/>`,
  shapes: `<circle cx="34" cy="36" r="14" fill="#F87171"/><rect x="54" y="22" width="26" height="26" rx="4" fill="#3B82F6"/><path d="M50 52l18 30H32z" fill="#FFD43B"/>`,
  bird: `<ellipse cx="50" cy="56" rx="22" ry="18" fill="#EF4444"/><circle cx="62" cy="38" r="14" fill="#22C55E"/><path d="M74 36l12 4-12 6z" fill="#F59E0B"/><circle cx="66" cy="35" r="3" fill="#1F1B2E"/><path d="M30 60l-16 16M36 66l-10 20" stroke="#3B82F6" stroke-width="6" stroke-linecap="round"/>`,
  apple: `<path d="M50 32c-14-8-32 0-32 20 0 18 14 32 24 32 4 0 6-2 8-2s4 2 8 2c10 0 24-14 24-32 0-20-18-28-32-20z" fill="#EF4444"/><path d="M50 32q2-12 12-16" stroke="#7C2D12" stroke-width="4" fill="none"/><ellipse cx="62" cy="20" rx="9" ry="5" fill="#22C55E" transform="rotate(-24 62 20)"/>`,
  face: `<circle cx="50" cy="52" r="28" fill="#FED7AA"/><circle cx="40" cy="48" r="4" fill="#1F1B2E"/><circle cx="60" cy="48" r="4" fill="#1F1B2E"/><path d="M40 62q10 8 20 0" stroke="#1F1B2E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 44q4-22 28-22t28 22q-14-10-28-10t-28 10z" fill="#7C2D12"/>`
};
export const stopIcon = name => `<svg viewBox="0 0 100 100" aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* Tablet app screens, drawn in a 320×210 box */
const SCREENS = {
  story: `<rect width="320" height="210" fill="#FEF3C7"/><circle cx="260" cy="40" r="22" fill="#FDE047"/>
    <path d="M0 160q80-40 160 0t160 0v50H0z" fill="#86EFAC"/>
    <circle cx="90" cy="120" r="34" fill="#F59E0B"/><circle cx="90" cy="120" r="22" fill="#FCD34D"/><circle cx="82" cy="116" r="3"/><circle cx="98" cy="116" r="3"/>
    <rect x="160" y="70" width="130" height="80" rx="10" fill="#fff"/><rect x="172" y="84" width="100" height="8" rx="4" fill="#C4B5FD"/><rect x="172" y="100" width="86" height="8" rx="4" fill="#DDD6FE"/><rect x="172" y="116" width="94" height="8" rx="4" fill="#DDD6FE"/>`,
  trace: `<rect width="320" height="210" fill="#EDE9FE"/>
    <rect x="70" y="20" width="180" height="170" rx="16" fill="#fff"/>
    <text x="160" y="160" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="150" font-weight="700" fill="none" stroke="#7C3AED" stroke-width="6" stroke-dasharray="10 8">B</text>
    <circle cx="117" cy="54" r="9" fill="#22C55E"/>`,
  math: `<rect width="320" height="210" fill="#CCFBF1"/>
    <g fill="#EF4444"><circle cx="60" cy="70" r="16"/><circle cx="100" cy="70" r="16"/><circle cx="180" cy="70" r="16"/><circle cx="220" cy="70" r="16"/><circle cx="260" cy="70" r="16"/></g>
    <text x="140" y="80" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="34" font-weight="700" fill="#0F766E">+</text>
    <g font-family="Fredoka, sans-serif" font-size="30" font-weight="700" text-anchor="middle">
      <rect x="70" y="128" width="50" height="50" rx="12" fill="#FDE047"/><text x="95" y="164" fill="#1F1B2E">3</text>
      <rect x="135" y="128" width="50" height="50" rx="12" fill="#22C55E"/><text x="160" y="164" fill="#fff">5</text>
      <rect x="200" y="128" width="50" height="50" rx="12" fill="#60A5FA"/><text x="225" y="164" fill="#fff">7</text></g>`,
  sort: `<rect width="320" height="210" fill="#E0F2FE"/><path d="M0 150h320v60H0z" fill="#BBF7D0"/>
    <rect x="50" y="90" width="70" height="80" rx="10" fill="#EF4444"/><rect x="44" y="82" width="82" height="14" rx="6" fill="#B91C1C"/>
    <rect x="200" y="90" width="70" height="80" rx="10" fill="#F59E0B"/><rect x="194" y="82" width="82" height="14" rx="6" fill="#B45309"/>
    <rect x="140" y="40" width="30" height="30" rx="6" fill="#A855F7" transform="rotate(-14 155 55)"/><circle cx="160" cy="110" r="12" fill="#3B82F6"/>`,
  bus: `<rect width="320" height="210" fill="#DBEAFE"/><path d="M0 170h320v40H0z" fill="#94A3B8"/>
    <rect x="40" y="70" width="240" height="96" rx="18" fill="#FACC15"/><rect x="40" y="130" width="240" height="10" fill="#1F1B2E"/>
    <rect x="60" y="86" width="40" height="34" rx="6" fill="#fff"/><circle cx="80" cy="103" r="10" fill="#EF4444"/>
    <rect x="112" y="86" width="40" height="34" rx="6" fill="#fff"/><rect x="122" y="94" width="20" height="18" fill="none" stroke="#94A3B8" stroke-width="3" stroke-dasharray="4 3"/>
    <rect x="164" y="86" width="40" height="34" rx="6" fill="#fff"/><path d="M184 92l12 22h-24z" fill="#22C55E"/>
    <rect x="216" y="86" width="40" height="34" rx="6" fill="#fff"/>
    <circle cx="90" cy="168" r="16" fill="#1F1B2E"/><circle cx="230" cy="168" r="16" fill="#1F1B2E"/>
    <rect x="130" y="20" width="22" height="22" rx="4" fill="#3B82F6"/><circle cx="190" cy="30" r="11" fill="#A855F7"/>`
};

export function tablet(screen, label) {
  return `<svg viewBox="0 0 360 250" role="img" aria-label="${label}">
    <rect x="0" y="0" width="360" height="250" rx="26" fill="#7C3AED"/>
    <rect x="8" y="8" width="344" height="234" rx="20" fill="#6D28D9"/>
    <g transform="translate(20 20)"><clipPath id="clip-${screen}"><rect width="320" height="210" rx="12"/></clipPath>
      <g clip-path="url(#clip-${screen})">${SCREENS[screen] || ''}</g></g>
    <circle cx="346" cy="125" r="3" fill="#C4B5FD"/>
  </svg>`;
}

/* Hero: child with headphones and tablet */
export function heroChild() {
  return `<svg viewBox="0 0 300 320" role="img" aria-label="Smiling child wearing headphones and holding a tablet">
    <circle cx="150" cy="170" r="140" fill="#F5EEFF"/>
    <path d="M70 320c0-70 36-110 80-110s80 40 80 110z" fill="#F472B6"/>
    <circle cx="150" cy="130" r="62" fill="#FED7AA"/>
    <path d="M86 122c0-48 30-70 64-70s64 22 64 70c-10-26-34-40-64-40s-54 14-64 40z" fill="#A16207"/>
    <path d="M84 120c-6 40 4 70 16 86M216 120c6 40-4 70-16 86" stroke="#A16207" stroke-width="16" stroke-linecap="round" fill="none"/>
    <path d="M86 128a64 64 0 0 1 128 0" stroke="#7C3AED" stroke-width="10" fill="none"/>
    <rect x="72" y="112" width="24" height="40" rx="12" fill="#A855F7"/><rect x="204" y="112" width="24" height="40" rx="12" fill="#A855F7"/>
    <circle cx="128" cy="132" r="7" fill="#1F1B2E"/><circle cx="172" cy="132" r="7" fill="#1F1B2E"/>
    <path d="M132 158q18 16 36 0" stroke="#1F1B2E" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="112" cy="152" r="9" fill="#FDA4AF" opacity=".7"/><circle cx="188" cy="152" r="9" fill="#FDA4AF" opacity=".7"/>
    <g transform="rotate(-8 190 240)"><rect x="150" y="200" width="110" height="80" rx="12" fill="#1F1B2E"/><rect x="158" y="208" width="94" height="64" rx="6" fill="#60A5FA"/>
      <circle cx="190" cy="236" r="10" fill="#FDE047"/><rect x="208" y="230" width="34" height="8" rx="4" fill="#fff"/></g>
  </svg>`;
}

export function blocks() {
  return `<svg viewBox="0 0 140 90" aria-hidden="true" font-family="Fredoka, sans-serif" font-weight="700" font-size="34" text-anchor="middle">
    <g transform="rotate(-8 35 55)"><rect x="6" y="26" width="58" height="58" rx="10" fill="#EF4444"/><text x="35" y="67" fill="#fff">A</text></g>
    <g transform="rotate(10 100 50)"><rect x="72" y="20" width="58" height="58" rx="10" fill="#3B82F6"/><text x="101" y="61" fill="#fff">B</text></g>
  </svg>`;
}

export function familyArt() {
  return `<svg viewBox="0 0 360 300" role="img" aria-label="Parents and child playing a learning game on a tablet">
    <path d="M40 60C90 0 250 -10 320 60s30 210-60 230S10 260 20 170 0 110 40 60z" fill="#F9A8D4"/>
    <g transform="translate(70 90)">
      <circle cx="40" cy="40" r="34" fill="#E0B48A"/><path d="M8 34c0-30 20-42 32-42s32 12 32 42c-10-14-20-18-32-18S18 20 8 34z" fill="#3F2A1D"/>
      <path d="M0 200c0-80 20-120 40-120s40 40 40 120z" fill="#2563EB"/>
      <circle cx="180" cy="34" r="32" fill="#FCD9B8"/><path d="M146 40c-4-40 16-60 34-60s40 20 34 60c-6-24-18-34-34-34s-28 10-34 34z" fill="#F59E0B"/>
      <path d="M140 200c0-80 18-118 40-118s40 38 40 118z" fill="#F472B6"/>
      <circle cx="110" cy="90" r="26" fill="#FED7AA"/><path d="M84 86c0-22 12-32 26-32s26 10 26 32c-6-10-14-14-26-14s-20 4-26 14z" fill="#A16207"/>
      <path d="M80 200c0-50 12-80 30-80s30 30 30 80z" fill="#FACC15"/>
      <rect x="74" y="128" width="72" height="50" rx="8" fill="#1F1B2E"/><rect x="80" y="134" width="60" height="38" rx="4" fill="#4ADE80"/>
      <circle cx="96" cy="150" r="6" fill="#fff"/><circle cx="112" cy="156" r="6" fill="#FDE047"/><circle cx="128" cy="150" r="6" fill="#F87171"/>
      <circle cx="30" cy="40" r="3"/><circle cx="50" cy="40" r="3"/><circle cx="170" cy="34" r="3"/><circle cx="190" cy="34" r="3"/><circle cx="102" cy="90" r="3"/><circle cx="118" cy="90" r="3"/>
    </g>
  </svg>`;
}

export function giftArt() {
  return `<svg viewBox="0 0 320 300" role="img" aria-label="Fox mascot popping out of a gift box with game cards flying out">
    <g transform="rotate(-18 70 70)"><rect x="40" y="40" width="64" height="80" rx="10" fill="#60A5FA"/><circle cx="72" cy="80" r="16" fill="#fff"/></g>
    <g transform="rotate(14 250 60)"><rect x="220" y="24" width="64" height="80" rx="10" fill="#F472B6"/><path d="M252 48l14 26h-28z" fill="#fff"/></g>
    <g transform="rotate(-6 160 30)"><rect x="128" y="0" width="64" height="80" rx="10" fill="#FDE047"/><text x="160" y="54" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="30" fill="#7C3AED">A</text></g>
    <g transform="translate(100 96)">${fox({ size: 120 }).replace('<svg', '<svg x="0" y="0" width="120" height="130"')}</g>
    <path d="M70 190h180l-14 100H84z" fill="#FB923C"/><rect x="60" y="176" width="200" height="30" rx="8" fill="#F97316"/>
    <rect x="148" y="176" width="24" height="114" fill="#FDE047"/>
  </svg>`;
}

export function offlineArt() {
  return `<svg viewBox="0 0 340 300" role="img" aria-label="Bunny mascot next to a traffic cone and a no Wi-Fi sign">
    <ellipse cx="170" cy="280" rx="150" ry="14" fill="#E9D5FF"/>
    <path d="M40 276l26-110h20l26 110z" fill="#FB923C"/><path d="M52 226h48l-4-18H56zM60 190h32l-3-14H63z" fill="#fff"/><rect x="30" y="270" width="92" height="12" rx="4" fill="#EA580C"/>
    <g transform="translate(110 80)">${bunny({ size: 140 }).replace('<svg', '<svg x="0" y="0" width="140" height="161"')}</g>
    <rect x="276" y="140" width="8" height="140" fill="#94A3B8"/>
    <circle cx="280" cy="110" r="44" fill="#fff" stroke="#EF4444" stroke-width="10"/>
    <g stroke="#1F1B2E" stroke-width="7" fill="none" stroke-linecap="round"><path d="M256 104a34 34 0 0 1 48 0"/><path d="M265 116a20 20 0 0 1 30 0"/></g>
    <circle cx="280" cy="128" r="5" fill="#1F1B2E"/><path d="M250 80l60 60" stroke="#EF4444" stroke-width="10"/>
  </svg>`;
}

export const doodles = {
  planet: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="32" fill="#FB923C"/><circle cx="48" cy="50" r="6" fill="#FDBA74"/><circle cx="70" cy="72" r="4" fill="#FDBA74"/><ellipse cx="60" cy="62" rx="56" ry="14" fill="none" stroke="#7C3AED" stroke-width="5" transform="rotate(-18 60 62)"/></svg>`,
  pencil: `<svg viewBox="0 0 140 40" aria-hidden="true"><g transform="rotate(-30 70 20)"><rect x="10" y="12" width="96" height="18" rx="3" fill="#60A5FA"/><rect x="0" y="12" width="12" height="18" rx="3" fill="#F472B6"/><path d="M106 12l22 9-22 9z" fill="#FDE68A"/><path d="M121 18l7 3-7 3z" fill="#1F1B2E"/></g></svg>`,
  crayons: `<svg viewBox="0 0 120 100" aria-hidden="true"><rect x="20" y="40" width="80" height="58" rx="10" fill="#A855F7"/><rect x="34" y="8" width="12" height="40" rx="3" fill="#EF4444"/><rect x="52" y="0" width="12" height="48" rx="3" fill="#22C55E"/><rect x="70" y="12" width="12" height="36" rx="3" fill="#FACC15"/><rect x="20" y="40" width="80" height="12" fill="#9333EA"/></svg>`
};

export const socialIcon = {
  fb: '<path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/>',
  ig: '<path d="M12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 7.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zM17 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm4 14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4z"/>',
  x: '<path d="M17.5 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L1 3h6.8l4.7 6.2zm-1.2 16h1.8L6.7 4.9H4.8z"/>',
  tt: '<path d="M16.5 2c.4 2.6 2 4.2 4.5 4.4v3.2c-1.6.1-3-.4-4.5-1.3v6.5c0 4-3.3 6.7-7 6.2-3.3-.4-5.5-3.5-5-6.8.5-3 3.4-5.2 6.5-4.8v3.3c-1.6-.4-3.3.6-3.5 2.2-.2 1.6 1 3 2.6 3 1.6 0 2.7-1.2 2.7-2.9V2z"/>'
};

export const storeBadge = {
  google: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3.6 2.2L13.3 12l-9.7 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1z" fill="#34D399"/><path d="M16.6 8.7L13.3 12 3.6 2.2c.1 0 .3 0 .5.1z" fill="#60A5FA"/><path d="M16.6 15.3L4.1 21.7c-.2.1-.4.1-.5.1l9.7-9.8z" fill="#F87171"/><path d="M20.4 10.8c.8.5.8 1.9 0 2.4l-3.8 2.1-3.3-3.3 3.3-3.3z" fill="#FACC15"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>`
};
