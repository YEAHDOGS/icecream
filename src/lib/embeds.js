/**
 * Lazy third-party social embeds. No API keys needed: YouTube renders via
 * privacy-enhanced iframes; TikTok / Instagram / X render via their public
 * blockquote embed snippets. Each platform script loads once, on demand.
 */

const SCRIPTS = {
  tiktok: 'https://www.tiktok.com/embed.js',
  instagram: 'https://www.instagram.com/embed.js',
  x: 'https://platform.twitter.com/widgets.js',
}

const pending = {}

/** Load a platform's embed script once; resolves when ready. */
export function loadEmbedScript(platform) {
  if (platform === 'youtube') return Promise.resolve()
  if (pending[platform]) return pending[platform]
  pending[platform] = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = SCRIPTS[platform]
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => resolve() // fall back to the plain link card
    document.head.appendChild(s)
  })
  return pending[platform]
}

/** Ask a loaded platform script to render embeds inside `root`. */
export function processEmbeds(platform, root) {
  try {
    if (platform === 'x' && window.twttr?.widgets) window.twttr.widgets.load(root)
    else if (platform === 'instagram' && window.instgrm?.Embeds) window.instgrm.Embeds.process()
    // TikTok's embed.js observes DOM mutations and picks up new
    // blockquotes on its own; nothing to call.
  } catch {
    /* leave the fallback link card in place */
  }
}

/** Extract a YouTube video id from watch / youtu.be / shorts / embed URLs. */
export function youtubeId(url) {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/,
  )
  return m ? m[1] : null
}

/** Extract the numeric TikTok video id from a share URL. */
export function tiktokId(url) {
  const m = url.match(/\/video\/(\d+)/)
  return m ? m[1] : null
}

/** Blockquote markup for the script-driven platforms. */
export function blockquoteHtml(entry) {
  const { platform, url, creator } = entry
  if (platform === 'tiktok') {
    const id = tiktokId(url)
    return `<blockquote class="tiktok-embed" cite="${url}"${
      id ? ` data-video-id="${id}"` : ''
    } style="max-width:605px;min-width:325px;margin:0"><section><a target="_blank" title="${creator}" href="${url}">${creator}</a></section></blockquote>`
  }
  if (platform === 'instagram') {
    return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="margin:0;max-width:540px;min-width:326px"><a target="_blank" href="${url}">View on Instagram</a></blockquote>`
  }
  // x
  return `<blockquote class="twitter-tweet" data-theme="dark" data-dnt="true" style="margin:0"><a target="_blank" href="${url}">View on X</a></blockquote>`
}
