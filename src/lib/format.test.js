import { describe, expect, it } from 'vitest'
import { compact, pct, rampStep, usd } from './format.js'

describe('compact', () => {
  it('scales into K/M/B/T', () => {
    expect(compact(950)).toBe('950')
    expect(compact(1284)).toBe('1.3K')
    expect(compact(4.2e6)).toBe('4.2M')
    expect(compact(104e9)).toBe('104B')
    expect(compact(1.5e12)).toBe('1.5T')
  })
  it('drops trailing .0', () => {
    expect(compact(2e9)).toBe('2B')
  })
  it('handles missing values', () => {
    expect(compact(null)).toBe('—')
    expect(compact(NaN)).toBe('—')
  })
})

describe('usd', () => {
  it('prefixes a dollar sign', () => {
    expect(usd(104e9)).toBe('$104B')
    expect(usd(-3e6)).toBe('-$3M')
  })
})

describe('pct', () => {
  it('formats ratios', () => {
    expect(pct(0.043)).toBe('4.3%')
    expect(pct(0.24)).toBe('24%')
    expect(pct(0.1)).toBe('10%')
  })
})

describe('rampStep', () => {
  it('maps min→1 and max→steps on a log scale', () => {
    expect(rampStep(1e8, 1e8, 1e11, 7)).toBe(1)
    expect(rampStep(1e11, 1e8, 1e11, 7)).toBe(7)
    expect(rampStep(1e9, 1e8, 1e11, 7)).toBe(3)
  })
  it('falls back to 1 on bad input', () => {
    expect(rampStep(0, 1, 10, 7)).toBe(1)
    expect(rampStep(5, 10, 1, 7)).toBe(1)
  })
})
