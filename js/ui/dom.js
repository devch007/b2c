/** Escape text for safe insertion into HTML templates. */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

export const GRADES = [
  { key: 'lkg', label: 'LKG', badge: 'LKG', blurb: 'Counting, shapes & colours' },
  { key: 'ukg', label: 'UKG', badge: 'UKG', blurb: 'Numbers to 20, first sums' },
  ...Array.from({ length: 12 }, (_, i) => ({
    key: `class-${i + 1}`,
    label: `Class ${i + 1}`,
    badge: String(i + 1),
    blurb: i < 2 ? 'Place value, + and −' : i < 5 ? 'Tables, fractions, measures' : i < 8 ? 'Ratios, algebra, geometry' : i < 10 ? 'Equations, proofs, data' : 'Functions, trig, calculus'
  }))
];

export function gradeHue(key) {
  return `hue-${Math.max(0, GRADES.findIndex(g => g.key === key)) % 7}`;
}

export function findGrade(key) {
  return GRADES.find(g => g.key === key) || GRADES[2];
}
