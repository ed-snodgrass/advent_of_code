import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  isOnMap,
  findAntennas,
  findFrequencies, findAntinodesByFrequency, Antenna, findAntinodesByFrequencyUntilEdge,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day8Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      let grid: string[][]
      beforeEach(() => {
        grid = parseInput(exampleInputPart1)
      })
      describe('findAntinodeCountByFrequency tests', () => {
        let antennas: Antenna[], frequencies
        beforeEach(() => {
          antennas = findAntennas(grid)
        })
        describe("findAntinodesByFrequencyUntilEdge", () => {
          it("should find 10 antinodes for 0", () => {
            //4+4+1+1+2+4
            expect(findAntinodesByFrequencyUntilEdge(grid, antennas.filter(antenna => (antenna.cell === '0'))).length).toBe(29)
          })
          it("should find 4 antinodes for A", () => {
            expect(findAntinodesByFrequencyUntilEdge(grid, antennas.filter(antenna => (antenna.cell === 'A'))).length).toBe(19)
          })
        })
        describe("findAntinodesByFrequency", () => {
          it("should find 10 antinodes for 0", () => {
            expect(findAntinodesByFrequency(grid, antennas.filter(antenna => (antenna.cell === '0'))).length).toBe(10)
          })
          it("should find 4 antinodes for A", () => {
            expect(findAntinodesByFrequency(grid, antennas.filter(antenna => (antenna.cell === 'A'))).length).toBe(5)
          })
        })
      })
      describe("isOnMap tests", () => {
        it("should not find -1, 0 on the map", () => {
          expect(isOnMap(-1, 0, grid)).toBe(false)
        })
        it("should not find 0, grid.length + 1 on the map", () => {
          expect(isOnMap(0, grid.length + 1, grid)).toBe(false)
        })
        it("should not find grid[0].length + 1 on the map", () => {
          expect(isOnMap(grid[0].length + 1, 0, grid)).toBe(false)
        })
        it("should find 0, 0 on the map", () => {
          expect(isOnMap(0, 0, grid)).toBe(true)
        })
        it("should find 0, grid.length - 1 on the map", () => {
          expect(isOnMap(0, grid.length - 1, grid)).toBe(true)
        })
        it("should find grid[0].length - 1, 0 on the map", () => {
          expect(isOnMap(grid[0].length - 1, 0, grid)).toBe(true)
        })
        it("should find grid[0].length - 1, grid.length - 1 on the map", () => {
          expect(isOnMap(grid[0].length - 1, grid.length - 1, grid)).toBe(true)
        })
      })
      it('part1 should be 14', () => {
        expect(part1(exampleInputPart1)).toBe(14)
      })
    })
    describe('real input', () => {
      it('part1 should be 394', () => {
        expect(part1(input)).toBe(394)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 34', () => {
        expect(part2(exampleInputPart2)).toBe(34)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be 1277', () => {
        expect(part2(input)).toBe(1277)
      })
    })
  })
})
