import fs from "fs"
import {part1, part2, exampleInput, findSeeds, parseInput, findMap, findSeedRanges} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day5 tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      let parsedInput
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      describe('finding seeds', () => {
        it('should find 4 seeds', () => {
          expect(findSeeds(parsedInput[0]).length).toBe(4)
        })
      })
      describe('finding seed-to-soil map', () => {
        it('should 2 maps', () => {
          expect(findMap(parsedInput[1]).length).toBe(2)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(35)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(177942185)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      let parsedInput
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      describe('finding seed ranges for part2', () => {
        it('should find 2 seed ranges', () => {
          expect(findSeedRanges(parsedInput[0]).length).toBe(2)
        })
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(46)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part2(input)).toBe(69841803)
      })
    })
  })
})
