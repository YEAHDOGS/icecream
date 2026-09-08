<script>
  /**
   * App-style expanding row for dense text lists. Keeps text walls collapsible
   * instead of stacking paragraphs.
   * @type {{ title: string, open?: boolean, children: import('svelte').Snippet }}
   */
  let { title, open = false, children } = $props();
  let isOpen = $state(open);
  const uid = $props.id();
</script>

<div class="disclosure">
  <button
    type="button"
    class="disclosure-btn"
    onclick={() => (isOpen = !isOpen)}
    aria-expanded={isOpen}
    aria-controls={uid}
  >
    <span class="flex-1 text-left text-[0.74rem] leading-snug">
      <span class="font-semibold text-ink">{title}.</span>
    </span>
    <svg
      class="chev"
      class:open={isOpen}
      viewBox="0 0 12 12"
      width="11"
      height="11"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  {#if isOpen}
    <div id={uid} class="disclosure-body">
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .disclosure {
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(247, 239, 228, 0.02);
    min-width: 0;
  }

  .disclosure-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.55rem 0.7rem;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }

  .chev {
    flex-shrink: 0;
    color: var(--accent-bright);
    transition: transform 0.2s ease;

    &.open {
      transform: rotate(180deg);
    }
  }

  .disclosure-body {
    padding: 0 0.7rem 0.65rem;
    animation: drop 0.18s ease;
  }

  @keyframes drop {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
