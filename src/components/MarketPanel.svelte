<script>
  import WorldMap from "./WorldMap.svelte";
  import Stat from "./Stat.svelte";
  import BarChart from "./BarChart.svelte";
  import Cite from "./Cite.svelte";
  import HeroImage from "./HeroImage.svelte";
  import { TAB_IMAGES } from "../data/imagery.js";
  import { GLOBAL_STATS } from "../data/market.js";
  import { COUNTRIES, DEFAULT_COUNTRY } from "../data/countries.js";
  import { PALATES } from "../data/trends.js";

  const TOP_MARKETS_COUNT = 6;

  let selected = $state(DEFAULT_COUNTRY);
  const country = $derived(COUNTRIES.find((c) => c.code === selected));
  const palate = $derived(PALATES.find((p) => p.code === selected));
  const [hero, ...stats] = GLOBAL_STATS;
  const topMarkets = [...COUNTRIES]
    .sort((a, b) => b.num - a.num)
    .slice(0, TOP_MARKETS_COUNT)
    .map((c) => ({ label: c.name, num: c.num, value: c.value }));
</script>

<section class="market">
  <!-- Rail: hero + supporting stats -->
  <aside class="rail">
    <div class="hero-slot"><Stat stat={hero} hero /></div>
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

  <!-- Detail: selected country + largest markets -->
  <aside class="detail">
    {#if country}
      <div class="card p-3 xl:p-4 flex flex-col gap-2 lg:min-h-0 overflow-y-auto overflow-x-hidden max-lg:overflow-visible overscroll-contain">
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

    .detail {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      min-height: 0;
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
