/**
 * "The Field" tab: scouted applicant videos for the Snoop Dogg x Deel x
 * Dr. Bombay International Ice Cream Taste Tester search.
 *
 * Fairness rule: entries are NEVER ranked. The panel randomizes display order
 * on every visit. Each entry's `url` is its own citation.
 *
 * To add a video: open an issue from the "Applicant video" template
 * (.github/ISSUE_TEMPLATE/applicant-video.yml) — it lands here after review.
 *
 * @typedef {Object} Applicant
 * @property {string} id        Unique key
 * @property {'youtube'|'tiktok'|'instagram'|'x'} platform
 * @property {string} url       Direct https link to the video/post
 * @property {string} creator   Display name / handle
 * @property {string} note      One-line description of the pitch angle
 * @property {string} dateAdded When it was scouted, e.g. "Sep 8, 2026"
 * @property {string[]} tags    From: funny, heartfelt, business-pitch, musical, wildcard, taste-test, cinematic
 */

export const LAST_UPDATED = 'Sep 8, 2026'

/** @type {Applicant[]} */
export const APPLICANTS = [
  {
    id: 'snoopi-botton',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=XsnqKmxTlzM',
    creator: 'Snoopi Botten',
    note: 'Pitches an ice-cream-fueled diversity campaign as her case for the tester job.',
    dateAdded: 'Sep 8, 2026',
    tags: ['business-pitch', 'wildcard'],
  },
  {
    id: 'fam-spotlight',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=nVgMd800EH8',
    creator: 'FAM Spotlight / Frederick Mack',
    note: 'Culture-meets-science pitch: passport-ready creator making his case for the $10K/month role.',
    dateAdded: 'Sep 8, 2026',
    tags: ['business-pitch'],
  },
  {
    id: 'terrance-burney',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DdCnytByi1h/',
    creator: 'Terrance Denail Burney (@weseegreatnessinyou)',
    note: 'Global-traveler pitch filmed by a Dr. Bombay truck, pledging to donate the salary to his nonprofit.',
    dateAdded: 'Sep 8, 2026',
    tags: ['heartfelt', 'business-pitch', 'cinematic'],
  },
  {
    id: 'asha-springs',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Dc_rMXpp2wN/',
    creator: 'Asha (@ashasprings)',
    note: 'Playful audition with her dachshund and multiple Dr. Bombay pints, including a Strawberry Cream Dream taste test.',
    dateAdded: 'Sep 7, 2026',
    tags: ['funny', 'taste-test', 'wildcard'],
  },
  {
    id: 'cheryl-johnson',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DcytA2GNxUZ/',
    creator: 'Cheryl Johnson (@cheryljohnsonartist)',
    note: 'Cheerful sisters-and-ice-cream pitch that ends with Deel\u2019s "Application received" confirmation screen.',
    dateAdded: 'Sep 2, 2026',
    tags: ['heartfelt', 'taste-test'],
  },
  {
    id: 'anele-kamane',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DclRpAWtYyo/',
    creator: 'Anele Kamane (@anele_charmainerh)',
    note: 'Earnest South African pitch: she\u2019d help build her mother\u2019s house and fund her acting career with the paycheck.',
    dateAdded: 'Aug 28, 2026',
    tags: ['heartfelt'],
  },
  {
    id: 'kemisha-nicole',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Dc66QqTSLTJ/',
    creator: 'Kemisha Nicole (@iambossysoflossy)',
    note: 'Car-based Dr. Bombay Fruit Cart taste test framed as proof she can promote products.',
    dateAdded: 'Sep 5, 2026',
    tags: ['taste-test', 'business-pitch'],
  },
  {
    id: 'haelie-heard',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Dc2QK_1Ilq1/',
    creator: 'Haelie Heard (@decide2day2live)',
    note: 'Pediatric ICU nurse pitches muscadine-and-salted-cream and jokes she\u2019s ready for "ice cream rounds."',
    dateAdded: 'Sep 4, 2026',
    tags: ['funny', 'business-pitch', 'wildcard'],
  },
  {
    id: 'nike-finesse',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DczScBUNHIY/',
    creator: 'Omgitsnikefinesse (@nike_finesse)',
    note: 'Comedy pitch treating a gaming room, candy stash, and stocked mini-fridge as professional qualifications.',
    dateAdded: 'Sep 2, 2026',
    tags: ['funny', 'wildcard'],
  },
  {
    id: 'bang-diablo',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Dc8-zRSNqQ2/',
    creator: 'Muhammad / Bang L_Diablo (@_ldiabloo)',
    note: 'Indonesian visual artist presents illustrated Southeast Asian flavor concepts and talks flavor-as-art.',
    dateAdded: 'Sep 6, 2026',
    tags: ['business-pitch', 'cinematic', 'wildcard'],
  },
  {
    id: 'gayathri',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DdAyXA3Af6h/',
    creator: 'Gayathri (@thenameisgay)',
    note: 'Dentist humor plus a chocolate-sundae analysis and a high-protein, lower-calorie flavor proposal.',
    dateAdded: 'Sep 8, 2026',
    tags: ['funny', 'business-pitch'],
  },
  {
    id: 'starla-heinz',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/DdClOLdyY6X/',
    creator: 'Starla Heinz (@everyonesfaveauntie)',
    note: 'High-energy grocery-aisle pitch with Bay Area/LA flavor concepts and Snoop wordplay.',
    dateAdded: 'Sep 8, 2026',
    tags: ['funny', 'business-pitch'],
  },
]
