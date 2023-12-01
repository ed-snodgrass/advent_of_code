import fs from "fs"
import {exampleInput} from './index.ts'

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('day1 tests', () => {
  let inputData, actual
  afterEach(() => {
    inputData = undefined
    actual = undefined
  })
  describe('example input', () => {
    beforeEach(() => {
      inputData = input
    })
    it('should be true', () => {
      expect(true).toBe(true)
    })
  })
})
