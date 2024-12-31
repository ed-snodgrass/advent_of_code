import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  checkDesignViability,
  findDesignOptions,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('Day19Test tests', () => {
  describe('parseInput', () => {
    it('should parse input into 8 towel patterns', () => {
      expect(parseInput(exampleInputPart1).towelPatterns.length).toEqual(8)
    })
    it('should parse input into 8 designs', () => {
      expect(parseInput(exampleInputPart1).designs.length).toEqual(8)
    })
  })
  describe("checkDesignViability", () => {
    let towelPatterns: string[], design: string
    beforeEach(() => {
      towelPatterns = parseInput(exampleInputPart1).towelPatterns
    })
    describe('when design is brwrr', () => {
      beforeEach(() => {
        design = 'brwrr'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is bggr', () => {
      beforeEach(() => {
        design = 'bggr'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is gbbr', () => {
      beforeEach(() => {
        design = 'gbbr'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is rrbgbr', () => {
      beforeEach(() => {
        design = 'rrbgbr'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is ubwu', () => {
      beforeEach(() => {
        design = 'ubwu'
      })
      it('should return false', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(false)
      })
    })
    describe('when design is bwurrg', () => {
      beforeEach(() => {
        design = 'bwurrg'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is brgr', () => {
      beforeEach(() => {
        design = 'brgr'
      })
      it('should return true', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(true)
      })
    })
    describe('when design is bbrgwb', () => {
      beforeEach(() => {
        design = 'bbrgwb'
      })
      it('should return false', () => {
        expect(checkDesignViability(design, towelPatterns)).toBe(false)
      })
    })
  })
  describe('findDesignOptions', () => {
    let towelPatterns: string[], design: string
    beforeEach(() => {
      towelPatterns = parseInput(exampleInputPart1).towelPatterns
    })
    describe('when design is gbbr', () => {
      beforeEach(() => {
        design = 'gbbr'
      })
      it('should return true', () => {
        expect(findDesignOptions(design, towelPatterns)).toBe(4)
      })
    })
    describe('when design is rrbgbr', () => {
      beforeEach(() => {
        design = 'rrbgbr'
      })
      it('should return true', () => {
        expect(findDesignOptions(design, towelPatterns)).toBe(6)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(6)
      })
    })
    describe('real input', () => {
      it('part1 should be 240', () => {
        expect(part1(input)).toBe(240)
      })
    })
  })

  describe('part2', () => {
    describe('when design is gbbr', () => {
      let design: string, towelPatterns: string[]
      beforeEach(() => {
        design = 'gbbr'
        towelPatterns = parseInput(exampleInputPart1).towelPatterns

      })
      it('should return 4', () => {
        expect(findDesignOptions(design, towelPatterns)).toBe(4)
      })
    })
    describe('example input', () => {
      it('part2 should be 16', () => {
        expect(part2(exampleInputPart2)).toBe(16)
      })
    })
    describe('real input', () => {
      it('part2 should be 848076019766013', () => {
        expect(part2(input)).toBe(848076019766013)
      })
    })
  })
})
