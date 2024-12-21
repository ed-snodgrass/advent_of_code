import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  smallerInput,
  attemptMove,
  DIRECTIONS, ROBOT, BOX, EMPTY,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day15Test tests', () => {
  describe('parseInput', () => {
    describe("smallerInput", () => {
      it("should find a 8 x 8 map", () => {
        expect(parseInput(smallerInput).warehouseMap.length).toBe(8)
        expect(parseInput(smallerInput).warehouseMap[0].length).toBe(8)
      })
      it("should find a list of 15 movements", () => {
        expect(parseInput(smallerInput).movements.length).toBe(15)
      })
      it("should find the robot @ 2,2", () => {
        expect(parseInput(smallerInput).robotPosition).toEqual([2, 2])
      })
    })
    describe("exampleInputPart1", () => {
      it("should find an 8 x 8 map", () => {
        expect(parseInput(exampleInputPart1).warehouseMap.length).toBe(10)
        expect(parseInput(exampleInputPart1).warehouseMap[0].length).toBe(10)
      })
      it("should find a list of 700 movements", () => {
        expect(parseInput(exampleInputPart1).movements.length).toBe(700)
      })
      it("should find the robot @ 4,4", () => {
        expect(parseInput(exampleInputPart1).robotPosition).toEqual([4, 4])
      })
    })
    describe("input", () => {
      it("should find an 50 x 50 map", () => {
        expect(parseInput(input).warehouseMap.length).toBe(50)
        expect(parseInput(input).warehouseMap[0].length).toBe(50)
      })
      it("should find a list of 20000 movements", () => {
        expect(parseInput(input).movements.length).toBe(20000)
      })
      it("should find the robot @ 24,24", () => {
        expect(parseInput(input).robotPosition).toEqual([24, 24])
      })
    })
  })
  describe('attemptMove', () => {
    let warehouseMap: string[][] = []

    describe('when up move is unblocked', () => {
      beforeEach(() => {
        warehouseMap = [
          ['#', '#', '#'],
          ['#', '.', '#'],
          ['#', '@', '#'],
          ['#', '#', '#'],
        ]
      })
      it('should return the robot in new position', () => {
        expect(attemptMove(warehouseMap, [1, 2], DIRECTIONS['^']).newMap[1][1]).toBe(ROBOT)
      })
      it('should return the empty in old position', () => {
        expect(attemptMove(warehouseMap, [1, 2], DIRECTIONS['^']).newMap[2][1]).toBe(EMPTY)
      })
    })
    describe('when up move is blocked by wall', () => {
      beforeEach(() => {
        warehouseMap = [
          ['#', '#', '#'],
          ['#', '@', '#'],
          ['#', '.', '#'],
          ['#', '#', '#'],
        ]
      })
      it('should return the robot in same position', () => {
        expect(attemptMove(warehouseMap, [1, 1], DIRECTIONS['^']).newMap[1][1]).toBe(ROBOT)
      })
    })
    describe('when up move is blocked by unblocked box', () => {
      beforeEach(() => {
        warehouseMap = [
          ['#', '#', '#'],
          ['#', '.', '#'],
          ['#', 'O', '#'],
          ['#', '@', '#'],
          ['#', '#', '#'],
        ]
      })
      it('should return the robot in new position', () => {
        expect(attemptMove(warehouseMap, [1, 3], DIRECTIONS['^']).newMap[2][1]).toBe(ROBOT)
      })
      it('should return the box in new position', () => {
        expect(attemptMove(warehouseMap, [1, 3], DIRECTIONS['^']).newMap[1][1]).toBe(BOX)
      })
      it('should return the empty in old position', () => {
        expect(attemptMove(warehouseMap, [1, 3], DIRECTIONS['^']).newMap[3][1]).toBe(EMPTY)
      })
    })
    describe('when up move is blocked by blocked box', () => {
      beforeEach(() => {
        warehouseMap = [
          ['#', '#', '#'],
          ['#', '#', '#'],
          ['#', 'O', '#'],
          ['#', '@', '#'],
          ['#', '#', '#'],
        ]
      })
      it('should return the same position', () => {
        expect(attemptMove(warehouseMap, [1, 3], DIRECTIONS['^']).newMap[3][1]).toBe(ROBOT)
      })
    })
  })
  describe('part1', () => {
    describe('smallerInput', () => {
      it('part1 should be 2028', () => {
        expect(part1(smallerInput)).toBe(2028)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(10092)
      })
    })
    describe('real input', () => {
      it('part1 should be 1568399', () => {
        expect(part1(input)).toBe(1568399)
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
