/**
 * Tab hero imagery. One strong photo per tab, vendored into
 * `src/assets/img/` (optimized WebP, <200KB each) with a credit caption.
 *
 * CONVENTION (for the founder's own photos): drop the optimized file into
 * `src/assets/img/` and update the `src` import below — one line, no
 * component changes. Keep landscape orientation, max 1600px wide.
 *
 * Images are not figures under the citation gate, but every one carries a
 * visible credit (`credit` + `creditUrl`).
 *
 * @typedef {Object} TabImage
 * @property {string} src       Bundled image URL (import it above)
 * @property {string} alt       Alt text
 * @property {string} credit    Visible credit label
 * @property {string} creditUrl Source page for the credit link
 * @property {string} ratio     CSS aspect-ratio for the crop (e.g. '16/9')
 */

import marketImg from '../assets/img/market.webp'
import playersImg from '../assets/img/players.webp'
import flavorsImg from '../assets/img/flavors.webp'
import campaignImg from '../assets/img/campaign.webp'
import pitchImg from '../assets/img/pitch.webp'

/** Build marker — grep the served JS bundle for this to confirm a deploy. */
export const BUILD_TAG = 'scoop-field-tapfix'

/** @type {Record<'market'|'players'|'flavors'|'campaign'|'pitch', TabImage>} */
export const TAB_IMAGES = {
  market: {
    src: marketImg,
    alt: 'Colorful gelato on display in a shop case',
    credit: 'Sugar Tree Gelato',
    creditUrl: 'https://sugartreegelato.com/blogs/news/a-year-round-breakdown-of-common-seasonal-gelato-ingredients-and-flavours',
    ratio: '16/10',
  },
  players: {
    src: playersImg,
    alt: 'The freezer aisle in a grocery store',
    credit: 'Supermarket News',
    creditUrl: 'https://www.supermarketnews.com/frozen/grocery-industry-cheers-changes-to-controversial-refrigeration-regs',
    ratio: '16/9',
  },
  flavors: {
    src: flavorsImg,
    alt: 'The Dr. Bombay pint lineup: seven flavors with leopard-print lids',
    credit: 'Rap Industry',
    creditUrl: 'https://rapindustry.com/snoop-dogg-announces-dr-bombay/',
    ratio: '16/9',
  },
  campaign: {
    src: campaignImg,
    alt: 'Dr. Bombay Iced Out Orange Cream pint with Snoop Dogg artwork',
    credit: 'Dr. Bombay Foods',
    creditUrl: 'https://drbombayfoods.com/product/iced-out-orange-cream/',
    ratio: '4/3',
  },
  pitch: {
    src: pitchImg,
    alt: 'Melting ice cream in the summer sun',
    credit: 'StockCake',
    creditUrl: 'https://stockcake.com/i/melting-ice-cream_1116303_894701',
    ratio: '16/10',
  },
}
