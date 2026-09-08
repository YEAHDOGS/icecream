<script>
  import Stat from "./Stat.svelte";
  import Cite from "./Cite.svelte";
  import BarChart from "./BarChart.svelte";
  import PieChart from "./PieChart.svelte";
  import Countdown from "./Countdown.svelte";
  import HeroImage from "./HeroImage.svelte";
  import BuyButtons from "./BuyButtons.svelte";
  import { TAB_IMAGES } from "../data/imagery.js";
  import {
    LAST_UPDATED,
    DEADLINE_ISO,
    CAMPAIGN_STATS,
    APPLICANT_GROWTH,
    WHAT_THEY_WANT,
    CAMPAIGN_TIMELINE,
    APPLY,
  } from "../data/campaign.js";

  // Projection bars render muted and dashed-off from reported data.
  const growthRows = APPLICANT_GROWTH.map((g) => ({
    label: g.label,
    value: g.value,
    num: g.num,
    color: g.projection ? "rgba(247, 239, 228, 0.28)" : undefined,
  }));
  const growthSource = APPLICANT_GROWTH[1].source;
</script>

<section
  class="h-full min-h-0 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 scroll-y md:overflow-hidden md:grid-rows-[minmax(0,1fr)]"
>
  <!-- Left: numbers, momentum, platform mix, the filter -->
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
        <BarChart title="Applicant momentum" rows={growthRows} source={growthSource} />
        <p class="m-0 mt-1.5 text-[0.66rem] leading-snug text-muted">
          *Projected — Deel's team is "betting on half a million" by close.
          Not reported data.
        </p>
      </div>

      <div class="card-inner">
        <p class="eyebrow m-0 mb-2">Featured videos by platform</p>
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
    </div>
  </div>

  <!-- Right rail: apply + timeline -->
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
      <p class="eyebrow m-0">Taste the homework</p>
      <BuyButtons only={["walmart"]} />
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
</style>
