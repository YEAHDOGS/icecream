/**
 * Daily discovery log for The Field's applicant-video feed. APPEND-ONLY: the
 * daily scouting job adds one entry per day at the END of this array.
 *
 * `videosFound` = new applicant videos VERIFIED that day (each URL fetched
 * and confirmed live before it lands in applicants.js). All counts are
 * labeled as estimates in the UI: this is the community-visible sample, not
 * Deel's internal applicant total.
 *
 * @typedef {Object} ScoutEntry
 * @property {string} date        ISO date, e.g. '2026-09-08'
 * @property {number} videosFound New verified videos found that day (>= 0)
 * @property {string} note        Human note, keep the word "estimate" in it
 */

/** @type {ScoutEntry[]} */
export const SCOUT_LOG = [
  {
    date: '2026-09-08',
    videosFound: 31,
    note: 'First sweep: community-visible sample, estimate',
  },
]
