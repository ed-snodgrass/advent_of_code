import fs from "fs"
import {
  part1,
  part2,
  exampleInput,
  parseInput,
  translateHex, parseInput2, Direction
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day18Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('parseInput', () => {
        it('should have 14 entries', () => {
          expect(parseInput(exampleInput)).toHaveLength(14)
        })
      })

      it('part1 should be 62', () => {
        const numberOfPoints = part1(exampleInput)
        console.log(`Found: ${numberOfPoints}, which is off by ${Math.abs(62 - numberOfPoints)}`)
        expect(numberOfPoints).toBe(62)
      })
    })
    describe('real input', () => {
      it('part1 should be 52055', () => {
        const numberOfPoints = part1(input)
        console.log(`Found: ${numberOfPoints}, which is off by ${Math.abs(52055 - numberOfPoints)}`)
        expect(numberOfPoints).toBe(52055)
      })
    })
  })

  describe('part2', () => {
    describe('translateHex', () => {
      it('should properly translate the hex code', () => {
        expect(translateHex('#70c710')).toEqual({direction: Direction.RIGHT, digCount: 461937})
        expect(translateHex('#0dc571')).toEqual({direction: Direction.DOWN, digCount: 56407})
        expect(translateHex('#5713f0')).toEqual({direction: Direction.RIGHT, digCount: 356671})
        expect(translateHex('#d2c081')).toEqual({direction: Direction.DOWN, digCount: 863240})
        expect(translateHex('#59c680')).toEqual({direction: Direction.RIGHT, digCount: 367720})
        expect(translateHex('#411b91')).toEqual({direction: Direction.DOWN, digCount: 266681})
        expect(translateHex('#8ceee2')).toEqual({direction: Direction.LEFT, digCount: 577262})
        expect(translateHex('#caa173')).toEqual({direction: Direction.UP, digCount: 829975})
        expect(translateHex('#1b58a2')).toEqual({direction: Direction.LEFT, digCount: 112010})
        expect(translateHex('#caa171')).toEqual({direction: Direction.DOWN, digCount: 829975})
        expect(translateHex('#7807d2')).toEqual({direction: Direction.LEFT, digCount: 491645})
        expect(translateHex('#a77fa3')).toEqual({direction: Direction.UP, digCount: 686074})
        expect(translateHex('#015232')).toEqual({direction: Direction.LEFT, digCount: 5411})
        expect(translateHex('#7a21e3')).toEqual({direction: Direction.UP, digCount: 500254})
      })
    })//7574310
    describe('parseInput2', () => {
      it('should parse correct distance and direction from hex', () => {
        // console.log(parseInput2(exampleInput));
        expect(parseInput2(exampleInput)).toEqual([
          {direction: Direction.RIGHT, digCount: 461937},
          {direction: Direction.DOWN, digCount: 56407},
          {direction: Direction.RIGHT, digCount: 356671},
          {direction: Direction.DOWN, digCount: 863240},
          {direction: Direction.RIGHT, digCount: 367720},
          {direction: Direction.DOWN, digCount: 266681},
          {direction: Direction.LEFT, digCount: 577262},
          {direction: Direction.UP, digCount: 829975},
          {direction: Direction.LEFT, digCount: 112010},
          {direction: Direction.DOWN, digCount: 829975},
          {direction: Direction.LEFT, digCount: 491645},
          {direction: Direction.UP, digCount: 686074},
          {direction: Direction.LEFT, digCount: 5411},
          {direction: Direction.UP, digCount: 500254},
        ])
      })
    })
    describe('example input', () => {
      it('part2 should be 952408144115', () => {
        const numberOfPoints = part2(exampleInput)
        console.log(`Found: ${numberOfPoints}, which is off by ${Math.abs(952408144115 - numberOfPoints)}`)
        expect(numberOfPoints).toBe(952408144115)
      })
    })
    describe('real input', () => {
      it('part2 should be greater than 67622758357096', () => {
        const numberOfPoints = part2(input)
        console.log(`found number of points: `, numberOfPoints)
        expect(numberOfPoints).toBe(67622758357096)
      })
    })
  })
})
