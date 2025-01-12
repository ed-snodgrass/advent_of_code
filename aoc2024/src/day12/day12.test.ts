import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  miniSampleInput,
  findRegions,
  findDistinctPlants,
  findDistinctRegions,
  calculateRegionScore,
  calculatePerimeter,
  calculateBulkDiscount,
  calculateNumberOfSides,
  createRegionToPlantsMap,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8")
const multiRegionPlantGarden = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
describe("Day12Test tests", () => {
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
  describe("findRegions", () => {
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
  describe("part1", () => {
    describe("other sample input", () => {
      it("should be 140", () => {
        expect(part1(miniSampleInput)).toBe(140)
      })
    })
    describe("example input", () => {
      it("part1 should be 1930", () => {
        expect(part1(exampleInputPart1)).toBe(1930)
      })
    })
    describe("real input", () => {
      it.skip("part1 should be...", () => {
        expect(part1(input)).toBe(null)
      })
    })
  })
  describe("part2", () => {
    describe("calculateBulkDiscountForRegions", () => {
      let regionIds: number[][], grid: string[][], regionToPlantsMap: Map<number, string[]>
      describe("when using miniSampleInput", () => {
        beforeEach(() => {
          grid = parseInput(miniSampleInput)
          regionIds = findRegions(grid)
          regionToPlantsMap = createRegionToPlantsMap(regionIds)
        })
        describe("Region A", () => {
          it("should have 4 sides", () => {
            expect(calculateNumberOfSides(regionToPlantsMap.get(0)!)).toBe(4)
          })
        })
        describe("Region B", () => {
          it("should have 4 sides", () => {
            expect(calculateNumberOfSides(regionToPlantsMap.get(1)!)).toBe(4)
          })
        })
        describe("Region C", () => {
          it("should have 8 sides", () => {
            expect(calculateNumberOfSides(regionToPlantsMap.get(2)!)).toBe(8)
          })
        })
        describe("Region D", () => {
          it("should have 4 sides", () => {
            expect(calculateNumberOfSides(regionToPlantsMap.get(3)!)).toBe(4)
          })
        })
        describe("Region E", () => {
          it("should have 4 sides", () => {
            expect(calculateNumberOfSides(regionToPlantsMap.get(4)!)).toBe(4)
          })
        })
      })
    })
    describe("calculateBulkDiscount", () => {
      let regionIds: number[][], grid: string[][]
      describe("when using miniSampleInput", () => {
        beforeEach(() => {
          grid = parseInput(miniSampleInput)
          regionIds = findRegions(grid)
        })
        it("should return 80", () => {
          expect(calculateBulkDiscount(regionIds)).toBe(80)
        })
      })

      describe("when using X and O example", () => {
        const xAndOExample = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`
        beforeEach(() => {
          grid = parseInput(xAndOExample)
          regionIds = findRegions(grid)
        })
        it("should return 436", () => {
          expect(calculateBulkDiscount(regionIds)).toBe(436)
        })
      })
      describe("when using an E Shaped E Region", () => {
        const eShapedRegion = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`
        beforeEach(() => {
          grid = parseInput(eShapedRegion)
          regionIds = findRegions(grid)
        })
        it("should return 236", () => {
          expect(calculateBulkDiscount(regionIds)).toBe(236)
        })
      })
      describe("when using an S Shaped A Region", () => {
        const eShapedRegion = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`
        beforeEach(() => {
          grid = parseInput(eShapedRegion)
          regionIds = findRegions(grid)
        })
        it("should return 368", () => {
          expect(calculateBulkDiscount(regionIds)).toBe(368)
        })
      })

      describe("when using exampleInputPart1", () => {
        beforeEach(() => {
          grid = parseInput(exampleInputPart1)
          regionIds = findRegions(grid)
        })
        it("should return 1206", () => {
          expect(calculateBulkDiscount(regionIds)).toBe(1206)
        })
      })
    })
    describe("example input", () => {
      it("part2 should be 1206", () => {
        expect(part2(exampleInputPart1)).toBe(1206)
      })
    })
    describe("real input", () => {
      it("part2 should be 805814", () => {
        expect(part2(input)).toBe(805814)
      })
    })
  })
})
