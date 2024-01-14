import fs from "fs"
import {part1, part2, exampleInput, parseInput, sumUpAcceptedPartRatings, isAcceptedPart} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day19Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('should find 11 workflows', () => {
        expect(parseInput(exampleInput).workflows).toHaveLength(11)
      })
      describe('first workflow', () => {
        let firstWorkflow
        beforeEach(() => {
          firstWorkflow = parseInput(exampleInput).workflows[0]
        })
        it('should find the first workflow to have the name px', () => {
          expect(firstWorkflow.name).toBe('px')
        })
        it('should find the first workflow to have three rules', () => {
          expect(firstWorkflow.rules).toHaveLength(3)
        })
        it('should find the first rule of the first workflow to have nextWorkflow of qkq', () => {
          expect(firstWorkflow.rules[0].nextWorkflow).toBe('qkq')
        })
        it('should find the last rule of the first workflow to have nextWorkflow of rfg', () => {
          expect(firstWorkflow.rules[firstWorkflow.rules.length - 1].nextWorkflow).toBe('rfg')
        })
      })
      describe('first partRating', () => {
        let firstPartRating
        beforeEach(() => {
          firstPartRating = parseInput(exampleInput).partRatings[0]
        })
        it('should have correct xmas values', () => {
          expect(firstPartRating).toEqual({x: 787, m: 2655, a: 1222, s: 2876})
        })
      })
      it('should find 5 partRatings', () => {
        expect(parseInput(exampleInput).partRatings).toHaveLength(5)
      })
      describe('when summing up accepted part ratings', () => {
        it('should return 19114', () => {
          expect(sumUpAcceptedPartRatings([
            {x: 787, m: 2655, a: 1222, s: 2876},
            {x: 2036, m: 264, a: 79, s: 2244},
            {x: 2127, m: 1623, a: 2188, s: 1013},
          ])).toBe(19114)
        })
      })
      describe('when checking if isAcceptedPart', () => {

        it('should accept the correct parts', () => {
          expect(isAcceptedPart({x: 787, m: 2655, a: 1222, s: 2876}, parseInput(exampleInput).workflows)).toBe(true)
          expect(isAcceptedPart({x: 2036, m: 264, a: 79, s: 2244}, parseInput(exampleInput).workflows)).toBe(true)
          expect(isAcceptedPart({x: 2127, m: 1623, a: 2188, s: 1013}, parseInput(exampleInput).workflows)).toBe(true)
        })
        it('should not accept the rejected parts', () => {
          expect(isAcceptedPart({x: 1679, m: 44, a: 2067, s: 496}, parseInput(exampleInput).workflows)).toBe(false)
          // expect(isAcceptedPart({x: 2461, m: 1339, a: 446, s: 291}, parseInput(exampleInput).workflows)).toBe(false)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(19114)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(353553)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(167409079868000)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        const value = part2(input)
        console.log('part2: ', value);
        expect(value).toBe(124615747767410)
      })
    })
  })
})
