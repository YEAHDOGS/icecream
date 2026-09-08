<script>
  import Cite from "./Cite.svelte";

  /**
   * Horizontal bar chart. Single series unless `color` is set per row.
   * Bars are thin, grow from a shared baseline, and every row is direct-labeled,
   * so the chart never relies on color alone.
   * @typedef {{ label: string, num: number, value: string, color?: string, source?: import('../data/schema.js').Source }} Row
   * @type {{ rows: Row[], title?: string, source?: import('../data/schema.js').Source, sources?: import('../data/schema.js').Source[], note?: string }}
   */
  let { rows = [], title = "", source = null, sources = [], note = "" } = $props();

  const max = $derived(Math.max(...rows.map((r) => r.num || 0), 1));
  /** @param {Row} r */
  const widthOf = (r) => `${Math.max(0, ((r.num || 0) / max) * 100)}%`;
</script>

<figure class="bars">
  {#if title}
    <figcaption class="eyebrow mb-2">{title}</figcaption>
  {/if}
  <ol>
    {#each rows as r (r.label)}
      <li title="{r.label}: {r.value}">
        <span class="label truncate">{r.label}</span>
        <span class="track">
          <span
            class="fill"
            style="width: {widthOf(r)}; background: {r.color ?? 'var(--accent)'}"
          ></span>
        </span>
        <span class="num">{r.value}</span>
      </li>
    {/each}
  </ol>
  {#if note}
    <p class="m-0 mt-1.5 text-[0.66rem] leading-snug text-muted">{note}</p>
  {/if}
  {#if source}
    <div class="mt-2"><Cite {source} compact /></div>
  {:else if sources.length}
    <div class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
      {#each sources as s (s.url)}
        <Cite source={s} compact />
      {/each}
    </div>
  {/if}
</figure>

<style lang="scss">
  .bars {
    margin: 0;
    min-width: 0;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  li {
    display: grid;
    grid-template-columns: minmax(4.5rem, 32%) 1fr auto;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.72rem;
    min-width: 0;
  }

  .label {
    color: var(--ink-2);
  }

  .track {
    position: relative;
    height: 10px;
    border-radius: 0 4px 4px 0;
    background: rgba(247, 239, 228, 0.04);
    overflow: hidden;
  }

  .fill {
    display: block;
    height: 100%;
    border-radius: 0 4px 4px 0;
    transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .num {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    color: var(--ink);
    white-space: nowrap;
  }
</style>
