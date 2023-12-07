import fs from "fs"
import {parseInput, part1, part2, exampleInput, compareHandsOfType, getHands, rankHands, getType} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day07Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('when hands are the same type', () => {
      it('should rank 33332 over 2AAAA', () => {
        expect(compareHandsOfType('33332', '2AAAA')).toBe('33332')
      })
      it('should rank 77888 over 77788', () => {
        expect(compareHandsOfType('77888', '77788')).toBe('77888')
      })
    })
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      describe('when getting types', () => {
        it('should return ', () => {
          expect(getType('AAAAA')).toBe(6)
          expect(getType('AATAA')).toBe(5)
          expect(getType('AAA88')).toBe(4)
          expect(getType('AAA89')).toBe(3)
          expect(getType('AA989')).toBe(2)
          expect(getType('AA987')).toBe(1)
          expect(getType('AJ987')).toBe(0)
          expect(getType('AJ987')).toBe(0)

          // console.log(getHands(parsedInput)[0].hand)
          // console.log(getType(getHands(parsedInput)[0].hand))
          expect(getType(getHands(parsedInput)[0].hand)).toBe(1)
          expect(getType(getHands(parsedInput)[1].hand)).toBe(3)
          expect(getType(getHands(parsedInput)[2].hand)).toBe(2)
          expect(getType(getHands(parsedInput)[3].hand)).toBe(2)
          expect(getType(getHands(parsedInput)[4].hand)).toBe(3)
        })
      })
      describe('when getting hands', () => {
        it('should have 5 hands', () => {
          expect(getHands(parsedInput).length).toBe(5)
        })
      })
      describe('when ranking hands', () => {
        it('should have correct ranking', () => {
          expect(rankHands(getHands(parsedInput))[0].hand).toBe('32T3K')
          expect(rankHands(getHands(parsedInput))[1].hand).toBe('KTJJT')
          expect(rankHands(getHands(parsedInput))[2].hand).toBe('KK677')
          expect(rankHands(getHands(parsedInput))[3].hand).toBe('T55J5')
          expect(rankHands(getHands(parsedInput))[4].hand).toBe('QQQJA')
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(6440)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should be...', () => {
        expect(part1(input)).toBe(251806792)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it.skip('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(5905)
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
