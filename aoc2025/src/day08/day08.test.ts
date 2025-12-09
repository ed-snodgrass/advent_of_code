import * as fs from 'fs'
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  findClosestJunctionBoxes,
  junctionBoxToString,
} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')

describe('Day08Test tests', () => {
  describe('findClosestJunctionBoxes', () => {
    it('should find 162,817,812 and 425,690,689 as closest in full example', () => {
      const junctionBoxes = parseInput(exampleInputPart1)
      const circuits = junctionBoxes.map(junctionBoxToString)
      const expected = [
        { X: 162, Y: 817, Z: 812 },
        { X: 425, Y: 690, Z: 689 },
      ]
      expect(findClosestJunctionBoxes(junctionBoxes, circuits)).toEqual(expect.arrayContaining(expected))
    })
    it('should find 162,817,812 and 431,825,988 as closest after first circuit established example', () => {
      const junctionBoxes = parseInput(exampleInputPart1)
      const circuits = [
        `${junctionBoxToString({ X: 162, Y: 817, Z: 812 })},${junctionBoxToString({ X: 425, Y: 690, Z: 689 })}`,
      ]
      const expected = [
        { X: 162, Y: 817, Z: 812 },
        { X: 431, Y: 825, Z: 988 },
      ]
      expect(findClosestJunctionBoxes(junctionBoxes, circuits)).toEqual(expect.arrayContaining(expected))
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 40', () => {
        expect(part1(exampleInputPart1)).toBe(40)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
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
