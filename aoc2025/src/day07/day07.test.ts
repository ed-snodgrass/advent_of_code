import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  snippetFromInput,
  findAllPossibleBeamLocations,
} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day07Test tests', () => {
  describe('splitting', () => {
    it('snippetFromInput', () => {
      expect(part1(snippetFromInput)).toBe(8)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 21', () => {
        expect(part1(exampleInputPart1)).toBe(21)
      })
    })
    describe('real input', () => {
      it('part1 should be be greater than 1504', () => {
        expect(part1(input)).toBe(1504)
      })
    })
  })
  describe('part2', () => {
    describe('findAllPossibleBeamLocations', () => {
      let input: string[][]
      describe('when just the starting position', () => {
        beforeEach(() => {
          input = parseInput(`.S.`)
        })
        it('should find a beam at 1,1', () => {
          expect(findAllPossibleBeamLocations(input)).toStrictEqual([[1,1]])
        })
      })
      describe('after one split', () => {
        beforeEach(() => {
          input = parseInput(`.S.\n...\n.^.`)
        })
        it('should find beams at [1,1], [0,3], [2,3]', () => {
          expect(findAllPossibleBeamLocations(input)).toStrictEqual([[1,1], [0,3], [2,3]])
        })
      })
    })
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(40)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
