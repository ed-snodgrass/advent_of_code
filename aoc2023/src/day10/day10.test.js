import fs from "fs"
import {
  parseInput,
  part1,
  part2,
  exampleInput,
  exampleInput2,
  findStartingPoint,
  findViablePathsFromNode, horizontalConnector, verticalConnector
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day10Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('should have 2 viable options', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toHaveLength(2)
      })
      it('should have horizontal for east', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toStrictEqual(expect.arrayContaining([expect.objectContaining({x: 2, y: 1, v: horizontalConnector})]))
      })
      it('should have horizontal for east', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toStrictEqual(expect.arrayContaining([expect.objectContaining({x: 1, y: 2, v: verticalConnector})]))
      })
      it('should have starting point at 1, 1', () => {
        expect(findStartingPoint(parsedInput)).toEqual({x: 1, y: 1, v: 'S', hasVisited: false})
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(4)
      })
    })
    describe('example input 2', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput2)
      })
      it('should have starting point at 2, 0', () => {
        expect(findStartingPoint(parsedInput)).toEqual({x: 0, y: 2, v: 'S', hasVisited: false})
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput2)).toBe(8)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should be...', () => {
        expect(part1(input)).toBe(6738)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe()
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
