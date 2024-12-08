import { countWordOccurrences } from "./solution"

describe("countWordOccurrences", () => {
  describe("when searching for a two letter word", () => {
    it("should return the correct number of occurrences", () => {
      const puzzle: string[][] = [
        ['m', 'u', 'l', 'h'],
        ['o', 'd', 'o', 'v'],
        ['r', 'd', 'o', 'l'],
        ['z', 'e', 'p', 'l']
      ];
      expect(countWordOccurrences(puzzle, "do")).toBe(6)
    })
  })
  describe("when searching for a three letter word", () => {
    it("should return the correct number of occurrences", () => {
      const puzzle: string[][] = [
        ['l', 'u', 'l', 'h'],
        ['o', 'd', 'o', 'v'],
        ['d', 'd', 'o', 'l'],
        ['z', 'e', 'p', 'l']
      ];
      expect(countWordOccurrences(puzzle, "dol")).toBe(3)
    })
  })
})
