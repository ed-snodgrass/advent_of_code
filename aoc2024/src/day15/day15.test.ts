import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  smallerInput,
  translateMap,
  attemptMove,
  DIRECTIONS, ROBOT, BOX, EMPTY, calculateGps2, attemptMove2, findRobot,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const toGrid = (mapAsString: string) => mapAsString.split('\n').map(s => s.split(''))

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
    describe("translateMap", () => {
      let originalMap: string[][]
      beforeEach(() => {
        originalMap = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######`.split('\n').map(s => s.split(''))
      })
      it("should match the expected", () => {
        const expectedTranslatedMap = `##############
##......##..##
##..........##
##....[][]@.##
##....[]....##
##..........##
##############`.split('\n').map(s => s.split(''))
        expect(translateMap(originalMap)).toEqual(expectedTranslatedMap)
      })
    })
    describe("calculateGps2", () => {
      let warehouseMap: string[][]
      beforeEach(() => {
        warehouseMap = toGrid(`####################
##[].......[].[][]##
##[]...........[].##
##[]........[][][]##
##[]......[]....[]##
##..##......[]....##
##..[]............##
##..@......[].[][]##
##......[][]..[]..##
####################`)
      })
      it("should return 9021", () => {
        expect(calculateGps2(warehouseMap)).toBe(9021)
      })
    })
    describe("attemptMove2", () => {
      let originalMap: string[][]
      let actualMap: { newMap: string[][] }
      describe('moving down without a block', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##..........##
##...[][]@..##
##....[]....##
##..........##
##############`)
          actualMap = attemptMove2(originalMap, DIRECTIONS['v'])
        })
        it('should move the robot down', () => {
          expect(findRobot(actualMap.newMap)).toEqual([9, 4])
        })
      })
      describe('moving left without a block', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##..........##
##...[][]...##
##....[]....##
##.......@..##
##############`)
        })
        it('should move the robot left', () => {
          expect(findRobot(attemptMove2(originalMap, DIRECTIONS['<']).newMap)).toEqual([8, 5])
        })
      })
      describe('moving right without a block', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##..........##
##...[][]...##
##...@......##
##..........##
##############`)
        })
        it('should move the robot right', () => {
          expect(findRobot(attemptMove2(originalMap,DIRECTIONS['>']).newMap)).toEqual([6, 4])
        })
      })
      describe('moving left with a block', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##..........##
##...[][]...##
##....[]@...##
##..........##
##############`)
          actualMap = attemptMove2(originalMap, DIRECTIONS['<'])
        })
        it('should move the robot left', () => {
          expect(findRobot(actualMap.newMap)).toEqual([7, 4])
        })
        it('should move the block left', () => {
          expect(actualMap.newMap[4][6]).toEqual(']')
          expect(actualMap.newMap[4][5]).toEqual('[')
        })
      })
      describe('moving right with a block', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##..........##
##...[][]...##
##...@[]....##
##..........##
##############`)
          actualMap = attemptMove2(originalMap, DIRECTIONS['>'])
        })
        it('should move the robot right', () => {
          expect(findRobot(actualMap.newMap)).toEqual([6, 4])
        })
        it('should move the block right', () => {
          expect(actualMap.newMap[4][7]).toEqual('[')
          expect(actualMap.newMap[4][8]).toEqual(']')
        })
      })
      describe('pushing one block up aligned with ]', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##...[][]...##
##....@.....##
##..........##
##..........##
##############`)
          actualMap = attemptMove2(originalMap, DIRECTIONS['^'])
        })
        it('should move the robot up', () => {
          expect(findRobot(actualMap.newMap)).toEqual([6, 2])
        })
        it('should move the block up', () => {
          expect(actualMap.newMap[1][5]).toEqual('[')
          expect(actualMap.newMap[1][6]).toEqual(']')
        })
      })
      describe('pushing one block up aligned with [', () => {
        beforeEach(() => {
          originalMap = toGrid(`##############
##......##..##
##...[][]...##
##...@[]....##
##..........##
##..........##
##############`)
          actualMap = attemptMove2(originalMap, DIRECTIONS['^'])
        })
        it('should move the robot up', () => {
          expect(findRobot(actualMap.newMap)).toEqual([5, 2])
        })
        it('should move the block up', () => {
          expect(actualMap.newMap[1][5]).toEqual('[')
          expect(actualMap.newMap[1][6]).toEqual(']')
        })
      })
      describe("pushing one block down aligned with [", () => {
        beforeEach(() => {
          originalMap = toGrid(`#####
##@.##
##[]##
##..##
######`)
          actualMap = attemptMove2(originalMap, DIRECTIONS["v"])
        })
        it("should move the robot down", () => {
          expect(findRobot(actualMap.newMap)).toEqual([2, 2])
        })
        it("should move the block down", () => {
          expect(actualMap.newMap[3][2]).toEqual("[")
          expect(actualMap.newMap[3][3]).toEqual("]")
        })
      })
      describe("pushing one block down aligned with ]", () => {
        beforeEach(() => {
          originalMap = toGrid(`#####
##.@##
##[]##
##..##
######`)
          actualMap = attemptMove2(originalMap, DIRECTIONS["v"])
        })
        it("should move the robot down", () => {
          expect(findRobot(actualMap.newMap)).toEqual([3, 2])
        })
        it("should move the block down ", () => {
          expect(actualMap.newMap[3][2]).toEqual("[")
          expect(actualMap.newMap[3][3]).toEqual("]")
        })
      })
      describe('pushing two blocks aligned', () => {
        describe('up aligned with ]', () => {
          let actualMap: { newMap: string[][] }
          beforeEach(() => {
            originalMap = toGrid(`########
##....##
##.[].##
##.[].##
##..@.##
########`)
            actualMap = attemptMove2(originalMap, DIRECTIONS['^'])
          })
          it('should move the robot up', () => {
            expect(findRobot(actualMap.newMap)).toEqual([4, 3])
          })
          it('should move the blocks up', () => {
            expect(actualMap.newMap[2][3]).toEqual('[')
            expect(actualMap.newMap[2][4]).toEqual(']')
            expect(actualMap.newMap[1][3]).toEqual('[')
            expect(actualMap.newMap[1][4]).toEqual(']')
          })
        })

        describe.skip('up aligned with [', () => {
          let actualMap: { newMap: string[][] }
          beforeEach(() => {
            originalMap = toGrid(`##############
      ##......##..##
      ##..........##
      ##...[][]...##
      ##....[]....##
      ##....@.....##
      ##############`)
            actualMap = attemptMove2(originalMap, DIRECTIONS['^'])
          })
          it('should move the robot up', () => {
            expect(findRobot(actualMap.newMap)).toEqual([6, 4])
          })
          it('should move the blocks up', () => {
            expect(actualMap.newMap[2][5]).toEqual('[')
            expect(actualMap.newMap[2][6]).toEqual(']')
            expect(actualMap.newMap[2][7]).toEqual('[')
            expect(actualMap.newMap[2][8]).toEqual(']')
            expect(actualMap.newMap[3][6]).toEqual('[')
            expect(actualMap.newMap[3][7]).toEqual(']')
          })
        })
      })
    })
    describe('example input', () => {
      it('part2 should be 9021', () => {
        expect(part2(exampleInputPart2)).toBe(9021)
      })
    })
    describe('real input', () => {
      it('part2 should be 1575877', () => {
        expect(part2(input)).toBe(1575877)
      })
    })
  })
})
