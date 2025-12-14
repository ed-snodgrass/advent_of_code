import * as fs from "fs"
import {part1, part2, parseInput, exampleInputPart1, exampleInputPart2, findAllPaths } from './solution'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day11Test tests', () => {
  describe('findAllPaths', () => {
    let deviceMap: Map<string, string[]>
    describe('when the only device is you -> out', () => {
      beforeEach(() => {
        deviceMap = new Map<string, string[]>()
        deviceMap.set('you', ['out'])
      })
      it('should return 1 path', () => {
        expect(findAllPaths(deviceMap, 'you')).toHaveLength(1)
        expect(findAllPaths(deviceMap, 'you')[0]).toStrictEqual(['you', 'out'])
      })
    })
    describe('when there "aaa" is between you & out', () => {
      beforeEach(() => {
        deviceMap = new Map<string, string[]>()
        deviceMap.set('you', ['aaa'])
        deviceMap.set('aaa', ['out'])
      })
      it('should return 1 path', () => {
        expect(findAllPaths(deviceMap, 'you')).toHaveLength(1)
        expect(findAllPaths(deviceMap, 'you')[0]).toStrictEqual(['you', 'aaa', 'out'])
      })
    })
    describe('when there multiple connections to you', () => {
      beforeEach(() => {
        deviceMap = new Map<string, string[]>()
        deviceMap.set('you', ['aaa', 'bbb'])
        deviceMap.set('aaa', ['out'])
      })
      it('should return 1 path', () => {
        expect(findAllPaths(deviceMap, 'you')).toHaveLength(1)
        expect(findAllPaths(deviceMap, 'you')[0]).toStrictEqual(['you', 'aaa', 'out'])
      })
    })
    describe('when there multiple connections to you and all connect to out', () => {
      beforeEach(() => {
        deviceMap = new Map<string, string[]>()
        deviceMap.set('you', ['aaa', 'bbb'])
        deviceMap.set('aaa', ['out'])
        deviceMap.set('bbb', ['out'])
      })
      it('should return 2 paths', () => {
        expect(findAllPaths(deviceMap, 'you')).toHaveLength(2)
        expect(findAllPaths(deviceMap, 'you')[0]).toStrictEqual(['you', 'aaa', 'out'])
        expect(findAllPaths(deviceMap, 'you')[1]).toStrictEqual(['you', 'bbb', 'out'])
      })
    })
  })
  describe('parseInput', () => {
    describe('when parsing example input', () => {
      it('should find 10 devices', () => {
        expect(parseInput(exampleInputPart1).size).toBe(10)
      })
      it('the firs device should have 2 connections', () => {
        expect(parseInput(exampleInputPart1).get('aaa')).toHaveLength(2)
      })
    })
  })
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be 5', () => {
        expect(part1(exampleInputPart1)).toBe(5)
      })
    })
    describe('real input', () => {
      it('part1 should be 753', () => {
        expect(part1(input)).toBe(753)
      })
    })
  })
  describe('part2', () => {
    describe('example input', () => {
      it('part2 should be of length 2', () => {
        expect(part2(exampleInputPart2)).toBe(2)
      })
    })
    describe('real input', () => {
      it('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
