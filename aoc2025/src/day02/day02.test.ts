import * as fs from "fs"
import {
  part1,
  part2,
  exampleInputPart1,
  exampleInputPart2,
  findInvalidScore,
  findInvalidIds,
  findInvalidIds2, isInvalid,
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

  describe('isInvalid', () => {
    it('returns false for any single digit number', () => {
      expect(isInvalid(0)).toBe(false)
    })
    it('returns true if all values are the same for 2 digit number', () => {
      expect(isInvalid(11)).toBe(true)
    })
    it('returns true if all values are the same for 3 digit number', () => {
      expect(isInvalid(111)).toBe(true)
      expect(isInvalid(999)).toBe(true)
    })
    it('returns true if a value is repeated', () => {
      expect(isInvalid(1010)).toBe(true)
      expect(isInvalid(1188511885)).toBe(true)
      expect(isInvalid(446446)).toBe(true)
      expect(isInvalid(38593859)).toBe(true)
      expect(isInvalid(565656)).toBe(true)
      expect(isInvalid(824824824)).toBe(true)
      expect(isInvalid(2121212121)).toBe(true)
    })
  })

  describe('part2 findInvalidIds2', () => {
    it('should find [11,22] for 11-22', () => {
      expect(findInvalidIds2(11,22)).toStrictEqual([11, 22])
    })
    it('should find [99, 111] for 95-115', () => {
      expect(findInvalidIds2(95, 115)).toStrictEqual([99, 111])
    })

    it('should find [999, 1010] for 998-1012', () => {
      expect(findInvalidIds2(998, 1012)).toStrictEqual([999, 1010])
    })

    it('should find [1188511885] for 1188511880-1188511890', () => {
      expect(findInvalidIds2(1188511880, 1188511890)).toStrictEqual([1188511885])
    })

    it('should find [222222] for 222220-222224', () => {
      expect(findInvalidIds2(222220, 222224)).toStrictEqual([222222])
    })

    it('should find [] for 1698522-1698528', () => {
      expect(findInvalidIds2(1698522, 1698528)).toStrictEqual([])
    })

    it('should find [446446] for 446443-446449', () => {
      expect(findInvalidIds2(446443, 446449)).toStrictEqual([446446])
    })

    it('should find [38593859] for 38593856-38593862', () => {
      expect(findInvalidIds2(38593856, 38593862)).toStrictEqual([38593859])
    })

    it('should find [565656] for 565653-565659', () => {
      expect(findInvalidIds2(565653, 565659)).toStrictEqual([565656])
    })

    it('should find [824824824] for 824824821-824824827', () => {
      expect(findInvalidIds2(824824821, 824824827)).toStrictEqual([824824824])
    })

    it('should find [2121212121] for 2121212118-2121212124', () => {
      expect(findInvalidIds2(2121212118, 2121212124)).toStrictEqual([2121212121])
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 1227775554', () => {
        expect(part1(exampleInputPart1)).toBe(1227775554)
      })
    })
    describe('real input', () => {
      it('part1 should be 19219508902', () => {
        expect(part1(input)).toBe(19219508902)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 4174379265', () => {
        expect(part2(exampleInputPart2)).toBe(4174379265)
      })
    })
    describe('real input', () => {
      it('part2 should be ', () => {
        expect(part2(input)).toBe(27180728081)
      })
    })
  })
})
