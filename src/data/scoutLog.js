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
    videosFound: 169,
    note: 'First sweep + two TikTok #snoopishiring passes (108 net new in pass 2 after URL dedupe; caption-verified): 169 new verified videos total; X blocked by login wall. TikTok shows no public hashtag video count. Community-visible sample, estimate.',
  },
    {
    date: '2026-09-09',
    videosFound: 224,
    note: 'Read-only Instagram sweeps: 10 net new in pass 3 after URL dedupe (9 IG, 1 YT; post captions verified via post metadata). Pass 4 used fresh angles (pitch-phrasing social search, Threads/Facebook pools) and added 6 more caption-verified IG videos. Blitz pass 5 added 43 net new after URL dedupe (41 Facebook reels, 2 Threads) via read-only Facebook/Threads sweeps with full caption summaries; excluded 7 likely cross-posts already in the feed (Christina Johnson, Levi Hunt, Lizzy Ashliegh, Alexis Dean Jr., Lauryn Jarrell, Venus duplicate, Dakota Covil duplicate reel) plus promos/news/reviews. Blitz pass 6 added 3 net new (3 LinkedIn native video pitches, transcript-verified: Martina Ascone, Colin R. Mah, Sir Michael Gill-Branion); Facebook/YouTube/TikTok/IG/X/Threads re-sweeps found nothing new beyond dupes — those pools need live-browser or logged-in sessions to go deeper. Pass 7 (live in-app YouTube/TikTok scouting, no login) added 37 net new after URL dedupe (16 YouTube, 21 TikTok); excluded news segments, commentary, promos, reviews, memes, launch-party footage, and cross-platform dupes. Pass 8 (fresh-angle web-search sweep of all 7 pools: site: filters, hire-me phrasing, day-series, flavor angles, ES/PT/FR/DE queries, recency filters): 0 new verified — discoverable pools saturated in web search; Facebook/Threads posts poorly indexed (in-app search needed), X login-walled and bot-walled on mirrors. Community-visible sample, estimate. Pass 9 (authenticated TikTok sweep after the founder signed the browser in: 147 #snoopishiring + 143 #drbombay + 127 #icecreamtester cards loaded, 250 applicant URLs collected read-only, 125 net new after URL dedupe; excluded brand posts, ads, news clips, and non-campaign content). Pass 10 (web-search sweep: fresh angles across all 7 pools — flavor angles, hire-me phrasing, day-series, ES/PT/FR/DE queries, news roundups naming applicants): 0 new verified — discoverable pools saturated without live-browser or logged-in sessions; TikTok hashtag page not fetchable read-only. Pass 11 (fresh-angle web-search sweep: recency-filtered news queries, hire-me phrasing, day-series angles, IT/FR/PT queries, LinkedIn-applicant queries, Facebook/TikTok site-angle queries): 0 new verified — discoverable pools saturated via web search; LinkedIn news-story page surfaced Michael A. Silva\'s applicant pitch text but the post URL wasn\'t publicly verifiable (profile URL only), so it stays out per the iron rule. Community-visible sample, estimate.',
  },
  {
    date: '2026-09-10',
    videosFound: 2,
    note: 'Fresh-angle web-search sweep across all 7 pools (site: filters, hire-me phrasing, flavor-pitch angles, ES queries, creator/audition phrasing, X/TikTok pool queries, day-series phrasing): 0 new verified in the first wave — discoverable pools remain saturated via web search; the only application-video hit (Snoopi Botten, YouTube) was already in the feed. LinkedIn #snoopishiring pass added 2 net new after URL dedupe (2 LinkedIn native video pitches, transcript/caption-verified: Mateo Eaton, Serena G.). Community-visible sample, estimate.',
  },
]