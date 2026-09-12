<script>
  import Cite from "./Cite.svelte";

  /**
   * Sparse line chart for a handful of dated, cited data points.
   * Single gold series on dark; the final projected point renders dashed and
   * muted so reported data never reads as a forecast. Nothing is interpolated
   * beyond connecting the given points — if a value is 0 it sits on the
   * baseline.
   * @typedef {{ label: string, value: string, num: number, projection?: boolean }} Point
   * @type {{ points: Point[], title?: string, note?: string, source?: import('../data/schema.js').Source }}
   */
  let { points = [], title = "", note = "", source = null } = $props();

  const W = 340;
  const H = 190;
  const PAD = { l: 10, r: 10, t: 30, b: 26 };
  const n = $derived(points.length);
  const max = $derived(Math.max(...points.map((p) => p.num || 0), 1));
  const xOf = (i) =>
    n < 2
      ? W / 2
      : PAD.l + (i * (W - PAD.l - PAD.r)) / (n - 1);
  const yOf = (p) => PAD.t + (1 - (p.num || 0) / max) * (H - PAD.t - PAD.b);

  /** SVG path through the points; the projected segment is drawn separately. */
  const reported = $derived(points.filter((p) => !p.projection));
  const projected = $derived(points.find((p) => p.projection));
  const linePath = $derived(
    reported
      .map((p, i) => `${i === 0 ? "M" : "L"}${xOf(points.indexOf(p)).toFixed(1)},${yOf(p).toFixed(1)}`)
      .join(" "),
  );
  const projectionPath = $derived(
    projected && reported.length
      ? `M${xOf(points.indexOf(reported[reported.length - 1])).toFixed(1)},${yOf(reported[reported.length - 1]).toFixed(1)} L${xOf(points.indexOf(projected)).toFixed(1)},${yOf(projected).toFixed(1)}`
      : "",
  );

  const aria = $derived(
    `${title}: ${points.map((p) => `${p.label} ${p.value}`).join(", ")}`,
  );
</script>

<figure class="line">
  {#if title}
    <figcaption class="eyebrow mb-2">{title}</figcaption>
  {/if}
  <svg
    viewBox={`0 0 ${W} ${H}`}
    class="plot"
    role="img"
    aria-label={aria}
  >
    <!-- baseline -->
    <line
      x1={PAD.l}
      y1={H - PAD.b}
      x2={W - PAD.r}
      y2={H - PAD.b}
      class="axis"
    />
    {#if projectionPath}
      <path d={projectionPath} class="proj-line" />
    {/if}
    {#if linePath}
      <path d={linePath} class="data-line" />
    {/if}
    {#each points as p, i (p.label)}
      {@const x = xOf(i)}
      {@const y = yOf(p)}
      {@const anchor = i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
      {#if p.projection}
        <circle cx={x} cy={y} r="4.5" class="proj-dot" />
      {:else}
        <circle cx={x} cy={y} r="4.5" class="dot" />
      {/if}
      <text
        x={x}
        y={y - 9}
        text-anchor={anchor}
        class={p.projection ? "vlabel proj" : "vlabel"}
        >{p.value}</text
      >
      <text x={x} y={H - 8} text-anchor="middle" class="xlabel"
        >{p.label}</text
      >
    {/each}
  </svg>
  {#if note}
    <p class="m-0 mt-1.5 text-[0.66rem] leading-snug text-muted">{note}</p>
  {/if}
  {#if source}
    <div class="mt-2"><Cite {source} compact /></div>
  {/if}
</figure>

<style lang="scss">
  .line {
    margin: 0;
    min-width: 0;
  }

  .plot {
    display: block;
    width: 100%;
    max-width: 400px;
    margin-inline: auto;
    height: auto;
  }

  .axis {
    stroke: rgba(247, 239, 228, 0.18);
    stroke-width: 1;
  }

  .data-line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .proj-line {
    fill: none;
    stroke: rgba(247, 239, 228, 0.35);
    stroke-width: 2;
    stroke-dasharray: 5 5;
    stroke-linecap: round;
  }

  .dot {
    fill: var(--accent-bright);
    stroke: var(--bg-app);
    stroke-width: 1.5;
  }

  .proj-dot {
    fill: none;
    stroke: rgba(247, 239, 228, 0.45);
    stroke-width: 2;
    stroke-dasharray: 3 2;
  }

  .vlabel {
    fill: var(--accent-bright);
    font-size: 11.5px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .vlabel.proj {
    fill: var(--ink-muted);
    font-weight: 600;
  }

  .xlabel {
    fill: var(--ink-muted);
    font-size: 10.5px;
  }
</style>
