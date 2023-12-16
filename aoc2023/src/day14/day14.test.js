import fs from "fs"
import {parseInput, part1, part2, exampleInput, tiltNorth, calculateNorthLoad} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day14Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      const northTiltedLoad = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`
      describe('tilting north', () => {
        it('should return the nort loaded string', () => {
           expect(tiltNorth(parseInput(exampleInput))).toEqual(northTiltedLoad)
        })
      })
      describe('calculatingNorthLoad', () => {
        it('should return 136', () => {
          expect(calculateNorthLoad(parseInput(northTiltedLoad))).toBe(136)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(136)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(110821)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInput)).toBe()
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
