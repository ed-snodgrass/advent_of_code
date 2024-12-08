import * as fs from "fs"
import {
  part1,
  part2,
  exampleInputPart1,
  exampleInputPart2,
  countWordOccurrences,
  countWordOccurrencesDiagonally,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8")

describe("Day4Test tests", () => {
  describe("part1", () => {
    describe("example input", () => {
      it("part1 should be...", () => {
        expect(part1(exampleInputPart1)).toBe(18)
      })
    })
    describe("real input", () => {
      it("part1 should be...", () => {
        expect(part1(input)).toBe(2514)
      })
    })
  })
  describe("part2", () => {
    describe("example input", () => {
      it("part2 should be...", () => {
        expect(part2(exampleInputPart2)).toBe(9)
      })
    })
    describe("real input", () => {
      it("part2 should be...", () => {
        expect(part2(input)).toBe(1888)
      })
    })
  })
  describe("countWordOccurrences", () => {
    describe("when searching for a two letter word", () => {
      it("should return the correct number of occurrences", () => {
        const puzzle: string[][] = [
          ["m", "u", "l", "h"],
          ["o", "d", "o", "v"],
          ["r", "d", "o", "l"],
          ["z", "e", "p", "l"],
        ]
        expect(countWordOccurrences(puzzle, "do")).toBe(6)
      })
    })
    describe("when searching for a three letter word", () => {
      it("should return the correct number of occurrences", () => {
        const puzzle: string[][] = [
          ["l", "u", "l", "h"],
          ["o", "d", "o", "v"],
          ["d", "d", "o", "l"],
          ["z", "e", "p", "l"],
        ]
        expect(countWordOccurrences(puzzle, "dol")).toBe(3)
      })
    })
  })

  describe("countWordOccurrencesDiagonally", () => {
    it("should find one X-MAS when MAS and MAS", () => {
      const puzzle: string[][] = [
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(1)
    })
    it("should find one X-MAS when SAM and MAS", () => {
      const puzzle: string[][] = [
        ["S", ".", "S"],
        [".", "A", "."],
        ["M", ".", "M"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "SAM")).toBe(1)
    })
    it("should find one X-MAS when SAM and SAM", () => {
      const puzzle: string[][] = [
        ["S", ".", "M"],
        [".", "A", "."],
        ["S", ".", "M"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(1)
    })

    it("should find 9 X-MASs", () => {
      const puzzle: string[][] = [
        [".", "M", ".", "S", ".", ".", ".", ".", "."],
        [".", ".", "A", ".", ".", "M", "S", "M", "S"],
        [".", "M", ".", "S", ".", "M", "A", "A", "."],
        [".", ".", "A", ".", "A", "S", "M", "S", "M"],
        [".", "M", ".", "S", ".", "M", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["S", ".", "S", ".", "S", ".", "S", ".", "S"],
        [".", "A", ".", "A", ".", "A", ".", "A", "."],
        ["M", ".", "M", ".", "M", ".", "M", ".", "M"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(9)
    })

    it("should find 4 X-MASs", () => {
      const puzzle: string[][] = [
        ["S", ".", "S", ".", "S", ".", "S", ".", "S"],
        [".", "A", ".", "A", ".", "A", ".", "A", "."],
        ["M", ".", "M", ".", "M", ".", "M", ".", "M"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(4)
    })

    it("should find 2 X-MASs one on top of the other", () => {
      const puzzle: string[][] = [
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(2)
    })

    it("should find 9 X-MASs with the full matrix but invalids replaced with '.'", () => {
      const puzzle: string[][] = [
        [".", "M", ".", "S", ".", ".", ".", ".", ".", "."],
        [".", ".", "A", ".", ".", "M", "S", "M", "S", "."],
        [".", "M", ".", "S", ".", "M", "A", "A", ".", "."],
        [".", ".", "A", ".", "A", "S", "M", "S", "M", "."],
        [".", "M", ".", "S", ".", "M", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["S", ".", "S", ".", "S", ".", "S", ".", "S", "."],
        [".", "A", ".", "A", ".", "A", ".", "A", ".", "."],
        ["M", ".", "M", ".", "M", ".", "M", ".", "M", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(9)
    })

    it("should find 9 X-MASs with the full matrix", () => {
      const puzzle: string[][] = [
        //0    1    2    3    4    5    6    7    8    9
        ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],//0
        ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],//1
        ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],//2
        ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],//3
        ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],//4
        ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],//5
        ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],//6
        ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],//7
        ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],//8
        ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],//9
      ]
      expect(countWordOccurrencesDiagonally(puzzle, "MAS")).toBe(9)
    })
  })
})
