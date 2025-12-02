import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, rotateDial } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const MAX = 99

describe('Day01 tests', () => {
  describe('rotateDial', () => {
    describe('turning left', () => {
      describe('without wrapping', () => {
        it('should return 0', () => {
          expect(rotateDial({direction: 'L', distance: 1}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 0}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 99}, 99)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 0}, 99)).toEqual(99)
          expect(rotateDial({direction: 'L', distance: 49}, 50)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 37}, 71)).toEqual(34)
          expect(rotateDial({direction: 'L', distance: 45}, 55)).toEqual(10)
          expect(rotateDial({direction: 'L', distance: 45}, 55)).toEqual(10)
        })
      })
      describe('wrapping once', () => {
        it('should returnMAX + 1 + currentPosition - rotation.distance', () => {
          expect(rotateDial({direction: 'L', distance: 1}, 0)).toEqual(MAX)
          expect(rotateDial({direction: 'L', distance: 2}, 1)).toEqual(MAX)
          expect(rotateDial({direction: 'L', distance: 3}, 2)).toEqual(MAX)
          expect(rotateDial({direction: 'L', distance: 2}, 0)).toEqual(MAX - 1)
          expect(rotateDial({direction: 'L', distance: 3}, 0)).toEqual(MAX - 2)
          expect(rotateDial({direction: 'L', distance: 4}, 0)).toEqual(MAX - 3)
          expect(rotateDial({direction: 'L', distance: 5}, 0)).toEqual(MAX - 4)
          expect(rotateDial({direction: 'L', distance: 6}, 0)).toEqual(MAX - 5)
          expect(rotateDial({direction: 'L', distance: MAX}, 0)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 13}, 11)).toEqual(98)
          expect(rotateDial({direction: 'L', distance: 40}, 33)).toEqual(93)
        })
      })
      describe('wrapping twice', () => {
        it('should return MAX + 2', () => {
          expect(rotateDial({direction: 'L', distance: 100}, 1)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 100}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 102}, 0)).toEqual(98)
          expect(rotateDial({direction: 'L', distance: MAX + 2}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: MAX + 2}, 0)).toEqual(99)
          expect(rotateDial({direction: 'L', distance: MAX + 3}, 1)).toEqual(99)
          expect(rotateDial({direction: 'L', distance: MAX + 3}, 0)).toEqual(98)
          expect(rotateDial({direction: 'L', distance: MAX + 4}, 1)).toEqual(98)
          expect(rotateDial({direction: 'L', distance: MAX + 4}, 0)).toEqual(97)
        })
      })
      describe('wrapping thrice', () => {
        it('should return whatever thrice gets you', () => {
          expect(rotateDial({direction: 'L', distance: 199}, 0)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 200}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 200}, 1)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 200}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 201}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 876}, 98)).toEqual(22)
        })
      })
    })
  })


  describe('part1', () => {

    describe('example input', () => {
      it('part1 should be 3', () => {
        expect(part1(exampleInputPart1)).toBe(3)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(null)
      })
    })
  })
  describe.skip('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
