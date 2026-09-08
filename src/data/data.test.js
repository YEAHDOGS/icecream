import { describe, expect, it } from 'vitest'
import { allCitations, SOURCE_COUNT } from './index.js'
import { isValidSource } from './schema.js'
import { COUNTRIES } from './countries.js'
import { GLOBAL_STATS } from './market.js'

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
