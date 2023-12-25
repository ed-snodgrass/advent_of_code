import fs from "fs"
import {part1, part2, exampleInput, parseInput, ModuleType, buttonPress} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('2023 Day20 tests ... Pulse Propagation', () => {
  describe('part1', () => {
    describe('example input', () => {
      describe('when button is pressed the first time', () => {
        let state
        beforeEach(() => {
          state = buttonPress(parseInput(exampleInput))
        })
        it('should ', () => {
          expect(state).toBe()
        })
      })
      describe('parsing modules', () => {
        it('should find 6 modules', () => {
          expect(parseInput(exampleInput)).toHaveLength(6)
        })
        it('should have one broadcaster', () => {
          expect(parseInput(exampleInput).filter(module => module?.name === 'broadcaster')).toHaveLength(1)
        })
        it('should have broadcaster with one connection to "a"', () => {
          const broadcaster = parseInput(exampleInput).find(module => module.name === 'broadcaster')
          expect(broadcaster.connections).toHaveLength(1)
          expect(broadcaster.connections[0]).toBe('a')
        })
        it('should have 1 untyped modules', () => {
          expect(parseInput(exampleInput).filter(module => module.type === ModuleType.UNTYPED)).toHaveLength(1)
        })
        it('should have 2 conjunction modules', () => {
          expect(parseInput(exampleInput)
            .filter(module => module.type === ModuleType.CONJUNCTION))
            .toHaveLength(2)
        })
        it('should have 2 flip-flop modules', () => {
          expect(parseInput(exampleInput).filter(module => module.type === ModuleType.FLIP_FLOP)).toHaveLength(2)
        })
        it('should have "a" module', () => {
          expect(parseInput(exampleInput).find(module => module.name === 'a')).toBeDefined()
        })
        it('should have "inv" module', () => {
          expect(parseInput(exampleInput).find(module => module.name === 'inv')).toBeDefined()
        })
        it('should have "b" module', () => {
          expect(parseInput(exampleInput).find(module => module.name === 'b')).toBeDefined()
        })
        it('should have "con" module', () => {
          const conModule = parseInput(exampleInput).find(module => module.name === 'con')
          expect(conModule).toBeDefined()
        })
        it('should have "output" module', () => {
          expect(parseInput(exampleInput).find(module => module.name === 'output')).toBeDefined()
        })
      })
      it('part1 should be 11687500', () => {
        expect(part1(exampleInput)).toBe(11687500)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(839775244)
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
