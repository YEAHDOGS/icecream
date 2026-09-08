/**
 * Shared data shapes. Every number shown on the site is a `Stat` (or a row that
 * carries a `source`), so a citation can never be forgotten — `data.test.js`
 * enforces it.
 *
 * @typedef {Object} Source
 * @property {string} label   Publisher or document, e.g. "IDFA", "Statista"
 * @property {string} url     Direct https link to the document
 * @property {string} [date]  Publication date, "2025" or "Jun 2025"
 *
 * @typedef {Object} Stat
 * @property {string} id      Unique key
 * @property {string} label   Sentence-case label, no trailing colon
 * @property {string} value   Display string, e.g. "$104B"
 * @property {number} [num]   Numeric value for charts
 * @property {string} [note]  One line of context
 * @property {Source} source
 */

/**
 * Basic guard used by tests and by the map so a malformed entry fails loudly
 * instead of rendering an uncited number.
 * @param {Source | undefined} s
 * @returns {boolean}
 */
export const isValidSource = (s) =>
  !!s && typeof s.label === 'string' && s.label.length > 0 && /^https:\/\//.test(s.url ?? '')
