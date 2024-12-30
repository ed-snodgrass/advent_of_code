import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  identifyRoute,
  findItem,
  findCheats,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8")

describe("Day20Test tests", () => {
  describe("findCheats", () => {
    let actualAllPossibleCheatSavings: number[]
    beforeEach(() => {
      const input = parseInput(exampleInputPart1)
      const route = identifyRoute(input, findItem(input, "S"))
      const cheats = findCheats(input, route)
      actualAllPossibleCheatSavings = cheats.allPossibleCheatSavings
    })
    it("should find 14 cheats that save 2 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 2).length).toBe(14)
    })
    it("should find 14 cheats that save 4 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 4).length).toBe(14)
    })
    it("should find 2 cheats that save 6 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 6).length).toBe(2)
    })
    it("should find 4 cheats that save 8 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 8).length).toBe(4)
    })
    it("should find 2 cheats that save 10 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 10).length).toBe(2)
    })
    it("should find 3 cheats that save 12 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 12).length).toBe(3)
    })
    it("should find one cheat that saves 20 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 20).length).toBe(1)
    })
    it("should find one cheat that saves 36 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 36).length).toBe(1)
    })
    it("should find one cheat that saves 38 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 38).length).toBe(1)
    })
    it("should find one cheat that saves 40 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 40).length).toBe(1)
    })
    it("should find one cheat that saves 64 picoseconds", () => {
      expect(actualAllPossibleCheatSavings.filter((savings) => savings === 64).length).toBe(1)
    })
  })
  describe("identifyRoute", () => {
    it("should find 85 length array", () => {
      const input = parseInput(exampleInputPart1)
      const route = identifyRoute(input, findItem(input, "S"))
      expect(route.length).toBe(85)
    })
  })
  describe("part1", () => {
    describe("example input", () => {
      it("part1 should be...", () => {
        expect(part1(exampleInputPart1)).toBe(0)
      })
    })
    describe("real input", () => {
      it("part1 should be 1502", () => {
        expect(part1(input)).toBe(1502)
      })
    })
  })
  describe("part2", () => {
    describe.skip("example input", () => {
      it("part2 should be...", () => {
        expect(part2(exampleInputPart2)).toBe(0)
      })
    })
    describe("real input", () => {
      it("part2 should be 1028136", () => {
        expect(part2(input)).toBe(1028136)
      })
    })
  })
})
