import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, isBlocked } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


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
    it('should not be blocked for roll at y=0 and x=2', () => {
      expect(isBlocked(inputGrid, 2, 0)).toBe(false)
    })
    it('should not be blocked for roll at y=0 and x=3', () => {
      expect(isBlocked(inputGrid, 3, 0)).toBe(false)
    })
    it('should not be blocked for roll at y=0 and x=5', () => {
      expect(isBlocked(inputGrid, 5, 0)).toBe(false)
    })
    it('should not be blocked for roll at y=0 and x=6', () => {
      expect(isBlocked(inputGrid, 6, 0)).toBe(false)
    })
    it('should be blocked for roll at y=0 and x=7', () => {
      expect(isBlocked(inputGrid, 7, 0)).toBe(true)
    })
    it('should not be blocked for roll at y=0 and x=8', () => {
      expect(isBlocked(inputGrid, 8, 0)).toBe(false)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 13', () => {
        expect(part1(exampleInputPart1)).toBe(13)
      })
    })
    describe('real input', () => {
      it('part1 should be 1433', () => {
        expect(part1(input)).toBe(1433)
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
