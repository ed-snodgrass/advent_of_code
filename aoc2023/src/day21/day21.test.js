import fs from "fs"
import {part1, part2, exampleInput, parseInput, takeStep, nodeToString} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day21Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('parsing input', () => {
        it('should find 11 lines', () => {
          expect(parseInput(exampleInput).grid).toHaveLength(11)
          expect(parseInput(exampleInput).startingPosition).toEqual({x: 5, y: 5})
        })
      })
      describe('taking the first step', () => {
        let actual
        afterEach(() => {
          actual = undefined
        })
        beforeEach(() => {
          const input = parseInput(exampleInput)
          const visited = [nodeToString(input.startingPosition)]
          actual = takeStep(input.grid, [input.startingPosition])
        })
        it('should return 4, 5 and 5, 4', () => {

          expect(actual).toEqual(expect.arrayContaining([{x: 4, y: 5}, {x: 5, y: 4}]))
        })
      })
      describe('taking the second step', () => {
        let actual
        beforeEach(() => {
          const input = parseInput(exampleInput)
          actual = takeStep(input.grid, [input.startingPosition])
          actual = takeStep(input.grid, actual)
        })
        it('should return 4, 5 and 5, 4', () => {

          expect(actual).toEqual(expect.arrayContaining([{x: 5, y: 5}, {x: 5, y: 3}, {x: 5, y: 3}, {x: 3, y: 5}]))
        })
      })
      describe('taking the third step', () => {
        let actual
        beforeEach(() => {
          const input = parseInput(exampleInput)
          actual = takeStep(input.grid, [input.startingPosition])
          actual = takeStep(input.grid, actual)
          actual = takeStep(input.grid, actual)
        })
        it('should return 6 plots', () => {

          expect(actual).toEqual(expect.arrayContaining([
            {x: 6, y: 3}, {x: 3, y: 4}, {x: 5, y: 4}, {x: 4, y: 5}, {x: 3, y: 6}, {x: 4, y: 7}
          ]))
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(16)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(3751)
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
