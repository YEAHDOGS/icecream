/**
 * The 60-second video brief: the facts the founder needs on camera for the
 * Snoop application video, promoted to the top of the Market tab.
 * Every figure carries its own https source (citation gate).
 *
 * @type {{ id: string, title: string, subtitle: string, facts: import('./schema.js').Stat[] }}
 */
export const VIDEO_BRIEF = {
  id: 'video-brief',
  title: 'The 60-second brief',
  subtitle: 'Video cheat sheet — every line cited, Sep 2026',
  facts: [
    {
      id: 'china-number-one',
      value: 'China: #1',
      label:
        'Biggest ice cream market on Earth — it overtook the US in 2014 and never looked back.',
      source: {
        label: 'Mintel',
        url: 'https://www.mintel.com/press-centre/china-replaces-us-as-worlds-largest-ice-cream-market/',
        date: '2015',
      },
    },
    {
      id: 'global-market',
      value: '$121B',
      label: 'The entire global ice cream market, 2025.',
      note: 'Analyst band runs $80B–$150B; treat it as a band, not a point.',
      source: {
        label: 'Grand View Research',
        url: 'https://www.grandviewresearch.com/industry-analysis/ice-cream-market',
        date: '2026',
      },
    },
    {
      id: 'us-market',
      value: '$19.5B',
      label: 'The US market alone, 2025 — that’s the “twenty-something billion.”',
      source: {
        label: 'Mordor Intelligence',
        url: 'https://www.mordorintelligence.com/industry-reports/united-states-ice-cream-market',
        date: '2026',
      },
    },
    {
      id: 'china-flavors',
      value: 'Red bean: #1',
      label:
        'China’s flavors, ranked: red bean, mung bean, black sesame, green tea, taro, mango, bubble milk tea, durian.',
      note: 'Rank compiled from Chinese bestseller coverage, Sep 2026.',
      source: {
        label: 'eChineseLearning — Chinese ice cream ranking',
        url: 'https://www.echineselearning.com/blog/chinese-ice-cream-ranking',
        date: '2024',
      },
    },
    {
      id: 'china-brands',
      value: 'Yili: 17%',
      label:
        'China’s #1 ice cream maker; Mengniu is #2 at ~10%. Wall’s (Magnum, Cornetto) leads the foreign brands.',
      source: {
        label: 'Daxue Consulting',
        url: 'https://daxueconsulting.com/hot-trend-indulgence-ice-cream-industry-china/',
        date: '2026',
      },
    },
    {
      id: 'china-disruptors',
      value: 'Baijiu bars',
      label:
        'Maotai sold ¥200,000 of baijiu ice cream in 7 hours. Premium disruptors: Chicecream, Zhongjie 1946.',
      source: {
        label: 'ChemLinked',
        url: 'https://market.chemlinked.com/report/big-brands-flocking-in-the-ice-cream-industry',
        date: '2022',
      },
    },
    {
      id: 'global-champ',
      value: 'TMICC: 21%',
      label:
        'The Magnum Ice Cream Co. — the world’s biggest ice cream company (Magnum, Ben & Jerry’s, Wall’s, Cornetto).',
      note: 'Spun out of Unilever and listed in Amsterdam, Dec 2025.',
      source: {
        label: 'Food Navigator',
        url: 'https://www.foodnavigator.com/Article/2025/12/08/magnum-ice-cream-company-unilever-demerger-complete-a-history/',
        date: 'Dec 2025',
      },
    },
    {
      id: 'global-runner-up',
      value: 'Froneri: #2',
      label:
        'World #2 (Häagen-Dazs in the US, Drumstick, Mövenpick) — also the biggest private-label maker on the planet.',
      source: {
        label: 'Food Navigator',
        url: 'https://www.foodnavigator.com/Article/2025/10/27/froneris-success-shows-why-unilever-is-right-to-spin-off-ice-cream/',
        date: 'Oct 2025',
      },
    },
    {
      id: 'blue-bell-texas',
      value: '52% of Texas',
      label:
        'Blue Bell was America’s best-selling brand in 2014 — while selling in fewer than half the states.',
      source: {
        label: 'Wikipedia — Blue Bell Creameries',
        url: 'https://en.wikipedia.org/wiki/Blue_Bell_Creameries',
        date: '2026',
      },
    },
    {
      id: 'blue-bell-search',
      value: '22 states',
      label:
        'The most-searched ice cream brand in 22 states. A regional king with national gravity.',
      source: {
        label: 'Trace One',
        url: 'https://www.traceone.com/resources/plm-compliance-blog/most-popular-ice-cream-brands',
        date: '2026',
      },
    },
  ],
}
