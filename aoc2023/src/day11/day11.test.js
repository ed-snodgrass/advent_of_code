import fs from "fs"
import {
  parseInput,
  part1,
  part2,
  exampleInput,
  numberTheGalaxies,
  pairTheGalaxies,
  findShortestDistance, findAllTheLengths
} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day11Test tests', () => {
  let parsedInput
  afterEach(() => {
    parsedInput = null
  })
  describe('part1', () => {
    describe('example input', () => {
      beforeEach(() => {
        parsedInput = parseInput(exampleInput)
      })
      // describe('expanding the universe', () => {
      //   it('should add 2 rows', () => {
      //     expect(parsedInput.grid).toHaveLength(12)
      //   })
      //   it('should add 3 columns', () => {
      //     expect(parsedInput.grid[0]).toHaveLength(13)
      //   })
      // })
      describe('numbering the galaxies', () => {
        it('should find 9 galaxies', () => {
          expect(numberTheGalaxies(parsedInput)).toHaveLength(9)
        })
      })
      describe('pairing the galaxies', () => {
        it('should find 36 pairs', () => {
          expect(pairTheGalaxies(numberTheGalaxies(parsedInput))).toHaveLength(36)
        })
      })
      describe('shortest distance', () => {
        let galaxy1, galaxy2
        describe('finding the shortest distance between 1 and 7', () => {
          it('should be 15 steps', () => {
            galaxy1 = {number: 1, position: {x: 4, y: 0}}
            galaxy2 = { number: 7, position: { x: 9, y: 10 } }
            expect(findShortestDistance(galaxy1, galaxy2)).toBe(15)
          })
        })
        describe('finding the shortest distance between 3 and 6', () => {
          it('should be 17 steps', () => {
            galaxy1 = { number: 3, position: { x: 0, y: 2 } }
            galaxy2 =  { number: 6, position: { x: 12, y: 7 } }
            expect(findShortestDistance(galaxy1, galaxy2)).toBe(17)
          })
        })
        describe('finding the shortest distance between 8 and 9', () => {
          it('should be 5 steps', () => {
            galaxy1 = { number: 8, position: { x: 0, y: 11 } }
            galaxy2 = { number: 9, position: { x: 5, y: 11 } }
            expect(findShortestDistance(galaxy1, galaxy2)).toBe(5)
          })
        })
      })

      it('part1 should be...', () => {
        expect(findAllTheLengths(exampleInput, 1)).toBe(374)
      })

      it('part1 should be...', () => {
        expect(part1(exampleInput)).toBe(374)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(10292708)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be 1030 when expanding by 10', () => {
        expect(findAllTheLengths(exampleInput, 10)).toBe(1030)
      })
      it('part2 should be 8410 when expanding by 100', () => {
        expect(findAllTheLengths(exampleInput, 100)).toBe(8410)
      })
    })
    describe('real input', () => {
      beforeEach(() => {
        parsedInput = parseInput(input)
      })
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe()
      })
    })
  })
})
