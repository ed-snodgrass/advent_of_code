import fs from "fs"
import {part1, part2, exampleInput, runHash, calculateFocusingPower} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day15Test tests', () => {
  describe('part1', () => {
    describe('runHash against HASh', () => {

      it('should runHash against HASH', () => {
        expect(runHash('HASH')).toBe(52)
      })
      it('should runHash against rn=1', () => {
        expect(runHash('rn=1')).toBe(30)
      })
      it('should runHash against cm-', () => {
        expect(runHash('cm-')).toBe(253)
      })
      it('should runHash against qp=3', () => {
        expect(runHash('qp=3')).toBe(97)
      })
      it('should runHash against cm=2', () => {
        expect(runHash('cm=2')).toBe(47)
      })
      it('should runHash against qp-', () => {
        expect(runHash('qp-')).toBe(14)
      })
      it('should runHash against pc=4', () => {
        expect(runHash('pc=4')).toBe(180)
      })
      it('should runHash against ot=9', () => {
        expect(runHash('ot=9')).toBe(9)
      })
      it('should runHash against ab=5', () => {
        expect(runHash('ab=5')).toBe(197)
      })
      it('should runHash against pc-', () => {
        expect(runHash('pc-')).toBe(48)
      })
      it('should runHash against pc=6', () => {
        expect(runHash('pc=6')).toBe(214)
      })
      it('should runHash against ot=7', () => {
        expect(runHash('ot=7')).toBe(231)
      })
    })
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(1320)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe(515210)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      describe('calculateFocusingPower', () => {
        it('should return 145', () => {
          expect(calculateFocusingPower([
            [ { label: 'rn', focalLength: 1 }, { label: 'cm', focalLength: 2 } ],
            [],
            [],
            [
              { label: 'ot', focalLength: 7 },
              { label: 'ab', focalLength: 5 },
              { label: 'pc', focalLength: 6 }
            ]
          ])).toBe(145)
        })
      })
      it('part2 should be...', () => {
        expect(part2(exampleInput)).toBe(145)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(246762)
      })
    })
  })
})
