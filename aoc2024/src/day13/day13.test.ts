import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day13Test tests', () => {
  describe("parseInput", () => {
    let actual: { buttonA: [number, number], buttonB: [number, number], prizeLocation: [number, number] }[]
    describe("when parsing exampleInputPart1", () => {
      beforeEach(() => {
        actual = parseInput(exampleInputPart1)
      })
      it("should return 4 claw machine configurations", () => {
        expect(actual.length).toBe(4)
      })
      it("should have button A with x of 94, y of 34 for first config", () => {
        expect(actual[0].buttonA).toEqual([94, 34])
      })
      it("should have button B with x of 22, y of 67 for first config", () => {
        expect(actual[0].buttonB).toEqual([22, 67])
      })
      it("should have a prize at (8400, 5400) for first config", () => {
        expect(actual[0].prizeLocation).toEqual([8400, 5400])
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(480)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe(null)
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
