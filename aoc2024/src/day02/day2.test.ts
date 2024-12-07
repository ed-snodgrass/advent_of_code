import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, isSafe, isSafeWithDampener } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day2Test tests', () => {
  describe('part1', () => {
    describe("isSafe", () => {
      it("should return true for report [7, 6, 4, 2, 1]", () => {
        const report = [7, 6, 4, 2, 1]
        expect(isSafe(report)).toBe(true)
      })
      it("should return false for report [1, 2, 7, 8, 9]", () => {
        const report = [1, 2, 7, 8, 9]
        expect(isSafe(report)).toBe(false)
      })
      it("should return false for report [9, 7, 6, 2, 1]", () => {
        const report = [9, 7, 6, 2, 1]
        expect(isSafe(report)).toBe(false)
      })
      it("should return false for report [1, 3, 2, 4, 5]", () => {
        const report = [1, 3, 2, 4, 5]
        expect(isSafe(report)).toBe(false)
      })
      it("should return false for report [8, 6, 4, 4, 1]", () => {
        const report = [8, 6, 4, 4, 1]
        expect(isSafe(report)).toBe(false)
      })
      it("should return true for report [1, 3, 6, 7, 9]", () => {
        const report = [1, 3, 6, 7, 9]
        expect(isSafe(report)).toBe(true)
      })
    })
    describe("when parseInput", () => {
      it('returns an array of numbers', () => {
        expect(parseInput(exampleInputPart1)).toEqual([[7, 6, 4, 2, 1], [1, 2, 7, 8, 9], [9, 7, 6, 2, 1], [1, 3, 2, 4, 5], [8, 6, 4, 4, 1], [1, 3, 6, 7, 9]])
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(2)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(472)
      })
    })
  })
  describe('part2', () => {

    describe("isSafeWithDampener", () => {
      it("should return true for report [7, 6, 4, 2, 1]", () => {
        const report = [7, 6, 4, 2, 1]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [1, 2, 7, 8, 9]", () => {
        const report = [1, 2, 7, 8, 9]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [9, 7, 6, 2, 1]", () => {
        const report = [9, 7, 6, 2, 1]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [1, 3, 2, 4, 5]", () => {
        const report = [1, 3, 2, 4, 5]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return true for report [8, 6, 4, 4, 1]", () => {
        const report = [8, 6, 4, 4, 1]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return true for report [1, 3, 6, 7, 9]", () => {
        const report = [1, 3, 6, 7, 9]
        expect(isSafeWithDampener(report)).toBe(true)
      })
    })
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(4)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
