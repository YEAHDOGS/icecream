/**
 * Per-country market data for the choropleth and the country card.
 *
 * `num` is the latest available market value in USD, used for shading and the
 * "largest markets" bars. Non-USD figures are converted at approximate 2024-25
 * rates and marked "≈"; the native figure is kept in `native` so the card can
 * show what the source actually said. Sources are mixed by necessity (no one
 * house covers every country) — each row cites its own.
 *
 * `perCapita` is optional. Aggregator-only figures (World Population Review)
 * say so in their label; primary statistical sources are preferred where found.
 *
 * @typedef {Object} Country
 * @property {string} code      lowercase ISO 3166-1 alpha-2, matches the SVG id
 * @property {string} name
 * @property {string} region
 * @property {number} num       market value, USD
 * @property {string} value     display value, USD
 * @property {string} [native]  the figure as published, with year
 * @property {import('./schema.js').Source} source
 * @property {{ value: string, source: import('./schema.js').Source }} [perCapita]
 * @property {string} [note]
 */

const IMARC = (path, date = '2026') => ({
  label: 'IMARC Group',
  url: `https://www.imarcgroup.com/${path}`,
  date,
})
const GVR = (path) => ({
  label: 'Grand View Research',
  url: `https://www.grandviewresearch.com/horizon/outlook/ice-cream-market/${path}`,
  date: '2025',
})
const WPR = {
  label: 'World Population Review (aggregator)',
  url: 'https://worldpopulationreview.com/country-rankings/ice-cream-consumption-by-country',
  date: '2026',
}

export const DEFAULT_COUNTRY = 'us'

