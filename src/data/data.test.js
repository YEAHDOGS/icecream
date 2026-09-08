import { describe, expect, it } from 'vitest'
import { allCitations, SOURCE_COUNT } from './index.js'
import { isValidSource } from './schema.js'
import { COUNTRIES } from './countries.js'
import { GLOBAL_STATS } from './market.js'
import { SCOUT_LOG } from './scoutLog.js'

describe('citations', () => {
  it('every figure on the site has an https source with a label', () => {
    const bad = allCitations().filter((c) => !isValidSource(c.source))
    expect(bad.map((b) => b.where)).toEqual([])
  })

  it('cites more than one document', () => {
    expect(SOURCE_COUNT).toBeGreaterThan(1)
  })
})

describe('countries', () => {
  it('use lowercase ISO codes that the map SVG can select', () => {
    for (const c of COUNTRIES) expect(c.code).toMatch(/^[a-z]{2}$/)
  })

  it('have positive market sizes and no duplicates', () => {
    const codes = COUNTRIES.map((c) => c.code)
    expect(new Set(codes).size).toBe(codes.length)
    for (const c of COUNTRIES) expect(c.num).toBeGreaterThan(0)
  })
})

describe('market', () => {
  it('leads with a hero stat', () => {
    expect(GLOBAL_STATS.length).toBeGreaterThan(0)
    expect(GLOBAL_STATS[0].value).toBeTruthy()
  })
})

describe('scout log', () => {
  it('is append-only with valid entries', () => {
    expect(SCOUT_LOG.length).toBeGreaterThan(0)
    for (const e of SCOUT_LOG) {
      expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isInteger(e.videosFound)).toBe(true)
      expect(e.videosFound).toBeGreaterThanOrEqual(0)
      expect(e.note.length).toBeGreaterThan(0)
    }
  })

  it('has unique, ascending dates', () => {
    const dates = SCOUT_LOG.map((e) => e.date)
    expect(new Set(dates).size).toBe(dates.length)
    expect([...dates].sort()).toEqual(dates)
  })
})
