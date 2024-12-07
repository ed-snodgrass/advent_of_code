import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2, calculateDistances} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day1 tests', () => {
  describe('part1', () => {
    describe("when parseSortedArrays", () => {
      it('returns an array of numbers', () => {
        expect(parseInput(exampleInputPart1)).toEqual([[1,2,3,3,3,4],[3,3,3,4,5,9]])
      })
    })
    describe("when addingDistances", () => {
      it("should find 11", () => {
        const arrays = parseInput(exampleInputPart1)
        expect(calculateDistances(arrays[0], arrays[1])).toBe(11)
      })
    })
    describe("when addingDistances with higher number on right", () => {
      it("should find 11", () => {
        const arrays = parseInput('5   2')
        expect(calculateDistances(arrays[0], arrays[1])).toBe(3)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(11)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBeGreaterThan(970304)
        expect(part1(input)).toBe(1603498)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(31)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(25574739)
      })
    })
  })
})
