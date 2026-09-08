/**
 * HEAD-checks every citation URL on the site. Run before publishing:
 *   npm run check-links
 * Exits non-zero if any source is unreachable. Some publishers block bots with
 * 403 — those are listed separately so they can be opened by hand.
 */
import { allCitations } from '../src/data/index.js'

const TIMEOUT_MS = 15000
const UA = 'Mozilla/5.0 (compatible; icecream-link-check)'

const urls = [...new Set(allCitations().map((c) => c.source?.url).filter(Boolean))]

async function probe(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA } })
    if (res.status === 405 || res.status === 404) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA } })
    }
    return res.status
  } catch (err) {
    return err.name === 'AbortError' ? 'timeout' : 'error'
  } finally {
    clearTimeout(timer)
  }
}

const results = await Promise.all(urls.map(async (url) => ({ url, status: await probe(url) })))
const ok = results.filter((r) => r.status >= 200 && r.status < 400)
const blocked = results.filter((r) => r.status === 403 || r.status === 429)
const bad = results.filter((r) => !ok.includes(r) && !blocked.includes(r))

console.log(`${ok.length}/${urls.length} reachable`)
if (blocked.length) {
  console.log(`\n${blocked.length} returned 403/429 (bot-blocked; open by hand):`)
  blocked.forEach((r) => console.log(`  ${r.status}  ${r.url}`))
}
if (bad.length) {
  console.log(`\n${bad.length} FAILED:`)
  bad.forEach((r) => console.log(`  ${r.status}  ${r.url}`))
  process.exit(1)
}
