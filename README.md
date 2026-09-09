# The Scoop — Global Ice Cream Market

An interactive, fully-cited briefing on the global ice cream market: who buys, who sells, what's trending, and where a new brand wins. Built as the first deliverable for the Dr. Bombay × Deel International Ice Cream Taste Tester application.

Every statistic on the site carries a citation button that opens the source document in a new tab. `npm test` fails if any figure lacks an https source.

## Stack

Vite · Svelte 5 · Tailwind CSS v4 · SCSS · Vitest. No TypeScript, no map library — the world map is an inline SVG with ISO country IDs, shaded by a one-hue ramp.

## Run

```
npm i
npm run dev          # http://localhost:5173/icecream/
npm test -- --run    # unit + citation tests
npm run build        # dist/
npm run check-links  # HEAD-checks every cited URL (run locally before publishing)
```

## Structure

```
src/
  App.svelte              shell: header, tab nav, swipe + hash routing
  components/
    JobPanel.svelte       the campaign: role facts, timeline, apply links
    MarketPanel.svelte    map + global stats + country card
    ApplicantsPanel.svelte  The Field: applicant video feed (randomized, paginated)
    PitchPanel.svelte     the application, flavor lineup, brand + job facts
    WorldMap.svelte       choropleth (adapted from wearedogs)
    Stat / Cite / BarChart / LineChart / DonutChart / PieChart / TabNav
    VideoCard / HeroImage / Countdown / GlitchCone / Disclosure / BuyButtons
  data/                   all content; every entry cites a Source {label,url,date}
  styles/variables.scss   every color on the site
```

## Deploy

Pushes to `master` build and publish to GitHub Pages via `.github/workflows/deploy.yml`. Enable Pages → Source: GitHub Actions in the repo settings once. Base path is `/icecream/` in `vite.config.js`; change to `/` for a custom domain.

## Fill in before recording

- `PITCH.signoff` in `src/data/pitch.js` is blank — sign your own name.
- Run `npm run check-links` locally; a few publishers block bots and need a manual click.
