/**
 * "The Campaign" tab: a bird's-eye view of the Snoop Dogg x Deel x Dr. Bombay
 * International Ice Cream Taste Tester search. Applicant and impression counts
 * are self-reported by the campaign (not audited) — they are marked as
 * estimates with a LAST_UPDATED stamp, never as measured figures.
 */

export const LAST_UPDATED = 'Sep 8, 2026'

/** Application deadline, end of day local time. */
export const DEADLINE_ISO = '2026-09-17T23:59:59'

const DEEL_RELEASE = {
  label: 'Deel × Dr. Bombay press release',
  url: 'https://business.scoop.co.nz/2026/08/28/deel-partners-with-snoop-doggs-dr-bombay-to-find-the-brands-first-ever-international-ice-cream-taste-tester/',
  date: 'Aug 2026',
}

const LINKEDIN_NEWS = {
  label: 'LinkedIn News',
  url: 'https://www.linkedin.com/news/story/snoop-dogg-seeks-to-hire-30k-ice-cream-taster-7588204/',
  date: 'Sep 2026',
}

const BACKYARD = {
  label: 'Backyard Drunkard',
  url: 'https://backyarddrunkard.com/celebrity-news/snoop-dogg-dr-bombay-ice-cream-taster-job/',
  date: 'Sep 2026',
}

const SHEEN = {
  label: 'SHEEN Magazine',
  url: 'https://sheenmagazine.com/snoop-dogg-celebrates-viral-10k-a-month-ice-cream-taste-tester-search-at-exclusive-ice-cream-social/',
  date: 'Sep 2026',
}

const INC = {
  label: 'Inc.',
  url: 'https://www.inc.com/amaya-nichole/200000-people-applied-snoop-dogg-ice-cream-job-how-they-will-choose-the-winner/91402156',
  date: 'Sep 2026',
}

const USA_TODAY = {
  label: 'USA Today',
  url: 'https://www.usatoday.com/story/entertainment/celebrities/2026/08/28/snoop-dogg-ice-cream-taster-job/91504653007/',
  date: 'Aug 2026',
}

const RESTAURANT_CAFE = {
  label: 'Restaurant & Cafe NZ',
  url: 'https://restaurantandcafe.co.nz/snoop-dogg-seeks-global-ice-cream-taste-tester/',
  date: 'Sep 2026',
}

/** @type {import('./schema.js').Stat[]} */
export const CAMPAIGN_STATS = [
  {
    id: 'pay',
    label: 'Taste Tester contract',
    value: '$30K total',
    num: 30000,
    note: 'Three-month remote contract at $10K/mo, hired as an independent contractor through Deel.',
    source: DEEL_RELEASE,
  },
  {
    id: 'countries',
    label: 'Countries applied from',
    value: '133',
    num: 133,
    note: 'Per Snoop\u2019s announcement — a genuinely global applicant pool.',
    source: LINKEDIN_NEWS,
  },
  {
    id: 'applicants',
    label: 'Applications (estimate)',
    value: '275K+',
    num: 275000,
    note: 'From 133 countries, per Snoop and Deel. Self-reported by the campaign, not audited; Deel is betting on 500K by close.',
    source: LINKEDIN_NEWS,
  },
  {
    id: 'impressions',
    label: 'Campaign impressions (estimate)',
    value: '100M+',
    num: 100000000,
    note: 'Per Deel campaign updates. The application page briefly showed a "meltdown" overload message from submission volume.',
    source: BACKYARD,
  },
  {
    id: 'window',
    label: 'Application window',
    value: 'Aug 27 – Sep 17',
    note: 'About three weeks. Winner confirmed toward end of September; Snoop personally calls the winner.',
    source: RESTAURANT_CAFE,
  },
]

/**
 * What the role actually filters for, per the brief.
 * @type {Array<{ id: string, text: string, source: import('./schema.js').Source }>}
 */
export const WHAT_THEY_WANT = [
  {
    id: 'brief',
    text: 'The brief is four words: "Taste. Travel. Discover. Report."',
    source: DEEL_RELEASE,
  },
  {
    id: 'not-critic',
    text: 'Explicitly not looking for an "old-school, stuffy food critic." They want curiosity, social instincts, and storytelling.',
    source: INC,
  },
  {
    id: 'funnel',
    text: 'Deel narrows to a top 50, the top 20 meet the Dr. Bombay team, then Snoop\u2019s team reviews finalists. AI-assisted screening, human final decisions.',
    source: INC,
  },
  {
    id: 'flavor',
    text: 'The hire co-creates a Deel-themed flavor with Dr. Bombay\u2019s ice cream scientist — the partnership literally becomes product.',
    source: DEEL_RELEASE,
  },
]

/**
 * Press-coverage timeline.
 * @type {Array<{ date: string, title: string, text: string, source: import('./schema.js').Source }>}
 */
export const CAMPAIGN_TIMELINE = [
  {
    date: 'Aug 27, 2026',
    title: 'Campaign announced',
    text: 'Snoop posts the launch video ("I love the paper, but not the paperwork") — Deel handles global hiring and payments.',
    source: USA_TODAY,
  },
  {
    date: 'Aug 29, 2026',
    title: 'Inglewood ice cream social',
    text: 'Snoop throws a launch party with DJ Snoopadelic — the campaign runs as an ongoing content engine, not a one-day stunt.',
    source: SHEEN,
  },
  {
    date: '~Sep 3, 2026',
    title: '200K applicants, 133 countries',
    text: 'Snoop: "We been dreamin big but never thought this thing would go THIS VIRAL fr fr… this ain\u2019t just a job no more, this a movement."',
    source: LINKEDIN_NEWS,
  },
  {
    date: '~Sep 7, 2026',
    title: '~275K applicants',
    text: 'Deel\u2019s team publicly bets on 500K+ by close; 100M+ campaign impressions reported.',
    source: LINKEDIN_NEWS,
  },
  {
    date: 'Sep 17, 2026',
    title: 'Applications close',
    text: 'End of the ~three-week window. Winner confirmed toward end of September.',
    source: RESTAURANT_CAFE,
  },
]

export const APPLY = {
  url: 'https://deel.com/snoop',
  cta: 'Apply at deel.com/snoop',
  requirements: [
    'Speak English, hold a valid passport',
    'Available for the full three months',
    'Able to do sensory evaluation of dairy ice cream',
    'Submit a video on why you\u2019re the right fit, plus a social post about a flavor combo you\u2019re obsessed with',
  ],
  source: USA_TODAY,
}

/**
 * Applicant momentum. Only hard, sourced numbers — no invented platform,
 * demographic, or country splits (Deel has not published any). The final bar
 * is Deel's own projection, explicitly flagged.
 * @type {Array<{ id: string, label: string, value: string, num: number, projection?: boolean, source: import('./schema.js').Source }>}
 */
export const APPLICANT_GROWTH = [
  {
    id: 'launch',
    label: 'Aug 27',
    value: 'Launch',
    num: 0,
    source: USA_TODAY,
  },
  {
    id: 'sep3',
    label: '~Sep 3',
    value: '200K',
    num: 200000,
    source: LINKEDIN_NEWS,
  },
  {
    id: 'sep7',
    label: '~Sep 7',
    value: '275K+',
    num: 275000,
    source: LINKEDIN_NEWS,
  },
  {
    id: 'projection',
    label: 'Projection',
    value: '500K*',
    num: 500000,
    projection: true,
    source: LINKEDIN_NEWS,
  },
]
