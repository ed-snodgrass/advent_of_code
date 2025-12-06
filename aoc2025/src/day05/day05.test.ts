import * as fs from 'fs'
import { part1, part2, exampleInputPart1, exampleInputPart2, hasOverlap, countFreshIngredients } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')

describe('Day05Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 3', () => {
        expect(part1(exampleInputPart1)).toBe(3)
      })
    })
    describe('real input', () => {
      it('part1 should be 865', () => {
        expect(part1(input)).toBe(865)
      })
    })
  })
  describe('hasOverlap', () => {
    it('should be false for [10, 14], [3,5]', () => {
      expect(hasOverlap(10, [3, 5])).toBe(false)
      expect(hasOverlap(14, [3, 5])).toBe(false)
    })
    it('should be false for [16, 20], [3, 5]', () => {
      expect(hasOverlap(16, [3, 5])).toBe(false)
      expect(hasOverlap(20, [3, 5])).toBe(false)
    })
    it('should be false for [16, 20], [10, 14]', () => {
      expect(hasOverlap(16, [10, 14])).toBe(false)
      expect(hasOverlap(20, [10, 14])).toBe(false)
    })
    it('should be false for [12, 18], [3, 5]', () => {
      expect(hasOverlap(12, [3, 5])).toBe(false)
      expect(hasOverlap(18, [3, 5])).toBe(false)
    })
    it('should be true for [12, 18], [10, 14]', () => {
      expect(hasOverlap(12, [10, 14])).toBe(true)
      expect(hasOverlap(13, [10, 14])).toBe(true)
      expect(hasOverlap(14, [10, 14])).toBe(true)
      expect(hasOverlap(15, [10, 14])).toBe(false)
      expect(hasOverlap(16, [10, 14])).toBe(false)
      expect(hasOverlap(17, [10, 14])).toBe(false)
      expect(hasOverlap(18, [10, 14])).toBe(false)
    })
    it('should be true for [12, 18], [16, 20]', () => {
      expect(hasOverlap(12, [16, 20])).toBe(false)
      expect(hasOverlap(13, [16, 20])).toBe(false)
      expect(hasOverlap(14, [16, 20])).toBe(false)
      expect(hasOverlap(15, [16, 20])).toBe(false)
      expect(hasOverlap(16, [16, 20])).toBe(true)
      expect(hasOverlap(17, [16, 20])).toBe(true)
      expect(hasOverlap(18, [16, 20])).toBe(true)
      expect(hasOverlap(2561, [2562, 2566])).toBe(false)
      expect(hasOverlap(2562, [2562, 2566])).toBe(true)
      expect(hasOverlap(2563, [2562, 2566])).toBe(true)
      expect(hasOverlap(2564, [2562, 2566])).toBe(true)
      expect(hasOverlap(2565, [2562, 2566])).toBe(true)
      expect(hasOverlap(2566, [2562, 2566])).toBe(true)
      expect(hasOverlap(2567, [2562, 2566])).toBe(false)
      expect(hasOverlap(2568, [2562, 2566])).toBe(false)
      expect(hasOverlap(2569, [2562, 2566])).toBe(false)
      expect(hasOverlap(2570, [2562, 2566])).toBe(false)
    })
  })
  describe('countFreshIngredients', () => {
    it('should return 1061243423034', () => {
      const freshRanges = [
        [77643299597, 926402139635],
        [410879657749, 1138886722630],
      ] as [number, number][]

      expect(countFreshIngredients(freshRanges)).toBe(1061243423034)
    })
    it('should return 5691536466050', () => {
      const freshRanges = [
        [323845023844190, 329536560310239],
        [325790710810736, 327242721326766],
      ] as [number, number][]

      expect(countFreshIngredients(freshRanges)).toBe(5691536466050)
    })
    it('should return 16', () => {
      const freshRanges = [
        [2555, 2558],
        [2557, 2561],
        [2557, 2558],
        [2558, 2566],
        [2561, 2570],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(16)
    })
    it('should return 14', () => {
      const freshRanges = [
        [2557, 2561],
        [2557, 2558],
        [2558, 2566],
        [2561, 2570],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(14)
    })
    it('should return 1062', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(1062)
    })
    it('should return 1778', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(1778)
    })
    it('should return 1778 again', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(1778)
    })
    it('should return 2541', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2541)
    })
    it('should return 2541 again', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2541)
    })
    it('should return 2783', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
        [2135, 2859],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2783)
    })
    it('should return 2783 again', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
        [2135, 2859],
        [2351, 2617],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2783)
    })
    it('should return 2783 a third time', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
        [2135, 2859],
        [2351, 2617],
        [2351, 2617],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2783)
    })
    it('should return 2983', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
        [2135, 2859],
        [2351, 2617],
        [2351, 2617],
        [2351, 3059],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(2983)
    })
    it('should return 3326', () => {
      const freshRanges = [
        [77, 926],
        [410, 1138],
        [1138, 1854],
        [1138, 1854],
        [1854, 2617],
        [1854, 2135],
        [2135, 2859],
        [2351, 2617],
        [2351, 2617],
        [2351, 3059],
        [3059, 3402],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(3326)
    })
    it('should return 61', () => {
      const freshRanges = [
        [4941, 5001],
        [4941, 4941],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(61)
    })
    it('should return 19', () => {
      const freshRanges = [
        [3486, 3491],
        [3486, 3488],
        [3488, 3497],
        [3491, 3497],
        [3493, 3497],
        [3493, 3497],
        [3493, 3501],
        [3500, 3504],
      ] as [number, number][]
      expect(countFreshIngredients(freshRanges)).toBe(19)
    })
    it('should return 1270084384519', () => {
      const freshRanges = [
        [255753644093984, 256141049798709],
        [255753644093984, 255883541623862],
        [255883541623862, 256689490174132],
        [256141049798709, 257023728478502],
      ] as [number, number][]

      expect(countFreshIngredients(freshRanges)).toBe(1270084384519)
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 14', () => {
        expect(part2(exampleInputPart2)).toBe(14)
      })
    })
    describe('real input', () => {
      it('part2 should be 352556672963116', () => {
        expect(part2(input)).toBe(352556672963116)
      })
    })
  })
})
