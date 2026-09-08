<script>
  import BarChart from "./BarChart.svelte";
  import Cite from "./Cite.svelte";
  import Stat from "./Stat.svelte";
  import {
    GIANTS,
    CHALLENGERS,
    CELEBRITY_COMPS,
    ARC,
  } from "../data/competitors.js";

  const giantRows = GIANTS.map((g) => ({
    label: g.name,
    num: g.num,
    value: g.value,
  }));
</script>

<section
  class="h-full min-h-0 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 scroll-y md:overflow-hidden md:grid-rows-[minmax(0,1fr)_auto] xl:grid-rows-1"
>
  <!-- Giants -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-3 md:min-h-0 sm:col-span-2 md:col-span-3 xl:col-span-4 xl:overflow-hidden"
  >
    <div>
      <p class="eyebrow m-0">The giants</p>
      <p class="m-0 text-sm xl:text-base font-semibold">
        Ice cream revenue, latest reported year
      </p>
    </div>
    <BarChart rows={giantRows} />
    <ul class="m-0 p-0 list-none flex flex-col gap-2 min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain">
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

  <!-- Challengers: what a small brand actually does -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-2 md:min-h-0 sm:col-span-1 md:col-span-2 xl:col-span-5 xl:overflow-hidden"
  >
    <div>
      <p class="eyebrow m-0">The challengers</p>
      <p class="m-0 text-sm xl:text-base font-semibold">
        What a small, premium brand can realistically reach
      </p>
    </div>
    <div
      class="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain"
    >
      {#each CHALLENGERS as c (c.id)}
        <Stat stat={c} />
      {/each}
    </div>
  </div>

  <!-- Right rail: Ben & Jerry's arc + celebrity comps -->
  <div
    class="flex flex-col gap-2 md:gap-3 md:min-h-0 sm:col-span-1 md:col-span-1 xl:col-span-3 xl:overflow-hidden"
  >
    <div class="card p-3 xl:p-4 flex flex-col gap-2 md:min-h-0 md:flex-1 xl:overflow-hidden">
      <p class="eyebrow m-0">{ARC.title}</p>
      <ol class="m-0 p-0 list-none flex flex-col gap-1.5 min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain">
        {#each ARC.steps as s (s.year)}
          <li class="grid grid-cols-[3rem_1fr] gap-2 text-[0.72rem] leading-snug">
            <span class="font-semibold text-accent-bright tabular-nums">{s.year}</span>
            <span class="text-ink-2">{s.text} <Cite source={s.source} compact /></span>
          </li>
        {/each}
      </ol>
    </div>
    <div class="card p-3 xl:p-4 flex flex-col gap-2 md:min-h-0">
      <p class="eyebrow m-0">Star power, in dollars</p>
      <ul class="m-0 p-0 list-none flex flex-col gap-1.5">
        {#each CELEBRITY_COMPS as c (c.id)}
          <li class="flex items-baseline justify-between gap-2 text-[0.72rem]">
            <span class="text-ink-2 truncate">{c.label}</span>
            <span class="flex items-center gap-1.5 shrink-0">
              <span class="font-semibold tabular-nums">{c.value}</span>
              <Cite source={c.source} compact />
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
