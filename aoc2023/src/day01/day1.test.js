import fs from "fs"
import {part2} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day1 tests', () => {
  let inputData, actual
  afterEach(() => {
    inputData = undefined
    actual = undefined
  })
  describe('input', () => {
    beforeEach(() => {
      actual = part2(input)
    })
    it('should be 55413', () => {
      expect(actual).toBe(55413)
    })
  })
})
