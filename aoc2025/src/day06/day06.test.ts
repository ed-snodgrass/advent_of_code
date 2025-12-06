import * as fs from 'fs'
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, performOperation } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')

describe('Day06Test tests', () => {
  describe('performOperation', () => {
    let theInput: {theNumbers: number[][], theOperators: string[]}
    beforeEach(() => {
      theInput = parseInput(exampleInputPart1)
    })
    it('should get 33210 for first column', () => {
      expect(performOperation(0, theInput)).toBe(33210)
    })
    it('should get 490 for second column', () => {
      expect(performOperation(1, theInput)).toBe(490)
    })
    it('should get 4243455 for third column', () => {
      expect(performOperation(2, theInput)).toBe(4243455)
    })
    it('should get 401 for fourth column', () => {
      expect(performOperation(3, theInput)).toBe(401)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 4277556', () => {
        expect(part1(exampleInputPart1)).toBe(4277556)
      })
    })
    describe('real input', () => {
      it('part1 should be 5346286649122', () => {
        expect(part1(input)).toBe(5346286649122)
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
