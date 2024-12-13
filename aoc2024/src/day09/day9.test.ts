import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2, rearrange} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day9Test tests', () => {
  describe('part1', () => {
    describe("parseInput tests", () => {
      describe("when parsing disk map 90909", () => {
        it("should return 000000000111111111222222222", () => {
          expect(parseInput("90909").disk.join('')).toEqual("000000000111111111222222222")
        })
      })
      describe("when parsing disk map 12345", () => {
        it("should return 0..111....22222", () => {
          expect(parseInput("12345").disk.join('')).toEqual("0..111....22222")
        })
      })
      describe("when parsing disk map 2333133121414131402", () => {
        it("should return 00...111...2...333.44.5555.6666.777.888899", () => {
          expect(parseInput("2333133121414131402").disk.join('')).toEqual("00...111...2...333.44.5555.6666.777.888899")
        })
      })

      describe("when parsing disk map 23331331214141314020203", () => {
        it("should return 00...111...2...333.44.5555.6666.777.8888991010111111", () => {
          expect(parseInput("23331331214141314020203").disk.join('')).toEqual("00...111...2...333.44.5555.6666.777.8888991010111111")
        })
      })
    })
    describe("rearrange tests", () => {
      describe("when rearranging 0.1", () => {
        it("should return 01.", () => {
          expect(rearrange("0.1")).toEqual("01.")
        })
      })
      describe("when rearranging 0..111....22222", () => {
        it("should return 02.111....2222.", () => {
          expect(rearrange("0..111....22222")).toEqual("02.111....2222.")
        })
      })
      describe("when rearranging 02.111....2222.", () => {
        it("should return 022111....222..", () => {
          expect(rearrange("02.111....2222.")).toEqual("022111....222..")
        })
      })
      describe("when rearranging 022111....222..", () => {
        it("should return 0221112...22...", () => {
          expect(rearrange("022111....222..")).toEqual("0221112...22...")
        })
      })
      describe("when rearranging 0221112...22...", () => {
        it("should return 02211122..2....", () => {
          expect(rearrange("0221112...22...")).toEqual("02211122..2....")
        })
      })
      describe("when rearranging 02211122..2....", () => {
        it("should return 022111222......", () => {
          expect(rearrange("02211122..2....")).toEqual("022111222......")
        })
      })
    })
    describe('example input', () => {
      it('part1 should be 1928', () => {
        expect(part1(exampleInputPart1)).toBe(1928)
      })
    })
    describe('real input', () => {
      it('part1 should be greater than 88,952,281,973', () => {
        const part1Result = part1(input)
        console.log(`part1Result: ${part1Result}`)
        expect(part1Result).toBeGreaterThan(88952281973)
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
