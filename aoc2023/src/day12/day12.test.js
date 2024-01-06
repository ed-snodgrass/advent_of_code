import fs from "fs"
import {parseInput, part1, part2, exampleInput, findArrangementCount, unfold, unfoldAll} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day12Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      describe('finding total arrangements', () => {
        it('should find 1 arrangement for ???.### 1,1,3', () => {
          expect(findArrangementCount(parsedInput[0])).toBe(1)
        })
        it('should find 1 arrangement for .??..??...?##. 1,1,3', () => {
          expect(findArrangementCount(parsedInput[1])).toBe(4)
        })
        it('should find 1 arrangement for ?#?#?#?#?#?#?#? 1,3,1,6', () => {
          expect(findArrangementCount(parsedInput[2])).toBe(1)
        })
        it('should find 1 arrangement for ????.#...#... 4,1,1', () => {
          expect(findArrangementCount(parsedInput[3])).toBe(1)
        })
        it('should find 1 arrangement for ????.######..#####. 1,6,5', () => {
          expect(findArrangementCount(parsedInput[4])).toBe(4)
        })
        it('should find 1 arrangement for ?###???????? 3,2,1', () => {
          expect(findArrangementCount(parsedInput[5])).toBe(10)
        })
      })
      it('should find 6 inputs', () => {
        expect(parseInput(exampleInput)).toHaveLength(6)
      })

      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(21)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(7350)
      })
    })
  })
  describe('part2', () => {

    describe('unfolding', () => {
      it('should unfoldAll to be same length as original', () => {
        expect(parseInput(unfoldAll(exampleInput))).toHaveLength(parseInput(exampleInput).length)
      })
      it('should unfold', () => {
        expect(unfold('???.### 1,1,3')).toBe('???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3')
      })
    })
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
