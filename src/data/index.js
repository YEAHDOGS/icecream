import { GLOBAL_STATS, SEGMENTS } from './market.js'
import { COUNTRIES } from './countries.js'
import { GIANTS, CHALLENGERS, CELEBRITY_COMPS, ARC } from './competitors.js'
import { TRENDING, GAPS, PALATES } from './trends.js'
import { PITCH, FLAVOR_IDEAS, BRAND_FACTS } from './pitch.js'
import { CAMPAIGN_STATS, WHAT_THEY_WANT, CAMPAIGN_TIMELINE, APPLY, APPLICANT_GROWTH } from './campaign.js'
import { APPLICANTS } from './applicants.js'

/**
 * Every cited object on the site, flattened. Used by the footer count and by
 * data.test.js, which fails the build if anything here lacks an https source.
 * @returns {Array<{ where: string, source: import('./schema.js').Source | undefined }>}
 */
export function allCitations() {
  const out = []
  const push = (where, source) => out.push({ where, source })
  GLOBAL_STATS.forEach((s) => push(`market.GLOBAL_STATS.${s.id}`, s.source))
  SEGMENTS.forEach((s) => push(`market.SEGMENTS.${s.id}`, s.source))
  COUNTRIES.forEach((c) => {
    push(`countries.${c.code}`, c.source)
    if (c.perCapita) push(`countries.${c.code}.perCapita`, c.perCapita.source)
  })
  GIANTS.forEach((g) => push(`competitors.GIANTS.${g.name}`, g.source))
  CHALLENGERS.forEach((c) => push(`competitors.CHALLENGERS.${c.id}`, c.source))
  CELEBRITY_COMPS.forEach((c) => push(`competitors.CELEBRITY_COMPS.${c.id}`, c.source))
  ARC.steps.forEach((s) => push(`competitors.ARC.${s.year}`, s.source))
  TRENDING.forEach((t) => push(`trends.TRENDING.${t.id}`, t.source))
  GAPS.forEach((g) => push(`trends.GAPS.${g.id}`, g.source))
  PALATES.forEach((p) => push(`trends.PALATES.${p.code}`, p.source))
  PITCH.points.forEach((p) => p.source && push(`pitch.PITCH.points.${p.id}`, p.source))
  FLAVOR_IDEAS.forEach((f) => push(`pitch.FLAVOR_IDEAS.${f.id}`, f.source))
  BRAND_FACTS.stats.forEach((s) => push(`pitch.BRAND_FACTS.${s.id}`, s.source))
  CAMPAIGN_STATS.forEach((s) => push(`campaign.CAMPAIGN_STATS.${s.id}`, s.source))
  WHAT_THEY_WANT.forEach((w) => push(`campaign.WHAT_THEY_WANT.${w.id}`, w.source))
  CAMPAIGN_TIMELINE.forEach((t) => push(`campaign.CAMPAIGN_TIMELINE.${t.date}`, t.source))
  push('campaign.APPLY.requirements', APPLY.source)
  APPLICANT_GROWTH.forEach((g) => push(`campaign.APPLICANT_GROWTH.${g.id}`, g.source))
  APPLICANTS.forEach((a) =>
    push(`applicants.${a.id}`, { label: `${a.creator} application video`, url: a.url }),
  )
  return out
}

/** Distinct source documents cited across the site. */
export const SOURCE_COUNT = new Set(
  allCitations()
    .map((c) => c.source?.url)
    .filter(Boolean),
).size
