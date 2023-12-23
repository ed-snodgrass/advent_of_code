import fs from "fs"
import {part1, part2, exampleInput, drawExterior, createInitialGrid, parseInput} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day18Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('parseInput', () => {
        it('should have 14 entries', () => {
          expect(parseInput(exampleInput)).toHaveLength(14)
        })
      })
      describe('createInitialGrid', () => {
        it('grid should have 10 rows', () => {
          const initialGrid = createInitialGrid(parseInput(exampleInput))
          expect(initialGrid.length).toBe(10)
        })
        it('grid should have 7 columns', () => {
          const initialGrid = createInitialGrid(parseInput(exampleInput))
          expect(initialGrid[0].length).toBe(7)
        })
      })
      describe('when drawing the exterior', () => {
        it('should draw the correct exterior', () => {
          const parsedInput = parseInput(exampleInput)
          expect(drawExterior(parsedInput, createInitialGrid(parsedInput))).toBe(
`#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######`)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(62)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe()
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInput)).toBe()
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
