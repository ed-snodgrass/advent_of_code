import fs from "fs"
import {exampleInput, parseInput, getGames, getPossibleGames, part1} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('day2 tests', () => {
  let inputData, actual
  afterEach(() => {
    inputData = undefined
    actual = undefined
  })
  describe('part1 tests', () => {
    describe('example data', () => {
      it('should parse data into 5 rounds', () => {
        expect(parseInput(exampleInput).length).toBe(5)
      })
      it('should parse data into 5 rounds', () => {
        expect(getGames(exampleInput).length).toBe(5)
      })
      it('the first game should have id 1', () => {
        expect(getGames(exampleInput)[0].id).toBe(1)
      })
      it('should have 3 showings for the first game', () => {
        expect(getGames(exampleInput)[0].showings.length).toBe(3)
      })
      it('should there to be 3 possible games', () => {
        expect(getPossibleGames(exampleInput).length).toBe(3)
      })
      it('should there to be 3 possible games', () => {
        expect(part1(exampleInput)).toBe(8)
      })
    })
    describe('real data', () => {
      it('should be less than 3121', () => {
        expect(part1(input)).toBe(3099)
      })
    })
  })
})
