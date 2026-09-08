/**
 * Flavor trends, opportunity gaps, and regional palates. Each entry cites the
 * document its claim came from; palates cite one source per region.
 */

const TASTEWISE_ICE_CREAM = {
  label: 'Tastewise ice cream trends',
  url: 'https://tastewise.io/foodtrends/ice-cream',
  date: '2026',
}
const DATASSENTIAL_NEW_CLASSICS = {
  label: 'Datassential, New Classics 2026',
  url: 'https://datassential.com/resource/new-classics-2026-food-beverage-trends/',
  date: '2026',
}
const HOJICHA = {
  label: 'FoodNavigator',
  url: 'https://www.foodnavigator.com/Article/2026/05/29/is-hojicha-the-new-matcha-roasted-tea-trend-gains-traction-in-food-and-drink-industry/',
  date: 'May 2026',
}
const UBE = {
  label: 'Datassential, ube flavor trend',
  url: 'https://datassential.com/resource/flavor-trends-ube/',
  date: '2026',
}
const SPINS_SORBET = {
  label: 'FoodNavigator / SPINS',
  url: 'https://www.foodnavigator.com/Article/2024/10/25/spins-data-shows-sorbets-on-the-rise-in-frozen-desserts/',
  date: 'Oct 2024',
}
const DAIRY_FOODS_2026 = {
  label: 'Dairy Foods',
  url: 'https://www.dairyfoods.com/articles/98737-ingredient-companies-advancing-2026-flavor-strategies-ingredient-pairings-and-scoopable-desserts',
  date: '2026',
}

/**
 * @typedef {{ id: string, name: string, origin: string, evidence: string, source: import('./schema.js').Source }} Trend
 * @type {Trend[]}
 */
export const TRENDING = [
  {
    id: 'dubai-chocolate',
    name: 'Dubai chocolate',
    origin: 'UAE',
    evidence: 'Ice cream’s fastest-growing ingredient, up 1,713% year over year. Pistachio cream, crisp kataifi, chocolate. Häagen-Dazs, Magnum, Baskin-Robbins, Jeni’s and Van Leeuwen all launched versions in 2025–26.',
    source: TASTEWISE_ICE_CREAM,
  },
  {
    id: 'pistachio',
    name: 'Pistachio',
    origin: 'Global',
    evidence: 'Graduated from trend to core premium platform. The 2024 US crop fell 26% and Iran-to-UAE exports jumped 40% as Dubai chocolate demand hit, pushing prices to their highest since 2018.',
    source: {
      label: 'FoodNavigator',
      url: 'https://www.foodnavigator.com/Article/2025/04/22/the-international-dubai-chocolate-pistachio-shortage/',
      date: 'Apr 2025',
    },
  },
  {
    id: 'hojicha',
    name: 'Hojicha, the next matcha',
    origin: 'Japan',
    evidence: 'Matcha supply is tight and prices are up. Roasted green tea is the successor: “hojicha” searches rose 54.6% since early 2025 and it is already on chain menus as ice cream.',
    source: HOJICHA,
  },
  {
    id: 'ube',
    name: 'Ube',
    origin: 'Philippines',
    evidence: 'On 1.3% of US menus and forecast to reach 2.4% by 2029, after 231% menu growth in four years. Ice cream is the format that introduced it to most Americans.',
    source: UBE,
  },
  {
    id: 'swicy',
    name: 'Sweet heat',
    origin: 'Mexico / US',
    evidence: 'Hot honey is a 2026 “New Classic.” Chili, horchata and golden milk sit at the inception stage of the ice cream adoption cycle: on menus, not yet mainstream, so there is runway.',
    source: DATASSENTIAL_NEW_CLASSICS,
  },
  {
    id: 'black-sesame',
    name: 'Black sesame',
    origin: 'Japan / East Asia',
    evidence: 'Tipped as the “it” flavor of 2026 as Japanese soft-serve flavors go global: nutty, roasted, slate-grey, and a natural partner to matcha and miso.',
    source: {
      label: 'Time Out',
      url: 'https://www.timeout.com/usa/news/is-black-sesame-going-to-be-the-it-flavor-of-2026-112025',
      date: 'Nov 2025',
    },
  },
  {
    id: 'protein',
    name: 'High protein',
    origin: 'USA',
    evidence: 'The fastest-growing frozen dessert segment: GLP-1-friendly pints with 30–40 g of protein. The global protein ice cream market was about $2.8B in 2025, with North America 44% of it.',
    source: {
      label: 'Fortune Business Insights',
      url: 'https://www.fortunebusinessinsights.com/protein-ice-cream-market-116630',
      date: '2025',
    },
  },
  {
    id: 'sorbet',
    name: 'Sorbet up, plant-based down',
    origin: 'USA',
    evidence: 'Plant-based ice cream fell 2.5% to $252M and plant-based novelties fell 9.5% in the year to September 2024, while sorbets surged. Shoppers want lighter, not fake.',
    source: SPINS_SORBET,
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    origin: 'Global',
    evidence: 'Tracked as a year-round “functional hydration” flavor, including frozen formats. Watermelon sorbet is the cleanest expression of the lighter-frozen shift, and few big brands own it.',
    source: {
      label: 'Tastewise',
      url: 'https://tastewise.io/blog/watermelon-trend',
      date: '2025',
    },
  },
  {
    id: 'little-treat',
    name: 'Little treat culture',
    origin: 'USA',
    evidence: 'Nearly half of Americans seek out small indulgences regularly, 62% call them self-care, and they spend about $30 a month doing it. A single-serve pint is the perfect little treat.',
    source: {
      label: 'Circana',
      url: 'https://www.circana.com/post/little-treats-statistics-trends',
      date: 'Aug 2025',
    },
  },
  {
    id: 'texture',
    name: 'Texture over flavor',
    origin: 'Global',
    evidence: 'Mintel’s 2026 read: “texture is everything.” Layers, ripples and crunchy coatings drive trial, and Dubai chocolate is the template: crisp, creamy, chewy in one bite.',
    source: {
      label: 'Dairy Reporter / Mintel',
      url: 'https://www.dairyreporter.com/Article/2026/04/17/ice-cream-trends-2026-why-texture-is-taking-over-the-freezer-aisle/',
      date: 'Apr 2026',
    },
  },
  {
    id: 'nostalgia',
    name: 'Nostalgic desserts',
    origin: 'USA',
    evidence: 'Tres leches, cannoli and other classic desserts are trending in frozen form. Jeni’s made St. Louis gooey butter cake a permanent flavor: cream-cheese ice cream, cake crumbles, butterscotch.',
    source: {
      label: 'Jeni’s Splendid Ice Creams',
      url: 'https://jenis.com/products/gooey-butter-cake',
    },
  },
]

