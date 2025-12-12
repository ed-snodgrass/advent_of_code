import * as fs from 'fs'
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  Machine,
  configureMachineLights,
  flipTheBits,
} from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')

describe('Day10Test tests', () => {
  describe('flipTheBits', () => {
    describe('when [0], [0]', () => {
      it('should return [0]', () => {
        expect(flipTheBits([0], [0])).toStrictEqual([0])
      })
    })
    describe('when [0], [1]', () => {
      it('should return [1]', () => {
        expect(flipTheBits([0], [1])).toStrictEqual([1])
      })
    })
    describe('when [1], [1]', () => {
      it('should return [0]', () => {
        expect(flipTheBits([1], [1])).toStrictEqual([0])
      })
    })
    describe('when [1], [0]', () => {
      it('should return [1]', () => {
        expect(flipTheBits([1], [0])).toStrictEqual([1])
      })
    })
    describe('when [1,1,1,1], [1,1,1,1]', () => {
      it('should return [0, 0, 0, 0]', () => {
        expect(flipTheBits([1, 1, 1, 1], [1, 1, 1, 1])).toStrictEqual([0, 0, 0, 0])
      })
    })
  })

  describe('configureMachineLights', () => {
    let machines: Machine[]
    beforeEach(() => {
      machines = parseInput(exampleInputPart1)
    })
    describe('exampleInput', () => {
      describe('when configuring the first machine', () => {
        it('should take 2 button presses', () => {
          expect(configureMachineLights(machines[0])).toBe(2)
        })
      })
      describe('when configuring the second machine', () => {
        it('should take 3 button presses', () => {
          expect(configureMachineLights(machines[1])).toBe(3)
        })
      })
      describe('when configuring the third machine', () => {
        it('should take 2 button presses', () => {
          expect(configureMachineLights(machines[2])).toBe(2)
        })
      })
    })
  })
  describe('parseInput', () => {
    describe('exampleInput', () => {
      it('should find 3 machines', () => {
        const grid = parseInput(exampleInputPart1)
        expect(grid).toHaveLength(3)
      })
    })
    describe('input', () => {
      it('should find 156 machines', () => {
        expect(parseInput(input)).toHaveLength(156)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 7', () => {
        expect(part1(exampleInputPart1)).toBe(7)
      })
    })
    describe('real input', () => {
      it('part1 should be 415', () => {
        expect(part1(input)).toBe(415)
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
