<script>
  import { onMount } from "svelte";
  import {
    loadEmbedScript,
    processEmbeds,
    youtubeId,
    blockquoteHtml,
  } from "../lib/embeds.js";

  /** @type {{ entry: import('../data/applicants.js').Applicant }} */
  let { entry } = $props();

  let cardEl = $state(null);
  let embedEl = $state(null);
  let inView = $state(false);
  let rendered = $state(false);

  const yt = $derived(youtubeId(entry.url));

  onMount(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          inView = true;
          io.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    if (cardEl) io.observe(cardEl);
    return () => io.disconnect();
  });

  // Once the card nears the viewport, load the platform script (if any) and
  // let it render the blockquote. Runs once per card.
  $effect(() => {
    if (!inView || rendered || !embedEl) return;
    rendered = true;
    if (entry.platform === "youtube") return; // iframe renders on its own
    loadEmbedScript(entry.platform).then(() =>
      processEmbeds(entry.platform, embedEl),
    );
  });
</script>

<article bind:this={cardEl} class="vcard card">
  <div class="vhead">
    <span class="platform">{entry.platform}</span>
    <span class="creator">{entry.creator}</span>
  </div>

  <div class="vembed" bind:this={embedEl}>
    {#if inView}
      {#if entry.platform === "youtube" && yt}
        <iframe
          title="{entry.creator} — application video"
          src="https://www.youtube-nocookie.com/embed/{yt}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          frameborder="0"
        ></iframe>
      {:else if entry.platform === "youtube"}
        <a class="fallback" href={entry.url} target="_blank" rel="noopener noreferrer">
          Watch on YouTube ↗
        </a>
      {:else}
        {@html blockquoteHtml(entry)}
      {/if}
    {:else}
      <a class="fallback" href={entry.url} target="_blank" rel="noopener noreferrer">
        Loading {entry.platform} video… (tap to open) ↗
      </a>
    {/if}
  </div>

  {#if entry.note}
    <p class="vnote">{entry.note}</p>
  {/if}
  <div class="vtags">
    {#each entry.tags as t}
      <span class="vtag">{t}</span>
    {/each}
    <a class="vopen" href={entry.url} target="_blank" rel="noopener noreferrer">open ↗</a>
  </div>
</article>

<style lang="scss">
  .vcard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem;
    min-width: 0;
    overflow: hidden;
  }

  .vhead {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    min-width: 0;
  }

  .platform {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-bright);
  }

  .creator {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--ink);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vembed {
    min-width: 0;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(247, 239, 228, 0.02);
    border: 1px solid var(--border);

    iframe {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      border: 0;
    }

    :global(blockquote) {
      margin: 0 !important;
    }
  }

  .fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 1rem;
    color: var(--ink-muted);
    font-size: 0.75rem;
    text-decoration: none;
    text-align: center;

    &:hover {
      color: var(--ink);
    }
  }

  .vnote {
    margin: 0;
    font-size: 0.74rem;
    line-height: 1.45;
    color: var(--ink-2);
  }

  .vtags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    align-items: center;
    margin-top: auto;
  }

  .vtag {
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    font-size: 0.62rem;
    color: var(--ink-muted);
  }

  .vopen {
    margin-left: auto;
    font-size: 0.68rem;
    color: var(--ink-muted);
    text-decoration: none;

    &:hover {
      color: var(--ink);
    }
  }
</style>
