import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, manhattanDistance } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day09Test tests', () => {
  describe('manhattanDistance', () => {
    it('should return 4 for 7,1 and 11,1', () => {
      expect(manhattanDistance([7,1], [11,1])).toBe(4)
    })
    it('should return 4 for 7,1 and 11,1', () => {
      expect(manhattanDistance([11, 1], [2, 5])).toBe(13)
    })
  })

  describe('parseInput', () => {
    describe('exampleInput', () => {
      it('should find 8 redTileLocations', () => {
        const grid = parseInput(exampleInputPart1)
        expect(grid).toHaveLength(8)
      })
    })
    describe('input', () => {
      it('should find 496 redTileLocations', () => {
        expect(parseInput(input)).toHaveLength(496)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 50', () => {
        expect(part1(exampleInputPart1)).toBe(50)
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
