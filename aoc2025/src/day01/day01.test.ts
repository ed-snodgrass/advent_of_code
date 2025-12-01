import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day01 tests', () => {
  describe('part1', () => {

    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(null)
      })
    })
    describe.skip('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(null)
      })
    })
  })
  describe.skip('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
