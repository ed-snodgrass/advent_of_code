import fs from "fs"
import {parseInput, part1, part2, exampleInput} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day08Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
        // console.log(parsedInput);
      })
      it('instructions is RL', () => {
        expect(parsedInput.instructions).toEqual(['R', 'L'])
      })
      it('network to have 7 nodes', () => {
        expect(parsedInput.network.length).toBe(7)
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(2)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part1 should not be 72', () => {
        expect(part1(input)).not.toBe(72)
      })
      it('part1 should be', () => {
        expect(part1(input)).toBe(21409)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      let testInput
      beforeEach(() => {
        testInput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
      })
      it('part2 should be...', () => {
        expect(part2(testInput)).toBe(6)
      })
    })

    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it('part2 should be...', () => {
        expect(part2(input)).toBe(21165830176709)
      })
    })
  })
})
