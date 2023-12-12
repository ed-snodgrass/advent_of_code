import fs from "fs"
import {
  parseInput,
  part1,
  part2,
  exampleInput,
  exampleInput2,
  findStartingPoint,
  findViablePathsFromNode, horizontalConnector, verticalConnector
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day10Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      it('should have 2 viable options', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toHaveLength(2)
      })
      it('should have horizontal for east', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toStrictEqual(expect.arrayContaining([expect.objectContaining({x: 2, y: 1, v: horizontalConnector})]))
      })
      it('should have horizontal for east', () => {
        expect(findViablePathsFromNode(parsedInput, parsedInput.start, {x: Infinity, y: Infinity, v: '', stepsFromStart: 0})).toStrictEqual(expect.arrayContaining([expect.objectContaining({x: 1, y: 2, v: verticalConnector})]))
      })
      it('should have starting point at 1, 1', () => {
        expect(findStartingPoint(parsedInput)).toEqual({x: 1, y: 1, v: 'S', hasVisited: false})
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(4)
      })
    })
    describe('example input 2', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput2)
      })
      it('should have starting point at 2, 0', () => {
        expect(findStartingPoint(parsedInput)).toEqual({x: 0, y: 2, v: 'S', hasVisited: false})
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput2)).toBe(8)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should be...', () => {
        expect(part1(input)).toBe(6738)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {

      it('part2 should be 1 for easy graph', () => {
        expect(part2(exampleInput)).toBe(1)
      })
      it('part2 should be 4 for this graph', () => {
        expect(part2(`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`)).toBe(4)
      })
      it('part2 should be 8', () => {
        expect(part2(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`)).toBe(8)
      })

//       it('part2 should be 10', () => {
//         expect(part2(`FF7FSF7F7F7F7F7F---7
// L|LJ||||||||||||F--J
// FL-7LJLJ||||||LJL-77
// F--JF--7||LJLJ7F7FJ-
// L---JF-JLJ.||-FJLJJ7
// |F|F-JF---7F7-L7L|7|
// |FFJF7L7F-JF7|JL---7
// 7-L-JL7||F7|L7F-7F7|
// L.L7LFJ|||||FJL7||LJ
// L7JLJL-JLJLJL--JLJ.L`)).toBe(10)
//       })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
