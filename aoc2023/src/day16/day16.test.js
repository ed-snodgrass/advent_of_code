import fs from "fs"
import {part1, part2, exampleInput, countEnergizedTiles} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day16Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      const energizedTiles = `######....
.#...#....
.#...#####
.#...##...
.#...##...
.#...##...
.#..####..
########..
.#######..
.#...#.#..`
      it('countEnergizedTiles', () => {
        expect(countEnergizedTiles(energizedTiles.split(('\n')).map(row => row.split('')))).toBe(46)
      })
      it('part1 should be 46', () => {
        expect(part1(exampleInput)).toBe(46)
      })
    })
    describe('real input', () => {
      it('part1 should be 8901', () => {
        expect(part1(input)).toBe(8901)
      })
    })
  })
  describe.skip('part2', () => {
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
