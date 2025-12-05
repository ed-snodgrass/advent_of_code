import * as fs from "fs"
import {part1, part2, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day05Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 3', () => {
        expect(part1(exampleInputPart1)).toBe(3)
      })
    })
    describe('real input', () => {
      it('part1 should be 865', () => {
        expect(part1(input)).toBe(865)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 14', () => {
        expect(part2(exampleInputPart2)).toBe(14)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
