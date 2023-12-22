import fs from "fs"
import {part1, part2, testInput, getValves, selectNextValve} from './index.js'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe(' tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      let allValves
      beforeEach(() => {
        allValves = getValves(testInput)
      })

      it('should choose DD from AA', () => {
        expect(selectNextValve('AA', allValves).valveId).toBe('DD')
      })
      it('should find 10 tunnels', () => {
        expect(allValves.length).toBe(10)
      })
      it('should have flowRate 3 for "EE"', () => {
        const tunnel = allValves.find(tunnel => tunnel.valveId === 'EE')
        expect(tunnel.flowRate).toBe(3)
      })
      it('part1 should be 1651', () => {
        expect(part1(testInput)).toBe(1651)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe()
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
      it.skip('part1 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
