<script>
  import Cite from "./Cite.svelte";
  import Stat from "./Stat.svelte";
  import { PITCH, FLAVOR_IDEAS, BRAND_FACTS } from "../data/pitch.js";
</script>

<section
  class="h-full min-h-0 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 scroll-y md:overflow-hidden md:grid-rows-[auto_minmax(0,1fr)]"
>
  <!-- Opening -->
  <div
    class="card p-4 xl:p-6 flex flex-col gap-3 min-h-0 sm:col-span-2 md:col-span-3 xl:col-span-4 md:overflow-y-auto md:overflow-x-hidden"
  >
    <p class="eyebrow m-0">{PITCH.eyebrow}</p>
    <h2
      class="m-0 text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-semibold leading-tight tracking-tight"
    >
      {PITCH.headline}
    </h2>
    <p class="m-0 text-sm xl:text-base leading-relaxed text-ink-2">{PITCH.lede}</p>
    <ul class="m-0 p-0 list-none flex flex-col gap-2 mt-1">
      {#each PITCH.points as p (p.id)}
        <li class="grid grid-cols-[1.25rem_1fr] gap-2 text-[0.78rem] xl:text-sm leading-snug">
          <span class="text-accent-bright font-semibold">{p.n}</span>
          <span class="text-ink-2"
            ><span class="font-semibold text-ink">{p.title}.</span>
            {p.text}
            {#if p.source}<Cite source={p.source} compact />{/if}</span
          >
        </li>
      {/each}
    </ul>
  </div>

  <!-- Flavor lineup -->
  <div
    class="card p-3 xl:p-4 flex flex-col gap-2 min-h-0 sm:col-span-2 md:col-span-2 xl:col-span-5 xl:overflow-hidden"
  >
    <div>
      <p class="eyebrow m-0">Proposed first lineup</p>
      <p class="m-0 text-sm xl:text-base font-semibold">
        Each flavor is tied to a trend with numbers behind it
      </p>
    </div>
    <div
      class="grid gap-2 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 min-h-0 overflow-y-auto overflow-x-hidden max-md:overflow-visible overscroll-contain pr-0.5"
    >
      {#each FLAVOR_IDEAS as f (f.id)}
        <article class="idea">
          <div class="flex items-baseline justify-between gap-2">
            <h3 class="m-0 text-sm xl:text-base font-semibold">{f.name}</h3>
            <span class="eyebrow shrink-0">{f.tag}</span>
          </div>
          <p class="m-0 text-[0.72rem] leading-snug text-ink-2">{f.pitch}</p>
          <p class="m-0 text-[0.7rem] leading-snug text-muted">
            <span class="font-semibold text-ink-2">Why now:</span> {f.why}
          </p>
          <div class="mt-auto pt-1"><Cite source={f.source} compact /></div>
        </article>
      {/each}
    </div>
  </div>

  <!-- The brand we're joining -->
  <div
    class="flex flex-col gap-2 md:gap-3 min-h-0 sm:col-span-2 md:col-span-1 xl:col-span-3 md:overflow-y-auto md:overflow-x-hidden overscroll-contain"
  >
    <p class="eyebrow m-0 px-1">{BRAND_FACTS.title}</p>
    {#each BRAND_FACTS.stats as s (s.id)}
      <Stat stat={s} />
    {/each}
  </div>
</section>

<style lang="scss">
  .idea {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.8rem 0.9rem;
    border: 1px solid rgba(var(--accent-rgb), 0.18);
    border-radius: 12px;
    background: linear-gradient(
      170deg,
      rgba(var(--accent-rgb), 0.07),
      rgba(247, 239, 228, 0.015) 55%
    );
    min-width: 0;
  }
</style>
