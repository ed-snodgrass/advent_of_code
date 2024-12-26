import * as fs from "fs"
import { part1, part2, parseInput, exampleInputPart1, exampleInputPart2, narrowNetworkTriads } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day23Test tests', () => {
  describe("narrowNetworkTriads", () => {
    let initialList: string[]
    let expectedList: string[]
    beforeEach(() => {
      initialList = `aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq`.split('\n')
      expectedList = `co,de,ta
co,ka,ta
de,ka,ta
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn`.split('\n')
    })
    it("should reduce initial list to list of 6", () => {
      expect(narrowNetworkTriads(initialList)).toEqual(expectedList)
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(7)
      })
    })
    describe('real input', () => {
      it('part1 should be 1304', () => {
        expect(part1(input)).toBe(1304)
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
