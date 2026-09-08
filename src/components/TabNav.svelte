<script>
  /**
   * Segmented tab nav. Arrow keys move between tabs; the parent handles swipe.
   * @typedef {{ id: string, label: string, short?: string }} Tab
   * @type {{ tabs: Tab[], active: string, onSelect: (id: string) => void }}
   */
  let { tabs = [], active, onSelect } = $props();

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    const idx = tabs.findIndex((t) => t.id === active);
    if (idx < 0) return;
    if (e.key === "ArrowRight") onSelect(tabs[(idx + 1) % tabs.length].id);
    if (e.key === "ArrowLeft")
      onSelect(tabs[(idx - 1 + tabs.length) % tabs.length].id);
  }

  // The strip scrolls horizontally on small screens; keep the active tab in view.
  let bar = $state(null);
  $effect(() => {
    active;
    bar
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  });
</script>

<div class="tabs" role="tablist" aria-label="Sections" onkeydown={onKey} bind:this={bar}>
  {#each tabs as t (t.id)}
    <button
      type="button"
      role="tab"
      class="tab"
      class:active={t.id === active}
      aria-selected={t.id === active}
      tabindex={t.id === active ? 0 : -1}
      onclick={() => onSelect(t.id)}
    >
      <span class="hidden lg:inline">{t.label}</span>
      <span class="lg:hidden">{t.short ?? t.label}</span>
    </button>
  {/each}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    gap: 2px;
    padding: 3px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 999px;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 640px) {
    .tab {
      padding: 0.45rem 0.9rem;
    }
  }

  .tab {
    flex: 1 0 auto;
    min-width: 0;
    padding: 0.45rem 0.5rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--ink-muted);
    font: inherit;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 0.25s ease,
      color 0.25s ease;

    &:hover {
      color: var(--ink);
    }

    &.active {
      background: rgba(var(--accent-rgb), 0.16);
      color: var(--accent-bright);
    }

    &:focus-visible {
      outline: 1px solid var(--accent);
      outline-offset: -1px;
    }
  }

  // Six tabs don't fit narrow strips: keep natural width and scroll.
  // (Placed after .tab so it wins the cascade at equal specificity.)
  @media (max-width: 1023px) {
    .tab {
      flex: 0 0 auto;
    }
  }
</style>
