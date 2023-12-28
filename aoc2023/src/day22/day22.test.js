import fs from "fs"
import {
  part1,
  part2,
  exampleInput,
  parseInput,
  letEmFall,
  findSupportingBricks,
  identifyBricksToDisintegrate
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day22Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('identifyBricksToDisintegrate', () => {
        let brickSupportsMap, parsedInput
        beforeEach(() => {
          parsedInput = parseInput(exampleInput)
          // const bricks = parsedInput.bricks
          // currentBricks = parsedInput.bricks.filter(brick => brick.top === 2)
          brickSupportsMap = letEmFall(parsedInput.bricks, parsedInput.maxZ)

        })
        it('should find 5 bricks to disintegrate', () => {
          expect(identifyBricksToDisintegrate(brickSupportsMap, parsedInput.bricks)).toBe(5)
        })
      })
      describe('findSupportingBricks', () => {
        let parsedInput, currentBricks, bricks
        beforeEach(() => {
          parsedInput = parseInput(exampleInput)
          bricks = parsedInput.bricks
          currentBricks = parsedInput.bricks.filter(brick => brick.top === 2)
        })
        it('should find Brick A for Brick B', () => {
          expect(findSupportingBricks(bricks, bricks[1])).toEqual([
            expect.objectContaining({firstEnd: {x: 1, y: 0, z: 1}, secondEnd: {x: 1, y: 2, z: 1} })
          ])
        })
        it('should find Brick A for Brick C', () => {
          expect(findSupportingBricks(bricks, bricks[2])).toEqual([
            expect.objectContaining({ firstEnd: {x: 1, y: 0, z: 1}, secondEnd: {x: 1, y: 2, z: 1} })
          ])
        })
      })
      describe('letEmFall', () => {
        it('should find 6 bricks', () => {
          let parsedInput = parseInput(exampleInput)
          const brickMap = letEmFall(parsedInput.bricks, parsedInput.maxZ)
          expect(brickMap.size).toBe(6)
        })
      })
      describe('parseInput', () => {
        let parsedInput, bricks
        beforeEach(() => {

          parsedInput = parseInput(exampleInput)
          bricks = parsedInput.bricks
        })
        it('should find 7 bricks', () => {
          expect(bricks).toHaveLength(7)
        })
        it('should have brick 0 of length 2', () => {
          expect(bricks[0].brickLength).toBe(3)
        })
        it('should have direction y ', () => {
          expect(bricks[0].direction).toBe('y')
        })
        it('should have brick 1 of length 2', () => {
          expect(bricks[1].brickLength).toBe(3)
        })
        it('should have direction y ', () => {
          expect(bricks[1].direction).toBe('x')
        })
        it('should have brick 6 of length 1', () => {
          expect(bricks[6].brickLength).toBe(2)
        })
        it('should have direction y ', () => {
          expect(bricks[6].direction).toBe('z')
        })
        it('should find maxX of 2', () => {
          expect(parsedInput.maxX).toBe(2)
        })
        it('should find maxY of 2', () => {
          expect(parsedInput.maxY).toBe(2)
        })
        it('should find maxZ of 9', () => {
          expect(parsedInput.maxZ).toBe(9)
        })
      })
      it('part1 should find 5 bricks to disintegrate', () => {
        expect(part1(exampleInput)).toBe(5)
      })
      it('part1 should find 3 bricks to disintegrate with modified example', () => {
        expect(part1(`0,0,1~0,0,2
1,0,1~2,0,1
1,0,2~1,0,2
0,0,3~1,0,3`)).toBe(3)
      })
    })
    describe('real input', () => {
      it('should sort by z', () => {
        const bricks = parseInput(input).bricks
        // console.log(bricks);
        expect(bricks[0].top).toBe(1)
      })
      it('part1 should be 421', () => {

        expect(part1(input)).toBe(421)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInput)).toBe()
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
