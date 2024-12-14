import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2 } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day10Test tests', () => {
  describe('part1', () => {
    describe('other sample input', () => {
      const sampleInput = `0123
1234
8765
9876`
      describe("when parsing input", () => {
        it("should find 1 trailhead", () => {
          expect(parseInput(sampleInput).trailheads.length).toBe(1)
        })
        it("should find 1 summit", () => {
          expect(parseInput(sampleInput).summits.length).toBe(1)
        })
      })
      describe("part1", () => {
        it('should be 1', () => {
          expect(part1(sampleInput)).toBe(1)
      })
      })
    })
    describe('example input', () => {
      it('part1 should be 36', () => {
        expect(part1(exampleInputPart1)).toBe(36)
      })
    })
    describe('real input', () => {
      it('part1 should be 646', () => {
        expect(part1(input)).toBe(646)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(81)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
