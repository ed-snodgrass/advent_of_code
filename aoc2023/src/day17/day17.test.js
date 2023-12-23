import fs from "fs"
import {
  parseInput,
  part1,
  part2,
  exampleInput,
  findNextPossibleNodes,
  Direction,
  parseToNumbers,
  secondExample
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day17Test tests', () => {
  describe('part1', () => {
    let actualOutput
    describe('when getting nextPossibleNodes', () => {

      it('should find (2,0) and (1,1) for (1, 0)', () => {
        const initialNode = {x: 1, y: 0, heatLoss: 4, stepCount: 1, direction: Direction.EAST}
        actualOutput = findNextPossibleNodes(parseToNumbers(parseInput(exampleInput)), initialNode)
        expect(actualOutput).toEqual([
          expect.objectContaining({x: 2, y: 0, heatLoss: 5, direction: Direction.EAST, stepCount: 2}),
          expect.objectContaining({x: 1, y: 1, heatLoss: 6, direction: Direction.SOUTH, stepCount: 0}),
        ])
      })
    })
    describe('example input', () => {
      it('part1 should be 102', () => {
        expect(part1(exampleInput)).toBe(102)
      })
    })
    describe('real input', () => {
      it('part1 should be less than 638', () => {
        expect(part1(input)).toBe(638)
      })
    })
  })
  describe('part2', () => {
    let actualOutput
    describe('example input', () => {
      describe('example 2 input', () => {
        it('should find (2,0) for (1, 0) of first example', () => {
          const initialNode = {x: 1, y: 0, heatLoss: 4, stepCount: 1, direction: Direction.EAST}
          actualOutput = findNextPossibleNodes(parseToNumbers(parseInput(exampleInput)), initialNode, true)
          expect(actualOutput).toEqual([
            expect.objectContaining({x: 2, y: 0, heatLoss: 5, direction: Direction.EAST, stepCount: 2}),
          ])
        })
        it('part2 example2 should be 71', () => {
          expect(part2(secondExample)).toBe(71)
        })
      })

      it('part2  example1 should be...', () => {
        expect(part2(exampleInput)).toBe(94)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(748)
      })
    })
  })
})
