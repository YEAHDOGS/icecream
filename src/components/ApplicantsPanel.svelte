<script>
  import VideoCard from "./VideoCard.svelte";
  import { APPLICANTS, LAST_UPDATED } from "../data/applicants.js";

  const ISSUE_URL =
    "https://github.com/YEAHDOGS/icecream/issues/new?template=applicant-video.yml";

  const PLATFORMS = ["all", "youtube", "tiktok", "instagram", "x"];
  const ALL_TAGS = ["all", ...new Set(APPLICANTS.flatMap((a) => a.tags))];

  let platform = $state("all");
  let tag = $state("all");
  let query = $state("");

  /** Fairness is a feature: no applicant is ranked above another, so the
   *  default order is randomized on every visit. Filters only narrow. */
  function shuffledOrder() {
    const idx = APPLICANTS.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }
  let order = $state(shuffledOrder());

  const filtered = $derived(
    order
      .map((i) => APPLICANTS[i])
      .filter(
        (a) =>
          (platform === "all" || a.platform === platform) &&
          (tag === "all" || a.tags.includes(tag)) &&
          (!query.trim() ||
            `${a.creator} ${a.note} ${a.tags.join(" ")}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())),
      ),
  );
</script>

<section class="h-full min-h-0 scroll-y">
  <div class="mx-auto max-w-[1400px] flex flex-col gap-2 md:gap-3 pb-4">
    <!-- Header -->
    <div class="card p-3 xl:p-4 flex flex-col gap-2">
      <div>
        <p class="eyebrow m-0">The Field</p>
        <p class="m-0 text-sm xl:text-base font-semibold">
          Applicant videos, scouted from across social media
        </p>
        <p class="m-0 mt-1 text-[0.72rem] leading-snug text-ink-2">
          {APPLICANTS.length} videos · updated {LAST_UPDATED} · shown in
          <span class="font-semibold text-ink">random order</span> — every
          applicant gets the same stage. Nobody is ranked, scored, or boosted.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button type="button" class="shuffle" onclick={() => (order = shuffledOrder())}>
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
            <path d="M2 4h3l7 8h2m0 0-2-2m2 2-2 2M2 12h3l2.5-2.8M11.5 6.8 13 4h1m0 0-2-2m2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Shuffle the field
        </button>
        <a class="apply-btn" href={ISSUE_URL} target="_blank" rel="noopener noreferrer">
          Are you an applicant? Add your video ↗
        </a>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap gap-1" role="group" aria-label="Filter by platform">
          {#each PLATFORMS as p}
            <button
              type="button"
              class="chip"
              class:active={platform === p}
              onclick={() => (platform = p)}>{p === "all" ? "All platforms" : p}</button
            >
          {/each}
        </div>
        <div class="flex flex-wrap gap-1" role="group" aria-label="Filter by tag">
          {#each ALL_TAGS as t}
            <button
              type="button"
              class="chip"
              class:active={tag === t}
              onclick={() => (tag = t)}>{t === "all" ? "All styles" : t}</button
            >
          {/each}
        </div>
        <input
          class="search"
          type="search"
          placeholder="Search creators, notes, tags…"
          bind:value={query}
          aria-label="Search applicant videos"
        />
      </div>
    </div>

    <!-- Feed -->
    {#if filtered.length}
      <div class="grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {#each filtered as a (a.id)}
          <VideoCard entry={a} />
        {/each}
      </div>
    {:else}
      <div class="card p-6 text-center">
        <p class="m-0 text-sm text-ink-2">
          No videos match those filters.
          <button type="button" class="linklike" onclick={() => { platform = "all"; tag = "all"; query = ""; }}>
            Clear filters
          </button>
        </p>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .shuffle {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    background: rgba(var(--accent-rgb), 0.12);
    color: var(--accent-bright);
    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(var(--accent-rgb), 0.24);
    }
  }

  .apply-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--ink-2);
    font-size: 0.72rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: var(--ink);
      border-color: var(--accent);
    }
  }

  .chip {
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--ink-2);
    font: inherit;
    font-size: 0.66rem;
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: var(--ink);
    }

    &.active {
      background: rgba(var(--accent-rgb), 0.16);
      border-color: rgba(var(--accent-rgb), 0.4);
      color: var(--accent-bright);
    }
  }

  .search {
    width: 100%;
    padding: 0.5rem 0.8rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg-app);
    color: var(--ink);
    font: inherit;
    font-size: 0.75rem;

    &::placeholder {
      color: var(--ink-muted);
    }

    &:focus {
      outline: 1px solid var(--accent);
      border-color: var(--accent);
    }
  }

  .linklike {
    background: none;
    border: 0;
    padding: 0;
    color: var(--accent-bright);
    font: inherit;
    font-size: inherit;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
