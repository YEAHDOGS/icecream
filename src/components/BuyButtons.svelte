<script>
  import { BUY_LINKS } from "../data/buy.js";

  /**
   * App-style retail CTAs. `only` limits to the given link ids
   * (e.g. `only={['walmart']}` for a compact single-button slot).
   * @type {{ only?: string[] }}
   */
  let { only } = $props();
  const links = $derived(only ? BUY_LINKS.filter((b) => only.includes(b.id)) : BUY_LINKS);
</script>

<div class="flex flex-wrap gap-2">
  {#each links as b (b.id)}
    <a
      class="buy-btn"
      class:primary={b.primary}
      href={b.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
    >
      <span class="font-semibold">{b.cta}</span>
      <span class="sub">{b.note}</span>
      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
        <path
          d="M4 2h6v6M10 2 3 9"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </svg>
    </a>
  {/each}
</div>

<style lang="scss">
  .buy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    background: rgba(var(--accent-rgb), 0.1);
    color: var(--ink);
    font-size: 0.76rem;
    text-decoration: none;
    transition:
      background 0.2s ease,
      transform 0.15s ease;

    &:hover {
      background: rgba(var(--accent-rgb), 0.22);
    }

    &:active {
      transform: scale(0.97);
    }

    .sub {
      color: var(--ink-2);
      font-size: 0.68rem;
      font-weight: 400;
    }

    &.primary {
      background: var(--accent-bright);
      border-color: var(--accent-bright);
      color: #1a1206;
      font-weight: 700;

      .sub {
        color: rgba(26, 18, 6, 0.72);
        font-weight: 600;
      }

      &:hover {
        background: var(--accent);
      }
    }
  }
</style>
