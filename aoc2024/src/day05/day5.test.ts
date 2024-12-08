import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  determineCorrectnessAccordingToRules,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day5Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
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
        it("should return [75,47,61,53,29] as the first updateSequence", () => {
          expect(parseInput(exampleInputPart1)[1][0]).toEqual([75,47,61,53,29])
        })
        it("should return [97,13,75,29,47] as the last updateSequence", () => {
          const updateSequences = parseInput(exampleInputPart1)[1]
          expect(updateSequences[updateSequences.length - 1]).toEqual([97,13,75,29,47])
        })
      })
      describe("determineCorrectnessAccordingToRules", () => {
        it("should return true for [75,47,61,53,29]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [75,47,61,53,29])).toBe(true)
        })
        it("should return true for [97,61,53,29,13]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [97,61,53,29,13])).toBe(true)
        })
        it("should return true for [75,29,13]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [75,29,13])).toBe(true)
        })
        it("should return false for [75,97,47,61,53]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [75,97,47,61,53])).toBe(false)
        })
        it("should return false for [61,13,29]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [61,13,29])).toBe(false)
        })
        it("should return false for [97,13,75,29,47]", () => {
          const [pageOrderingRules] = parseInput(exampleInputPart1)
          expect(determineCorrectnessAccordingToRules(pageOrderingRules, [97,13,75,29,47])).toBe(false)
        })
      })

      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(143)
      })
    })
    describe('real input', () => {
      it('part1 should be 5391', () => {
        expect(part1(input)).toBe(5391)
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
