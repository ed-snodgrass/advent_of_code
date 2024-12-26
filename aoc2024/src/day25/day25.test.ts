import * as fs from "fs"
import { part1, parseInput, exampleInputPart1, testLockFitment } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');



describe('Day25Test tests', () => {
  describe("testLockFitment", () => {
    describe('when trying key 5,0,2,1,3 in lock 0,5,3,4,3', () => {
      it('should not fit', () => {
        expect(testLockFitment([5,0,2,1,3], [0,5,3,4,3], 6)).toBe(false)
      })
    })
    describe('when trying key 4,3,4,0,2 in lock 0,5,3,4,3', () => {
      it('should not fit', () => {
        expect(testLockFitment([4,3,4,0,2], [0,5,3,4,3], 6)).toBe(false)
      })
    })
    describe('when trying key 3,0,2,0,1 in lock 0,5,3,4,3', () => {
      it('should fit', () => {
        expect(testLockFitment([3,0,2,0,1], [0,5,3,4,3], 6)).toBe(true)
      })
    })
    describe('when trying key 5,0,2,1,3 in lock 1,2,0,5,3', () => {
      it('should not fit', () => {
        expect(testLockFitment([5,0,2,1,3], [1,2,0,5,3], 6)).toBe(false)
      })
    })
    describe('when trying key 4,3,4,0,2 in lock 1,2,0,5,3', () => {
      it('should fit', () => {
        expect(testLockFitment([4,3,4,0,2], [1,2,0,5,3], 6)).toBe(true)
      })
    })
    describe('when trying key 3,0,2,0,1 in lock 1,2,0,5,3', () => {
      it('should fit', () => {
        expect(testLockFitment([3,0,2,0,1], [1,2,0,5,3], 6)).toBe(true)
      })
    })

  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(3)
      })
    })
    describe('real input', () => {
      it('part1 should be 3065', () => {
        expect(part1(input)).toBe(3065)
      })
    })
  })
})
