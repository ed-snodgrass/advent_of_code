import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2, findLargestJoltage } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const turnToJoltageArray = (bank: string) => bank.split('').map(joltage => parseInt(joltage))

describe('Day03Test tests', () => {
  describe('parseInput', () => {
    it('should return 4 banks for exampleInputPart1', () => {
      expect(parseInput(exampleInputPart1)).toHaveLength(4)
    })
  })
  describe('findLargestJoltage', () => {
    it('should find 98 for bank 987654321111111', () => {
      expect(findLargestJoltage(turnToJoltageArray('987654321111111'))).toBe(98)
    })
    it('should find 89 for bank 811111111111119', () => {
      expect(findLargestJoltage(turnToJoltageArray('811111111111119'))).toBe(89)
    })
    it('should find 78 for bank 234234234234278', () => {
      expect(findLargestJoltage(turnToJoltageArray('234234234234278'))).toBe(78)
    })
    it('should find 92 for bank 818181911112111', () => {
      expect(findLargestJoltage(turnToJoltageArray('818181911112111'))).toBe(92)
    })
  })
  describe('findLargestJoltage with 12 digits', () => {

    it('should find 987654321111 for bank 987654321111111', () => {
      expect(findLargestJoltage(turnToJoltageArray('987654321111111'), 12)).toBe(987654321111)
    })
    it('should find 811111111119 for bank 811111111111119', () => {
      expect(findLargestJoltage(turnToJoltageArray('811111111111119'), 12)).toBe(811111111119)
    })
    it('should find 434234234278 for bank 234234234234278', () => {
      expect(findLargestJoltage(turnToJoltageArray('234234234234278'), 12)).toBe(434234234278)
    })
    it('should find 888911112111 for bank 818181911112111', () => {
      expect(findLargestJoltage(turnToJoltageArray('818181911112111'), 12)).toBe(888911112111)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 357', () => {
        expect(part1(exampleInputPart1)).toBe(357)
      })
    })
    describe('real input', () => {
      it('part1 should be 17107', () => {
        expect(part1(input)).toBe(17107)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 3121910778619', () => {
        expect(part2(exampleInputPart2)).toBe(3121910778619)
      })
    })
    describe('real input', () => {
      it('part2 should be 169349762274117', () => {
        expect(part2(input)).toBe(169349762274117)
      })
    })
  })
})
