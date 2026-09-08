/**
 * Number formatting for stats and charts. Pure functions, no DOM.
 */

const UNITS = [
  { min: 1e12, suffix: 'T' },
  { min: 1e9, suffix: 'B' },
  { min: 1e6, suffix: 'M' },
  { min: 1e3, suffix: 'K' },
]

/**
 * Compact a number: 1284 → "1.3K", 4.2e6 → "4.2M", 104e9 → "104B".
 * Keeps one decimal below 10 in the unit, none above.
 * @param {number} n
 * @returns {string}
 */
export function compact(n) {
  if (n == null || Number.isNaN(n)) return '—'
  const abs = Math.abs(n)
  const unit = UNITS.find((u) => abs >= u.min)
  if (!unit) return String(Math.round(n))
  const scaled = n / unit.min
  const digits = Math.abs(scaled) < 10 ? 1 : 0
  return `${scaled.toFixed(digits).replace(/\.0$/, '')}${unit.suffix}`
}

/**
 * Compact US dollars: 104e9 → "$104B".
 * @param {number} n
 * @returns {string}
 */
export function usd(n) {
  if (n == null || Number.isNaN(n)) return '—'
  return `${n < 0 ? '-' : ''}$${compact(Math.abs(n))}`
}

/**
 * Percent with one decimal when under 10: 0.043 → "4.3%", 0.24 → "24%".
 * @param {number} ratio
 * @returns {string}
 */
export function pct(ratio) {
  if (ratio == null || Number.isNaN(ratio)) return '—'
  const p = ratio * 100
  return `${p.toFixed(Math.abs(p) < 10 ? 1 : 0).replace(/\.0$/, '')}%`
}

/**
 * Pick a ramp step for a value between min and max (linear on log scale, since
 * market sizes span three orders of magnitude). Returns 1..steps.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} steps
 * @returns {number}
 */
export function rampStep(value, min, max, steps) {
  if (!(value > 0) || !(max > min) || min <= 0) return 1
  const t = (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min))
  return Math.min(steps, Math.max(1, 1 + Math.round(t * (steps - 1))))
}
