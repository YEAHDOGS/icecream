<script>
  import Stat from "./Stat.svelte";
  import Cite from "./Cite.svelte";
  import LineChart from "./LineChart.svelte";
  import PieChart from "./PieChart.svelte";
  import Countdown from "./Countdown.svelte";
  import HeroImage from "./HeroImage.svelte";
  import BuyButtons from "./BuyButtons.svelte";
  import Disclosure from "./Disclosure.svelte";
  import { TAB_IMAGES } from "../data/imagery.js";
  import {
    LAST_UPDATED,
    DEADLINE_ISO,
    CAMPAIGN_STATS,
    APPLICANT_GROWTH,
    COMPETITION_STATS,
    WHAT_THEY_WANT,
    CAMPAIGN_TIMELINE,
    APPLY,
    OFFICIAL_LINKS,
  } from "../data/campaign.js";
  import { TRENDING, GAPS, PALATES } from "../data/trends.js";

  const growthSource = APPLICANT_GROWTH[1].source;

  let region = $state(PALATES[0].code);
  const current = $derived(PALATES.find((c) => c.code === region));
</script>

<section
  class="h-full min-h-0 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 scroll-y md:overflow-hidden md:grid-rows-[auto_minmax(0,1fr)]"
>
  <!-- Taste the homework: one-click retail -->
  <div
    class="card p-3 xl:p-4 flex flex-col sm:flex-row gap-3 sm:items-center md:min-h-0 sm:col-span-2 md:col-span-3"
  >
    <div class="sm:w-60 lg:w-72 shrink-0 min-w-0">
      <HeroImage image={TAB_IMAGES.flavors} />
    </div>
    <div class="flex flex-col gap-2 min-w-0">
      <p class="eyebrow m-0">Taste the homework</p>
      <p class="m-0 text-base xl:text-lg font-bold tracking-tight">
        Research is better with a spoon in it.
      </p>
      <p class="m-0 text-[0.74rem] leading-snug text-ink-2">
        The full Dr. Bombay lineup — the pints behind every trend call on this
        tab.
      </p>
      <BuyButtons />
    </div>
  </div>

  <!-- Main column: the role, the momentum, the flavors -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-3 md:min-h-0 sm:col-span-2 md:col-span-2 md:overflow-hidden"
  >
    <div>
      <p class="eyebrow m-0">The campaign, at a glance</p>
      <p class="m-0 text-sm xl:text-base font-semibold">
        Snoop Dogg × Deel × Dr. Bombay — International Ice Cream Taste Tester
      </p>
      <p class="m-0 mt-1 text-[0.68rem] text-muted">
        Counts as of {LAST_UPDATED}. Applicant and impression figures are
        campaign-reported estimates, not audited numbers.
      </p>
    </div>
    <HeroImage image={TAB_IMAGES.campaign} />
    <div
      class="flex flex-col gap-3 md:min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain pr-0.5"
    >
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {#each CAMPAIGN_STATS as s (s.id)}
          <Stat stat={s} />
        {/each}
        <Countdown deadlineIso={DEADLINE_ISO} />
      </div>

      <div class="card-inner">
        <LineChart
          title="Applicant momentum"
          points={APPLICANT_GROWTH}
          note="Sparse line — only reported points are drawn. The dashed tail is Deel's own projection, not reported data."
          source={growthSource}
        />
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-1">Know your competition</p>
        <p class="m-0 mb-2 text-[0.7rem] text-muted">
          Measured counts, labeled estimates, and one honest unknown — as of
          {LAST_UPDATED}.
        </p>
        <div class="grid gap-2 grid-cols-1 sm:grid-cols-2">
          {#each COMPETITION_STATS as s (s.id)}
            <Stat stat={s} />
          {/each}
        </div>
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-2">Applicant videos by platform</p>
        <PieChart />
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-1">What they actually filter for</p>
        <ul class="m-0 p-0 list-none flex flex-col gap-1.5">
          {#each WHAT_THEY_WANT as w (w.id)}
            <li class="text-[0.72rem] leading-snug text-ink-2">
              {w.text}
              <Cite source={w.source} compact />
            </li>
          {/each}
        </ul>
      </div>

      <p class="m-0 text-[0.68rem] leading-snug text-muted">
        Deel hasn't published platform, demographic, or country splits. If they
        do, they'll land here.
      </p>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-1">Trending now</p>
        <p class="m-0 mb-2 text-[0.7rem] text-muted">
          Flavors with momentum, and the evidence
        </p>
        <div class="grid gap-2 grid-cols-1 sm:grid-cols-2">
          {#each TRENDING as t (t.id)}
            <article class="trend">
              <div class="flex items-baseline justify-between gap-2">
                <h3 class="m-0 text-sm font-semibold truncate">{t.name}</h3>
                <span class="eyebrow shrink-0">{t.origin}</span>
              </div>
              <p class="m-0 text-[0.72rem] leading-snug text-ink-2">{t.evidence}</p>
              <div class="mt-auto pt-1"><Cite source={t.source} compact /></div>
            </article>
          {/each}
        </div>
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-2">Regional palates</p>
        <div class="flex flex-wrap gap-1 mb-2">
          {#each PALATES as c (c.code)}
            <button
              type="button"
              class="chip"
              class:active={c.code === region}
              onclick={() => (region = c.code)}>{c.name}</button
            >
          {/each}
        </div>
        {#if current}
          <ul class="m-0 p-0 list-none flex flex-col gap-1">
            {#each current.flavors as f}
              <li class="flavor">{f}</li>
            {/each}
          </ul>
          {#if current.note}
            <p class="m-0 mt-1.5 text-[0.7rem] leading-snug text-ink-2">{current.note}</p>
          {/if}
          <div class="mt-1.5"><Cite source={current.source} compact /></div>
        {/if}
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-2">Open lanes</p>
        <div class="flex flex-col gap-1.5">
          {#each GAPS as g, i (g.id)}
            <Disclosure title={g.name} open={i === 0}>
              <p class="m-0 text-[0.72rem] leading-snug text-ink-2">{g.text}</p>
              <div class="mt-1"><Cite source={g.source} compact /></div>
            </Disclosure>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Right rail: apply, official links, timeline -->
  <div class="flex flex-col gap-2 md:gap-3 md:min-h-0 md:overflow-hidden">
    <div class="card p-3 xl:p-4 flex flex-col gap-2">
      <p class="eyebrow m-0">How to apply</p>
      <ul class="m-0 p-0 list-none flex flex-col gap-1.5">
        {#each APPLY.requirements as r}
          <li class="text-[0.72rem] leading-snug text-ink-2">{r}</li>
        {/each}
      </ul>
      <a class="apply-btn" href={APPLY.url} target="_blank" rel="noopener noreferrer">
        {APPLY.cta}
        <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
          <path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </a>
      <div><Cite source={APPLY.source} compact /></div>
    </div>

    <div class="card p-3 xl:p-4 flex flex-col gap-2">
      <p class="eyebrow m-0">Official links</p>
      <ul class="m-0 p-0 list-none flex flex-col gap-2">
        {#each OFFICIAL_LINKS as l (l.id)}
          <li class="min-w-0">
            <a class="offlink" href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label}
              <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                <path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
            </a>
            <p class="m-0 mt-0.5 text-[0.68rem] leading-snug text-muted">{l.note}</p>
          </li>
        {/each}
      </ul>
    </div>

    <div class="card p-3 xl:p-4 flex flex-col gap-2 md:min-h-0 md:flex-1 md:overflow-hidden">
      <p class="eyebrow m-0">Press &amp; milestones</p>
      <ol class="m-0 p-0 list-none flex flex-col gap-1.5 md:min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain">
        {#each CAMPAIGN_TIMELINE as t (t.date)}
          <li class="grid grid-cols-[5.5rem_1fr] gap-2 text-[0.72rem] leading-snug">
            <span class="font-semibold text-accent-bright tabular-nums">{t.date}</span>
            <span class="text-ink-2">
              <span class="font-semibold text-ink">{t.title}.</span>
              {t.text}
              <Cite source={t.source} compact />
            </span>
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<style lang="scss">
  .card-inner {
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(247, 239, 228, 0.02);
  }

  .apply-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    margin-top: 0.25rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.16);
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    color: var(--accent-bright);
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(var(--accent-rgb), 0.28);
      color: var(--ink);
    }
  }

  .offlink {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--accent-bright);
    font-size: 0.76rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .trend {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(247, 239, 228, 0.02);
    min-width: 0;
  }

  .chip {
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--ink-2);
    font: inherit;
    font-size: 0.66rem;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      color: var(--ink);
    }

    &.active {
      background: rgba(var(--accent-rgb), 0.16);
      border-color: rgba(var(--accent-rgb), 0.4);
      color: var(--accent-bright);
    }
  }

  .flavor {
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    background: rgba(247, 239, 228, 0.03);
    font-size: 0.74rem;
    color: var(--ink);
  }
</style>
