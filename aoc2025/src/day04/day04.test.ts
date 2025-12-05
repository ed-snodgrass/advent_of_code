import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

function isInCorner(grid: string[][], x: number, y: number) {
  if (x === 0 && y === 0) {
    return true
  }
  if (x === grid[0].length - 1 && y === 0) {
    return true
  }
  if (x === 0 && y === grid.length - 1) {
    return true
  }
  return x === grid[grid.length - 1].length - 1 && y === grid.length - 1;

}

function isBlocked(grid: string[][], x: number, y: number) {
  if (isInCorner(grid, x, y)) {
    return false
  }
  return undefined
}

describe('Day04Test tests', () => {
  describe('isBlocked', () => {
    let inputGrid: string[][]
    beforeEach(() => {
      inputGrid = parseInput(exampleInputPart1)
    })
    it('cannot not be blocked for roll in top left corner (y=0 and x=0)', () => {
      expect(isBlocked(inputGrid, 0, 0)).toBe(false)
    })
    it('cannot not be blocked for roll in top right corner (y=0 and x=grid[0].length)', () => {
      expect(isBlocked(inputGrid, inputGrid[0].length - 1, 0)).toBe(false)
    })
    it('cannot not be blocked for roll in bottom left corner (y=inputGrid.length and x=0)', () => {
      expect(isBlocked(inputGrid, 0, inputGrid.length - 1)).toBe(false)
    })
    it('cannot not be blocked for roll in bottom right corner (y=inputGrid.length and x=inputGrid[inputGrid.length])', () => {
      expect(isBlocked(inputGrid, inputGrid[inputGrid.length - 1].length - 1, inputGrid.length - 1)).toBe(false)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 13', () => {
        expect(part1(exampleInputPart1)).toBe(13)
      })
    })
    describe.skip('real input', () => {
      it('part1 should be...', () => {
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
