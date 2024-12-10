import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  determineCalibrationPossibility, retryFailedEquations,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day7Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe("determineCalibrationPossibility tests", () => {
        describe("when determining calibration possibility for 190: 10 19", () => {
          it("should return true", () => {
            expect(determineCalibrationPossibility(190, [10,19])).toBe(true)
          })
        })
        describe("when determining calibration possibility for 3267: 81 40 27", () => {
          it("should return true", () => {
            expect(determineCalibrationPossibility(3267, [81, 40, 27])).toBe(true)
          })
        })
        describe("when determining calibration possibility for 292: 11 6 16 20", () => {
          it("should return true", () => {
            expect(determineCalibrationPossibility(292, [11, 6, 16, 20])).toBe(true)
          })
        })
        describe("when determining calibration possibility for 83: 17 5", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(83, [17, 5])).toBe(false)
          })
        })
        describe("when determining calibration possibility for 156: 15 6", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(156, [15, 6])).toBe(false)
          })
        })
        describe("when determining calibration possibility for 7290: 6 8 6 15", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(7290, [6, 8, 6, 15])).toBe(false)
          })
        })
        describe("when determining calibration possibility for 161011: 16 10 13", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(161011, [16, 10, 3])).toBe(false)
          })
        })
        describe("when determining calibration possibility for 192: 17 8 14", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(192, [17, 8, 14])).toBe(false)
          })
        })
        describe("when determining calibration possibility for 21037: 9 7 18 13", () => {
          it("should return false", () => {
            expect(determineCalibrationPossibility(21037, [9, 7, 18, 13])).toBe(false)
          })
        })
      })
      describe("retryFailedEquation tests", () => {
        describe("when determining calibration possibility for 156: 15 6", () => {
          it("should return true", () => {
            expect(retryFailedEquations(156, [15, 6])).toBe(true)
          })
        })
        describe("when determining calibration possibility for 7290: 6 8 6 15", () => {
          it("should return true", () => {
            expect(retryFailedEquations(7290, [6, 8, 6, 15])).toBe(true)
          })
        })
        describe("when determining calibration possibility for 192: 17 8 14", () => {
          it("should return true", () => {
            expect(retryFailedEquations(192, [17, 8, 14])).toBe(true)
          })
        })
      })

      it('part1 should be 3749', () => {
        expect(part1(exampleInputPart1)).toBe(3749)
      })
    })
    describe('real input', () => {
      it('part1 should be 12839601725877', () => {
        expect(part1(input)).toBe(12839601725877)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 11387', () => {
        expect(part2(exampleInputPart2)).toBe(11387)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be 149956401519484', () => {
        expect(part2(input)).toBe(149956401519484)
      })
    })
  })
})
