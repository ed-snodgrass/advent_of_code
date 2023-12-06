import fs from "fs"
import {part1, part2, exampleInput, getRaces, parseInput, getWinningWays} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day06 tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('should find 3 races', () => {
        expect(getRaces(parsedInput)).toEqual(expect.arrayContaining([
          {time: 7, distance: 9},
          {time: 15, distance: 40},
          {time: 30, distance: 200},
        ]))
      })
      describe('find possible winning ways', () => {
        let races
        beforeEach(() => {
          races = getRaces(parsedInput)
        })
        it('should be 4 ways for first race', () => {
          expect(getWinningWays(races[0])).toBe(4)
        })
        it('should be 8 ways for second race', () => {
          expect(getWinningWays(races[1])).toBe(8)
        })
        it('should be 9 ways for third race', () => {
          expect(getWinningWays(races[2])).toBe(9)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(288)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(633080)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(71503)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(20048741)
      })
    })
  })
})
