import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day17Test tests', () => {
  describe('parseInput', () => {
    describe('example input', () => {
      it('should be...', () => {
        expect(parseInput(exampleInputPart1)).toEqual({
          registerA: 729,
          registerB: 0,
          registerC: 0,
          program: [0,1,5,4,3,0]
        })
      })
    })
    describe('real input', () => {
      it('should be...', () => {
        expect(parseInput(input)).toEqual({
          registerA: 65804993,
          registerB: 0,
          registerC: 0,
          program: [2,4,1,1,7,5,1,4,0,3,4,5,5,5,3,0]
        })
      })
    })
  })

  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 4,6,3,5,6,3,5,2,1,0', () => {
        expect(part1(exampleInputPart1)).toBe('4,6,3,5,6,3,5,2,1,0')
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
