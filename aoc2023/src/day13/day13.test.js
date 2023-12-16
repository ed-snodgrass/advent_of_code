import fs from "fs"
import {
  parseInput,
  part1,
  part2,
  exampleInput,
  findVerticalMirror,
  flipGrid,
  makeGrid,
  findHorizontalMirror, flipGridBack} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day13Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('flipping grid', () => {
      let grid
      beforeEach(() => {
        grid = makeGrid(
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`.split('\n'))
      })
      it('should flip the grid', () => {
        const expected =
`#..##.#
...##..
###..##
.#....#
#.#..#.
#.#..#.
.#....#
###..##
...##..`
        expect(flipGrid(grid).map(row => row.join('')).join('\n')).toBe(expected)
      })
      it('should flip the grid back', () => {
        const flipped =
          `#..##.#
...##..
###..##
.#....#
#.#..#.
#.#..#.
.#....#
###..##
...##..`
        expect(flipGridBack(flipped.split('\n'))).toEqual(makeGrid(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`.split('\n')))
      })
    })
    describe('findVerticalMirror', () => {
      it('should find the 4th row', () => {
        const input =
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`
        expect(findVerticalMirror(input.split('\n'))).toBe(4)
      })
    })
    describe('findHorizontalMirror', () => {
      it('should find the 3rd index', () => {
        expect(findHorizontalMirror(`#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`.split('\n'))).toBe(3)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(405)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should be...', () => {
        expect(part1(input)).toBe(29165)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(400)
      })
    })
    describe('real input', () => {
      it('part2 should be greater than 26999', () => {
        expect(part2(input)).toBeGreaterThan(26999)
      })
      it('part2 should be less than 34427', () => {
        expect(part2(input)).toBeLessThan(34427)
      })
      it('part2 should be less than 35047', () => {
        expect(part2(input)).toBeLessThan(35047)
      })
      it('part2 should be 32192', () => {
        expect(part2(input)).toBe(32192)
      })
    })
  })
})
