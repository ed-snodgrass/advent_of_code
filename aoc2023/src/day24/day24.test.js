import fs from "fs"
import {
  part1,
  part2,
  exampleInput,
  parseInput,
  travelOneNanosecond,
  findHailstonePairs,
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day24Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('parseInput', () => {
        it('should find 5 hailstones', () => {
          const parsedInput = parseInput(exampleInput)
          expect(parsedInput).toHaveLength(5)
        })
      })
      describe('hailstone travelOneNanosecond', () => {
        let hailstone, traveledHailstone
        // 20, 19, 15 @ 1, -5, -3
        beforeEach(() => {
          hailstone = {
            position: {x: 20, y: 19, z: 15},
            velocity: {x: 1, y: -5, z: -3},
          }
          traveledHailstone = travelOneNanosecond(hailstone.position, hailstone.velocity)
        })
        it('should be at 20, 19, 15', () => {
          expect(traveledHailstone.position.x).toBe(21)
          expect(traveledHailstone.position.y).toBe(14)
          expect(traveledHailstone.position.z).toBe(12)
        })
      })
      describe('findHailstonePairs', () => {
        it('should find 10 pairs', () => {
          const allHailstones = parseInput(exampleInput)
          expect(findHailstonePairs(allHailstones)).toHaveLength(10)
        })
      })
      it('part1 should find 2', () => {
        expect(part1(exampleInput)).toBe(2)
      })
    })
    describe('real input', () => {
      it('part1 should be 18098', () => {
        expect(part1(input)).toBe(18098)
      })
    })
  })
  describe('part2', () => {

    describe('example input', () => {

      // it('part2 should be...', () => {
      //   expect(part2(exampleInput)).toBe(47)
      // })
      it('part2 should be...', async () => {
        expect(await part2(exampleInput)).toBe(47)
      })
    })
    describe('real input', () => {

      // it('part2 should be...', () => {
      //   expect(part2(input)).toBe(886858737029295)
      // })

      it('part2 should be...', async () => {
        expect(await part2(input)).toBe(886858737029295)
      })
    })
  })
})
