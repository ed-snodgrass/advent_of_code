import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day5Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(143)
      })
      describe("parsingInput tests", () => {
        it("should return pageOrderingRules as an array of 21 arrays", () => {
          expect(parseInput(exampleInputPart1)[0].length).toBe(21)
        })
        it("should return [47, 53] for the first pageOrderingRules", () => {
          expect(parseInput(exampleInputPart1)[0][0]).toEqual([47,53])
        })
        it("should return [53, 13] for the last pageOrderingRules", () => {
          const pageOrderingRules = parseInput(exampleInputPart1)[0]
          expect(pageOrderingRules[pageOrderingRules.length - 1]).toEqual([53,13])
        })
        it("should return updateSequences as an array of 6 arrays", () => {
          expect(parseInput(exampleInputPart1)[1].length).toBe(6)
        })
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe(null)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