/** White space analysts point to. */
export const GAPS = [
  {
    id: 'umami',
    name: 'Savory and umami',
    text: 'Miso caramel, black garlic, cheese and balsamic are moving from social feeds to scoop shops. Savory-sweet is an IFT 2026 outlook flavor.',
    source: {
      label: 'IFT Food Technology, Outlook 2026',
      url: 'https://www.ift.org/news-and-publications/food-technology-magazine/issues/2025/october/features/outlook-2026-flavor-trends',
      date: 'Oct 2025',
    },
  },
  {
    id: 'tea',
    name: 'Tea as the hero',
    text: 'Hojicha is a credible 12–18-month watch with unstressed supply, unlike matcha. Earl Grey and chai are adjacent.',
    source: HOJICHA,
  },
  {
    id: 'functional',
    name: 'Protein meets fiber',
    text: 'Kroger’s 2026 forecast pairs protein with fiber and calls out protein-rich desserts. Indulgence that pulls its weight.',
    source: {
      label: 'Kroger, 2026 food trend predictions',
      url: 'https://ir.kroger.com/news/news-details/2026/Kroger-Reveals-Food-Trend-Predictions-of-2026/default.aspx',
      date: '2026',
    },
  },
  {
    id: 'heritage',
    name: 'Regional heritage desserts',
    text: 'Tres leches, cannoli and nostalgic profiles are trending. Southern and Californian classics are barely represented in the freezer.',
    source: DAIRY_FOODS_2026,
  },
  {
    id: 'fruit',
    name: 'Fruit-forward and lighter',
    text: 'Sorbets are rising as plant-based slumps. Exotic fruit and sweet-heat profiles carry the growth.',
    source: SPINS_SORBET,
  },
  {
    id: 'lto',
    name: 'Seasonal and global drops',
    text: '77% of heavy frozen-treat shoppers look for seasonal, sensorial or global limited editions. A rotating scout’s-pick flavor is a marketing engine.',
    source: {
      label: 'Mintel, US Ice Cream & Frozen Novelties',
      url: 'https://store.mintel.com/report/us-ice-cream-and-frozen-novelties-market-report',
      date: '2026',
    },
  },
]

/**
 * Signature flavors by region. `code` links a palate to a country on the map
 * where one exists; palates without a mapped market still appear in the
 * Flavors panel.
 * @typedef {{ code: string, name: string, flavors: string[], note?: string, source: import('./schema.js').Source }} Palate
 * @type {Palate[]}
 */
