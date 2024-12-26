import * as fs from "fs"
import {
  part1,
  part2,
  exampleInputPart1,
  calculateComplexity,
  findShortestSequence,
  findShortestPathsOnNumericKeypad,
  findShortestPathsOnDirectionalKeypad,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8")

describe("Day21Test tests", () => {
  describe("findShortestPathsOnNumericKeypad", () => {
    describe('when code is 029A', () => {
      it('should find the sequence <A^A>^^AvvvA', () => {
        expect(findShortestPathsOnNumericKeypad('029A')).toContainEqual('<A^A>^^AvvvA')
      })
    })
  })
  describe("findShortestPathsOnDirectionalKeypad", () => {
    describe('when code is <A^A>^^AvvvA', () => {
      it('should find the sequence <A^A>^^AvvvA', () => {
        expect(findShortestPathsOnDirectionalKeypad('<A^A>^^AvvvA')).toContainEqual('v<<A>>^A<A>AvA<^AA>A<vAAA>^A')
      })
    })
  })
  describe("findShortestPathsOnDirectionalKeypad", () => {
    describe('when code is v<<A>>^A<A>AvA<^AA>A<vAAA>^A', () => {
      it('should find the sequence <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A', () => {
        expect(findShortestPathsOnDirectionalKeypad('v<<A>>^A<A>AvA<^AA>A<vAAA>^A')).toContain('<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A')
      })
    })
  })
  describe("calculateComplexity", () => {
    it("should ", () => {
      const codes = ['029A','980A','179A','456A','379A']
      const shortestSequences = [
        '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A',
        '<v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A',
        '<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A',
        '<v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A',
        '<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A'
      ]
      expect(calculateComplexity(codes, shortestSequences.map(sequence => sequence.length))).toBe(126384)
    })
  })
  describe("findShortestSequence", () => {
    describe("when code is 029A", () => {
      it("should find shortest sequence of <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A", () => {
        expect(findShortestSequence("029A")).toBe("<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A".length)})
    })
    describe("when code is 980A", () => {
      it("should find shortest sequence of <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A", () => {
        expect(findShortestSequence("980A")).toBe("<v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A".length)})
    })
    describe("when code is 179A", () => {
      it("should find shortest sequence of <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A", () => {
        expect(findShortestSequence("179A")).toBe("<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A".length)})
    })
    describe("when code is 456A", () => {
      it("should find shortest sequence of <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A", () => {
        expect(findShortestSequence("456A")).toBe("<v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A".length)})
    })
    describe("when code is 379A", () => {
      it("should find shortest sequence of <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A", () => {
        expect(findShortestSequence("379A")).toBe("<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A".length)})
    })
  })
  describe("part1", () => {
    describe("example input", () => {
      it.skip("part1 should be...", () => {
        expect(part1(exampleInputPart1)).toBe(126384)
      })
    })
    describe("real input", () => {
      it.skip("part1 should be 203814", () => {
        expect(part1(input)).toBe(203814)
      })
    })
  })
  describe.skip("part2", () => {
    describe("real input", () => {
      it("part2 should be...", () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
