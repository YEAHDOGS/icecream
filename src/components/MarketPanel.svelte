<script>
  import WorldMap from "./WorldMap.svelte";
  import Stat from "./Stat.svelte";
  import BarChart from "./BarChart.svelte";
  import DonutChart from "./DonutChart.svelte";
  import Cite from "./Cite.svelte";
  import HeroImage from "./HeroImage.svelte";
  import { TAB_IMAGES } from "../data/imagery.js";
  import {
    GLOBAL_STATS,
    SEGMENTS,
    MARKET_SCALE,
    US_FLAVOR_SHARE,
  } from "../data/market.js";
  import { COUNTRIES, DEFAULT_COUNTRY } from "../data/countries.js";
  import { PALATES } from "../data/trends.js";
  import {
    GIANTS,
    CHALLENGERS,
    CELEBRITY_COMPS,
    ARC,
  } from "../data/competitors.js";

  const TOP_MARKETS_COUNT = 6;

  let selected = $state(DEFAULT_COUNTRY);
  const country = $derived(COUNTRIES.find((c) => c.code === selected));
  const palate = $derived(PALATES.find((p) => p.code === selected));
  const [hero, ...stats] = GLOBAL_STATS;

  const topMarkets = [...COUNTRIES]
    .sort((a, b) => b.num - a.num)
    .slice(0, TOP_MARKETS_COUNT)
    .map((c) => ({ label: c.name, num: c.num, value: c.value }));

  // Every figure here was already cited in the data files; this only
  // structures them for charts.
  const scaleRows = [GLOBAL_STATS[0], GLOBAL_STATS[2], ...MARKET_SCALE].map(
    (s) => ({ label: s.label, num: s.num, value: s.value }),
  );
  const scaleSources = [
    GLOBAL_STATS[0].source,
    GLOBAL_STATS[2].source,
    ...MARKET_SCALE.map((s) => s.source),
  ].filter(
    (s, i, arr) => s && arr.findIndex((x) => x.url === s.url) === i,
  );

  const flavorRows = US_FLAVOR_SHARE.map((s) => ({
    label: s.label,
    num: s.num,
    value: s.value,
  }));

  const dairy = SEGMENTS[0];
  const dairySlices = [
    { label: "Dairy", frac: dairy.num },
    { label: "Everything else", frac: 1 - dairy.num },
  ];

  const giantRows = GIANTS.map((g) => ({
    label: g.name,
    num: g.num,
    value: g.value,
  }));

  const indieStats = CHALLENGERS.filter((c) =>
    ["tillamook", "halo-top", "jenis", "dr-bombay-revenue"].includes(c.id),
  ).sort((a, b) => b.num - a.num);
  const indieRevenue = indieStats.map((c) => ({
    label: c.label,
    num: c.num,
    value: c.value,
  }));
  const indieSources = indieStats.map((c) => c.source);
  const indieFootprint = CHALLENGERS.filter((c) =>
    ["van-leeuwen", "salt-straw"].includes(c.id),
  );

  const compRows = [...CELEBRITY_COMPS]
    .sort((a, b) => b.num - a.num)
    .map((c) => ({ label: c.label, num: c.num, value: c.value }));
</script>

