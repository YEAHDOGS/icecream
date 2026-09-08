<script>
  /**
   * Generic donut chart. One hue only: slices use a gold-tint ramp so the
   * chart reads on dark without rainbow soup. Direct-labeled in the legend,
   * so it never relies on color alone.
   * @typedef {{ label: string, frac: number }} Slice
   * @type {{ slices: Slice[], centerTop?: string, centerBottom?: string, title?: string, note?: string }}
   */
  let { slices = [], centerTop = "", centerBottom = "", title = "", note = "" } = $props();

  const TINTS = [
    "var(--accent)",
    "rgba(var(--accent-rgb), 0.62)",
    "rgba(var(--accent-rgb), 0.38)",
    "rgba(var(--accent-rgb), 0.22)",
  ];

  const R = 54;
  const C = 2 * Math.PI * R;
  const total = $derived(slices.reduce((a, s) => a + (s.frac || 0), 0));
  const shown = $derived(slices.filter((s) => (s.frac || 0) > 0));

  const aria = $derived(
    `${title}: ${shown.map((s) => `${s.label} ${Math.round(s.frac * 100)}%`).join(", ")}`,
  );
</script>

{#if title}
  <p class="eyebrow m-0 mb-2">{title}</p>
{/if}
{#if shown.length}
  <div class="pie-wrap">
    <svg
      viewBox="0 0 140 140"
      class="pie"
      role="img"
      aria-label={aria}
    >
      {#each shown as s, i}
        {@const dash = `${(s.frac * C).toFixed(2)} ${(C - s.frac * C).toFixed(2)}`}
        {@const offset = (
          -shown.slice(0, i).reduce((acc, x) => acc + (x.frac || 0), 0) * C
        ).toFixed(2)}
        <circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke={TINTS[i % TINTS.length]}
          stroke-width="26"
          stroke-dasharray={dash}
          stroke-dashoffset={offset}
          transform="rotate(-90 70 70)"
        />
      {/each}
      {#if centerTop}
        <text x="70" y="66" text-anchor="middle" class="pie-num">{centerTop}</text>
      {/if}
      {#if centerBottom}
        <text x="70" y="84" text-anchor="middle" class="pie-cap">{centerBottom}</text>
      {/if}
    </svg>
    <ul class="m-0 p-0 list-none legend">
      {#each shown as s, i}
        <li>
          <span class="dot" style="background: {TINTS[i % TINTS.length]}"></span>
          <span class="pname">{s.label}</span>
          <span class="pnum">{Math.round(s.frac * 100)}%</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
{#if note}
  <p class="m-0 mt-2 text-[0.66rem] leading-snug text-muted">{note}</p>
{/if}

<style lang="scss">
  .pie-wrap {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-width: 0;
  }

  .pie {
    width: 7.5rem;
    height: 7.5rem;
    flex: none;
  }

  .pie-num {
    fill: var(--ink);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .pie-cap {
    fill: var(--ink-muted);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .legend {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.72rem;
    }
  }

  .dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 999px;
    flex: none;
  }

  .pname {
    color: var(--ink-2);
  }

  .pnum {
    margin-left: auto;
    font-weight: 600;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
</style>
