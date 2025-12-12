import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day10Test tests', () => {
  describe('parseInput', () => {
    describe('exampleInput', () => {
      it('should find 3 machines', () => {
        const grid = parseInput(exampleInputPart1)
        expect(grid).toHaveLength(3)
      })
    })
    describe('input', () => {
      it('should find 156 machines', () => {
        expect(parseInput(input)).toHaveLength(156)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 7', () => {
        expect(part1(exampleInputPart1)).toBe(7)
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
