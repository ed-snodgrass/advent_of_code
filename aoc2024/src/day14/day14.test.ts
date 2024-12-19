import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  calculateSafetyFactor,
  moveRobot, Robot, next100Seconds,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8")

describe("Day14Test tests", () => {
  describe("moveRobot", () => {
    let robot: Robot
    describe("when position and velocity equal width/height", () => {
      beforeEach(() => {
        robot = {
          position: [3, 4],
          velocity: [2, 2],
        }
      })
      it("should move to 0,0", () => {
        expect(moveRobot(robot, 5, 6).position).toEqual([0,0])
      })
    })
    describe("when position and negative velocity equal width/height", () => {
      beforeEach(() => {
        robot = {
          position: [3, 4],
          velocity: [-3, -4],
        }
      })
      it("should move to 0,0", () => {
        expect(moveRobot(robot, 5, 6).position).toEqual([0,0])
      })
    })
    describe("when not wrapping and velocity increasing... position 0,0 and velocity 1,1", () => {
      beforeEach(() => {
        robot = {
          position: [0, 0],
          velocity: [1, 1],
        }
      })
      it("should move to x 1", () => {
        expect(moveRobot(robot, 5, 5).position[0]).toBe(1)
      })
      it("should move to y 1", () => {
        expect(moveRobot(robot, 5, 5).position[1]).toBe(1)
      })
    })
    describe("when wrapping and velocity increasing...     position 4,4 and velocity 1,1", () => {
      beforeEach(() => {
        robot = {
          position: [4, 4],
          velocity: [1, 1],
        }
      })
      it("should move to x 0", () => {
        expect(moveRobot(robot, 5, 5).position[0]).toBe(0)
      })
      it("should move to y 0", () => {
        expect(moveRobot(robot, 5, 5).position[1]).toBe(0)
      })
    })
    describe("when not wrapping and velocity decreasing... position 4,4 and velocity -1,-1", () => {
      beforeEach(() => {
        robot = {
          position: [4, 4],
          velocity: [-1, -1],
        }
      })
      it("should move to x 3", () => {
        expect(moveRobot(robot, 5, 5).position[0]).toBe(3)
      })
      it("should move to y 3", () => {
        expect(moveRobot(robot, 5, 5).position[1]).toBe(3)
      })
    })
    describe("when wrapping and velocity decreasing...     position 0,0 and velocity -1,-1", () => {
      beforeEach(() => {
        robot = {
          position: [0, 0],
          velocity: [-1, -1],
        }
      })
      it("should move to x 4", () => {
        expect(moveRobot(robot, 5, 5).position[0]).toBe(4)
      })
      it("should move to y 4", () => {
        expect(moveRobot(robot, 5, 5).position[1]).toBe(4)
      })
    })
    describe("when wrapping and velocity decreasing...     position 4,4 and velocity -6,-6", () => {
      beforeEach(() => {
        robot = {
          position: [4, 4],
          velocity: [-6, -6],
        }
      })
      it("should move to x 3", () => {
        expect(moveRobot(robot, 5, 5).position[0]).toBe(3)
      })
      it("should move to y 3", () => {
        expect(moveRobot(robot, 5, 5).position[1]).toBe(3)
      })
    })

  })
  describe("next100Seconds", () => {
    describe('when processing p=7,6 v=-1,-3', () => {
      it('should return final location of [6,0]', () => {
        const robot = {
          position: [7, 6],
          velocity: [-1, -3],
        }
        expect(next100Seconds([robot], 11, 7)[0].position).toEqual([6,0])
      })
    })
  })
  describe("parseInput tests", () => {
    describe("parseInput for exampleInputPart1", () => {
      it("should find 12 robots", () => {
        expect(parseInput(exampleInputPart1).length).toBe(12)
      })
      it("should have the first robot with a position of 0,4", () => {
        expect(parseInput(exampleInputPart1)[0].position).toEqual([0, 4])
      })
      it("should have the first robot with a velocity of 3,-3", () => {
        expect(parseInput(exampleInputPart1)[0].velocity).toEqual([3, -3])
      })
      it("should have the second robot with a position of 6,3", () => {
        expect(parseInput(exampleInputPart1)[1].position).toEqual([6, 3])
      })
      it("should have the second robot with a velocity of -1,-3", () => {
        expect(parseInput(exampleInputPart1)[1].velocity).toEqual([-1, -3])
      })
    })
  })
  describe("calculateSafetyFactor", () => {
    describe("when calculating safety factor for 1,3,4,1 robot", () => {
      it("should equal 12", () => {
        expect(calculateSafetyFactor([1, 3, 4, 1])).toBe(12)
      })
    })
  })
  describe("part1", () => {
    describe("example input", () => {
      it("part1 should be 12", () => {
        expect(part1(exampleInputPart1)).toBe(12)
      })
    })
    describe("real input", () => {
      it("part1 should be less than 211843800", () => {
        expect(part1(input)).toBeLessThan(211843800)
      })
    })
    describe("real input", () => {
      it("part1 should be 211692000", () => {
        expect(part1(input)).toBe(211692000)
      })
    })
  })
  describe("part2", () => {
    describe("example input", () => {
      it.skip("part2 should be...", () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe("real input", () => {
      it.skip("part2 should be...", () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
