import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day6Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(41)
      })
    })
    describe('real input', () => {
      it('part1 should be 5409', () => {
        expect(part1(input)).toBe(5409)
      })
      it('part1 should be 5444', () => {
        expect(part1(input)).toBeLessThan(5444)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 6', () => {
        expect(part2(exampleInputPart2)).toBe(6)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
