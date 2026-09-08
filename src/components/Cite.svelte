<script>
  /**
   * Citation link. Sits under every statistic; opens the source in a new tab.
   * @typedef {{ label: string, url: string, date?: string }} Source
   */
  /** @type {{ source: Source, compact?: boolean }} */
  let { source, compact = false } = $props();
</script>

<a
  class="cite"
  class:compact
  href={source.url}
  target="_blank"
  rel="noopener noreferrer"
  title="Open source: {source.label}"
>
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
    <path
      d="M4 2h6v6M10 2 3 9"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
    />
  </svg>
  <span class="truncate">{source.label}</span>
  {#if source.date && !compact}<span class="date">{source.date}</span>{/if}
</a>

<style lang="scss">
  .cite {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    max-width: 100%;
    padding: 0.2rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.66rem;
    font-weight: 500;
    line-height: 1.2;
    color: var(--ink-muted);
    text-decoration: none;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;

    svg {
      flex: none;
    }

    .date {
      flex: none;
      opacity: 0.6;
    }

    &:hover,
    &:focus-visible {
      color: var(--ink);
      border-color: var(--accent);
      background: rgba(var(--accent-rgb), 0.08);
      outline: none;
    }

    &.compact {
      padding: 0.1rem 0.4rem;
      font-size: 0.6rem;
    }
  }
</style>
