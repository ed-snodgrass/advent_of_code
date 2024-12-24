import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  processBytes,
  createGrid,
  gridToString,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day18Test tests', () => {
  describe('parseInput', () => {
    describe('example input', () => {
      it('should find 25 bytes', () => {
        expect(parseInput(exampleInputPart1).length).toBe(25)
      })
    })
  })
  describe('processBytes', () => {
    let input: [number, number][], grid: string[][]
    beforeEach(() => {
      input = parseInput(exampleInputPart1)
      grid = createGrid(7,7)
    })
    describe("when processing the first 12 bytes", () => {
      it("should return the correct grid", () => {
        const actual = processBytes(grid, input, 12)
        expect(gridToString(actual)).toBe(`...#...
..#..#.
....#..
...#..#
..#..#.
.#..#..
#.#....`)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 22', () => {
        expect(part1(exampleInputPart1)).toBe(22)
      })
    })
    describe('real input', () => {
      it('part1 should be 302', () => {
        expect(part1(input)).toBe(302)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 6,1', () => {
        expect(part2(exampleInputPart2)).toBe('6,1')
      })
    })
    describe('real input', () => {
      it.skip('part2 should be "24,32"', () => {
        expect(part2(input)).toBe("24,32")
      })
    })
  })
})
