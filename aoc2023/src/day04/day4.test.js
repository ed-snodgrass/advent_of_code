import fs from "fs"
import {part1, part2, exampleInput, parseInput, getScores, getCards} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('day4 tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      let parsedExampleInput
      beforeAll(() => {
        parsedExampleInput = parseInput(exampleInput)
      })
      it('should find 6 cards', () => {
        expect(parsedExampleInput.length).toBe(6)
      })
      it('should find 8 points for card 1', () => {
        expect(getScores(parsedExampleInput)[0].score).toBe(8)
      })
      it('should find 2 points for card 2', () => {
        expect(getScores(parsedExampleInput)[1].score).toBe(2)
      })
      it('should find 2 points for card 3', () => {
        expect(getScores(parsedExampleInput)[2].score).toBe(2)
      })
      it('should find 1 points for card 4', () => {
        expect(getScores(parsedExampleInput)[3].score).toBe(1)
      })
      it('should find 0 points for card 5', () => {
        expect(getScores(parsedExampleInput)[4].score).toBe(0)
      })
      it('should find 0 points for card 6', () => {
        expect(getScores(parsedExampleInput)[5].score).toBe(0)
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(13)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(21485)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      let parsedExampleInput
      beforeAll(() => {
        parsedExampleInput = parseInput(exampleInput)
      })
      it('should find 4 more cards for card 1', () => {
        expect(getCards(parsedExampleInput)[0].matchingNumbers.length).toBe(4)
      })
      it('should find 2 more cards for card 2', () => {
        expect(getCards(parsedExampleInput)[1].matchingNumbers.length).toBe(2)
      })
      it('should find 2 more cards for card 3', () => {
        expect(getCards(parsedExampleInput)[2].matchingNumbers.length).toBe(2)
      })
      it('should find 1 more cards for card 4', () => {
        expect(getCards(parsedExampleInput)[3].matchingNumbers.length).toBe(1)
      })
      it('should find 0 more cards for card 5', () => {
        expect(getCards(parsedExampleInput)[4].matchingNumbers.length).toBe(0)
      })
      it('should find 0 more cards for card 6', () => {
        expect(getCards(parsedExampleInput)[5].matchingNumbers.length).toBe(0)
      })

      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(30)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part2(input)).toBe(11024379)
      })
    })
  })
})
