import * as fs from 'fs'
import { part1, parseInput, exampleInputPart1, toShape, rotate } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')

function fitsAllPresents(regionWidth: number, regionHeight: number, shapeCounts: number[], shapes: string[][][]) {
  return false
}

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
  describe('rotate', () => {
    let actual, expected, shape

    describe('when rotating #..\n...\n...', () => {
      beforeEach(() => {
        shape = toShape('0\n#..\n...\n...')
      })
      it('should return ..#\n..#\n...', () => {
        expected = toShape('0\n..#\n...\n...')
        actual = rotate(shape)
        expect(actual).toStrictEqual(expected)
      })
    })
    describe('when rotating #..\n.#.\n..#', () => {
      beforeEach(() => {
        shape = toShape('0\n#..\n.#.\n..#')
      })
      it('should return ..#\n.#.\n#..', () => {
        expected = toShape('0\n..#\n.#.\n#..')
        actual = rotate(shape)
        expect(actual).toStrictEqual(expected)
      })
    })
  })
  describe('fitsAllPresents', () => {
    let shapes: string[][][], regionWidth: number, regionHeight: number, shapeCounts: number[], actual
    beforeEach(() => {
      shapes = parseInput(exampleInputPart1).shapes
      console.log(shapes)
    })
    describe('for region 4x4: 0 0 0 0 2 0', () => {
      beforeEach(() => {
        regionWidth = 4
        regionHeight = 4
        shapeCounts = [0, 0, 0, 0, 2, 0]

        actual = fitsAllPresents(regionWidth, regionHeight, shapeCounts, shapes)
      })
      it('should fit all presents', () => {
        expect(actual).toBe(true)
      })
    })
    describe('for region 12x5: 1 0 1 0 2 2', () => {
      beforeEach(() => {
        regionWidth = 12
        regionHeight = 5
        shapeCounts = [1, 0, 1, 0, 2, 2]

        actual = fitsAllPresents(regionWidth, regionHeight, shapeCounts, shapes)
      })
      it('should fit all presents', () => {
        expect(actual).toBe(true)
      })
    })
    describe('for region 12x5: 1 0 1 0 3 2', () => {
      beforeEach(() => {
        regionWidth = 12
        regionHeight = 5
        shapeCounts = [1, 0, 1, 0, 3, 2]

        actual = fitsAllPresents(regionWidth, regionHeight, shapeCounts, shapes)
      })
      it('should fit all presents', () => {
        expect(actual).toBe(false)
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
      it('part1 should be 524', () => {
        expect(part1(input)).toBe(524)
      })
    })
  })
})
