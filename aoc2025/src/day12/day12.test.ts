import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day12Test tests', () => {
  describe('parseInput', () => {
    describe('with exampleInput', () => {
      it('should find 6 shapes', () => {
        expect(parseInput(exampleInputPart1).shapes.length).toBe(6)
      })
      it('should find 3 regions', () => {
        expect(parseInput(exampleInputPart1).regions.length).toBe(3)
      })
    })
    describe('with real input', () => {
      it('should find 6 shapes', () => {
        expect(parseInput(input).shapes.length).toBe(6)
      })
      it('should find 1000 regions', () => {
        expect(parseInput(input).regions.length).toBe(1000)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should find 2 regions 2', () => {
        expect(part1(exampleInputPart1)).toBe(2)
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
