<script>
  import Cite from "./Cite.svelte";
  import { TRENDING, GAPS, PALATES } from "../data/trends.js";

  let region = $state(PALATES[0].code);
  const current = $derived(PALATES.find((c) => c.code === region));
</script>

<section
  class="h-full min-h-0 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 scroll-y md:overflow-hidden"
>
  <!-- Trending now -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-2 min-h-0 sm:col-span-2 md:col-span-2 xl:col-span-7 xl:overflow-hidden"
  >
    <div>
      <p class="eyebrow m-0">Trending now</p>
      <p class="m-0 text-sm xl:text-base font-semibold">
        Flavors with momentum, and the evidence
      </p>
    </div>
    <div
      class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-h-0 overflow-y-auto overflow-x-hidden pr-0.5"
    >
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

  <!-- Regional palates -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-2 min-h-0 sm:col-span-1 md:col-span-1 xl:col-span-3 xl:overflow-hidden"
  >
    <p class="eyebrow m-0">Regional palates</p>
    <div class="flex flex-wrap gap-1">
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
      <ul class="m-0 p-0 list-none flex flex-col gap-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {#each current.flavors as f}
          <li class="flavor">{f}</li>
        {/each}
      </ul>
      {#if current.note}
        <p class="m-0 text-[0.7rem] leading-snug text-ink-2">{current.note}</p>
      {/if}
      <div class="mt-auto"><Cite source={current.source} compact /></div>
    {/if}
  </div>

  <!-- Gaps -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-2 min-h-0 sm:col-span-1 md:col-span-3 xl:col-span-2 xl:overflow-hidden"
  >
    <p class="eyebrow m-0">Open lanes</p>
    <ul class="m-0 p-0 list-none flex flex-col gap-2 min-h-0 overflow-y-auto overflow-x-hidden md:grid md:grid-cols-3 xl:flex">
      {#each GAPS as g (g.id)}
        <li class="text-[0.72rem] leading-snug">
          <span class="font-semibold text-ink">{g.name}.</span>
          <span class="text-ink-2"> {g.text}</span>
          <div class="mt-1"><Cite source={g.source} compact /></div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
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
