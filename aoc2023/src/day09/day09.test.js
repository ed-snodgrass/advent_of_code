import fs from "fs"
import {parseInput, part1, part2, exampleInput, findSequences, extrapolate} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day09Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
        // console.log(parsedInput);
      })
      describe('when extrapolating', () => {
        it('should find 18 for 0 3 6 9 12 15', () => {
          expect(extrapolate([ [ 0, 3, 6, 9, 12, 15 ], [ 3, 3, 3, 3, 3 ], [ 0, 0, 0, 0 ] ])).toBe(18)
        })
      })
      describe('when predicting next value', () => {
        it('should be 18 for 0 3 6 9 12 15', () => {
          expect(findSequences(parsedInput[0])).toEqual([[0, 3, 6, 9, 12, 15], [3, 3, 3, 3, 3], [0, 0, 0, 0]])
        })
      })
      it('should find 3 lines', () => {
        expect(parsedInput.length).toBe(3)
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(114)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should be...', () => {
        expect(part1(input)).toBe(1684566095)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(2)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part2 should be...', () => {
        expect(part2(input)).toBe(1136)
      })
    })
  })
})
