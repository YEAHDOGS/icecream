/**
 * One-click retail links for Dr. Bombay pints. URLs are verbatim — do not
 * modify them. The $3.96/pint figure is sourced to the Walmart brand page
 * and registered in allCitations() like any other figure.
 *
 * @typedef {Object} BuyLink
 * @property {string} id
 * @property {string} retailer
 * @property {string} cta
 * @property {string} note
 * @property {string} url
 * @property {boolean} [primary]
 * @property {import('./schema.js').Source} [source]
 */

export const BUY_PRICE_SOURCE = {
  label: 'Walmart — Dr. Bombay brand page',
  url: 'https://www.walmart.com/browse/dr-bombay-s/YnJhbmQ6RHIuIEJvbWJheSdz',
}

/** @type {BuyLink[]} */
export const BUY_LINKS = [
  {
    id: 'walmart',
    retailer: 'Walmart',
    cta: 'Get the pint',
    note: '$3.96 · pickup or delivery',
    url: 'https://www.walmart.com/browse/dr-bombay-s/YnJhbmQ6RHIuIEJvbWJheSdz',
    primary: true,
    source: BUY_PRICE_SOURCE,
  },
  {
    id: 'kroger',
    retailer: 'Kroger',
    cta: 'Kroger',
    note: 'Ship to home',
    url: 'https://www.kroger.com/p/dr-bombay-tropical-sherbet-swizzle-ice-cream/0085003702230?fulfillment=SHIP',
  },
  {
    id: 'ubereats',
    retailer: 'Uber Eats',
    cta: 'Uber Eats',
    note: 'Local delivery',
    url: 'https://www.ubereats.com/product/b/2ccbd54e-a883-579e-9787-928547ad96a0',
  },
]
