import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, ClawConfig } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day13Test tests', () => {
  describe("parseInput", () => {
    let actual: ClawConfig[]
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
      it('part1 should be 480', () => {
        expect(part1(exampleInputPart1)).toBe(480)
      })
    })
    describe('real input', () => {
      it('part1 should be 29023', () => {
        expect(part1(input)).toBe(29023)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 875318608908', () => {
        expect(part2(exampleInputPart2)).toBe(875318608908)
      })
    })
    describe('real input', () => {
      it('part2 should be 96787395375634', () => {
        expect(part2(input)).toBe(96787395375634)
      })
    })
  })
})
