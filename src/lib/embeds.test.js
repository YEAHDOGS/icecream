import { describe, expect, it } from 'vitest'
import {
  loadEmbedScript,
  blockquoteHtml,
  facebookEmbedSrc,
  youtubeId,
  tiktokId,
} from './embeds.js'

describe('blockquoteHtml', () => {
  const entry = (platform, url) => ({ platform, url, creator: 'tester' })

  it('renders the Threads text-post-media blockquote', () => {
    const url = 'https://www.threads.com/@raudxgeez/post/DcwbUTGEvk8'
    const html = blockquoteHtml(entry('threads', url))
    expect(html).toContain('class="text-post-media"')
    expect(html).toContain(`data-text-post-permalink="${url}"`)
    expect(html).toContain(url)
  })

  it('keeps the existing TikTok / Instagram / X snippets intact', () => {
    expect(blockquoteHtml(entry('tiktok', 'https://www.tiktok.com/@a/video/123'))).toContain(
      'class="tiktok-embed"',
    )
    expect(
      blockquoteHtml(entry('instagram', 'https://www.instagram.com/reel/abc/')),
    ).toContain('class="instagram-media"')
    expect(blockquoteHtml(entry('x', 'https://x.com/a/status/1'))).toContain(
      'class="twitter-tweet"',
    )
  })
})

describe('facebookEmbedSrc', () => {
  it('builds the video-plugin iframe URL with the encoded post URL', () => {
    const url = 'https://www.facebook.com/watch/?v=12345'
    const src = facebookEmbedSrc(url)
    expect(src).toBe(
      `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
    )
  })
})

describe('loadEmbedScript', () => {
  it('resolves immediately for iframe platforms without injecting scripts', async () => {
    const before = document.querySelectorAll('script').length
    await expect(loadEmbedScript('youtube')).resolves.toBeUndefined()
    await expect(loadEmbedScript('facebook')).resolves.toBeUndefined()
    expect(document.querySelectorAll('script').length).toBe(before)
  })
})

describe('id extractors', () => {
  it('youtubeId handles watch, shorts, and youtu.be URLs', () => {
    expect(youtubeId('https://www.youtube.com/watch?v=abc123XYZ_-')).toBe('abc123XYZ_-')
    expect(youtubeId('https://www.youtube.com/shorts/h_mLtMuqnwk')).toBe('h_mLtMuqnwk')
    expect(youtubeId('https://youtu.be/abc123XYZ_-')).toBe('abc123XYZ_-')
  })

  it('tiktokId pulls the numeric id', () => {
    expect(tiktokId('https://www.tiktok.com/@a/video/7552241055123')).toBe('7552241055123')
  })
})
