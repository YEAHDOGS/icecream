<script>
  import { onMount } from "svelte";
  import GlitchCone from "./GlitchCone.svelte";
  import {
    loadEmbedScript,
    processEmbeds,
    youtubeId,
    facebookEmbedSrc,
    blockquoteHtml,
  } from "../lib/embeds.js";

  /** @type {{ entry: import('../data/applicants.js').Applicant, index?: number }} */
  let { entry, index = 0 } = $props();

  let cardEl = $state(null);
  let embedEl = $state(null);
  let inView = $state(false);
  let rendered = $state(false);
  /** The platform script gave up: show tappable fallback art, not a blank box. */
  let embedDead = $state(false);
  /** A real player iframe exists: hide the tap-to-open overlay so it stays usable. */
  let embedLive = $state(false);
  /** Direct iframe (YouTube/Facebook) fired its load event. */
  let frameLoaded = $state(false);
  let pollTimers = [];

  const yt = $derived(youtubeId(entry.url));
  const isTube = $derived(entry.platform === "youtube");
  const isFb = $derived(entry.platform === "facebook");
  const fbSrc = $derived(isFb ? facebookEmbedSrc(entry.url) : null);
  /** Platforms that render a raw <iframe> instead of a platform script. */
  const isDirectFrame = $derived((isTube && !!yt) || isFb);
  /** Stagger cap: first 12 cards cascade, the rest settle together. */
  const staggerMs = $derived(Math.min(index, 11) * 40);

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
    return () => {
      io.disconnect();
      pollTimers.forEach(clearTimeout);
    };
  });

  // Once the card nears the viewport, load the platform script (if any) and
  // let it render the blockquote. Runs once per card. We poll for a real
  // player iframe afterwards — if the script never renders one, the box
  // would stay blank, so we swap in tappable fallback art instead.
  // (YouTube and Facebook render iframes directly, so they skip this.
  // LinkedIn has no public embed — it goes straight to the tap-to-watch
  // fallback card.)
  $effect(() => {
    if (!inView || rendered || !embedEl) return;
    rendered = true;
    if (isTube || isFb) return; // iframe renders on its own
    if (entry.platform === "linkedin") {
      embedDead = true;
      return;
    }
    loadEmbedScript(entry.platform).then(() => {
      processEmbeds(entry.platform, embedEl);
      let tries = 0;
      const tick = () => {
        if (!embedEl) return;
        if (embedEl.querySelector("iframe")) {
          embedLive = true;
          return;
        }
        if (++tries >= 5) {
          embedDead = true;
          return;
        }
        pollTimers.push(setTimeout(tick, 1500));
      };
      tick();
    });
  });

  // Blank-iframe watchdog for YouTube/Facebook: cross-origin frames can't
  // be introspected, but a frame that never fires `load` (blocked embed,
  // dead video, network stall) looks exactly like a blank white box to the
  // viewer — so after a grace period we swap in the tap-to-watch fallback
  // instead of leaving a dead rectangle. onerror fails fast.
  $effect(() => {
    if (!inView || !isDirectFrame || embedDead || frameLoaded) return;
    const t = setTimeout(() => {
      if (!frameLoaded) embedDead = true;
    }, 9000);
    return () => clearTimeout(t);
  });
</script>

<article
  bind:this={cardEl}
  class="vcard card lift enter-stagger"
  style={`--d: ${staggerMs}ms`}
>
  <div class="vhead">
    <span class="platform">{entry.platform}</span>
    <span class="creator">{entry.creator}</span>
  </div>

  <div class="vembed" bind:this={embedEl}>
    {#if inView}
      {#if embedDead}
        <!-- Blank/failed embed: glitch-cone fallback, whole box opens the video. -->
        <a class="dead" href={entry.url} target="_blank" rel="noopener noreferrer">
          <GlitchCone />
          <span>Preview didn't load — tap to watch on {entry.platform} ↗</span>
        </a>
      {:else if isTube && yt}
        <iframe
          title="{entry.creator} — application video"
          src="https://www.youtube-nocookie.com/embed/{yt}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          frameborder="0"
          onload={() => (frameLoaded = true)}
          onerror={() => (embedDead = true)}
        ></iframe>
      {:else if isTube}
        <a class="fallback" href={entry.url} target="_blank" rel="noopener noreferrer">
          Watch on YouTube ↗
        </a>
      {:else if isFb}
        <iframe
          title="{entry.creator} — application video"
          src={fbSrc}
          loading="lazy"
          allowfullscreen
          frameborder="0"
          onload={() => (frameLoaded = true)}
          onerror={() => (embedDead = true)}
        ></iframe>
      {:else if entry.platform === "linkedin"}
        <!-- LinkedIn has no public embed — straight to the tap-to-watch card. -->
        <a class="dead" href={entry.url} target="_blank" rel="noopener noreferrer">
          <GlitchCone />
          <span>Preview didn't load — tap to watch on {entry.platform} ↗</span>
        </a>
      {:else}
        {@html blockquoteHtml(entry)}
        {#if !embedLive}
          <!-- Blank-but-loading box: the whole tile opens the video. -->
          <a
            class="vhit"
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open {entry.creator}'s video on {entry.platform}"
          ></a>
        {/if}
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
    position: relative;
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

  /* Invisible tap target over a blank-but-loading embed: the whole tile
     opens the video until a real player renders. */
  .vhit {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: block;
  }

  .dead {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 1.4rem 1rem;
    color: var(--ink-muted);
    font-size: 0.72rem;
    line-height: 1.4;
    text-decoration: none;
    text-align: center;

    &:hover {
      color: var(--ink);
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
