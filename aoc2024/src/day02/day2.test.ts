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
      it('part2 should be 4', () => {
        expect(part2(exampleInputPart2)).toBe(4)
      })
    })
    describe('real input', () => {
      it('part2 should be less than 585', () => {
        expect(part2(input)).toBeLessThan(585)
      })
      it('part2 should be less than 572', () => {
        expect(part2(input)).toBeLessThan(572)
      })
      it('part2 should be greater than 508', () => {
        expect(part2(input)).toBeGreaterThan(508)
      })
      it('part2 should not be 513', () => {
        expect(part2(input)).not.toBe(513)
      })
      it('part2 should not be 518', () => {
        expect(part2(input)).not.toBe(518)
      })
      it('part2 should not be 519', () => {
        expect(part2(input)).not.toBe(519)
      })
      it('part2 should not be 510', () => {
        expect(part2(input)).not.toBe(510)
      })
      it('part2 should not be 520', () => {
        expect(part2(input)).toBe(520)
      })
      it("should return false for report [59,61,59,61,63]", () => {
        const report = [59,61,59,61,63]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [5,8,9,12,11,14,15,15]", () => {
        const report = [5,8,9,12,11,14,15,15]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [87,90,91,92,89,91,95]", () => {
        const report = [87,90,91,92,89,91,95]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [36,38,40,43,40,41,47]", () => {
        const report = [36,38,40,43,40,41,47]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [40,41,41,43,45,43]", () => {
        const report = [40,41,41,43,45,43]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [32,34,36,36,38,40,40]", () => {
        const report = [32,34,36,36,38,40,40]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [2,4,6,6,7,11]", () => {
        const report = [2,4,6,6,7,11]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [1,2,5,5,7,12]", () => {
        const report = [1,2,5,5,7,12]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [76,79,81,85,88]", () => {
        const report = [76,79,81,85,88]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [34,37,38,40,42,46,43]", () => {
        const report = [34,37,38,40,42,46,43]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [33,34,35,39,39]", () => {
        const report = [33,34,35,39,39]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [66,67,70,74,77,81]", () => {
        const report = [66,67,70,74,77,81]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,80,84,85,86,87,89,96]", () => {
        const report = [77,80,84,85,86,87,89,96]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [29,31,34,40,42,45,47,48]", () => {
        const report = [29,31,34,40,42,45,47,48]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [30,32,34,36,39,46,47,44]", () => {
        const report = [30,32,34,36,39,46,47,44]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [37,39,42,49,50,50]", () => {
        const report = [37,39,42,49,50,50]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [76,78,80,83,85,86,93,97]", () => {
        const report = [76,78,80,83,85,86,93,97]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [56,57,58,65,68,75]", () => {
        const report = [56,57,58,65,68,75]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [43,40,41,44,45,46,48,51]", () => {
        const report = [43,40,41,44,45,46,48,51]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [35,33,34,37,38,36]", () => {
        const report = [35,33,34,37,38,36]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [68,67,70,73,76,76]", () => {
        const report = [68,67,70,73,76,76]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [87,86,87,89,92,96]", () => {
        const report = [87,86,87,89,92,96]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [19,18,21,24,26,27,34]", () => {
        const report = [19,18,21,24,26,27,34]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [80,78,79,81,78,81]", () => {
        const report = [80,78,79,81,78,81]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [47,44,42,44,45,44]", () => {
        const report = [47,44,42,44,45,44]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [27,26,28,31,28,28]", () => {
        const report = [27,26,28,31,28,28]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [89,88,91,88,90,92,93,97]", () => {
        const report = [89,88,91,88,90,92,93,97]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [64,63,66,63,66,68,74]", () => {
        const report = [64,63,66,63,66,68,74]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [40,39,40,43,43,46,49]", () => {
        const report = [40,39,40,43,43,46,49]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [43,41,41,44,42]", () => {
        const report = [43,41,41,44,42]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [56,55,58,61,61,62,63,63]", () => {
        const report = [56,55,58,61,61,62,63,63]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [48,45,45,48,50,53,57]", () => {
        const report = [48,45,45,48,50,53,57]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [35,33,36,39,39,45]", () => {
        const report = [35,33,36,39,39,45]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [67,65,68,72,75,76,78,79]", () => {
        const report = [67,65,68,72,75,76,78,79]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [32,29,30,34,37,40,43,40]", () => {
        const report = [32,29,30,34,37,40,43,40]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [66,64,68,71,72,72]", () => {
        const report = [66,64,68,71,72,72]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [78,75,78,79,83,84,87,91]", () => {
        const report = [78,75,78,79,83,84,87,91]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [11,8,12,13,20]", () => {
        const report = [11,8,12,13,20]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [73,70,72,75,77,78,83,86]", () => {
        const report = [73,70,72,75,77,78,83,86]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [59,56,61,63,61]", () => {
        const report = [59,56,61,63,61]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [60,58,59,60,61,66,66]", () => {
        const report = [60,58,59,60,61,66,66]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [76,75,80,82,86]", () => {
        const report = [76,75,80,82,86]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [64,63,70,72,75,80]", () => {
        const report = [64,63,70,72,75,80]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [2,2,4,5,7,9]", () => {
        const report = [2,2,4,5,7,9]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [64,64,66,69,72,75,73]", () => {
        const report = [64,64,66,69,72,75,73]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [64,64,65,67,69,71,75]", () => {
        const report = [64,64,65,67,69,71,75]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,77,79,81,84,91]", () => {
        const report = [77,77,79,81,84,91]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,77,76,77,78,80]", () => {
        const report = [77,77,76,77,78,80]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [43,43,45,46,43,44,47,46]", () => {
        const report = [43,43,45,46,43,44,47,46]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [57,57,59,57,57]", () => {
        const report = [57,57,59,57,57]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [9,9,12,9,11,14,18]", () => {
        const report = [9,9,12,9,11,14,18]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [69,69,70,71,72,71,74,81]", () => {
        const report = [69,69,70,71,72,71,74,81]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [50,50,53,54,54,57]", () => {
        const report = [50,50,53,54,54,57]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [31,31,34,34,35,37,38,35]", () => {
        const report = [31,31,34,34,35,37,38,35]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [10,10,12,15,16,19,19,19]", () => {
        const report = [10,10,12,15,16,19,19,19]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [64,64,65,65,66,70]", () => {
        const report = [64,64,65,65,66,70]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [49,49,51,51,58]", () => {
        const report = [49,49,51,51,58]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [20,20,22,26,28]", () => {
        const report = [20,20,22,26,28]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [75,75,79,80,81,84,83]", () => {
        const report = [75,75,79,80,81,84,83]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [63,63,67,70,72,74,76,76]", () => {
        const report = [63,63,67,70,72,74,76,76]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [86,86,87,90,94,98]", () => {
        const report = [86,86,87,90,94,98]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [33,33,35,39,42,44,49]", () => {
        const report = [33,33,35,39,42,44,49]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [70,70,73,79,80]", () => {
        const report = [70,70,73,79,80]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    //   it("should return isAdjacent for report [65,65,66,73,75,78,79,78]", () => {
    //     const report = [65,65,66,73,75,78,79,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [85,85,90,91,94,94]", () => {
    //     const report = [85,85,90,91,94,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [31,31,38,39,42,45,49]", () => {
    //     const report = [31,31,38,39,42,45,49]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [22,22,25,32,34,35,40]", () => {
    //     const report = [22,22,25,32,34,35,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [8,12,14,15,17,18,20,21]", () => {
    //     const report = [8,12,14,15,17,18,20,21]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [33,37,38,39,38]", () => {
    //     const report = [33,37,38,39,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [34,38,40,42,43,44,44]", () => {
    //     const report = [34,38,40,42,43,44,44]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [49,53,54,57,61]", () => {
    //     const report = [49,53,54,57,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [30,34,36,38,41,47]", () => {
    //     const report = [30,34,36,38,41,47]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,83,84,81,83]", () => {
    //     const report = [79,83,84,81,83]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [90,94,93,95,93]", () => {
    //     const report = [90,94,93,95,93]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [88,92,94,95,94,94]", () => {
    //     const report = [88,92,94,95,94,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [18,22,25,23,25,28,32]", () => {
    //     const report = [18,22,25,23,25,28,32]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [71,75,74,75,82]", () => {
    //     const report = [71,75,74,75,82]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [80,84,87,87,88,91,92]", () => {
    //     const report = [80,84,87,87,88,91,92]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [45,49,51,51,52,50]", () => {
    //     const report = [45,49,51,51,52,50]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [40,44,45,48,48,49,49]", () => {
    //     const report = [40,44,45,48,48,49,49]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,25,27,29,29,33]", () => {
    //     const report = [21,25,27,29,29,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,29,30,31,31,33,38]", () => {
    //     const report = [25,29,30,31,31,33,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [49,53,57,58,61]", () => {
    //     const report = [49,53,57,58,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,74,75,79,82,80]", () => {
    //     const report = [70,74,75,79,82,80]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [64,68,72,73,74,76,76]", () => {
    //     const report = [64,68,72,73,74,76,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [50,54,55,56,58,61,65,69]", () => {
    //     const report = [50,54,55,56,58,61,65,69]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [59,63,64,66,68,72,73,80]", () => {
    //     const report = [59,63,64,66,68,72,73,80]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,74,77,78,79,84,87]", () => {
    //     const report = [70,74,77,78,79,84,87]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [12,16,23,25,26,24]", () => {
    //     const report = [12,16,23,25,26,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [8,12,13,16,22,23,24,24]", () => {
    //     const report = [8,12,13,16,22,23,24,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [11,15,18,19,21,23,29,33]", () => {
    //     const report = [11,15,18,19,21,23,29,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [69,73,76,77,82,85,92]", () => {
    //     const report = [69,73,76,77,82,85,92]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [10,16,17,20,23]", () => {
    //     const report = [10,16,17,20,23]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [11,18,19,22,25,26,25]", () => {
    //     const report = [11,18,19,22,25,26,25]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [45,51,54,55,55]", () => {
    //     const report = [45,51,54,55,55]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [19,25,27,30,31,32,33,37]", () => {
    //     const report = [19,25,27,30,31,32,33,37]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [20,27,30,31,33,35,38,43]", () => {
    //     const report = [20,27,30,31,33,35,38,43]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [87,93,96,94,96]", () => {
    //     const report = [87,93,96,94,96]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,84,87,88,89,87,86]", () => {
    //     const report = [79,84,87,88,89,87,86]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,44,43,45,47,49,52,52]", () => {
    //     const report = [38,44,43,45,47,49,52,52]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,30,31,29,33]", () => {
    //     const report = [25,30,31,29,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [18,25,27,28,26,31]", () => {
    //     const report = [18,25,27,28,26,31]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,30,30,33,34]", () => {
    //     const report = [25,30,30,33,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [8,15,17,20,20,17]", () => {
    //     const report = [8,15,17,20,20,17]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [24,29,31,31,31]", () => {
    //     const report = [24,29,31,31,31]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [20,27,30,30,34]", () => {
    //     const report = [20,27,30,30,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [55,62,63,66,66,72]", () => {
    //     const report = [55,62,63,66,66,72]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [2,8,11,14,18,21,23,24]", () => {
    //     const report = [2,8,11,14,18,21,23,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [33,39,43,46,48,50,51,48]", () => {
    //     const report = [33,39,43,46,48,50,51,48]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [22,29,30,34,34]", () => {
    //     const report = [22,29,30,34,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,84,88,90,93,95,99]", () => {
    //     const report = [79,84,88,90,93,95,99]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [61,66,70,72,74,81]", () => {
    //     const report = [61,66,70,72,74,81]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [34,40,41,44,45,46,52,54]", () => {
    //     const report = [34,40,41,44,45,46,52,54]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [68,73,74,79,77]", () => {
    //     const report = [68,73,74,79,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,28,35,37,40,40]", () => {
    //     const report = [21,28,35,37,40,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [47,53,59,60,64]", () => {
    //     const report = [47,53,59,60,64]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [57,62,63,66,71,78]", () => {
    //     const report = [57,62,63,66,71,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [14,12,9,6,4,3,5]", () => {
    //     const report = [14,12,9,6,4,3,5]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [46,44,43,42,40,37,37]", () => {
    //     const report = [46,44,43,42,40,37,37]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [76,75,72,71,68,64]", () => {
    //     const report = [76,75,72,71,68,64]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [54,53,52,51,45]", () => {
    //     const report = [54,53,52,51,45]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [69,68,71,69,68]", () => {
    //     const report = [69,68,71,69,68]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [64,63,64,63,60,58,56,58]", () => {
    //     const report = [64,63,64,63,60,58,56,58]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [77,76,75,76,76]", () => {
    //     const report = [77,76,75,76,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [17,16,17,16,13,11,7]", () => {
    //     const report = [17,16,17,16,13,11,7]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,37,34,35,28]", () => {
    //     const report = [38,37,34,35,28]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [60,58,58,55,52]", () => {
    //     const report = [60,58,58,55,52]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,67,64,61,61,59,62]", () => {
    //     const report = [70,67,64,61,61,59,62]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [95,93,91,90,89,89,89]", () => {
    //     const report = [95,93,91,90,89,89,89]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [72,71,69,66,66,62]", () => {
    //     const report = [72,71,69,66,66,62]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [81,80,80,77,74,73,72,67]", () => {
    //     const report = [81,80,80,77,74,73,72,67]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [16,13,12,8,7,6,5]", () => {
    //     const report = [16,13,12,8,7,6,5]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,24,21,19,17,15,11,14]", () => {
    //     const report = [25,24,21,19,17,15,11,14]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [19,18,14,12,12]", () => {
    //     const report = [19,18,14,12,12]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [66,65,64,63,59,55]", () => {
    //     const report = [66,65,64,63,59,55]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [34,31,27,24,21,18,11]", () => {
    //     const report = [34,31,27,24,21,18,11]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [99,96,94,87,84]", () => {
    //     const report = [99,96,94,87,84]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [46,43,41,34,33,35]", () => {
    //     const report = [46,43,41,34,33,35]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [14,11,9,2,2]", () => {
    //     const report = [14,11,9,2,2]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [57,55,48,45,43,41,38,34]", () => {
    //     const report = [57,55,48,45,43,41,38,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [69,66,64,61,55,53,46]", () => {
    //     const report = [69,66,64,61,55,53,46]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [69,70,69,66,63,60,58]", () => {
    //     const report = [69,70,69,66,63,60,58]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [61,62,60,59,58,55,54,57]", () => {
    //     const report = [61,62,60,59,58,55,54,57]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [69,70,67,64,63,61,61]", () => {
    //     const report = [69,70,67,64,63,61,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [29,31,30,27,26,25,22,18]", () => {
    //     const report = [29,31,30,27,26,25,22,18]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [63,65,62,59,57,54,47]", () => {
    //     const report = [63,65,62,59,57,54,47]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [31,33,32,33,31,29]", () => {
    //     const report = [31,33,32,33,31,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [94,95,92,89,91,94]", () => {
    //     const report = [94,95,92,89,91,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [45,46,45,42,40,41,41]", () => {
    //     const report = [45,46,45,42,40,41,41]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,71,68,66,63,65,61]", () => {
    //     const report = [70,71,68,66,63,65,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [94,95,94,96,93,92,90,84]", () => {
    //     const report = [94,95,94,96,93,92,90,84]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [10,12,12,9,7,4,2]", () => {
    //     const report = [10,12,12,9,7,4,2]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [33,35,35,32,29,30]", () => {
    //     const report = [33,35,35,32,29,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [74,77,74,74,74]", () => {
    //     const report = [74,77,74,74,74]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [32,34,34,32,28]", () => {
    //     const report = [32,34,34,32,28]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [72,73,73,72,69,64]", () => {
    //     const report = [72,73,73,72,69,64]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [59,60,58,57,53,50,47]", () => {
    //     const report = [59,60,58,57,53,50,47]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,82,79,75,74,73,75]", () => {
    //     const report = [79,82,79,75,74,73,75]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,41,39,38,37,36,32,32]", () => {
    //     const report = [38,41,39,38,37,36,32,32]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [74,75,73,69,65]", () => {
    //     const report = [74,75,73,69,65]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [43,44,40,39,33]", () => {
    //     const report = [43,44,40,39,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [52,55,54,52,45,42,40,37]", () => {
    //     const report = [52,55,54,52,45,42,40,37]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [28,29,24,21,20,21]", () => {
    //     const report = [28,29,24,21,20,21]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [50,52,51,50,47,46,40,40]", () => {
    //     const report = [50,52,51,50,47,46,40,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [15,17,10,9,7,3]", () => {
    //     const report = [15,17,10,9,7,3]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,23,16,15,9]", () => {
    //     const report = [21,23,16,15,9]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [39,39,36,35,32]", () => {
    //     const report = [39,39,36,35,32]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [95,95,93,90,87,90]", () => {
    //     const report = [95,95,93,90,87,90]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [49,49,46,43,42,42]", () => {
    //     const report = [49,49,46,43,42,42]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [29,29,28,26,22]", () => {
    //     const report = [29,29,28,26,22]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [31,31,30,27,25,22,15]", () => {
    //     const report = [31,31,30,27,25,22,15]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [15,15,13,12,14,11,10]", () => {
    //     const report = [15,15,13,12,14,11,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [77,77,76,79,77,75,78]", () => {
        const report = [77,77,76,79,77,75,78]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [42,42,41,42,39,38,35,35]", () => {
        const report = [42,42,41,42,39,38,35,35]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [7,7,8,6,2]", () => {
        const report = [7,7,8,6,2]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [96,96,94,91,92,90,84]", () => {
        const report = [96,96,94,91,92,90,84]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [73,73,73,72,71]", () => {
        const report = [73,73,73,72,71]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [57,57,56,56,53,51,49,52]", () => {
        const report = [57,57,56,56,53,51,49,52]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [57,57,56,56,53,51,49,52]", () => {
        const report = [57,57,56,56,53,51,49,52]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [87,87,84,82,81,81,79,79]", () => {
        const report = [87,87,84,82,81,81,79,79]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [38,38,35,33,31,28,28,24]", () => {
        const report = [38,38,35,33,31,28,28,24]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [62,62,62,60,55]", () => {
        const report = [62,62,62,60,55]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [35,35,32,31,27,26]", () => {
        const report = [35,35,32,31,27,26]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [78,78,75,72,71,67,66,69]", () => {
        const report = [78,78,75,72,71,67,66,69]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [47,47,44,40,40]", () => {
        const report = [47,47,44,40,40]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [72,72,71,69,67,63,61,57]", () => {
        const report = [72,72,71,69,67,63,61,57]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [48,48,46,42,35]", () => {
        const report = [48,48,46,42,35]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [65,65,60,58,56,55,54]", () => {
        const report = [65,65,60,58,56,55,54]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [92,92,89,87,86,81,83]", () => {
        const report = [92,92,89,87,86,81,83]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [92,92,89,87,86,81,83]", () => {
        const report = [92,92,89,87,86,81,83]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [66,66,64,61,58,52,52]", () => {
        const report = [66,66,64,61,58,52,52]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [29,29,26,25,23,22,17,13]", () => {
        const report = [29,29,26,25,23,22,17,13]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [47,47,42,40,33]", () => {
        const report = [47,47,42,40,33]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    //   it("should return isAdjacent for report [50,46,43,41,39,38,35,34]", () => {
    //     const report = [50,46,43,41,39,38,35,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [39,35,34,32,30,27,28]", () => {
    //     const report = [39,35,34,32,30,27,28]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,17,16,15,12,10,9,9]", () => {
    //     const report = [21,17,16,15,12,10,9,9]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [71,67,66,65,61]", () => {
    //     const report = [71,67,66,65,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,34,31,29,28,22]", () => {
    //     const report = [38,34,31,29,28,22]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [87,83,80,81,78]", () => {
    //     const report = [87,83,80,81,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [94,90,92,90,91]", () => {
    //     const report = [94,90,92,90,91]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [83,79,78,75,78,75,75]", () => {
    //     const report = [83,79,78,75,78,75,75]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [36,32,35,33,30,29,27,23]", () => {
    //     const report = [36,32,35,33,30,29,27,23]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [87,83,84,82,76]", () => {
    //     const report = [87,83,84,82,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [77,73,70,69,69,68,66,63]", () => {
    //     const report = [77,73,70,69,69,68,66,63]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })    //   it("should return true for report [94,90,89,87,87,85,86]", () => {
    //     const report = [94,90,89,87,87,85,86]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [63,59,58,57,54,51,51,51]", () => {
    //     const report = [63,59,58,57,54,51,51,51]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [32,28,28,27,23]", () => {
    //     const report = [32,28,28,27,23]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [36,32,31,29,29,28,23]", () => {
    //     const report = [36,32,31,29,29,28,23]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [42,38,34,31,29,28]", () => {
    //     const report = [42,38,34,31,29,28]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [33,29,27,25,21,18,20]", () => {
    //     const report = [33,29,27,25,21,18,20]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [29,25,24,21,17,16,13,13]", () => {
    //     const report = [29,25,24,21,17,16,13,13]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [90,86,85,82,78,74]", () => {
    //     const report = [90,86,85,82,78,74]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [68,64,62,58,56,51]", () => {
    //     const report = [68,64,62,58,56,51]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [73,69,66,61,58,56]", () => {
    //     const report = [73,69,66,61,58,56]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [93,89,87,85,82,75,72,74]", () => {
    //     const report = [93,89,87,85,82,75,72,74]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [80,76,73,72,69,68,62,62]", () => {
    //     const report = [80,76,73,72,69,68,62,62]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [40,36,34,32,30,25,24,20]", () => {
    //     const report = [40,36,34,32,30,25,24,20]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [55,51,50,48,46,40,39,33]", () => {
    //     const report = [55,51,50,48,46,40,39,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,20,19,18,17,14]", () => {
    //     const report = [25,20,19,18,17,14]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [98,91,89,87,86,84,82,83]", () => {
    //     const report = [98,91,89,87,86,84,82,83]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [58,52,51,49,49]", () => {
    //     const report = [58,52,51,49,49]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [75,70,69,67,65,61]", () => {
    //     const report = [75,70,69,67,65,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [91,84,83,82,80,78,76,69]", () => {
    //     const report = [91,84,83,82,80,78,76,69]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [37,30,32,30,28,26,23,22]", () => {
    //     const report = [37,30,32,30,28,26,23,22]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [48,42,40,42,41,39,40]", () => {
    //     const report = [48,42,40,42,41,39,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [75,69,68,67,66,64,67,67]", () => {
    //     const report = [75,69,68,67,66,64,67,67]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [90,85,86,85,83,82,79,75]", () => {
    //     const report = [90,85,86,85,83,82,79,75]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [34,29,32,30,24]", () => {
    //     const report = [34,29,32,30,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [93,87,86,84,83,83,82]", () => {
    //     const report = [93,87,86,84,83,83,82]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [94,87,84,83,83,86]", () => {
    //     const report = [94,87,84,83,83,86]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [19,14,14,13,12,12]", () => {
    //     const report = [19,14,14,13,12,12]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [94,89,87,87,84,80]", () => {
    //     const report = [94,89,87,87,84,80]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [60,53,50,47,44,44,37]", () => {
    //     const report = [60,53,50,47,44,44,37]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [41,34,31,27,24,21]", () => {
    //     const report = [41,34,31,27,24,21]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [31,25,23,19,20]", () => {
    //     const report = [31,25,23,19,20]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,74,72,68,67,66,63,63]", () => {
    //     const report = [79,74,72,68,67,66,63,63]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [28,23,21,20,19,17,13,9]", () => {
    //     const report = [28,23,21,20,19,17,13,9]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [97,91,87,85,82,80,73]", () => {
    //     const report = [97,91,87,85,82,80,73]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [96,91,88,86,81,78,75,72]", () => {
    //     const report = [96,91,88,86,81,78,75,72]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [58,51,48,41,38,40]", () => {
    //     const report = [58,51,48,41,38,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [35,28,25,22,16,13,13]", () => {
    //     const report = [35,28,25,22,16,13,13]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [45,40,35,34,30]", () => {
    //     const report = [45,40,35,34,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,33,30,23,21,14]", () => {
    //     const report = [38,33,30,23,21,14]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [18,20,22,25,27,28,25]", () => {
    //     const report = [18,20,22,25,27,28,25]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [78,80,82,83,86,89,90,90]", () => {
    //     const report = [78,80,82,83,86,89,90,90]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [1,3,6,9,13]", () => {
    //     const report = [1,3,6,9,13]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,24,25,28,30,31,33,39]", () => {
    //     const report = [21,24,25,28,30,31,33,39]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [90,91,93,92,94]", () => {
    //     const report = [90,91,93,92,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [47,49,52,50,51,54,56,54]", () => {
    //     const report = [47,49,52,50,51,54,56,54]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [25,28,30,33,34,33,33]", () => {
    //     const report = [25,28,30,33,34,33,33]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [20,21,24,25,26,27,25,29]", () => {
    //     const report = [20,21,24,25,26,27,25,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [77,78,77,79,84]", () => {
    //     const report = [77,78,77,79,84]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [64,67,68,71,72,72,75]", () => {
    //     const report = [64,67,68,71,72,72,75]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [13,15,18,21,21,19]", () => {
    //     const report = [13,15,18,21,21,19]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [33,35,37,37,38,38]", () => {
    //     const report = [33,35,37,37,38,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [15,17,20,22,23,26,26,30]", () => {
    //     const report = [15,17,20,22,23,26,26,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [56,57,58,58,64]", () => {
    //     const report = [56,57,58,58,64]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [20,21,24,28,29,31]", () => {
    //     const report = [20,21,24,28,29,31]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [41,43,47,50,49]", () => {
    //     const report = [41,43,47,50,49]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [83,86,90,93,93]", () => {
    //     const report = [83,86,90,93,93]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [8,11,15,18,20,24]", () => {
    //     const report = [8,11,15,18,20,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [83,84,88,90,92,99]", () => {
    //     const report = [83,84,88,90,92,99]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [54,55,58,59,65,68]", () => {
    //     const report = [54,55,58,59,65,68]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [60,62,63,69,70,71,70]", () => {
    //     const report = [60,62,63,69,70,71,70]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [57,58,65,67,70,70]", () => {
    //     const report = [57,58,65,67,70,70]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [54,55,62,64,67,70,74]", () => {
    //     const report = [54,55,62,64,67,70,74]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [17,18,19,21,24,30,32,38]", () => {
    //     const report = [17,18,19,21,24,30,32,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [30,29,31,34,35,37,39]", () => {
    //     const report = [30,29,31,34,35,37,39]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [27,24,25,26,27,30,29]", () => {
    //     const report = [27,24,25,26,27,30,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [9,6,8,10,11,14,17,17]", () => {
    //     const report = [9,6,8,10,11,14,17,17]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [32,31,32,35,37,41]", () => {
    //     const report = [32,31,32,35,37,41]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [58,55,57,59,60,65]", () => {
    //     const report = [58,55,57,59,60,65]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [25,22,25,26,25,27,30,32]", () => {
        const report = [25,22,25,26,25,27,30,32]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    //   it("should return true for report [73,72,74,76,79,81,79,77]", () => {
    //     const report = [73,72,74,76,79,81,79,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [5,2,5,8,10,12,10,10]", () => {
    //     const report = [5,2,5,8,10,12,10,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [87,85,87,90,91,93,90,94]", () => {
    //     const report = [87,85,87,90,91,93,90,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [38,37,38,40,41,42,39,45]", () => {
    //     const report = [38,37,38,40,41,42,39,45]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [37,35,37,40,40,41]", () => {
    //     const report = [37,35,37,40,40,41]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [14,11,11,14,16,18,16]", () => {
    //     const report = [14,11,11,14,16,18,16]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [71,68,71,71,71]", () => {
        const report = [71,68,71,71,71]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [29,26,26,29,30,33,37]", () => {
        const report = [29,26,26,29,30,33,37]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [69,68,68,71,74,76,79,85]", () => {
        const report = [69,68,68,71,74,76,79,85]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [43,40,44,46,47,48,50]", () => {
        const report = [43,40,44,46,47,48,50]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [46,45,47,48,50,54,57,55]", () => {
        const report = [46,45,47,48,50,54,57,55]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [46,45,47,48,50,54,57,55]", () => {
        const report = [46,45,47,48,50,54,57,55]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [23,22,26,29,29]", () => {
        const report = [23,22,26,29,29]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    //   it("should return isAdjacent for report [23,22,26,29,29]", () => {
    //     const report = [23,22,26,29,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [36,34,36,40,42,43,47]", () => {
    //     const report = [36,34,36,40,42,43,47]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [13,10,12,16,18,19,25]", () => {
    //     const report = [13,10,12,16,18,19,25]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [64,63,66,67,68,75,76,78]", () => {
    //     const report = [64,63,66,67,68,75,76,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [72,70,75,77,79,80,77]", () => {
    //     const report = [72,70,75,77,79,80,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [12,10,11,16,19,19]", () => {
    //     const report = [12,10,11,16,19,19]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [64,62,64,69,70,73,75,79]", () => {
    //     const report = [64,62,64,69,70,73,75,79]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [50,48,51,54,61,64,66,71]", () => {
    //     const report = [50,48,51,54,61,64,66,71]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [12,12,14,16,18]", () => {
    //     const report = [12,12,14,16,18]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [40,40,42,45,47,50,49]", () => {
    //     const report = [40,40,42,45,47,50,49]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [62,62,65,67,67]", () => {
    //     const report = [62,62,65,67,67]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,70,72,74,78]", () => {
    //     const report = [70,70,72,74,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [10,10,11,12,13,14,15,20]", () => {
    //     const report = [10,10,11,12,13,14,15,20]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [77,77,74,75,77]", () => {
    //     const report = [77,77,74,75,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [40,40,38,39,38]", () => {
    //     const report = [40,40,38,39,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [86,86,87,85,85]", () => {
    //     const report = [86,86,87,85,85]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [48,48,49,46,50]", () => {
    //     const report = [48,48,49,46,50]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [7,7,10,7,8,13]", () => {
    //     const report = [7,7,10,7,8,13]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [19,19,20,20,21,24]", () => {
    //     const report = [19,19,20,20,21,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [20,20,23,26,27,27,26]", () => {
    //     const report = [20,20,23,26,27,27,26]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [40,40,42,45,46,46,46]", () => {
    //     const report = [40,40,42,45,46,46,46]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [88,88,90,90,91,95]", () => {
    //     const report = [88,88,90,90,91,95]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [65,65,65,67,69,76]", () => {
    //     const report = [65,65,65,67,69,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [81,81,83,87,88,90]", () => {
    //     const report = [81,81,83,87,88,90]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [48,48,49,51,55,57,54]", () => {
    //     const report = [48,48,49,51,55,57,54]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [35,35,39,42,44,45,48,48]", () => {
    //     const report = [35,35,39,42,44,45,48,48]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [70,70,73,75,78,79,83,87]", () => {
    //     const report = [70,70,73,75,78,79,83,87]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [5,5,9,12,17]", () => {
    //     const report = [5,5,9,12,17]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [10,10,11,12,15,21,22]", () => {
    //     const report = [10,10,11,12,15,21,22]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [30,30,37,38,39,42,41]", () => {
    //     const report = [30,30,37,38,39,42,41]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [77,77,82,84,87,90,93,93]", () => {
    //     const report = [77,77,82,84,87,90,93,93]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [11,11,13,20,24]", () => {
    //     const report = [11,11,13,20,24]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [59,59,61,66,71]", () => {
    //     const report = [59,59,61,66,71]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [12,16,17,20,22,24,25]", () => {
    //     const report = [12,16,17,20,22,24,25]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [52,56,57,59,61,62,64,61]", () => {
    //     const report = [52,56,57,59,61,62,64,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,83,86,88,91,91]", () => {
    //     const report = [79,83,86,88,91,91]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [16,20,21,23,27]", () => {
    //     const report = [16,20,21,23,27]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [72,76,79,82,84,89]", () => {
    //     const report = [72,76,79,82,84,89]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [85,89,86,87,89]", () => {
    //     const report = [85,89,86,87,89]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [92,96,98,96,94]", () => {
    //     const report = [92,96,98,96,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [32,36,37,34,35,37,38,38]", () => {
    //     const report = [32,36,37,34,35,37,38,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [56,60,61,58,61,62,65,69]", () => {
    //     const report = [56,60,61,58,61,62,65,69]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [78,82,80,81,87]", () => {
    //     const report = [78,82,80,81,87]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [47,51,53,54,57,59,59,61]", () => {
    //     const report = [47,51,53,54,57,59,59,61]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [53,57,57,59,60,62,60]", () => {
    //     const report = [53,57,57,59,60,62,60]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [73,77,77,80,81,81]", () => {
    //     const report = [73,77,77,80,81,81]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [83,87,88,89,90,90,94]", () => {
    //     const report = [83,87,88,89,90,90,94]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [78,82,85,86,86,93]", () => {
    //     const report = [78,82,85,86,86,93]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [37,41,42,43,46,48,52,53]", () => {
    //     const report = [37,41,42,43,46,48,52,53]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [71,75,76,77,81,83,84,82]", () => {
    //     const report = [71,75,76,77,81,83,84,82]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [78,82,86,88,91,91]", () => {
    //     const report = [78,82,86,88,91,91]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [20,24,27,29,33,37]", () => {
    //     const report = [20,24,27,29,33,37]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [54,58,59,61,64,65,69,76]", () => {
    //     const report = [54,58,59,61,64,65,69,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [52,56,59,60,62,69,71]", () => {
    //     const report = [52,56,59,60,62,69,71]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [8,12,14,19,18]", () => {
    //     const report = [8,12,14,19,18]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [52,56,59,62,67,67]", () => {
    //     const report = [52,56,59,62,67,67]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [69,73,74,79,83]", () => {
    //     const report = [69,73,74,79,83]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [48,52,54,56,57,59,64,69]", () => {
    //     const report = [48,52,54,56,57,59,64,69]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return true for report [84,91,92,93,95]", () => {
        const report = [84,91,92,93,95]
        expect(isSafeWithDampener(report)).toBe(true)
      })
    //   it("should return true for report [43,48,50,52,54,51]", () => {
    //     const report = [43,48,50,52,54,51]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [76,81,83,85,88,90,90]", () => {
    //     const report = [76,81,83,85,88,90,90]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [18,25,28,30,31,34,38]", () => {
    //     const report = [18,25,28,30,31,34,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [49,55,58,61,63,68]", () => {
    //     const report = [49,55,58,61,63,68]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [26,33,30,32,34,36,39]", () => {
    //     const report = [26,33,30,32,34,36,39]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [10,17,14,17,15]", () => {
        const report = [10,17,14,17,15]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [80,87,88,85,85]", () => {
        const report = [80,87,88,85,85]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    //   it("should return true for report [81,88,91,89,90,93,97]", () => {
    //     const report = [81,88,91,89,90,93,97]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [24,29,32,30,35]", () => {
    //     const report = [24,29,32,30,35]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [41,47,50,51,54,54,57,58]", () => {
    //     const report = [41,47,50,51,54,54,57,58]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [60,65,66,68,71,73,73,70]", () => {
    //     const report = [60,65,66,68,71,73,73,70]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [33,40,40,41,43,45,47,47]", () => {
    //     const report = [33,40,40,41,43,45,47,47]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [45,50,52,55,55,59]", () => {
    //     const report = [45,50,52,55,55,59]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [1,7,10,11,12,12,19]", () => {
    //     const report = [1,7,10,11,12,12,19]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [30,36,39,43,44]", () => {
        const report = [30,36,39,43,44]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [51,58,61,65,63]", () => {
        const report = [51,58,61,65,63]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [51,58,61,65,63]", () => {
        const report = [51,58,61,65,63]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [24,30,31,32,36,38,38]", () => {
        const report = [24,30,31,32,36,38,38]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [46,53,57,59,63]", () => {
        const report = [46,53,57,59,63]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [34,39,40,41,45,46,49,56]", () => {
        const report = [34,39,40,41,45,46,49,56]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [33,38,39,40,41,46,49]", () => {
        const report = [33,38,39,40,41,46,49]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [63,69,74,75,74]", () => {
        const report = [63,69,74,75,74]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [74,81,88,91,93,95,95]", () => {
        const report = [74,81,88,91,93,95,95]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [26,32,38,41,45]", () => {
        const report = [26,32,38,41,45]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [67,72,79,81,83,86,93]", () => {
        const report = [67,72,79,81,83,86,93]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [30,28,27,25,23,21,18,21]", () => {
        const report = [30,28,27,25,23,21,18,21]
        expect(isSafeWithDampener(report)).toBe(true)
      })
    //   it("should return isAdjacent for report [43,40,38,36,33,30,30]", () => {
    //     const report = [43,40,38,36,33,30,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [55,52,51,49,48,47,46,42]", () => {
    //     const report = [55,52,51,49,48,47,46,42]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [21,20,17,16,10]", () => {
    //     const report = [21,20,17,16,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return true for report [68,67,69,66,65]", () => {
        const report = [68,67,69,66,65]
        expect(isSafeWithDampener(report)).toBe(true)
      })
    //   it("should return true for report [38,35,33,31,33,31,29,32]", () => {
    //     const report = [38,35,33,31,33,31,29,32]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [85,82,80,79,80,79,76,76]", () => {
    //     const report = [85,82,80,79,80,79,76,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [64,63,66,64,61,57]", () => {
    //     const report = [64,63,66,64,61,57]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [42,39,37,34,36,33,32,26]", () => {
    //     const report = [42,39,37,34,36,33,32,26]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [42,40,37,37,34,31,30]", () => {
    //     const report = [42,40,37,37,34,31,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [17,15,15,13,11,10,9,12]", () => {
    //     const report = [17,15,15,13,11,10,9,12]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [75,73,72,72,72]", () => {
    //     const report = [75,73,72,72,72]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [50,49,49,47,43]", () => {
    //     const report = [50,49,49,47,43]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [53,50,47,45,45,38]", () => {
    //     const report = [53,50,47,45,45,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [61,60,59,58,54,51]", () => {
    //     const report = [61,60,59,58,54,51]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [37,36,32,29,30]", () => {
    //     const report = [37,36,32,29,30]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [15,12,10,6,6]", () => {
    //     const report = [15,12,10,6,6]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [44,43,42,38,34]", () => {
    //     const report = [44,43,42,38,34]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [34,32,28,27,21]", () => {
    //     const report = [34,32,28,27,21]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [24,22,19,18,15,9,8]", () => {
    //     const report = [24,22,19,18,15,9,8]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [60,58,51,50,48,47,46,48]", () => {
    //     const report = [60,58,51,50,48,47,46,48]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [91,90,88,85,78,76,76]", () => {
    //     const report = [91,90,88,85,78,76,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [88,86,81,79,77,73]", () => {
    //     const report = [88,86,81,79,77,73]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [89,88,86,84,78,72]", () => {
    //     const report = [89,88,86,84,78,72]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [17,18,15,13,12,10]", () => {
    //     const report = [17,18,15,13,12,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [77,80,78,77,75,78]", () => {
    //     const report = [77,80,78,77,75,78]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [44,47,45,44,41,39,39]", () => {
    //     const report = [44,47,45,44,41,39,39]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [14,17,16,13,10,8,4]", () => {
    //     const report = [14,17,16,13,10,8,4]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [90,91,89,87,84,83,76]", () => {
    //     const report = [90,91,89,87,84,83,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [51,52,49,52,49,46,45]", () => {
    //     const report = [51,52,49,52,49,46,45]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [30,32,35,32,29,28,29]", () => {
    //     const report = [30,32,35,32,29,28,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [15,16,15,16,16]", () => {
    //     const report = [15,16,15,16,16]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [96,98,99,98,97,93]", () => {
    //     const report = [96,98,99,98,97,93]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [83,84,82,81,79,78,81,76]", () => {
    //     const report = [83,84,82,81,79,78,81,76]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [30,33,30,29,28,28,27]", () => {
    //     const report = [30,33,30,29,28,28,27]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [41,44,42,42,39,36,33,36]", () => {
    //     const report = [41,44,42,42,39,36,33,36]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,82,81,81,81]", () => {
    //     const report = [79,82,81,81,81]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [48,50,47,47,43]", () => {
    //     const report = [48,50,47,47,43]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [31,33,33,31,28,27,26,19]", () => {
    //     const report = [31,33,33,31,28,27,26,19]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [49,50,47,46,42,40,39]", () => {
    //     const report = [49,50,47,46,42,40,39]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [19,21,19,18,15,11,9,10]", () => {
    //     const report = [19,21,19,18,15,11,9,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [52,53,51,49,48,44,42,42]", () => {
    //     const report = [52,53,51,49,48,44,42,42]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [72,75,71,69,65]", () => {
    //     const report = [72,75,71,69,65]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,27,25,23,22,18,15,9]", () => {
    //     const report = [25,27,25,23,22,18,15,9]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [35,36,33,30,25,22,19]", () => {
    //     const report = [35,36,33,30,25,22,19]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [76,78,75,73,68,65,68]", () => {
    //     const report = [76,78,75,73,68,65,68]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [96,99,93,91,89,87,84,84]", () => {
    //     const report = [96,99,93,91,89,87,84,84]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [80,83,82,79,76,69,65]", () => {
    //     const report = [80,83,82,79,76,69,65]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [91,93,90,89,84,77]", () => {
    //     const report = [91,93,90,89,84,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [78,78,77,74,71]", () => {
    //     const report = [78,78,77,74,71]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [42,42,41,39,36,35,36]", () => {
    //     const report = [42,42,41,39,36,35,36]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [81,81,80,77,75,74,71,71]", () => {
    //     const report = [81,81,80,77,75,74,71,71]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [47,47,46,44,42,38]", () => {
    //     const report = [47,47,46,44,42,38]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [71,71,68,66,64,61,55]", () => {
    //     const report = [71,71,68,66,64,61,55]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [29,29,26,29,28,25]", () => {
    //     const report = [29,29,26,29,28,25]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [76,76,77,74,71,74]", () => {
    //     const report = [76,76,77,74,71,74]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,79,81,78,77,77]", () => {
    //     const report = [79,79,81,78,77,77]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [79,79,76,79,76,75,74,70]", () => {
    //     const report = [79,79,76,79,76,75,74,70]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [73,73,72,70,69,68,71,66]", () => {
    //     const report = [73,73,72,70,69,68,71,66]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [59,59,58,55,53,52,52,50]", () => {
    //     const report = [59,59,58,55,53,52,52,50]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [58,58,56,56,53,51,52]", () => {
    //     const report = [58,58,56,56,53,51,52]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [80,80,79,77,76,76,73,73]", () => {
    //     const report = [80,80,79,77,76,76,73,73]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [51,51,50,48,48,44]", () => {
    //     const report = [51,51,50,48,48,44]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [41,41,41,38,37,36,35,29]", () => {
    //     const report = [41,41,41,38,37,36,35,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [54,54,53,52,48,46,43,40]", () => {
    //     const report = [54,54,53,52,48,46,43,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,25,23,19,20]", () => {
    //     const report = [25,25,23,19,20]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [10,10,9,5,5]", () => {
    //     const report = [10,10,9,5,5]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [63,63,59,57,55,52,48]", () => {
    //     const report = [63,63,59,57,55,52,48]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [62,62,60,56,53,51,48,42]", () => {
    //     const report = [62,62,60,56,53,51,48,42]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [40,40,39,37,35,30,29]", () => {
    //     const report = [40,40,39,37,35,30,29]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [38,38,35,34,28,26,28]", () => {
    //     const report = [38,38,35,34,28,26,28]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [90,90,85,84,84]", () => {
    //     const report = [90,90,85,84,84]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [84,84,81,75,72,68]", () => {
    //     const report = [84,84,81,75,72,68]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [76,76,73,68,67,64,59]", () => {
    //     const report = [76,76,73,68,67,64,59]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [37,33,31,29,26,25,23]", () => {
    //     const report = [37,33,31,29,26,25,23]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [88,84,83,80,77,80]", () => {
    //     const report = [88,84,83,80,77,80]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [97,93,91,89,88,88]", () => {
    //     const report = [97,93,91,89,88,88]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [82,78,77,74,73,70,67,63]", () => {
    //     const report = [82,78,77,74,73,70,67,63]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [92,88,86,85,84,79]", () => {
    //     const report = [92,88,86,85,84,79]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [20,16,14,16,15]", () => {
    //     const report = [20,16,14,16,15]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [26,22,24,23,22,21,19,21]", () => {
    //     const report = [26,22,24,23,22,21,19,21]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [57,53,55,54,53,51,51]", () => {
    //     const report = [57,53,55,54,53,51,51]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [24,20,19,21,18,16,12]", () => {
    //     const report = [24,20,19,21,18,16,12]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [56,52,50,49,48,49,46,40]", () => {
    //     const report = [56,52,50,49,48,49,46,40]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [71,67,67,65,64,62,60]", () => {
    //     const report = [71,67,67,65,64,62,60]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return true for report [40,36,36,33,31,29,31]", () => {
    //     const report = [40,36,36,33,31,29,31]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [87,83,80,80,80]", () => {
    //     const report = [87,83,80,80,80]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [25,21,19,19,17,14,10]", () => {
    //     const report = [25,21,19,19,17,14,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [88,84,82,79,77,77,74,67]", () => {
    //     const report = [88,84,82,79,77,77,74,67]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
    //   it("should return isAdjacent for report [23,19,15,14,11,10]", () => {
    //     const report = [23,19,15,14,11,10]
    //     expect(isSafeWithDampener(report)).toBe(true)
    //   })
      it("should return false for report [29,25,22,18,16,13,15]", () => {
        const report = [29,25,22,18,16,13,15]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [43,39,36,32,32]", () => {
        const report = [43,39,36,32,32]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [90,86,85,82,80,76,74,70]", () => {
        const report = [90,86,85,82,80,76,74,70]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [58,54,50,47,40]", () => {
        const report = [58,54,50,47,40]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [54,50,44,41,38,36]", () => {
        const report = [54,50,44,41,38,36]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [98,94,88,85,88]", () => {
        const report = [98,94,88,85,88]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [22,18,12,9,8,8]", () => {
        const report = [22,18,12,9,8,8]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [49,45,38,36,33,29]", () => {
        const report = [49,45,38,36,33,29]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [56,52,49,47,46,40,39,32]", () => {
        const report = [56,52,49,47,46,40,39,32]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [53,48,47,45,42,41,38]", () => {
        const report = [53,48,47,45,42,41,38]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [60,54,53,51,50,49,50]", () => {
        const report = [60,54,53,51,50,49,50]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [90,83,82,81,81]", () => {
        const report = [90,83,82,81,81]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [87,81,80,78,74]", () => {
        const report = [87,81,80,78,74]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [25,19,18,16,13,6]", () => {
        const report = [25,19,18,16,13,6]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [70,64,63,66,64,61]", () => {
        const report = [70,64,63,66,64,61]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [36,29,26,29,30]", () => {
        const report = [36,29,26,29,30]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [30,25,28,25,23,21,18,18]", () => {
        const report = [30,25,28,25,23,21,18,18]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [81,76,78,76,74,73,69]", () => {
        const report = [81,76,78,76,74,73,69]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [73,68,66,64,62,64,63,57]", () => {
        const report = [73,68,66,64,62,64,63,57]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [51,46,46,44,41]", () => {
        const report = [51,46,46,44,41]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [18,12,10,9,7,6,6,7]", () => {
        const report = [18,12,10,9,7,6,6,7]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [38,31,30,30,28,26,24,24]", () => {
        const report = [38,31,30,30,28,26,24,24]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [52,47,44,41,39,39,35]", () => {
        const report = [52,47,44,41,39,39,35]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [74,68,65,64,61,58,58,53]", () => {
        const report = [74,68,65,64,61,58,58,53]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [29,23,19,18,16,14,11]", () => {
        const report = [29,23,19,18,16,14,11]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [56,50,49,48,44,41,40,41]", () => {
        const report = [56,50,49,48,44,41,40,41]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [36,31,30,28,25,21,19,19]", () => {
        const report = [36,31,30,28,25,21,19,19]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [53,47,46,42,38]", () => {
        const report = [53,47,46,42,38]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [72,67,63,60,59,56,54,47]", () => {
        const report = [72,67,63,60,59,56,54,47]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [35,30,28,26,20,18]", () => {
        const report = [35,30,28,26,20,18]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [34,27,25,23,18,16,18]", () => {
        const report = [34,27,25,23,18,16,18]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [46,39,32,29,26,24,24]", () => {
        const report = [46,39,32,29,26,24,24]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,71,66,64,61,58,57,53]", () => {
        const report = [77,71,66,64,61,58,57,53]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,71,70,63,60,54]", () => {
        const report = [77,71,70,63,60,54]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [34,34,36,37,40,44,47,51]", () => {
        const report = [34,34,36,37,40,44,47,51]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [55,59,61,62,60]", () => {
        const report = [55,59,61,62,60]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [95,95,92,91,88,91]", () => {
        const report = [95,95,92,91,88,91]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [92,95,92,89,89,88,89]", () => {
        const report = [92,95,92,89,89,88,89]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [81,83,85,87,90,93,99]", () => {
        const report = [81,83,85,87,90,93,99]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [30,24,22,15,12]", () => {
        const report = [30,24,22,15,12]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [76,80,81,82,85,87,92,92]", () => {
        const report = [76,80,81,82,85,87,92,92]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [82,83,81,80,80]", () => {
        const report = [82,83,81,80,80]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [24,27,30,31,31,33,35,33]", () => {
        const report = [24,27,30,31,31,33,35,33]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [32,26,28,27,28]", () => {
        const report = [32,26,28,27,28]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [33,26,25,23,21,20,17]", () => {
        const report = [33,26,25,23,21,20,17]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [74,70,67,61,60,58,58]", () => {
        const report = [74,70,67,61,60,58,58]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [95,95,93,95,98]", () => {
        const report = [95,95,93,95,98]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [50,50,51,49,47,45,47]", () => {
        const report = [50,50,51,49,47,45,47]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [50,50,51,49,47,45,47]", () => {
        const report = [50,50,51,49,47,45,47]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [85,82,80,78,76,69]", () => {
        const report = [85,82,80,78,76,69]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return true for report [69,76,78,80,82,85]", () => {
        const report = [69,76,78,80,82,85]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [34,27,27,24,21,20,18,13]", () => {
        const report = [34,27,27,24,21,20,18,13]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [60,56,56,55,54,53,51,44]", () => {
        const report = [60,56,56,55,54,53,51,44]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [47,47,53,54,53]", () => {
        const report = [47,47,53,54,53]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [47,47,53,54,53]", () => {
        const report = [47,47,53,54,53]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [72,72,70,70,70]", () => {
        const report = [72,72,70,70,70]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [9,7,10,11,14,16,15,14]", () => {
        const report = [9,7,10,11,14,16,15,14]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [37,41,42,44,45,46,49,51]", () => {
        const report = [37,41,42,44,45,46,49,51]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [42,36,36,33,33]", () => {
        const report = [42,36,36,33,33]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [61,66,70,71,71]", () => {
        const report = [61,66,70,71,71]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [77,72,70,66,60]", () => {
        const report = [77,72,70,66,60]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [48,44,41,38,39,37,37]", () => {
        const report = [48,44,41,38,39,37,37]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [46,43,45,43,41,41]", () => {
        const report = [46,43,45,43,41,41]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [63,67,70,72,74,75,78,82]", () => {
        const report = [63,67,70,72,74,75,78,82]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [2,3,6,6,9,11,11]", () => {
        const report = [2,3,6,6,9,11,11]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [84,82,80,77,75,71,70,66]", () => {
        const report = [84,82,80,77,75,71,70,66]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [94,90,89,92,89,82]", () => {
        const report = [94,90,89,92,89,82]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return true for report [17,17,15,12,11,9,7,5]", () => {
        const report = [17,17,15,12,11,9,7,5]
        expect(isSafeWithDampener(report)).toBe(true)
      })
      it("should return false for report [72,75,73,73,73]", () => {
        const report = [72,75,73,73,73]
        expect(isSafeWithDampener(report)).toBe(false)
      })
      it("should return false for report [72,75,73,73,73]", () => {
        const report = [72,75,73,73,73]
        expect(isSafeWithDampener(report)).toBe(false)
      })
    })
  })
})
