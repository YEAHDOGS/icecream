/**
 * The application itself: why this candidate, the proposed flavors, and the
 * brand and job facts that frame it. `PITCH.signoff` is intentionally blank —
 * the applicant signs their own name.
 */

const DEEL_RELEASE = {
  label: 'Deel × Dr. Bombay press release',
  url: 'https://business.scoop.co.nz/2026/08/28/deel-partners-with-snoop-doggs-dr-bombay-to-find-the-brands-first-ever-international-ice-cream-taste-tester/',
  date: 'Aug 2026',
}

const TASTEWISE_ICE_CREAM = {
  label: 'Tastewise ice cream trends',
  url: 'https://tastewise.io/foodtrends/ice-cream',
  date: '2026',
}

const NBC_JOB = {
  label: 'NBC News',
  url: 'https://www.nbcnews.com/pop-culture/pop-culture-news/snoop-dogg-hiring-international-ice-cream-taster-yes-s-real-job-rcna596461',
  date: 'Sep 2026',
}

export const PITCH = {
  eyebrow: 'The application',
  headline: 'Tasting is the easy part. Finding the next flavor is the job.',
  lede: 'This site is the first deliverable: a cited map of who eats what, who sells it, and which flavors are moving right now. Everything on it links to its source, because a scout who can’t show the receipts is just a fan with opinions.',
  points: [
    {
      id: 'scout',
      n: '01',
      title: 'Read the brief',
      text: 'The role travels to chase viral dessert trends and co-creates a flavor with Dr. Bombay’s ice cream scientist. That is research plus taste plus storytelling, not just eating.',
      source: DEEL_RELEASE,
    },
    {
      id: 'market',
      n: '02',
      title: 'Know the market cold',
      text: 'Every figure here is sourced and clickable: market size, the players, per-country palates, and the trends with numbers behind them.',
    },
    {
      id: 'flavors',
      n: '03',
      title: 'Bring the flavors',
      text: 'A first lineup is on the right. Each idea is tied to a documented trend, a regional palate, or a gap the giants have not filled.',
    },
    {
      id: 'show',
      n: '04',
      title: 'Show the work',
      text: 'Built, cited, and shipped in days. The same way a flavor report from Tokyo or Dubai would land on the team’s desk.',
    },
  ],
  signoff: '',
}

/**
 * Flavor ideas. Filled from the trends research — each carries the trend it
 * rides and the source for that trend.
 * @type {Array<{ id: string, name: string, tag: string, pitch: string, why: string, source: import('./schema.js').Source }>}
 */
