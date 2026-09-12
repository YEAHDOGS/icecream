# AGENTS.md — working contract for this repo

Read this before changing anything. Claude Code, Jack, or any human editor:
these rules keep the deploy green and the mobile layout from regressing.

## 1. Citation gate (deploy-blocking)

- `npm test -- --run` MUST pass before every push. `.github/workflows/deploy.yml`
  runs the tests before the build; a failure blocks the GitHub Pages deploy.
- Every figure shown on the site carries a `Source { label, url, date? }`.
  `isValidSource()` in `src/data/schema.js` requires a non-empty `label` and an
  `https://` URL — `http://`, bare domains, and placeholder links fail the build.
- Every new stat, timeline step, or cited claim MUST be registered in
  `allCitations()` in `src/data/index.js`, or the citation test will not see it
  (and the footer source count will be wrong).
- Estimates are allowed but must be labeled as estimates with a visible
  `lastUpdated` stamp (e.g. "counts as of Sep 8, 2026"). Never present a guess
  as a measured figure. The site's brand is "every figure links to its document."
- Run `npm run check-links` locally before publishing; some publishers block
  bots and need a manual click-through.

## 2. Mobile scroll contract

The app is an `h-dvh` fixed shell (`App.svelte`) with `overflow: hidden` on
`body` (`src/app.scss`). Each tab panel is `h-full` inside it.

- **On phones (<768px) there is exactly ONE scroller: the section itself**
  (`.scroll-y`). Inner panes must NOT scroll on mobile.
- Any inner pane that scrolls on desktop MUST carry
  `max-md:overflow-visible` (MarketPanel locks its dashboard at `lg`, so its
  detail card uses `max-lg:overflow-visible`). Never reintroduce an
  unconditional `overflow-y-auto` pane.
- Inner panes that keep desktop scrolling get `overscroll-contain` so
  pane-scroll never chains to the page.
- Keep every `min-h-0` in the flex/grid ancestor chains intact. Removing one
  silently breaks bounded scrolling on desktop.
- Never use bare `flex-1` on a card inside an auto-height column container: on
  mobile the item collapses toward zero height and its (now visible) content
  overlaps neighboring cards. Scope it: `md:flex-1`.
- Same for `min-h-0` on elements that are BOTH a flex item and a flex
  container (cards, rails, inner wrappers): in an auto-height grid row on
  mobile the row under-sizes and content overlaps siblings. Scope to
  `md:min-h-0` so phones get `min-height: auto` (content-sized). Plain lists
  (`ul`/`ol`) and grids as flex items are unaffected — only nested flex.
- TabNav: with 6 tabs the strip must scroll below `lg`
  (`@media (max-width: 1023px) { .tab { flex: 0 0 auto; } }`, placed AFTER the
  base `.tab` rule or the cascade eats it), short labels below `lg`, and
  `flex: 1 0 auto` (never shrink) at `lg`+ so full labels can't overlap.
  `$effect` scrolls the active tab into view.
- Verifying layout: `/opt/meta-chromium/chrome` exists (no download needed).
  Serve `dist/` under the `/icecream/` base path and drive it with Python
  Playwright via `executable_path`. **Sandbox caveat (Sep 12, 2026):**
  localhost top-level navigations are blocked by
  `ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS` (the egress proxy makes
  Chromium treat loopback as untrusted); `--no-proxy-server` and the
  LocalNetworkAccess/BlockInsecurePrivateNetworkRequests feature flags did
  not clear it. Do not burn time on local Playwright — verify against the
  live deploy (`https://icecream.wearedogs.net`, check the JS bundle for
  the current `BUILD_TAG`) or find a non-loopback route. Overlap check: compare `.card` bounding
  boxes, skipping ancestor/descendant pairs.
- Desktop dashboard locks at `md` (Players/Flavors/Pitch/Campaign/Field) and at
  `lg` (Market). Sections that lock at `md` need explicit
  `md:grid-rows-[...]` constraints (see PlayersPanel
  `md:grid-rows-[minmax(0,1fr)_auto]`) or content clips unreachable at
  768–1024px. Verify with screenshots at 390×844, 768×1024, 1440×900.
- Audit lesson (Sep 8, 2026): the first collapse fix covered Campaign/Players
  but missed Flavors/Pitch, and the live bug only showed in the missed tabs.
  Always audit EVERY panel for the item-and-container pattern, and verify with
  real headless screenshots at all three viewports — DOM bounding-box checks
  passed while the live site was broken.

## 3. Data conventions

- `src/data/*.js` holds all content as JS modules with JSDoc `@typedef`s.
- `Source`: `{ label, url, date? }`. `Stat`: `{ id, label, value, num?, note?, source }`.
- New tabs: add to `TABS` in `App.svelte` with a `short` label for the mobile
  nav (it truncates past ~6 tabs — keep shorts ≤ 8 chars).
- Applicant feed (`src/data/applicants.js`): fairness is a feature. Default order
  is RANDOMIZED with a shuffle button; never rank, score, or sort applicants by
  quality. Filters (platform, tag, search) only.

## 4. Deploy

- Push to `master` → GitHub Actions (`ci.yml` tests, `deploy.yml` builds) →
  GitHub Pages. Base path is `/icecream/` in `vite.config.js`; change to `/`
  only when moving to a custom domain.
- New GitHub issue templates live in `.github/ISSUE_TEMPLATE/`.

## 5. Imagery / assets

- Tab hero images live in `src/assets/img/` and are wired through
  `src/data/imagery.js` (`TAB_IMAGES[tab].src`), rendered by
  `src/components/HeroImage.svelte` with a visible credit caption.
- To swap in a new photo (e.g. the founder's own): drop the optimized file into
  `src/assets/img/` and update the `src` import in `imagery.js` — one line,
  no component changes. Keep landscape orientation.
- Optimize before committing: max 1600px wide, WebP quality ~75, target
  <200KB each. Never hotlink; vendor every image into the repo.
- Images are not figures under the citation gate, but every one carries a
  visible credit (`credit` + `creditUrl`).
- `BUILD_TAG` in `imagery.js` is stamped on the app root as `data-build` —
  grep the served JS bundle for it to confirm a deploy went live.

## 6. Applicant feed + scouting log

- Applicant entries (`src/data/applicants.js`): real URLs only, each verified
  to load before it lands in the file. Never invent URLs, handles, or titles.
  Dedupe by URL. Tags come from the fixed enum in the file's `@typedef`.
  Fairness is a feature: randomized default order, never ranked or scored.
- Scouting log (`src/data/scoutLog.js`): APPEND-ONLY. The daily job adds one
  entry per day at the END: `{ date: 'YYYY-MM-DD', videosFound: <int>,
  note: '... estimate' }`. `videosFound` = new videos VERIFIED that day.
  Every count is labeled an estimate in the UI — the community-visible
  sample, not Deel's internal total. `data.test.js` enforces the schema
  (valid ISO dates, unique, ascending).
