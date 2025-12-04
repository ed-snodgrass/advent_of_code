import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  findInvalidScore,
  findInvalidIds,
} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('Day02Test tests', () => {
  describe('findInvalidIdScore', () => {
    it('should summarize properly', () => {
      expect(findInvalidScore([[11,22],[95,115],[998,1012],[1188511880,1188511890],[222220,222224],
        [1698522,1698528],[446443,446449],[38593856,38593862],[565653,565659],
        [824824821,824824827],[2121212118,2121212124]])).toEqual(1227775554)
    })
  })
  describe('findInvalidIds', () => {
    it('should find 11 as first Id for 11-22', () => {
      expect(findInvalidIds(11,22)).toStrictEqual([11, 22])
    })
    it('should find 11 as first Id for 95-115', () => {
      expect(findInvalidIds(95,115)).toStrictEqual([99])
    })
    it('should find 11 as first Id for 998-1012', () => {
      expect(findInvalidIds(998, 1012)).toStrictEqual([1010])
    })
    it('should find 11 as first Id for 1188511880-1188511890', () => {
      expect(findInvalidIds(1188511880,1188511890)).toStrictEqual([1188511885])
    })
    it('should find 11 as first Id for 222220-222224', () => {
      expect(findInvalidIds(222220, 222224)).toStrictEqual([222222])
    })
    it('should find 11 as first Id for 1698522-1698528', () => {
      expect(findInvalidIds(1698522, 1698528)).toStrictEqual([])
    })
    it('should find 11 as first Id for 446443-446449', () => {
      expect(findInvalidIds(446443, 446449)).toStrictEqual([446446])
    })
    it('should find 11 as first Id for 38593856-38593862', () => {
      expect(findInvalidIds(38593856, 38593862)).toStrictEqual([38593859])
    })
    it('should find 11 as first Id for 565653-565659', () => {
      expect(findInvalidIds(565653, 565659)).toStrictEqual([])
    })
    it('should find 11 as first Id for 824824821-824824827', () => {
      expect(findInvalidIds(824824821, 824824827)).toStrictEqual([])
    })
    it('should find 11 as first Id for 2121212118-2121212124', () => {
      expect(findInvalidIds(2121212118, 2121212124)).toStrictEqual([])
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(1227775554)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe(null)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
