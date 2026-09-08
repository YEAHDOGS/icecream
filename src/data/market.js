/**
 * Global and US market headline figures. Every entry is a Stat (see schema.js).
 *
 * Research houses disagree on the global total by ~50% (IMARC ~$81B vs Grand
 * View / Mordor ~$121B for 2025) because they draw the category boundary
 * differently (impulse street sales, gelato, frozen novelties). The hero quotes
 * one house and says so in its note rather than averaging them.
 */

/** @type {import('./schema.js').Stat[]} — first entry is the hero figure. */
export const GLOBAL_STATS = [
  {
    id: 'global-size',
    label: 'Global ice cream market, 2025',
    value: '$121B',
    num: 121.4e9,
    note: 'Grand View Research estimate. Other houses range from $81B (IMARC) to $91B retail (Euromonitor, 2024), so treat the size as a band, not a point.',
    source: {
      label: 'Grand View Research',
      url: 'https://www.grandviewresearch.com/industry-analysis/ice-cream-market',
      date: '2026',
    },
  },
  {
    id: 'global-growth',
    label: 'Forecast growth',
    value: '4.3% / yr',
    num: 0.043,
    note: 'To $169B by 2033. Most houses land between 3.9% and 4.4%.',
    source: {
      label: 'Grand View Research',
      url: 'https://www.grandviewresearch.com/industry-analysis/ice-cream-market',
      date: '2026',
    },
  },
  {
    id: 'us-retail',
    label: 'US retail ice cream sales',
    value: '$8.6B',
    num: 8.6e9,
    note: 'Packaged ice cream and sherbet, 52 weeks to Sep 2025. Frozen novelties add another $8.9B.',
    source: {
      label: 'Dairy Foods / Circana',
      url: 'https://www.dairyfoods.com/articles/98653-state-of-the-dairy-industry-lapping-up-luscious-ice-cream',
      date: '2025',
    },
  },
  {
    id: 'us-production',
    label: 'US production, 2025',
    value: '1.23B gal',
    num: 1.23e9,
    note: 'About 4 gallons per American per year.',
    source: {
      label: 'IDFA',
      url: 'https://www.idfa.org/ice-cream-sales-trends',
      date: '2026',
    },
  },
  {
    id: 'us-love',
    label: 'Americans who love or like ice cream',
    value: '97%',
    num: 0.97,
    note: 'Chocolate (38%) took the crown in 2026 and butter pecan (27%) passed vanilla (25%).',
    source: {
      label: 'IDFA / Morning Consult',
      url: 'https://www.idfa.org/news/chocolate-returns-to-no-1-and-butter-pecan-surpasses-vanilla-ahead-of-national-ice-cream-day',
      date: '2026',
    },
  },
  {
    id: 'leader-share',
    label: 'Largest company’s global share',
    value: '21%',
    num: 0.21,
    note: 'The Magnum Ice Cream Company, spun out of Unilever in December 2025.',
    source: {
      label: 'Food Dive',
      url: 'https://www.fooddive.com/news/magnum-ice-cream-prepares-for-a-new-frontier-after-spin-off-from-cpg-gian/802166/',
      date: 'Dec 2025',
    },
  },
]

/** Segment facts used on the market panel. */
export const SEGMENTS = [
  {
    id: 'dairy-share',
    label: 'Dairy share of global revenue',
    value: '81%',
    num: 0.81,
    note: 'Plant-based is growing but small, and US plant-based sales fell in 2023 and 2024.',
    source: {
      label: 'Mordor Intelligence',
      url: 'https://www.mordorintelligence.com/industry-reports/ice-cream-market',
      date: '2026',
    },
  },
]
