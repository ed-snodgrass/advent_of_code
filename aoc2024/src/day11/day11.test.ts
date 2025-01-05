import * as fs from "fs"
import {
  part1,
  part2,
  exampleInputPart1,
  replaceStone,
  performBlinkMany, performBlink,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day11Test tests', () => {
  describe('replaceStone', () => {
    describe("when replacing a 0", () => {
      it("should return a 1", () => {
        expect(replaceStone(0)).toEqual([1])
      })
    })
    describe("when replacing a 1234", () => {
      it("should return a [12,34]", () => {
        expect(replaceStone(1234)).toEqual([12,34])
      })
    })
    describe("when replacing a 1", () => {
      it("should return a [2024]", () => {
        expect(replaceStone(1)).toEqual([2024])
      })
    })
    describe("when replacing a 125", () => {
      it("should return a [253000]", () => {
        const actual = replaceStone(125)
        expect(actual).toEqual([253000])
      })
    })
  })
  // describe("performBlink", () => {
  //   describe("when performing blink of 125 17", () => {
  //     it("should return 253000 1 7", () => {
  //       expect(performBlink([125,17])).toEqual([253000,1,7])
  //     })
  //   })
  //   describe("when performing blink of 253000,1,7", () => {
  //     it("should return 253000 1 7", () => {
  //       expect(performBlink([253000,1,7])).toEqual([253, 0, 2024, 14168])
  //     })
  //   })
  // })
  describe("performBlinkMany", () => {
    describe("when performing 1 blink of 125 17", () => {
      it("should return 253000 1 7", () => {
        expect(performBlinkMany([125,17], 1).join(',')).toEqual([253000,1,7].join(','))
      })
    })
    describe("when performing 1 blink of 253000,1,7", () => {
      it("should return 253000 1 7", () => {
        expect(performBlinkMany([253000,1,7], 1).join(',')).toEqual([253, 0, 2024, 14168].join(','))
      })
    })
    describe("when performing 2 blink of 125 17", () => {
      it("should return 253000 1 7", () => {
        expect(performBlinkMany([125,17], 2).join(',')).toEqual([253, 0, 2024, 14168].join(','))
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      describe("performBlinkMany tests", () => {
        describe("when blinking six times", () => {
          it('should find 22 stones', () => {
            const actual = performBlinkMany([125,17], 6)
            expect(actual.length).toBe(22)
          })
        })
        describe("when blinking 25 times", () => {
          it('part1 should be 55312', () => {
            expect(performBlinkMany([125,17], 25).length).toBe(55312)
          })
        })
      })
      it('part1 should be 55312', () => {
        expect(part1(exampleInputPart1)).toBe(55312)
      })
    })
    describe('real input', () => {
      it('part1 should be 182081', () => {
        expect(part1(input)).toBe(182081)
      })
    })
  })
  describe('part2', () => {
    describe('real input', () => {
      it('part2 should be 216,318,908,621,637', () => {
        expect(part2(input)).toBe(216318908621637)
      })
    })
  })
})
