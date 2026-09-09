<script>
  /** @type {{ image: import('../data/imagery.js').TabImage }} */
  let { image } = $props();
</script>

<figure class="hero m-0">
  <img src={image.src} alt={image.alt} loading="lazy" style={`aspect-ratio: ${image.ratio}`} />
  <figcaption>
    {#if image.kind === "ai"}
      Artwork: <span>{image.credit}</span>
    {:else}
      Photo:
      {#if image.creditUrl}
        <a href={image.creditUrl} target="_blank" rel="noopener noreferrer"
          >{image.credit}</a
        >
      {:else}
        <span>{image.credit}</span>
      {/if}
    {/if}
  </figcaption>
</figure>

<style lang="scss">
  .hero {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.2);
    min-width: 0;
  }

  .hero img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  .hero figcaption {
    font-size: 0.6rem;
    color: var(--ink-muted);
    padding: 0.28rem 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero figcaption a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
