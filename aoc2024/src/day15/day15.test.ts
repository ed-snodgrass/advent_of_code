import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, smallerInput } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day15Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(smallerInput)).toBe(2028)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(10092)
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