export const FLAVOR_IDEAS = [
  {
    id: 'butter-cake',
    name: 'Gooey Butter Cake',
    tag: 'Nostalgia',
    pitch: 'Brown-butter cake ice cream, dense cake crumbles, a butterscotch ribbon. The flavor of the last slice at a birthday party.',
    why: 'Classic desserts are trending in frozen form and Jeni’s made St. Louis gooey butter cake a permanent flavor. No mass brand owns it yet.',
    source: { label: 'Jeni’s Splendid Ice Creams', url: 'https://jenis.com/products/gooey-butter-cake' },
  },
  {
    id: 'watermelon-sorbet',
    name: 'Watermelon Sorbet',
    tag: 'Lighter',
    pitch: 'Pure watermelon, a squeeze of lime, a pinch of salt. Optional Tajín dust for the sweet-heat crowd.',
    why: 'Sorbets are rising as plant-based slumps, and watermelon carries a year-round hydration halo in frozen formats.',
    source: { label: 'Tastewise', url: 'https://tastewise.io/blog/watermelon-trend', date: '2025' },
  },
  {
    id: 'dubai',
    name: 'Dubai Chocolate Pint',
    tag: 'Viral',
    pitch: 'Pistachio cream ice cream, toasted kataifi shards, a milk-chocolate shell broken through the pint. Crisp, creamy, chewy.',
    why: 'Ice cream’s fastest-growing ingredient, up 1,713% year over year. The giants launched bars; the pint lane is still open.',
    source: TASTEWISE_ICE_CREAM,
  },
  {
    id: 'mangonada',
    name: 'Mangonada Swirl',
    tag: 'Sweet heat',
    pitch: 'Mango sorbet ribboned with chamoy and a Tajín crackle. Long Beach corner-store energy in a pint.',
    why: 'Hot honey is a 2026 “New Classic” and chili sits at the inception stage for ice cream: on menus, not yet mainstream.',
    source: {
      label: 'Datassential, New Classics 2026',
      url: 'https://datassential.com/resource/new-classics-2026-food-beverage-trends/',
      date: '2026',
    },
  },
  {
    id: 'hojicha',
    name: 'Hojicha Latte',
    tag: 'Next matcha',
    pitch: 'Roasted green tea steeped into sweet cream. Toasty, caramel-adjacent, no bitterness.',
    why: 'Matcha supply is stretched; hojicha searches are up 54.6% and it is a 12–18-month watch with supply to spare.',
    source: {
      label: 'FoodNavigator',
      url: 'https://www.foodnavigator.com/Article/2026/05/29/is-hojicha-the-new-matcha-roasted-tea-trend-gains-traction-in-food-and-drink-industry/',
      date: 'May 2026',
    },
  },
  {
    id: 'ube-cheesecake',
    name: 'Ube Cheesecake',
    tag: 'Rising',
    pitch: 'Purple yam ice cream with a cheesecake swirl and graham crunch, a nod to Filipino keso ice cream.',
    why: 'Ube is forecast to nearly double its US menu presence by 2029, and ice cream is the format that introduced it.',
    source: { label: 'Datassential, ube flavor trend', url: 'https://datassential.com/resource/flavor-trends-ube/', date: '2026' },
  },
  {
    id: 'horchata',
    name: 'Long Beach Horchata',
    tag: 'Terroir',
    pitch: 'Cinnamon rice-milk ice cream with a churro crumble. The neighborhood in a scoop.',
    why: 'Local ingredients and cultural heritage rank among the most-wanted ice cream attributes in the US and Canada.',
    source: {
      label: 'Innova Market Insights',
      url: 'https://www.innovamarketinsights.com/trends/ice-cream-trends-in-the-us-and-canada/',
      date: '2025',
    },
  },
  {
    id: 'gin-juice',
    name: 'Gin & Juice Sorbet',
    tag: '21+',
    pitch: 'Grapefruit and orange sorbet with a real gin kick. A limited drop for the catalog, sold where the law allows.',
    why: 'Alcohol-infused ice cream is one of the category’s growth lanes, with dedicated brands expanding city by city.',
    source: {
      label: 'Dairy Reporter',
      url: 'https://www.dairyreporter.com/Article/2025/03/20/the-growing-appeal-of-alcohol-infused-ice-cream/',
      date: 'Mar 2025',
    },
  },
]

/** The brand and the job, in numbers. */
export const BRAND_FACTS = {
  title: 'The brand and the job',
  /** @type {import('./schema.js').Stat[]} */
  stats: [
    {
      id: 'job-pay',
      label: 'International Ice Cream Taste Tester',
      value: '$10K / mo',
      num: 10000,
      note: 'Three-month remote contract, open worldwide. Applications Aug 27 to Sep 17, 2026, hired through Deel.',
      source: NBC_JOB,
    },
    {
      id: 'launch',
      label: 'Dr. Bombay launch, July 2023',
      value: '3,500 Walmarts',
      num: 3500,
      note: 'Seven flavors at $4.98 a pint, via Bosslady Foods, a joint venture with Happi Co.',
      source: {
        label: 'Fortune',
        url: 'https://www.fortune.com/2023/07/25/snoop-dogg-ice-cream-dr-bombay-walmart',
        date: 'Jul 2023',
      },
    },
    {
      id: 'lil-baby',
      label: 'New co-founder and investor, 2026',
      value: 'Lil Baby',
      note: 'Joined in April 2026, connecting with Cordell Broadus through a Harvard Business School program.',
      source: {
        label: 'Forbes',
        url: 'https://www.forbes.com/sites/desjahaltvater/2026/04/20/dr-bombay-ice-cream-and-hip-hops-cultural-code-in-snacking/',
        date: 'Apr 2026',
      },
    },
    {
      id: 'venice',
      label: 'First scoop shop',
      value: 'Venice Beach',
      note: 'Opened on the boardwalk in April 2026, with the brand now in most major grocers nationwide.',
      source: {
        label: 'KTLA',
        url: 'https://ktla.com/news/local-news/snoop-doggs-dr-bombay-ice-cream-opens-first-venice-beach-shop/',
        date: 'Apr 2026',
      },
    },
  ],
}
