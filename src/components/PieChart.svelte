<script>
  import { APPLICANTS } from "../data/applicants.js";

  /**
   * Platform mix of the applicant videos listed in The Field.
   * Computed live from applicants.js — updates automatically as entries are
   * added. This is a sample of scouted videos, NEVER Deel's applicant data.
   * One hue only (gold tints) — no rainbow soup.
   */

  /** Gold-tint ramp: darkest gold first, fading down. Direct-labeled anyway. */
  const TINTS = [
    "var(--accent)",
    "rgba(var(--accent-rgb), 0.62)",
    "rgba(var(--accent-rgb), 0.38)",
    "rgba(var(--accent-rgb), 0.22)",
  ];
  const ORDER = ["youtube", "tiktok", "instagram", "x"];

  const total = $derived(APPLICANTS.length);
  const slices = $derived(
    ORDER.map((p) => ({
      platform: p,
      count: APPLICANTS.filter((a) => a.platform === p).length,
    }))
      .filter((s) => s.count > 0)
      .map((s) => ({ ...s, frac: total ? s.count / total : 0 })),
  );

  // Donut geometry.
  const R = 54;
  const C = 2 * Math.PI * R;
</script>

{#if total === 0}
  <p class="m-0 text-[0.74rem] text-ink-2">
    No applicant videos yet — the first scouted videos will chart here.
  </p>
{:else}
  <div class="pie-wrap">
    <svg
      viewBox="0 0 140 140"
      class="pie"
      role="img"
      aria-label="Applicant videos on this page by platform: {slices
        .map((s) => `${s.platform} ${s.count}`)
        .join(', ')}"
    >
      {#each slices as s, i}
        {@const dash = `${(s.frac * C).toFixed(2)} ${(C - s.frac * C).toFixed(2)}`}
        {@const offset = (
          -slices.slice(0, i).reduce((acc, x) => acc + x.frac, 0) * C
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
      <text x="70" y="76" text-anchor="middle" class="pie-cap">researched</text>
    </svg>
    <ul class="m-0 p-0 list-none legend">
      {#each slices as s, i}
        <li>
          <span class="dot" style="background: {TINTS[i % TINTS.length]}"></span>
          <span class="pname">{s.platform}</span>
          <span class="pnum">{Math.round(s.frac * 100)}%</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
<p class="m-0 mt-2 text-[0.66rem] leading-snug text-muted">
  Applicants researched — community-visible sample, not Deel's
  full applicant data.
</p>

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
    text-transform: capitalize;
  }

  .pnum {
    margin-left: auto;
    font-weight: 600;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
</style>