/** @type {Country[]} */
export const COUNTRIES = [
  {
    code: 'us',
    name: 'United States',
    region: 'North America',
    num: 21.6e9,
    value: '$21.6B',
    native: '$21,641M, 2025',
    source: GVR('united-states'),
    perCapita: {
      value: '~4 gal',
      source: { label: 'IDFA', url: 'https://www.idfa.org/ice-cream-sales-trends', date: '2026' },
    },
    note: 'The most valuable single market outside China and the one where a US brand actually competes for freezer doors.',
  },
  {
    code: 'cn',
    name: 'China',
    region: 'Asia-Pacific',
    num: 24.1e9,
    value: '$24.1B',
    native: '$24,131M, 2025',
    source: GVR('china'),
    note: 'The largest national market by value. Domestic dairy giants Yili and Mengniu dominate; Wall’s is the only major foreign brand in the top three.',
  },
  {
    code: 'jp',
    name: 'Japan',
    region: 'Asia-Pacific',
    num: 4.2e9,
    value: '≈$4.2B',
    native: '¥663B shipments, FY2025',
    source: {
      label: 'SoraNews24 / Japan Ice Cream Association',
      url: 'https://soranews24.com/2026/06/19/suspected-japanese-ice-cream-cartel-under-investigation-for-price-fixing/',
      date: 'Jun 2026',
    },
    note: 'Sixth consecutive record year and up about 40% in a decade, driven by convenience-store novelties and seasonal limited flavors.',
  },
  {
    code: 'de',
    name: 'Germany',
    region: 'Europe',
    num: 6.05e9,
    value: '$6.1B',
    native: '$6,050M, 2024',
    source: GVR('germany'),
    perCapita: {
      value: '8.0 L',
      source: {
        label: 'BDSI (German confectionery association)',
        url: 'https://www.markeneis.de/presse/pressemeldungen-2025/artikel/speiseeis-2024-pro-kopf-verbrauch-in-deutschland-liegt-bei-80-liter-950',
        date: '2025',
      },
    },
    note: 'Europe’s biggest market. Multipacks and family tubs make up over 90% of at-home volume.',
  },
  {
    code: 'gb',
    name: 'United Kingdom',
    region: 'Europe',
    num: 1.9e9,
    value: '$1.9B',
    native: '$1.9B, 2025',
    source: IMARC('uk-ice-cream-market'),
  },
  {
    code: 'it',
    name: 'Italy',
    region: 'Europe',
    num: 2.0e9,
    value: '≈$2.0B',
    native: '€1.84B industrial production, 2024',
    source: {
      label: 'Il Sole 24 Ore / Unione Italiana Food',
      url: 'https://en.ilsole24ore.com/art/ice-cream-production-18-billion-and-consumption-2-kg-head-per-year-AHVd6KNB',
      date: '2025',
    },
    perCapita: {
      value: '2 kg packaged',
      source: {
        label: 'Il Sole 24 Ore / Unione Italiana Food',
        url: 'https://en.ilsole24ore.com/art/ice-cream-production-18-billion-and-consumption-2-kg-head-per-year-AHVd6KNB',
        date: '2025',
      },
    },
    note: 'Packaged product only. Artisan gelaterie roughly triple the figure: the whole chain is worth about €4.9B.',
  },
  {
    code: 'fr',
    name: 'France',
    region: 'Europe',
    num: 1.6e9,
    value: '≈$1.6B',
    native: '€1.48B, 365M litres, 2024',
    source: {
      label: 'Association des Entreprises des Glaces',
      url: 'https://les-glaces.com/wp-content/uploads/2025/04/CP-glaces-25.pdf',
      date: 'Apr 2025',
    },
    perCapita: {
      value: '6.5 L',
      source: {
        label: 'Association des Entreprises des Glaces',
        url: 'https://les-glaces.com/consommation/',
      },
    },
  },
  {
    code: 'es',
    name: 'Spain',
    region: 'Europe',
    num: 1.2e9,
    value: '≈$1.2B',
    native: '€1.14B industrial production, 2024',
    source: {
      label: 'Mercasa, Alimentación en España',
      url: 'https://www.mercasa.es/alimentacion-en-espana-2024-helados/',
      date: '2025',
    },
    perCapita: {
      value: '~3 L at home',
      source: {
        label: 'eComercio Agrario',
        url: 'https://ecomercioagrario.com/cada-espanol-consumio-una-media-de-3-litros-de-helado-por-persona/',
      },
    },
  },
  {
    code: 'pl',
    name: 'Poland',
    region: 'Europe',
    num: 1.35e9,
    value: '≈$1.4B',
    native: 'PLN 5.4B, 2024 (+15.9%)',
    source: {
      label: 'Wiadomości Spożywcze',
      url: 'https://wiadomoscispozywcze.pl/artykuly/15064/raport-lodowy-2025-rynek-lodow-w-polsce-przekroczy-54-mld-z-wartosci/',
      date: '2025',
    },
    perCapita: {
      value: '5.7 L',
      source: {
        label: 'Wiadomości Handlowe',
        url: 'https://www.wiadomoscihandlowe.pl/konsument-i-trendy-zakupowe/rynek-lodowy-w-polsce-z-dynamicznym-wzrostem-to-jedna-z-najszybciej-rosnacych-kategorii-2525393',
      },
    },
    note: 'One of Europe’s fastest-growing markets; Magnum has publicly targeted the number-one spot here.',
  },
  {
    code: 'se',
    name: 'Sweden',
    region: 'Europe',
    num: 0.198e9,
    value: '$198M',
    native: '$198M, 2024',
    source: {
      label: 'IndexBox',
      url: 'https://www.indexbox.io/store/sweden-ice-cream-market-report-analysis-and-forecast-to-2020/',
      date: '2025',
    },
    perCapita: {
      value: '9.5 L',
      source: {
        label: 'Statista',
        url: 'https://www.statista.com/statistics/562480/per-capita-consumption-of-ice-cream-in-sweden/',
        date: '2022',
      },
    },
    note: 'Small market, huge appetite: Nordics eat more per head than almost anyone despite the climate.',
  },
  {
    code: 'no',
    name: 'Norway',
    region: 'Europe',
    num: 0.293e9,
    value: '$293M',
    native: '$293M, 2024',
    source: {
      label: 'IndexBox',
      url: 'https://www.indexbox.io/store/norway-ice-cream-market-report-analysis-and-forecast-to-2020/',
      date: '2025',
    },
    perCapita: {
      value: '10.8 L',
      source: { label: 'Dfly (Norway)', url: 'https://dfly.no/verdens-storste-iskrem-er-norsk/' },
    },
  },
  {
    code: 'ru',
    name: 'Russia',
    region: 'Europe',
    num: 2.6e9,
    value: '≈$2.6B',
    native: 'RUB 220B, 2025 (+5%)',
    source: {
      label: 'TAdviser',
      url: 'https://tadviser.com/index.php/Article:Ice_cream_(Russian_market)',
      date: '2026',
    },
    perCapita: {
      value: '3 kg',
      source: {
        label: 'DairyNews',
        url: 'https://dairynews.today/news/na-rossiyskom-rynke-morozhenogo-fruktovyy-led-edinstvennyy-drayver-rosta.html',
      },
    },
  },
  {
    code: 'in',
    name: 'India',
    region: 'Asia-Pacific',
    num: 3.7e9,
    value: '≈$3.7B',
    native: 'INR 312.8B, 2025',
    source: IMARC('ice-cream-market-india'),
    note: 'IMARC projects about 16.7% annual growth to 2033, the fastest of any large market here. Kulfi and Amul set the taste.',
  },
  {
    code: 'id',
    name: 'Indonesia',
    region: 'Asia-Pacific',
    num: 1.07e9,
    value: '$1.1B',
    native: '$1.07B, 2025',
    source: IMARC('indonesia-ice-cream-market'),
  },
  {
    code: 'kr',
    name: 'South Korea',
    region: 'Asia-Pacific',
    num: 1.6e9,
    value: '≈$1.6B',
    native: 'KRW 2,185B retail, 2026',
    source: {
      label: 'Euromonitor via Research and Markets',
      url: 'https://www.researchandmarkets.com/reports/4391648/ice-cream-in-south-korea',
      date: '2026',
    },
  },
  {
    code: 'ph',
    name: 'Philippines',
    region: 'Asia-Pacific',
    num: 0.3515e9,
    value: '$352M',
    native: '$351.5M, 2025',
    source: IMARC('philippines-ice-cream-market'),
  },
  {
    code: 'th',
    name: 'Thailand',
    region: 'Asia-Pacific',
    num: 0.493e9,
    value: '$493M',
    native: '$493.5M, 2024',
    source: IMARC('thailand-ice-cream-market'),
  },
  {
    code: 'vn',
    name: 'Vietnam',
    region: 'Asia-Pacific',
    num: 0.4017e9,
    value: '$402M',
    native: '$401.7M, 2025',
    source: IMARC('vietnam-ice-cream-market'),
  },
  {
    code: 'au',
    name: 'Australia',
    region: 'Asia-Pacific',
    num: 1.09e9,
    value: '$1.1B',
    native: '$1.09B, 2025',
    source: {
      label: 'Expert Market Research',
      url: 'https://www.expertmarketresearch.com.au/reports/australia-ice-cream-market',
    },
    perCapita: { value: '~18 L', source: WPR },
  },
  {
    code: 'nz',
    name: 'New Zealand',
    region: 'Asia-Pacific',
    num: 0.32e9,
    value: '≈$320M',
    native: 'NZ$531M retail forecast, 2026',
    source: {
      label: 'NZ Ministry for Primary Industries',
      url: 'https://www.mpi.govt.nz/dmsdocument/42357-New-Zealand-ice-cream-exports-and-trade/',
    },
    perCapita: { value: '~28 L', source: WPR },
    note: 'Routinely named the world’s top per-capita consumer, though the ranking traces to aggregators rather than an official statistic.',
  },
  {
    code: 'ca',
    name: 'Canada',
    region: 'North America',
    num: 1.63e9,
    value: '$1.6B',
    native: '$1,627M, 2025',
    source: IMARC('canada-ice-cream-market'),
    perCapita: {
      value: '4.75 L',
      source: {
        label: 'Statistics Canada via Statista',
        url: 'https://www.statista.com/statistics/444898/volume-of-ice-cream-available-for-consumption-per-person-in-canada/',
        date: '2023',
      },
    },
  },
  {
    code: 'mx',
    name: 'Mexico',
    region: 'Latin America',
    num: 1.1e9,
    value: '$1.1B',
    native: '$1.1B, 2025',
    source: IMARC('mexico-ice-cream-market'),
    note: 'Paletas, nieves and chamoy: the home of sweet-heat, one of the fastest-moving flavor trends in the US.',
  },
  {
    code: 'br',
    name: 'Brazil',
    region: 'Latin America',
    num: 2.6e9,
    value: '≈$2.6B',
    native: 'R$14B, 2024',
    source: {
      label: 'ABIS (Brazilian ice cream association)',
      url: 'https://abis.com.br/tendencias-do-mercado-de-sorvetes-em-2024/',
      date: '2024',
    },
    note: 'Over 11,000 companies and about 100,000 direct jobs: a fragmented, regional market.',
  },
  {
    code: 'sa',
    name: 'Saudi Arabia',
    region: 'Middle East & Africa',
    num: 0.8106e9,
    value: '$811M',
    native: '$810.6M, 2025',
    source: IMARC('saudi-arabia-ice-cream-market'),
  },
  {
    code: 'ae',
    name: 'United Arab Emirates',
    region: 'Middle East & Africa',
    num: 0.379e9,
    value: '$379M',
    native: '$379.1M, 2024',
    source: IMARC('uae-ice-cream-market'),
    note: 'Small market, outsized influence: Dubai chocolate went from one local shop to the world’s most copied flavor.',
  },
  {
    code: 'za',
    name: 'South Africa',
    region: 'Middle East & Africa',
    num: 0.352e9,
    value: '$352M',
    native: '$352.4M, 2024',
    source: IMARC('south-africa-ice-cream-market'),
  },
]
