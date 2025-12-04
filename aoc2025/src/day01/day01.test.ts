import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, rotateDial, rotateDialAndCountPassingZero } from './solution'

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
          expect(rotateDial({direction: 'L', distance: 23}, 33)).toEqual(10)
        })
      })
      describe('wrapping once', () => {
        it('should returnMAX + 1 + currentPosition - rotation.distance', () => {
          expect(rotateDial({direction: 'L', distance: 1}, 0)).toEqual(MAX)
          expect(rotateDial({direction: 'L', distance: 1}, MAX)).toEqual(98)
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
          expect(rotateDial({direction: 'L', distance: 101}, MAX)).toEqual(98)
          expect(rotateDial({direction: 'L', distance: 201}, MAX)).toEqual(98)
        })
      })
      describe('wrapping thrice', () => {
        it('should return whatever thrice gets you', () => {
          expect(rotateDial({direction: 'L', distance: 199}, 0)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 299}, 0)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 200}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 200}, 1)).toEqual(1)
          expect(rotateDial({direction: 'L', distance: 200}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 300}, 0)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 201}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 301}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 401}, 1)).toEqual(0)
          expect(rotateDial({direction: 'L', distance: 876}, 98)).toEqual(22)
          expect(rotateDial({direction: 'L', distance: 18}, 68)).toEqual(50)
        })
      })
    })
    describe('turning right', () => {
      it('should return', () => {

        expect(rotateDial({direction: 'R', distance: 90}, 10)).toEqual(0)//1
        expect(rotateDial({direction: 'R', distance: 50}, 0)).toEqual(50)
        expect(rotateDial({direction: 'R', distance: 50}, 49)).toEqual(MAX)
        expect(rotateDial({direction: 'R', distance: 50}, 50)).toEqual(0)//1
        expect(rotateDial({direction: 'R', distance: 50}, 51)).toEqual(1)//1
        expect(rotateDial({direction: 'R', distance: 302}, 0)).toEqual(2)//3
        expect(rotateDial({direction: 'R', distance: 301}, 99)).toEqual(0)//3
        expect(rotateDial({direction: 'R', distance: 201}, 99)).toEqual(0)//2
        expect(rotateDial({direction: 'R', distance: 101}, 99)).toEqual(0)//1
        expect(rotateDial({direction: 'R', distance: 1}, 99)).toEqual(0)//1
        expect(rotateDial({direction: 'R', distance: 1}, 0)).toEqual(1)
        expect(rotateDial({direction: 'R', distance: 21}, 50)).toEqual(71)
        expect(rotateDial({direction: 'R', distance: 13}, 22)).toEqual(35)
        expect(rotateDial({direction: 'R', distance: 48}, 52)).toEqual(0)//1
        expect(rotateDial({direction: 'R', distance: 60}, 95)).toEqual(55)//1
        expect(rotateDial({direction: 'R', distance: 160}, 95)).toEqual(55)
        expect(rotateDial({direction: 'R', distance: 17}, 76)).toEqual(93)
      })
    })
  })

  describe('rotateDialAndCountPassingZero', () => {

    describe('turning left', () => {
      it('should return', () => {
        expect(rotateDialAndCountPassingZero({direction: 'L', distance: 150}, 50).crossedOrHitZero).toEqual(2)

        expect(rotateDialAndCountPassingZero({direction: 'L', distance: 151}, 50).crossedOrHitZero).toEqual(2)

        expect(rotateDialAndCountPassingZero({direction: 'L', distance: 0}, 0).crossedOrHitZero).toEqual(0)
        expect(rotateDialAndCountPassingZero({direction: 'L', distance: 49}, 50).crossedOrHitZero).toEqual(0)
        expect(rotateDialAndCountPassingZero({direction: 'L', distance: 50}, 50).crossedOrHitZero).toEqual(1)

      })
    })

    describe('turning right', () => {
      it('should return', () => {
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 95}, 65).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 95}, 65).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 95}, 60).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 60}, 95).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 48}, 52).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 355}, 7).crossedOrHitZero).toEqual(3)

        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 90}, 10).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 50}, 50).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 50}, 51).crossedOrHitZero).toEqual(1)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 302}, 0).crossedOrHitZero).toEqual(3)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 301}, 99).crossedOrHitZero).toEqual(4)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 201}, 99).crossedOrHitZero).toEqual(3)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 101}, 99).crossedOrHitZero).toEqual(2)
        expect(rotateDialAndCountPassingZero({direction: 'R', distance: 1}, 99).crossedOrHitZero).toEqual(1)
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
        expect(part1(input)).toBeGreaterThan(832)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart1)).toBe(6)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBeGreaterThan(6117)
        expect(part2(input)).toBeLessThan(6332)
        expect(part2(input)).toBe(6228)
      })
    })
  })
})
