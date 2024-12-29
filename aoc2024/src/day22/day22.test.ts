import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  mix,
  prune,
  calculateSecretNumber,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day22Test tests', () => {
  describe("mix", () => {
    describe("when mixing 42 and 15", () => {
      it("should return 37", () => {
        expect(mix(42, 15)).toBe(37)
      })
    })
    describe("when mixing 42 and 15", () => {
      it("should return 37", () => {
        expect(mix(3156183040, 1541105)).toBe(3154643953)
      })
    })
  })
  describe("prune", () => {
    describe('when pruning 100000000', () => {
      it('should return 16113920', () => {
        expect(prune(100000000)).toBe(16113920)
      })
    })
  })
  describe('calculateSecretNumber', () => {
    describe('when calculating secret number 123', () => {
      it('should return 15887950', () => {
        expect(calculateSecretNumber(123)).toBe(15887950)
        expect(calculateSecretNumber(15887950)).toBe(16495136)
        expect(calculateSecretNumber(16495136)).toBe(527345)
        expect(calculateSecretNumber(527345)).toBe(704524)
        expect(calculateSecretNumber(704524)).toBe(1553684)
        expect(calculateSecretNumber(1553684)).toBe(12683156)
        expect(calculateSecretNumber(12683156)).toBe(11100544)
        expect(calculateSecretNumber(11100544)).toBe(12249484)
        expect(calculateSecretNumber(12249484)).toBe(7753432)
        expect(calculateSecretNumber(7753432)).toBe(5908254)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 37327623', () => {
        expect(part1(exampleInputPart1)).toBe(37327623)
      })
    })
    describe('real input', () => {
      it('part1 should be 14119253575', () => {
        expect(part1(input)).toBe(14119253575)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 23', () => {
        expect(part2(exampleInputPart2)).toBe(23)
      })
    })
    describe('real input', () => {
      it('part2 should be 1600', () => {
        expect(part2(input)).toBe(1600)
      })
    })
  })
})
