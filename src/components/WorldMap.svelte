<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<script>
  import worldMapSvg from "../assets/world-map.svg?raw";
  import { rampStep } from "../lib/format.js";

  const RAMP_STEPS = 7;

  /**
   * Choropleth of the world. Countries in `countries` are shaded by `num` on a
   * one-hue log ramp; everything else is a quiet outline. Click/tap selects.
   * @typedef {{ code: string, name: string, num: number, value: string }} MapCountry
   * @type {{ countries: MapCountry[], selected: string | null, onSelect: (code: string) => void }}
   */
  let { countries = [], selected = null, onSelect } = $props();

  let containerEl = $state();
  let hovered = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let flipX = $state(false);
  let flipY = $state(false);

  const byCode = $derived(new Map(countries.map((c) => [c.code, c])));
  const range = $derived.by(() => {
    const nums = countries.map((c) => c.num).filter((n) => n > 0);
    return { min: Math.min(...nums), max: Math.max(...nums) };
  });

  // Paint fills and selection whenever data changes. Uses CSS variables on each
  // path so the SCSS below owns the actual colors.
  $effect(() => {
    if (!containerEl) return;
    containerEl.querySelectorAll(".has-data, .selected").forEach((el) => {
      el.classList.remove("has-data", "selected");
      el.style.removeProperty("--fill");
    });
    for (const c of countries) {
      const el = containerEl.querySelector(`#${c.code}`);
      if (!el) continue;
      el.classList.add("has-data");
      el.style.setProperty(
        "--fill",
        `var(--map-${rampStep(c.num, range.min, range.max, RAMP_STEPS)})`,
      );
      if (c.code === selected) el.classList.add("selected");
    }
  });

  /** @param {Event} e */
  const codeAt = (e) => {
    const el = /** @type {Element} */ (e.target).closest("path[id], g[id]");
    return el?.id?.toLowerCase() ?? null;
  };

  function handleClick(e) {
    const code = codeAt(e);
    if (code && byCode.has(code)) onSelect(code);
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    flipX = mouseX > rect.width / 2;
    flipY = mouseY > rect.height / 2;
    const code = codeAt(e);
    hovered = code && byCode.has(code) ? code : null;
  }
</script>

<div
  bind:this={containerEl}
  class="map"
  onclick={handleClick}
  onmousemove={handleMouseMove}
  onmouseleave={() => (hovered = null)}
>
  {@html worldMapSvg}

  {#if hovered}
    {@const c = byCode.get(hovered)}
    <div
      class="tip"
      style="left:{mouseX}px; top:{mouseY}px; transform: translate({flipX
        ? 'calc(-100% - 12px)'
        : '12px'}, {flipY ? 'calc(-100% - 12px)' : '12px'})"
    >
      <span class="name">{c.name}</span>
      <span class="val">{c.value}</span>
    </div>
  {/if}

  <div class="legend" aria-hidden="true">
    <span class="eyebrow">Smaller</span>
    {#each Array(RAMP_STEPS) as _, i}
      <span class="swatch" style="background: var(--map-{i + 1})"></span>
    {/each}
    <span class="eyebrow">Larger</span>
  </div>
</div>

<style lang="scss">
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    touch-action: pan-y;
  }

  .map :global(svg) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: block;
  }

  .map :global(path) {
    fill: var(--map-empty);
    stroke: var(--map-stroke);
    stroke-width: 0.5px;
    transition:
      fill 0.25s ease,
      stroke 0.25s ease;
  }

  .map :global(.has-data),
  .map :global(.has-data path) {
    fill: var(--fill);
    stroke: var(--bg-app);
    stroke-width: 0.6px;
    cursor: pointer;
  }

  .map :global(.has-data:hover),
  .map :global(.has-data:hover path) {
    fill: var(--accent-bright);
  }

  .map :global(.selected),
  .map :global(.selected path) {
    fill: var(--accent-bright);
    stroke: var(--ink);
    stroke-width: 1px;
  }

  .tip {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.45rem 0.7rem;
    background: rgba(14, 11, 10, 0.94);
    border: 1px solid var(--border-strong);
    border-radius: 8px;
    pointer-events: none;
    z-index: 5;
    white-space: nowrap;

    .name {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--ink);
    }

    .val {
      font-size: 0.7rem;
      color: var(--ink-2);
      font-variant-numeric: tabular-nums;
    }
  }

  .legend {
    position: absolute;
    left: 0.5rem;
    bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 3px;
    pointer-events: none;

    .swatch {
      width: 14px;
      height: 6px;
      border-radius: 2px;
    }

    .eyebrow {
      font-size: 0.55rem;
      margin: 0 0.3rem;
    }
  }
</style>
