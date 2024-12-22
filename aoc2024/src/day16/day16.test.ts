import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, findItem } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day16Test tests', () => {
  describe("parseInput", () => {
    let grid: string[][]
    beforeEach(() => {
      grid = parseInput(exampleInputPart1)
    })
    describe("when parsing exampleInputPart1", () => {
      it("should find starting point at 1,13", () => {
        expect(findItem(grid, 'S')).toEqual([1,13])
      })
      it("should find the end at 13,1", () => {
        expect(findItem(grid, 'E')).toEqual([13,1])
      })
    })
  })

  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 7036', () => {
        expect(part1(exampleInputPart1)).toBe(7036)
      })
    })
    describe('real input', () => {
      it('part1 should be 95444', () => {
        expect(part1(input)).toBe(95444)
      })
    })
  })
  describe.skip('part2', () => {
    describe('example input', () => {
      it('part2 should be 45', () => {
        expect(part2(exampleInputPart2)).toBe(45)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
