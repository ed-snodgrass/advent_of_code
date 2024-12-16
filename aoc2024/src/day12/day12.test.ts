import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  miniSampleInput,
  findRegions, findDistinctPlants, findDistinctRegions, calculateRegionScore, calculatePerimeter,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const multiRegionPlantGarden = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
describe('Day12Test tests', () => {
  let grid: string[][]
  describe("calculateRegionScore tests", () => {
      describe("when regions are all connected", () => {
        beforeEach(() => {
          grid = parseInput(miniSampleInput)
        })
        it("should have a score 140", () => {
          const regionIds = findRegions(grid)
          expect(calculateRegionScore(regionIds)).toBe(140)
        })
      })
      describe("when plants are in different regions", () => {
        beforeEach(() => {
          grid = parseInput(multiRegionPlantGarden)
        })
        it("should have a score 772", () => {
          const regionIds = findRegions(grid)
          expect(calculateRegionScore(regionIds)).toBe(772)
        })
    })
  })
  describe("calculatePerimeter", () => {
    let regionIds: number[][] = []
    beforeEach(() => {
      grid = parseInput(miniSampleInput)
      regionIds = findRegions(grid)
    })
    describe("when calculating the perimeter of a single plant region", () => {
      it("should return 4", () => {
        expect(calculatePerimeter(regionIds, 3)).toBe(4)
      })
    })
    describe("when calculating the perimeter of a 3 plant horizontal region", () => {
      it("should return 8", () => {
        expect(calculatePerimeter(regionIds, 4)).toBe(8)
      })
    })
  })
  describe("findDistinctPlants", () => {
    describe("when regions are all connected", () => {
      beforeEach(() => {
        grid = parseInput(miniSampleInput)
      })
      it("should find 5 distinct plants", () => {
        expect(findDistinctPlants(grid).length).toBe(5)
      })
    })
    describe("when plants are in different regions", () => {
      beforeEach(() => {
        grid = parseInput(multiRegionPlantGarden)
      })
      it("should find 2 distinct plants", () => {
        expect(findDistinctPlants(grid).length).toBe(2)
      })
    })
  })
  describe('findRegions', () => {
    describe("when regions are all connected", () => {
      beforeEach(() => {
        grid = parseInput(miniSampleInput)
      })
      it("should find 5 distinct regions", () => {
        expect(findDistinctRegions(findRegions(grid)).length).toBe(5)
      })
    })
    describe("when plants are in different regions", () => {
      beforeEach(() => {
        grid = parseInput(multiRegionPlantGarden)
      })
      it("should find 5 distinct regions", () => {
        expect(findDistinctRegions(findRegions(grid)).length).toBe(5)
      })
    })
  })
  describe('part1', () => {
    describe('other sample input', () => {
      it('should be 140', () => {
        expect(part1(miniSampleInput)).toBe(140)
      })
    })
    describe('example input', () => {
      it('part1 should be 1930', () => {
        expect(part1(exampleInputPart1)).toBe(1930)
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
