import fs from "fs"
import {part1, part2, exampleInput} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day17Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 102', () => {
        expect(part1(exampleInput)).toBe(102)
      })
    })
    describe('real input', () => {
      it('part1 should be greater than 565', () => {
        expect(part1(input)).toBeGreaterThan(565)
      })
      it('part1 should be less than 645', () => {
        expect(part1(input)).toBeLessThan(645)
      })
      it('part1 should be less than 640', () => {
        expect(part1(input)).toBeLessThan(640)
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
