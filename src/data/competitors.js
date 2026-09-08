/**
 * Who sells the ice cream. Bars compare latest-reported annual sales in USD;
 * non-USD figures are converted at approximate rates and marked "≈".
 */

const DAIRY_FOODS_2024 = {
  label: 'Dairy Foods / Circana',
  url: 'https://www.dairyfoods.com/articles/97734-2024-state-of-the-dairy-industry-ice-cream',
  date: '2024',
}

/**
 * @typedef {Object} Giant
 * @property {string} name
 * @property {number} num      annual sales, USD
 * @property {string} value
 * @property {string} brands
 * @property {string} [note]
 * @property {import('./schema.js').Source} source
 */

/** @type {Giant[]} — sorted largest first. */
export const GIANTS = [
  {
    name: 'The Magnum Ice Cream Co.',
    num: 8.53e9,
    value: '≈$8.5B',
    brands: 'Magnum, Ben & Jerry’s, Wall’s, Cornetto, Breyers, Talenti, Yasso, Popsicle, Klondike.',
    note: '€7.9B turnover, 2025. Spun out of Unilever and listed in Amsterdam in December 2025.',
    source: {
      label: 'Magnum Ice Cream Co. results',
      url: 'https://news.magnumicecream.com/2025-full-year-results/',
      date: 'Feb 2026',
    },
  },
  {
    name: 'Dairy Queen',
    num: 6.4e9,
    value: '$6.4B',
    brands: 'Over 7,700 franchised restaurants, owned by Berkshire Hathaway.',
    note: 'Systemwide restaurant sales, 2024, not packaged retail.',
    source: {
      label: 'Star Tribune',
      url: 'https://www.startribune.com/dairy-queen-dq-10-billion-2030-growth-bloomington-berkshire-hathaway/601342332',
      date: '2025',
    },
  },
  {
    name: 'Froneri',
    num: 6.0e9,
    value: '≈$6.0B',
    brands: 'Häagen-Dazs (US), Dreyer’s, Edy’s, Drumstick, Outshine, plus Nestlé and Oreo licences.',
    note: '€5.53B sales, 2024. A Nestlé–PAI Partners joint venture and the world’s number two.',
    source: {
      label: 'Dairy Reporter',
      url: 'https://www.dairyreporter.com/Article/2025/10/27/froneris-success-shows-why-unilever-is-right-to-spin-off-ice-cream/',
      date: 'Oct 2025',
    },
  },
  {
    name: 'Ben & Jerry’s (US retail)',
    num: 1.02e9,
    value: '$1.0B',
    brands: 'The number-one US ice cream brand by retail dollars, inside Magnum.',
    note: '52 weeks to Nov 2024, up 4%.',
    source: DAIRY_FOODS_2024,
  },
  {
    name: 'Baskin-Robbins (US)',
    num: 0.705e9,
    value: '$705M',
    brands: 'About 2,245 US scoop shops, owned by Inspire Brands.',
    note: 'US system sales, 2024.',
    source: {
      label: 'Restaurant Business / Technomic',
      url: 'https://www.restaurantbusinessonline.com/top-500-chains-2025/baskin-robbins',
      date: '2025',
    },
  },
]

/** Premium and indie brands: the realistic ceiling for a new entrant. */
/** @type {import('./schema.js').Stat[]} */
export const CHALLENGERS = [
  {
    id: 'tillamook',
    label: 'Tillamook ice cream, US retail',
    value: '~$400M',
    num: 0.4e9,
    note: 'Up 18% in a year, the fastest-growing major brand in the Circana set. A dairy co-op, not a startup.',
    source: DAIRY_FOODS_2024,
  },
  {
    id: 'jenis',
    label: 'Jeni’s Splendid revenue, 2025',
    value: '$150M+',
    num: 0.15e9,
    note: 'From a Columbus, Ohio market stall in 2002 to a national premium brand with its own shops and grocery pints.',
    source: {
      label: 'Dairy Foods',
      url: 'https://www.dairyfoods.com/articles/98896-jenis-splendid-ice-creams-continues-to-see-new-avenues-for-growth',
      date: '2026',
    },
  },
  {
    id: 'halo-top',
    label: 'Halo Top US sales, 2017',
    value: '~$350M',
    num: 0.35e9,
    note: 'A lawyer’s kitchen project that briefly outsold Ben & Jerry’s in pints, then faded. Proof a single idea can break the category, and that it needs a second act.',
    source: {
      label: 'CNBC',
      url: 'https://www.cnbc.com/2018/11/01/halo-top-beat-ben--jerrys-brings-in-hundreds-of-millions-in-sales.html',
      date: 'Nov 2018',
    },
  },
  {
    id: 'van-leeuwen',
    label: 'Van Leeuwen footprint, 2025',
    value: '~100 shops',
    num: 100,
    note: 'One truck in 2008. Now about 100 scoop shops and pints in roughly 12,000 grocery stores, growing double digits.',
    source: {
      label: 'Restaurant Business',
      url: 'https://www.restaurantbusinessonline.com/operations/one-truck-double-digit-growth-van-leeuwen-ice-cream-never-sways-its-mission',
      date: '2025',
    },
  },
  {
    id: 'salt-straw',
    label: 'Salt & Straw shops, 2025',
    value: '50',
    num: 50,
    note: 'Seven states, flavor-first brand built on rotating seasonal menus. Exploring a sale in 2025.',
    source: {
      label: 'Inc.',
      url: 'https://www.inc.com/lucia-auerbach/this-beloved-ice-cream-chain-50-locations-could-soon-have-a-new-owner/91353958',
      date: '2025',
    },
  },
  {
    id: 'dr-bombay-revenue',
    label: 'Dr. Bombay revenue since launch',
    value: '$10M+',
    num: 10e6,
    note: 'Seven flavors, launched in 3,500 Walmarts in 2023. Already ahead of most indie brands’ first two years.',
    source: {
      label: 'AfroTech',
      url: 'https://afrotech.com/snoop-dogg-grand-opening-of-ice-cream-storefront-venice-beach',
      date: 'Apr 2026',
    },
  },
]

