import fs from "fs"
import {parseInput, part1, part2, exampleInput, findNextPossibleNodes, Direction, parseToNumbers} from './index.ts'

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
