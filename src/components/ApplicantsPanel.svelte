<script>
  import VideoCard from "./VideoCard.svelte";
  import HeroImage from "./HeroImage.svelte";
  import { APPLICANTS, LAST_UPDATED } from "../data/applicants.js";
  import { TAB_IMAGES } from "../data/imagery.js";
  import { SCOUT_LOG } from "../data/scoutLog.js";

  const ISSUE_URL =
    "https://github.com/YEAHDOGS/icecream/issues/new?template=applicant-video.yml";

  const PLATFORMS = ["all", "youtube", "tiktok", "instagram", "x", "facebook", "threads"];
  const ALL_TAGS = ["all", ...new Set(APPLICANTS.flatMap((a) => a.tags))];

  const latestScout = SCOUT_LOG[SCOUT_LOG.length - 1];
  const totalScouted = SCOUT_LOG.reduce((n, e) => n + e.videosFound, 0);
  let showLogHistory = $state(false);

  /** '2026-09-08' -> 'Sep 8' */
  function shortDate(iso) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const [, m, d] = iso.split("-").map(Number);
    return `${months[m - 1]} ${d}`;
  }

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

  /* Pagination: 181 cards at once is a laggy wall. 24 per page keeps the
   * grid snappy; filters/shuffle always restart on page 1. */
  const PER_PAGE = 24;
  let page = $state(1);
  let scroller;
  const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / PER_PAGE)));
  const paged = $derived(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE));
  function goToPage(n) {
    page = Math.min(Math.max(1, n), totalPages);
    scroller?.scrollTo({ top: 0 });
  }
  $effect(() => {
    platform;
    tag;
    query;
    order;
    page = 1;
  });
</script>

<section class="h-full min-h-0 scroll-y" bind:this={scroller}>
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
      <HeroImage image={TAB_IMAGES.fieldStage} />
      <!-- Scouting log: daily discovery stats, always labeled estimates -->
      <div class="scout">
        <div class="flex items-baseline justify-between gap-2">
          <p class="eyebrow m-0">Scouting log</p>
          {#if SCOUT_LOG.length > 1}
            <button
              type="button"
              class="linklike"
              onclick={() => (showLogHistory = !showLogHistory)}
              aria-expanded={showLogHistory}
            >
              {showLogHistory ? "Hide history" : "History"}
            </button>
          {/if}
        </div>
        <p class="m-0 mt-0.5 text-[0.72rem] text-ink-2">
          <span class="font-bold text-accent-bright text-sm tabular-nums"
            >{latestScout.videosFound}</span
          >
          applicant videos verified {shortDate(latestScout.date)}
          <span class="text-muted">· community-visible sample, estimate</span>
          <span class="text-muted">· {totalScouted} scouted to date</span>
        </p>
        {#if showLogHistory}
          <ul class="m-0 mt-1 p-0 list-none flex flex-col gap-1">
            {#each [...SCOUT_LOG].reverse() as e (e.date)}
              <li class="grid grid-cols-[4.5rem_1fr] gap-2 text-[0.68rem] leading-snug">
                <span class="font-semibold text-accent-bright tabular-nums"
                  >{shortDate(e.date)}</span
                >
                <span class="text-ink-2">
                  {e.videosFound} verified · {e.note}
                </span>
              </li>
            {/each}
          </ul>
        {/if}
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
        {#each paged as a (a.id)}
          <VideoCard entry={a} />
        {/each}
      </div>
      {#if totalPages > 1}
        <nav class="pager" aria-label="Applicant video pages">
          <button
            type="button"
            class="chip pager-btn"
            disabled={page === 1}
            onclick={() => goToPage(page - 1)}>← Prev</button
          >
          <span class="pager-info">
            Page {page} of {totalPages} · {(page - 1) * PER_PAGE + 1}–{Math.min(
              page * PER_PAGE,
              filtered.length,
            )} of {filtered.length}
          </span>
          <button
            type="button"
            class="chip pager-btn"
            disabled={page === totalPages}
            onclick={() => goToPage(page + 1)}>Next →</button
          >
        </nav>
      {/if}
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
  .scout {
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(247, 239, 228, 0.02);
  }

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

  .pager {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem 0 0.25rem;
  }

  .pager-info {
    font-size: 0.7rem;
    color: var(--ink-muted);
    white-space: nowrap;
  }

  .pager-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }
</style>