/** What ice cream businesses have actually sold for. `num` is the USD
 *  arithmetic of the displayed value — the figures were already cited here. */
/** @type {Array<{ id: string, label: string, value: string, num: number, source: import('./schema.js').Source }>} */
export const CELEBRITY_COMPS = [
  {
    id: 'bj-unilever',
    label: 'Ben & Jerry’s to Unilever, 2000',
    value: '$326M',
    num: 326e6,
    source: {
      label: 'Fortune',
      url: 'https://fortune.com/2025/04/23/ben-and-jerry-sold-out-to-unilever-25-years-ago-now-theyre-going-to-war/',
      date: 'Apr 2025',
    },
  },
  {
    id: 'nestle-froneri',
    label: 'Nestlé US ice cream to Froneri, 2020',
    value: '$4.0B',
    num: 4.0e9,
    source: {
      label: 'PAI Partners',
      url: 'https://www.paipartners.com/mediaitem/pai-partners-backed-froneri-announces-acquisition-of-nestles-us-ice-cream-business-for-4-0-billion/',
      date: 'Dec 2019',
    },
  },
  {
    id: 'dunkin-inspire',
    label: 'Dunkin’ + Baskin-Robbins to Inspire, 2020',
    value: '$11.3B',
    num: 11.3e9,
    source: {
      label: 'Inspire Brands',
      url: 'https://inspirebrands.com/inspire-brands-to-acquire-dunkin-brands-in-11-3-billion-transaction/',
      date: 'Oct 2020',
    },
  },
  {
    id: 'froneri-valuation',
    label: 'Froneri valuation, 2025',
    value: '$17.6B',
    num: 17.6e9,
    source: {
      label: 'MarketScreener / Dow Jones',
      url: 'https://www.marketscreener.com/news/ice-cream-maker-froneri-hits-17-6-billion-valuation-in-funding-deal-update-ce7d5bdedf8bf527',
      date: '2025',
    },
  },
]

/** The arc every small brand hopes for, and its cautionary ending. */
export const ARC = {
  title: 'Ben & Jerry’s: $12K to $1B, then a fight for its soul',
  steps: [
    {
      year: '1978',
      text: 'Two friends open in a renovated Burlington, Vermont gas station with about $12,000 and a $5 correspondence course in ice cream making.',
      source: {
        label: 'Fortune',
        url: 'https://fortune.com/2025/04/23/ben-and-jerry-sold-out-to-unilever-25-years-ago-now-theyre-going-to-war/',
        date: 'Apr 2025',
      },
    },
    {
      year: '2000',
      text: 'Sold to Unilever for about $326M, with an independent board written into the deal to protect the social mission.',
      source: {
        label: 'Fortune',
        url: 'https://fortune.com/2025/04/23/ben-and-jerry-sold-out-to-unilever-25-years-ago-now-theyre-going-to-war/',
        date: 'Apr 2025',
      },
    },
    {
      year: '2024',
      text: 'Number-one US ice cream brand with $1.02B in retail sales, up 4%.',
      source: DAIRY_FOODS_2024,
    },
    {
      year: '2025',
      text: 'Co-founder Jerry Greenfield resigns after 47 years, saying the brand has been silenced by its parent.',
      source: {
        label: 'NPR',
        url: 'https://www.npr.org/2025/09/17/nx-s1-5544283/ben-jerrys-jerry-greenfield-resigns-unilever',
        date: 'Sep 2025',
      },
    },
    {
      year: '2026',
      text: 'Ben Cohen launches a campaign to buy the brand back, valuing it at $1.5–2B. Magnum says it is not for sale.',
      source: {
        label: 'WBUR / AP',
        url: 'https://www.wbur.org/news/2026/04/15/ben-jerrys-magnum-ice-cream-indepedent-activism',
        date: 'Apr 2026',
      },
    },
  ],
}