export const PALATES = [
  {
    code: 'us',
    name: 'United States',
    flavors: ['Chocolate', 'Butter pecan', 'Vanilla', 'Cookies & cream', 'Salted caramel', 'Cookie dough'],
    note: 'Chocolate took the top spot from vanilla in 2026, and butter pecan passed vanilla for the first time.',
    source: {
      label: 'IDFA / Morning Consult survey',
      url: 'https://www.idfa.org/news/chocolate-returns-to-no-1-and-butter-pecan-surpasses-vanilla-ahead-of-national-ice-cream-day',
      date: 'Apr 2026',
    },
  },
  {
    code: 'jp',
    name: 'Japan',
    flavors: ['Matcha', 'Black sesame', 'Azuki red bean', 'Hokkaido milk', 'Sweet potato', 'Yuzu & sakura (seasonal)'],
    note: 'Vanilla still wins surveys, but matcha and azuki sit right behind, and limited seasonal flavors drive the convenience-store aisle.',
    source: {
      label: 'Kokoro Cares',
      url: 'https://kokorocares.com/blogs/blog/the-unique-flavors-of-japan-through-ice-cream',
    },
  },
  {
    code: 'it',
    name: 'Italy',
    flavors: ['Pistacchio', 'Nocciola', 'Cioccolato', 'Stracciatella', 'Fior di latte', 'Limone'],
    note: 'Gelato is denser, lower in fat and served warmer than ice cream, so flavors read louder.',
    source: { label: 'Venchi', url: 'https://us.venchi.com/blog/the-best-italian-gelato-flavors' },
  },
  {
    code: 'in',
    name: 'India',
    flavors: ['Kesar pista (saffron pistachio)', 'Malai', 'Mango', 'Pista', 'Rose', 'Paan'],
    note: 'Kulfi is slow-cooked, dense and unchurned. Cardamom and saffron do the work vanilla does elsewhere.',
    source: { label: 'Eating Choice', url: 'https://eatingchoice.com/which-flavour-kulfi-is-best/' },
  },
  {
    code: 'mx',
    name: 'Mexico',
    flavors: ['Mango chamoy', 'Tamarindo con chile', 'Fresas con crema', 'Mazapán', 'Horchata', 'Elote'],
    note: 'Paletas and nieves are fruit-first and unafraid of salt, lime and chili.',
    source: {
      label: 'Amigofoods',
      url: 'https://blog.amigofoods.com/index.php/mexican-foods/paletas-mexican-popsicles/',
    },
  },
  {
    code: 'ae',
    name: 'Middle East',
    flavors: ['Pistachio knafeh (Dubai chocolate)', 'Booza with mastic & sahlab', 'Rose water', 'Orange blossom', 'Pistachio'],
    note: 'Booza is stretchy, chewy ice cream pounded in a frozen drum, sold in Damascus since 1895.',
    source: {
      label: 'Arab America',
      url: 'https://www.arabamerica.com/booza-syrias-famous-stretchy-ice-cream/',
    },
  },
  {
    code: 'tr',
    name: 'Turkey',
    flavors: ['Sade (plain Maraş dondurma)', 'Antep pistachio', 'Cocoa', 'Honey almond', 'Mulberry'],
    note: 'Maraş dondurma uses salep and mastic for a chew you eat with a knife and fork.',
    source: { label: 'CNN Travel', url: 'https://www.cnn.com/travel/maras-dondurma-turkish-ice-cream' },
  },
  {
    code: 'kr',
    name: 'South Korea',
    flavors: ['Melona melon bar', 'Patbingsu (red bean shaved ice)', 'Injeolmi bingsu', 'Mango bingsu', 'Ube'],
    note: 'Bingsu is a bowl, not a cone: shaved milk ice under toppings, shared at the table.',
    source: {
      label: 'Korea Times',
      url: 'https://www.koreatimes.co.kr/lifestyle/travel-food/20250712/bingsu-all-you-need-to-know-about-koreas-sweet-summer-treat',
      date: 'Jul 2025',
    },
  },
  {
    code: 'ph',
    name: 'Philippines',
    flavors: ['Ube', 'Keso (cheddar cheese)', 'Mango', 'Buko pandan', 'Macapuno', 'Halo-halo'],
    note: 'Cheese ice cream is as ordinary here as chocolate or vanilla, often eaten inside a bread roll.',
    source: {
      label: 'Atlas Obscura',
      url: 'https://www.atlasobscura.com/foods/keso-cheese-ice-cream-philippines',
    },
  },
  {
    code: 'th',
    name: 'Thailand',
    flavors: ['Coconut', 'Thai tea', 'Pandan', 'Durian', 'Black sticky rice', 'Mango'],
    note: 'Coconut is the base, not the flavor. Served over sticky rice with peanuts and sweet corn.',
    source: { label: 'Miss Ice Cream', url: 'https://missicecream.com/article/95/thai-coconut-ice-cream' },
  },
  {
    code: 'cn',
    name: 'China',
    flavors: ['Red bean', 'Green bean', 'Milk', 'Cocoa', 'Green tea'],
    note: 'Bean-based popsicles are the nostalgic core; premium disruptor Zhong Xue Gao rose fast and went bankrupt in 2025.',
    source: {
      label: 'China Daily',
      url: 'https://global.chinadaily.com.cn/a/202304/29/WS644c90a4a310b6054fad07c7.html',
      date: 'Apr 2023',
    },
  },
  {
    code: 'de',
    name: 'Germany',
    flavors: ['Vanilla', 'Chocolate', 'Hazelnut', 'Stracciatella', 'Latte macchiato', 'Spaghettieis'],
    note: 'Industry ranking from the confectionery association. Spaghettieis is vanilla pressed through a noodle press with strawberry “sauce.”',
    source: { label: 'BDSI', url: 'https://www.bdsi.de/en/product-information/brand-ice-cream' },
  },
  {
    code: 'gb',
    name: 'United Kingdom',
    flavors: ['Vanilla', 'Mint choc chip', 'Chocolate', 'Salted caramel', 'Raspberry ripple', 'Cornish clotted cream'],
    note: 'Vanilla is the favorite of 18% and liked by 84%; mint choc chip is the strongest second.',
    source: {
      label: 'YouGov',
      url: 'https://yougov.com/en-gb/articles/55287-what-is-britains-favourite-ice-cream-flavour',
    },
  },
  {
    code: 'fr',
    name: 'France',
    flavors: ['Caramel au beurre salé', 'Wild strawberry', 'Vanilla', 'Pineapple basil', 'Chocolate'],
    note: 'Salted butter caramel is Breton; Berthillon in Paris runs about 60 flavors with 30 rotating by season.',
    source: { label: 'Paris by Mouth', url: 'https://parisbymouth.com/berthillon/' },
  },
  {
    code: 'se',
    name: 'Scandinavia',
    flavors: ['Licorice', 'Cloudberry', 'Pear (Piggelin)', 'Brown cheese', 'Salt licorice & Daim'],
    note: 'Some of the highest per-capita consumption on earth, and the most polarizing flavors.',
    source: {
      label: 'Chiara of the North',
      url: 'https://chiaraofthenorth.com/2025/07/31/guide-to-ice-creams-in-scandinavia/',
      date: 'Jul 2025',
    },
  },
  {
    code: 'nz',
    name: 'New Zealand',
    flavors: ['Hokey pokey', 'Cookies & cream', 'Vanilla', 'Boysenberry'],
    note: 'Hokey pokey (vanilla with honeycomb toffee) is the national flavor; cookies & cream is rising with younger buyers.',
    source: {
      label: 'Canstar Blue via Scoop',
      url: 'https://m.scoop.co.nz/stories/BU1611/S01165/hokey-pokey-still-top-choice-for-kiwis.htm',
    },
  },
  {
    code: 'au',
    name: 'Australia',
    flavors: ['Golden Gaytime', 'Mango Weis bar', 'Magnum', 'Vanilla'],
    note: 'Golden Gaytime: toffee and vanilla dipped in chocolate and biscuit crumbs, a Streets icon since 1959.',
    source: {
      label: 'Streets',
      url: 'https://www.streetsicecream.com.au/brands/golden-gaytime.html',
    },
  },
  {
    code: 'br',
    name: 'Brazil',
    flavors: ['Açaí', 'Cupuaçu', 'Brigadeiro', 'Doce de leite', 'Cashew fruit'],
    source: {
      label: 'Aventura do Brasil',
      url: 'https://www.aventuradobrasil.com/blog/brazilian-sorveterias--a-wide-selection-of-ice-cream-flavors-and-toppings/',
    },
  },
  {
    code: 'ar',
    name: 'Argentina',
    flavors: ['Dulce de leche', 'Dulce de leche granizado', 'Sambayón', 'Chocolate'],
    note: 'Dulce de leche is the most popular by far, in half a dozen variants per shop.',
    source: {
      label: 'Argentina.travel',
      url: 'https://www.argentina.travel/en/news/argentinian-dulce-de-leche-the-national-treat-you-must-try',
    },
  },
  {
    code: 'za',
    name: 'South Africa',
    flavors: ['Amarula cream', 'Amarula & honeycomb', 'Salted Amarula', 'Vanilla'],
    note: 'Marula cream liqueur is the local signature. Nigeria answers with agbalumo and hibiscus sorbets.',
    source: {
      label: 'Lion Roars',
      url: 'https://www.lionroars.com/blog/posts/amarula-ice-cream-with-honeycomb-recipe-dessert-idea',
    },
  },
]
