<script>
  import Cite from "./Cite.svelte";

  /**
   * Stat tile: label, value, optional note, and its citation.
   * @type {{ stat: import('../data/schema.js').Stat, hero?: boolean }}
   */
  let { stat, hero = false } = $props();
</script>

<div class="stat card" class:hero>
  <p class="eyebrow">{stat.label}</p>
  <p class="value" class:hero>{stat.value}</p>
  {#if stat.note}
    <p class="note">{stat.note}</p>
  {/if}
  <div class="mt-auto pt-2">
    <Cite source={stat.source} />
  </div>
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
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ink);

    &.hero {
      font-size: clamp(2.4rem, 5vw, 4rem);
      color: var(--accent-bright);
    }
  }

  .note {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.4;
    color: var(--ink-2);
  }

  .hero {
    border-color: rgba(var(--accent-rgb), 0.35);
    background: linear-gradient(
      160deg,
      rgba(var(--accent-rgb), 0.1),
      var(--bg-card) 60%
    );
  }
</style>
