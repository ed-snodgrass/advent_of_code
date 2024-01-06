import fs from "fs"
import {
  part1,
  exampleInput,
  parseInput,
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day25Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      let components, connectedPairs
      beforeEach(() => {
        components = parseInput(exampleInput)
        // connectedPairs = createConnectedPairs(components)
      })
      describe('parseInput', () => {
        it('should return 13 original components', () => {
          expect(components).toHaveLength(13)
        })
      })
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(54)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(507626)
      })
    })
  })
})
