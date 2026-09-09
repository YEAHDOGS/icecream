<script>
  import { onMount } from "svelte";

  /** Live countdown tile. Computed client-side — not a cited figure. */
  let { deadlineIso } = $props();

  const target = new Date(deadlineIso).getTime();
  let now = $state(Date.now());

  onMount(() => {
    const id = setInterval(() => (now = Date.now()), 30000);
    return () => clearInterval(id);
  });

  const diff = $derived(target - now);
  const parts = $derived.by(() => {
    if (diff <= 0) return null;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return { d, h, m };
  });
</script>

<div class="stat card">
  <p class="eyebrow">Applications close in</p>
  {#if parts}
    <p class="value">
      {parts.d}<span class="unit">d</span>
      {parts.h}<span class="unit">h</span>
      {parts.m}<span class="unit">m</span>
    </p>
    <p class="note">Deadline: Sep 17, 2026</p>
  {:else}
    <p class="value">Closed</p>
    <p class="note">The window has ended — winner announced end of September.</p>
  {/if}
</div>

<style lang="scss">
  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.85rem 1rem;
    min-width: 0;
  }

  .value {
    margin: 0;
    font-size: clamp(1.35rem, 2.2vw, 1.9rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--accent-bright);
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 22px rgba(var(--accent-rgb), 0.35);
  }

  .unit {
    font-size: 0.7em;
    font-weight: 500;
    color: var(--ink-muted);
    margin-right: 0.35rem;
  }

  .note {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.4;
    color: var(--ink-2);
  }
</style>