<section class="market">
  <!-- Rail: hero + charted market figures -->
  <aside class="rail">
    <div class="hero-slot"><Stat stat={hero} hero /></div>
    <div class="card p-3 xl:p-4">
      <BarChart
        title="Market scale, USD"
        rows={scaleRows}
        sources={scaleSources}
        note="Different cuts of the same appetite: the global total, US channels, and the fastest-moving segments."
      />
    </div>
    <div class="card p-3 xl:p-4 col-span-2 sm:col-span-2 lg:col-span-1">
      <DonutChart
        title="Dairy share of global revenue"
        slices={dairySlices}
        centerTop={dairy.value}
        centerBottom="dairy"
        note="Mordor Intelligence estimate. Plant-based fell in the US in 2023 and 2024."
      />
      <div class="mt-2"><Cite source={dairy.source} compact /></div>
    </div>
    <div class="card p-3 xl:p-4">
      <BarChart
        title="America's favorite flavors"
        rows={flavorRows}
        source={US_FLAVOR_SHARE[0].source}
        note="IDFA / Morning Consult survey, 2026."
      />
    </div>
    <div class="rail-hero"><HeroImage image={TAB_IMAGES.market} /></div>
    {#each stats as s (s.id)}
      <Stat stat={s} />
    {/each}
  </aside>

  <!-- Map -->
  <div class="map-card card p-1 sm:p-2 flex flex-col">
    <div class="flex items-baseline justify-between px-2 pt-1">
      <p class="eyebrow m-0">Ice cream market by country</p>
      <p class="m-0 text-[0.6rem] text-muted">tap a country</p>
    </div>
    <div class="flex-1 min-h-0">
      <WorldMap
        countries={COUNTRIES}
        {selected}
        onSelect={(code) => (selected = code)}
      />
    </div>
  </div>

  <!-- Detail: country + largest markets + the players -->
  <aside class="detail">
    {#if country}
      <div class="card p-3 xl:p-4 flex flex-col gap-2">
        <div class="flex items-baseline justify-between gap-2">
          <h2 class="m-0 text-base xl:text-lg font-semibold truncate">
            {country.name}
          </h2>
          <span class="eyebrow shrink-0">{country.region}</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="min-w-0">
            <p class="eyebrow m-0">Market size</p>
            <p class="m-0 text-xl xl:text-2xl font-semibold text-accent-bright">
              {country.value}
            </p>
            <Cite source={country.source} compact />
          </div>
          {#if country.perCapita}
            <div class="min-w-0">
              <p class="eyebrow m-0">Per person / yr</p>
              <p class="m-0 text-xl xl:text-2xl font-semibold">
                {country.perCapita.value}
              </p>
              <Cite source={country.perCapita.source} compact />
            </div>
          {/if}
        </div>
        {#if country.native}
          <p class="m-0 text-[0.66rem] text-muted">As published: {country.native}</p>
        {/if}
        {#if country.note}
          <p class="m-0 text-[0.72rem] leading-snug text-ink-2">
            {country.note}
          </p>
        {/if}
        {#if palate}
          <div class="mt-auto pt-1">
            <p class="eyebrow m-0 mb-1">Signature flavors</p>
            <div class="flex flex-wrap gap-1">
              {#each palate.flavors as f}
                <span class="chip">{f}</span>
              {/each}
            </div>
            <div class="mt-1.5"><Cite source={palate.source} compact /></div>
          </div>
        {/if}
      </div>
    {/if}
    <div class="card p-3 xl:p-4">
      <BarChart title="Largest national markets, USD" rows={topMarkets} />
      <p class="m-0 mt-2 text-[0.6rem] leading-snug text-muted">
        Latest estimate per country; sources differ by market. Tap a country for its citation.
      </p>
    </div>

    <div class="card p-3 xl:p-4 sm:col-span-2 lg:col-span-1 flex flex-col gap-2">
      <div>
        <p class="eyebrow m-0">The giants</p>
        <p class="m-0 text-sm xl:text-base font-semibold">
          Ice cream revenue, latest reported year
        </p>
      </div>
      <HeroImage image={TAB_IMAGES.players} />
      <BarChart rows={giantRows} />
      <ul class="m-0 p-0 list-none flex flex-col gap-2">
        {#each GIANTS as g (g.name)}
          <li class="text-[0.72rem] leading-snug">
            <span class="font-semibold text-ink">{g.name}</span>
            <span class="text-ink-2"> — {g.brands}</span>
            {#if g.note}<span class="text-muted"> {g.note}</span>{/if}
            <div class="mt-1"><Cite source={g.source} compact /></div>
          </li>
        {/each}
      </ul>
    </div>

    <div class="card p-3 xl:p-4 sm:col-span-2 lg:col-span-1">
      <BarChart
        title="Indie revenue, latest reported (USD)"
        rows={indieRevenue}
        sources={indieSources}
        note="The realistic ceiling for a new entrant. Dr. Bombay is early — already ahead of most indie brands' first two years."
      />
      <ul class="m-0 mt-2 p-0 list-none flex flex-col gap-1.5">
        {#each indieFootprint as c (c.id)}
          <li class="text-[0.72rem] leading-snug text-ink-2">
            <span class="font-semibold text-ink">{c.label}:</span>
            {c.value} — {c.note}
            <Cite source={c.source} compact />
          </li>
        {/each}
      </ul>
    </div>

    <div class="card p-3 xl:p-4 sm:col-span-2 lg:col-span-1">
      <BarChart
        title="What ice cream businesses sold for (USD)"
        rows={compRows}
        sources={CELEBRITY_COMPS.map((c) => c.source)}
      />
    </div>

    <div class="card p-3 xl:p-4 sm:col-span-2 lg:col-span-1">
      <p class="eyebrow m-0 mb-2">{ARC.title}</p>
      <ol class="m-0 p-0 list-none flex flex-col gap-1.5">
        {#each ARC.steps as s (s.year)}
          <li class="grid grid-cols-[3rem_1fr] gap-2 text-[0.72rem] leading-snug">
            <span class="font-semibold text-accent-bright tabular-nums">{s.year}</span>
            <span class="text-ink-2">{s.text} <Cite source={s.source} compact /></span>
          </li>
        {/each}
      </ol>
    </div>
  </aside>
</section>

<style lang="scss">
  // Layout per viewport. Phones and portrait tablets stack and scroll
  // vertically; landscape tablets and up are a fixed three-column dashboard.
  .market {
    display: grid;
    gap: 0.5rem;
    height: 100%;
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "map" "rail" "detail";
    overflow-y: auto;
    overflow-x: hidden;
  }

  .map-card {
    grid-area: map;
    height: 60vw;
    min-height: 220px;
  }

  .rail {
    grid-area: rail;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-width: 0;
  }

  .hero-slot {
    grid-column: 1 / -1;
    display: grid;
  }

  .rail-hero {
    grid-column: 1 / -1;
    min-width: 0;
  }

  .detail {
    grid-area: detail;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: minmax(0, 1fr);
    min-width: 0;
  }

  // Landscape phones and small tablets
  @media (min-width: 640px) {
    .map-card {
      height: 68vh;
      min-height: 240px;
    }

    .rail {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .hero-slot {
      grid-column: span 1;
    }

    .detail {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  // Portrait tablets
  @media (min-width: 768px) {
    .market {
      gap: 0.75rem;
    }

    .map-card {
      height: 44vh;
    }

    .rail,
    .detail {
      gap: 0.75rem;
    }
  }

  // Landscape tablets, laptops, desktops: one screen, no page scroll
  @media (min-width: 1024px) {
    .market {
      grid-template-columns: minmax(0, 3fr) minmax(0, 6fr) minmax(0, 3fr);
      grid-template-rows: minmax(0, 1fr);
      grid-template-areas: "rail map detail";
      overflow: hidden;
    }

    .map-card {
      height: auto;
      min-height: 0;
    }

    .rail {
      grid-template-columns: minmax(0, 1fr);
      grid-auto-rows: max-content;
      align-content: start;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }

    // The merged column is long: it scrolls as a whole at lg, so inner
    // cards must NOT carry their own scrollers here. Every row is implicit
    // max-content — an explicit minmax(0,1fr) first row would collapse to 0
    // once the tall implicit rows eat the free space.
    .detail {
      grid-template-columns: minmax(0, 1fr);
      grid-auto-rows: max-content;
      align-content: start;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .chip {
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.1);
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    font-size: 0.66rem;
    color: var(--ink);
    white-space: nowrap;
  }
</style>
