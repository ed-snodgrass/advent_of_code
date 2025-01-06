import * as fs from "fs"
import { part1, part2, exampleInputPart1, findObstaclesAlongPath, Position, findPossibleLoops, Point } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day6Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(41)
      })
    })
    describe('real input', () => {
      it('part1 should be 5409', () => {
        expect(part1(input)).toBe(5409)
      })
      it('part1 should be 5444', () => {
        expect(part1(input)).toBeLessThan(5444)
      })
    })
  })
  describe('findPossibleLoops', () => {
    let startingPosition: Point
    beforeEach(() => {
      startingPosition = {x: 0, y: 0}
    })
    describe('when obstacles contains [{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]', () => {
      it("should return a: 1,0 -> b: 6,1 -> c: 5,7 -> d: 0,6", () => {
        const obstacles = [{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(1)
      })
    })
    describe('when obstacles contains [{x: 0, y: 6}, {x: 6, y: 1}, {x: 5, y: 7}]', () => {
      it("should return ", () => {
        const obstacles = [{x: 0, y: 6}, {x: 6, y: 1}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(1)
      })
    })
    describe('when obstacles contains [{x: 1, y: 0}, {x: 0, y: 6}, {x: 5, y: 7}]', () => {
      it("should return ", () => {
        const obstacles = [{x: 1, y: 0}, {x: 0, y: 6}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(1)
      })
    })
    describe('when obstacles contains [{x: 1, y: 0}, {x: 6, y: 1}, {x: 0, y: 6}]', () => {
      it("should return ", () => {
        const obstacles = [{x: 1, y: 0}, {x: 6, y: 1}, {x: 0, y: 6}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(1)
      })
    })
  })
  describe('findPossibleLoops with other obstructions', () => {
    let startingPosition: Point
    beforeEach(() => {
      startingPosition = {x: 0, y: 0}
    })
    describe('when obstacles contains [{x: 1, y: 2}, {x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]', () => {
      it("should return empty array", () => {
        const obstacles = [{x: 1, y: 2}, {x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(0)
      })
    })
    describe('when obstacles contains [{x: 3, y: 1}, {x: 0, y: 6}, {x: 6, y: 1}, {x: 5, y: 7}]', () => {
      it("should return empty array", () => {
        const obstacles = [{x: 3, y: 1}, {x: 0, y: 6}, {x: 6, y: 1}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(0)
      })
    })
    describe('when obstacles contains [{x: 5, y: 3}, {x: 1, y: 0}, {x: 0, y: 6}, {x: 5, y: 7}]', () => {
      it("should return empty array", () => {
        const obstacles = [{x: 5, y: 3}, {x: 1, y: 0}, {x: 0, y: 6}, {x: 5, y: 7}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(0)
      })
    })
    describe('when obstacles contains [{x: 3, y: 6}, {x: 1, y: 0}, {x: 6, y: 1}, {x: 0, y: 6}]', () => {
      it("should return empty array", () => {
        const obstacles = [{x: 3, y: 6}, {x: 1, y: 0}, {x: 6, y: 1}, {x: 0, y: 6}]
        const actual = findPossibleLoops(obstacles, startingPosition)
        expect(actual.length).toEqual(0)
      })
    })
  })
  describe('findObstacleAlongPath', () => {
    describe("when the guard path runs into [{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]", () => {
      it("should find [{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]", () => {
        const guardPath: Position[] = [
          {x: 1, y: 6, heading: '^'}, {x: 1, y: 5, heading: '^'}, {x: 1, y: 4, heading: '^'},
          {x: 1, y: 3, heading: '^'}, {x: 1, y: 2, heading: '^'}, {x: 1, y: 1, heading: '^'},
          {x: 1, y: 1, heading: '>'}, {x: 2, y: 1, heading: '>'}, {x: 3, y: 1, heading: '>'},
          {x: 4, y: 1, heading: '>'}, {x: 5, y: 1, heading: '>'},
          {x: 5, y: 2, heading: 'v'}, {x: 5, y: 3, heading: 'v'}, {x: 5, y: 4, heading: 'v'},
          {x: 5, y: 5, heading: 'v'}, {x: 5, y: 6, heading: 'v'},
          {x: 4, y: 6, heading: '<'}, {x: 3, y: 6, heading: '<'}, {x: 2, y: 6, heading: '<'},
          {x: 1, y: 6, heading: '<'}, {x: 0, y: 6, heading: '<'}
        ]
        const obstacles = [{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}]
        expect(findObstaclesAlongPath(obstacles, guardPath)).toEqual([{x: 1, y: 0}, {x: 6, y: 1}, {x: 5, y: 7}])
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 6', () => {
        expect(part2(exampleInputPart1)).toBe(6)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
