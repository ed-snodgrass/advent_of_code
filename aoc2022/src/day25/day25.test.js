// import day25Input from './input.txt'
import fs from "fs"

import {day25Example, decimalToSnafuConverter,
  determineDecimalValueOfSnafuDigit,
  getSumOfAllBalloons,
  hotAirBalloonFuelRequirementsAsSnafu, snafuToDecimalConverter } from "./index.js";

const day25Input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('day25 tests', () => {
  let inputData, actual
  afterEach(() => {
    inputData = undefined
    actual = undefined
  })
  describe('decimalToSnafuConverter', () => {
    it('value should be 2=-1=0', () => {
      expect(decimalToSnafuConverter(4890)).toBe('2=-1=0')
      expect(decimalToSnafuConverter(4688)).toBe('2=====')
      expect(decimalToSnafuConverter(4687)).toBe('122222')
      expect(decimalToSnafuConverter(7)).toBe('12')
      expect(decimalToSnafuConverter(37)).toBe('122')
      expect(decimalToSnafuConverter(906)).toBe('12111')
      expect(decimalToSnafuConverter(3)).toBe('1=')
      expect(decimalToSnafuConverter(11)).toBe('21')
      expect(decimalToSnafuConverter(31)).toBe('111')
      expect(decimalToSnafuConverter(1257)).toBe('20012')
      expect(decimalToSnafuConverter(32)).toBe('112')
      expect(decimalToSnafuConverter(198)).toBe('2=0=')
      expect(decimalToSnafuConverter(201)).toBe('2=01')
      expect(decimalToSnafuConverter(1747)).toBe('1=-0-2')
      expect(decimalToSnafuConverter(353)).toBe('1=-1=')
      expect(decimalToSnafuConverter(107)).toBe('1-12')

    })
    it('value should be 2=0=', () => {
      // expect(decimalToSnafuConverter(3)).toBe('1=')

      expect(decimalToSnafuConverter(4)).toBe('1-')
      expect(decimalToSnafuConverter(9)).toBe('2-')
      expect(decimalToSnafuConverter(10)).toBe('20')

    })
    it('value should be 1121-1110-1=0', () => {
      // expect(decimalToSnafuConverter(3)).toBe('1=')
      expect(decimalToSnafuConverter(1)).toBe('1')
      expect(decimalToSnafuConverter(2)).toBe('2')
      expect(decimalToSnafuConverter(3)).toBe('1=')
      expect(decimalToSnafuConverter(5)).toBe('10')
      expect(decimalToSnafuConverter(6)).toBe('11')
      expect(decimalToSnafuConverter(7)).toBe('12')
      expect(decimalToSnafuConverter(8)).toBe('2=')
      expect(decimalToSnafuConverter(15)).toBe('1=0')

      expect(decimalToSnafuConverter(20)).toBe('1-0')
      expect(decimalToSnafuConverter(11)).toBe('21')

      expect(decimalToSnafuConverter(2022)).toBe('1=11-2')
      expect(decimalToSnafuConverter(12345)).toBe('1-0---0')
      expect(decimalToSnafuConverter(314159265)).toBe('1121-1110-1=0')

    })
  })
  describe('determineSnafuDigit', () => {
    it('value should be 2', () => {
      expect(determineDecimalValueOfSnafuDigit('2')).toBe(2)
    })
    it('value should be 1', () => {
      expect(determineDecimalValueOfSnafuDigit('1')).toBe(1)
    })
    it('value should be 0', () => {
      expect(determineDecimalValueOfSnafuDigit('0')).toBe(0)
    })
    it('value should be -1', () => {
      expect(determineDecimalValueOfSnafuDigit('-')).toBe(-1)
    })
    it('value should be -2', () => {
      expect(determineDecimalValueOfSnafuDigit('=')).toBe(-2)
    })
  })
  describe('snafuConverter', () => {
    describe('when snafu is 1', () => {
      it('should be 1', () => {
        expect(snafuToDecimalConverter('1')).toBe(1)
      })
    })
    describe('when snafu is 2', () => {
      it('should be 2', () => {
        expect(snafuToDecimalConverter('2')).toBe(2)
      })
    })
    describe('when snafu is 1=', () => {
      it('should be 3', () => {
        expect(snafuToDecimalConverter('1=')).toBe(3)
      })
    })
    describe('when snafu is 2=-01', () => {
      it('should be 976', () => {
        expect(snafuToDecimalConverter('2=-01')).toBe(976)
      })
    })
    describe('when snafu is 100000', () => {
      it('should be 3125', () => {
        expect(snafuToDecimalConverter('100000')).toBe(3125)
      })
    })
    it('when snafu converting', () => {
      expect(snafuToDecimalConverter('2=====')).toBe(4688)
      expect(snafuToDecimalConverter('122222')).toBe(4687)
    })
  })
  describe('example input', () => {
    beforeEach(() => {
      inputData = day25Example
    })
    describe('hotAirBalloonFuelRequirementsAsSnafu', () => {
      beforeEach(() => {
        actual = hotAirBalloonFuelRequirementsAsSnafu(inputData)
      })
      it('should be 42', () => {
        expect(actual.length).toEqual(13)
      })
    })
    describe('getSumOfAllBalloons', () => {
      beforeEach(() => {
        actual = getSumOfAllBalloons(inputData.split('\n'))
      })
      it('should be 2=-1=0', () => {
        expect(actual).toEqual('2=-1=0')
      })
    })

  })
  describe('actual input', () => {
    beforeEach(() => {
      inputData = day25Input
    })
    describe('getSumOfAllBalloons', () => {
      beforeEach(() => {
        actual = getSumOfAllBalloons(inputData.split('\n'))
      })
      it('should NOT be 2==221=-001222222222', () => {
        expect(actual).not.toEqual('2==221=-001222222222')
      })
      it('should be 2==221=-002=0-02-000', () => {
        expect(actual).toEqual('2==221=-002=0-02-000')
      })
    })
  })
})
