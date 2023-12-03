import fs from "fs"
import {part1, part2, exampleInput, findAllSymbols, findNumbersTouchingSymbols, findGears} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day3 tests', () => {
  describe('part1', () => {
    describe('findAllSymbols', () => {
      it('should find 6 symbols', () => {
        expect(findAllSymbols(exampleInput).length).toBe(6)
      })
    })
    describe('findNumbersNotTouchingSymbols', () => {
      it('should find 8 part numbers', () => {
        expect(findNumbersTouchingSymbols(exampleInput).length).toBe(8)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(4361)
      })
    })
    describe('real input', () => {
      it('should be 546312', () => {
        expect(part1(input)).toBe(546312)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('should return 2 gears', () => {
        expect(findGears(exampleInput).length).toBe(2)
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(467835)
      })
    })
    describe('real input', () => {
      it('part1 should be 87449461', () => {
        expect(part2(input)).toBe(87449461)
      })
    })
  })
})
