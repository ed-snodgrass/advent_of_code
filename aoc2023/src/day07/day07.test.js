import fs from "fs"
import {parseInput, part1, part2, exampleInput, getHands, rankHands, getType} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day07Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
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
      describe('when using jokers for type comparison', () => {
        it('should return ', () => {
          expect(getType('AAAAA', true)).toBe(6)
          expect(getType('AAJAA', true)).toBe(6)
          expect(getType('AAJJA', true)).toBe(6)
          expect(getType('AJJJA', true)).toBe(6)
          expect(getType('AJATA', true)).toBe(5)
          expect(getType('AAATA', true)).toBe(5)
          expect(getType('AJJJT', true)).toBe(5)
          expect(getType('TTJJ2', true)).toBe(5)
          expect(getType('TTJ22', true)).toBe(4)
          expect(getType('TTJQ2', true)).toBe(3)
          expect(getType('AJ987', true)).toBe(1)
          expect(getType('AJ997', true)).toBe(3)
          expect(getType('AJ99A', true)).toBe(4)

        })
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(5905)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part2 should be...', () => {
        expect(part2(input)).toBe(252113488)
      })
    })
  })
})
