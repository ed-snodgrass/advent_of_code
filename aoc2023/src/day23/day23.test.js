import fs from "fs"
import {part1, part2, exampleInput, parseInput, findEndVertex, createEdgesForGrid, checkPaths} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

export const getVertex = (grid, row, column) => {
  return (row * grid[row].length) + column
}

describe('Day23Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('checkPaths', () => {
        it('should return 94', () => {
          const grid = parseInput(exampleInput)
          // console.log(getVertex(grid, 3, 10)); // 79
          // console.log(getVertex(grid, 5, 4));// 119
          // console.log(grid[3][10])
          expect(checkPaths(grid)).toBe(94)
        })
      })
      describe('createEdgesForGrid', () => {
        let edges =
        beforeEach(() => {
          edges = createEdgesForGrid(parseInput(exampleInput), false)
        })
        it('should find 1, 24 for first edge', () => {
          expect(edges.get(1)).toEqual([24])
        })
        it('should find 24, 25 for second edge', () => {
          expect(edges.get(24)).toEqual([1, 25])
        })
      })
      it('should find the end at x: 21, y: 22', () => {
        // expect(findEnd(parseInput(exampleInput))).toEqual([22, 21])
        expect(findEndVertex(parseInput(exampleInput))).toEqual(527)
      })
      it('should parseInput into 23 rows', () => {
        expect(parseInput(exampleInput)).toHaveLength(23)
      })
      it('should parseInput into 23 columns', () => {
        expect(parseInput(exampleInput)[0]).toHaveLength(23)
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(94)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(1966)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 154', () => {
        expect(part2(exampleInput)).toBe(154)
      })
    })
    describe('real input', () => {
      // 19879
      it('part2 should be greater than 4598', () => {
        expect(part2(input)).toBeGreaterThan(4598)
      })
    })
  })
})
