import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')
export const hotAirBalloonFuelRequirementsAsSnafu = (input) => {
  return input.split('\n')
}

export const determineDecimalValueOfSnafuDigit = snafuDigit => {
  switch (snafuDigit) {
    case ('2'):
      return 2
    case ('1'):
      return 1
    case ('0'):
      return 0
    case ('-'):
      return -1
    case ('='):
      return -2
  }
}
const decimalToSnafuDigit = decimalDigit => {
  switch (decimalDigit) {
    case (2):
      return '2'
    case (1):
      return '1'
    case (0):
      return '0'
    case (-1):
      return '-'
    case (-2):
      return '='
  }
}

export const snafuToDecimalConverter = snafuValue => {
  let decimalValue = 0
  for (let i = 0; i < snafuValue.length; i++) {
    const snafuValuePartExponent = (snafuValue.length - 1) - i
    const snafuValuePart = determineDecimalValueOfSnafuDigit(snafuValue[i])
    decimalValue += Math.pow(5, snafuValuePartExponent) * snafuValuePart
  }
  return decimalValue
}

const getMaxLeft = position => {
  let maxLeft = 0
  for (let i = position - 1; i >= 0; i--) {
    maxLeft += 2 * Math.pow(5, i)
  }
  return maxLeft
}

const determineRunningValue = (snafuValue, highestExponent) => {
  let currentPosition = highestExponent
  let runningTotal = 0
  for (let i = 0; i < snafuValue.length; i++) {
    runningTotal += Math.pow(5, currentPosition) * determineDecimalValueOfSnafuDigit(snafuValue[i])
    currentPosition--
  }
  return runningTotal
}

export const decimalToSnafuConverter = decimalValue => {
  let runningValue = decimalValue
  let highestExponent = 1
  let shouldKeepGoing = true

  do {
    const maxValue = getMaxLeft(highestExponent)
    if (decimalValue > maxValue) {
      highestExponent++
    } else {
      highestExponent--
      shouldKeepGoing = false
    }
  } while (shouldKeepGoing)

  const snafuValues = []
  for (let i = highestExponent; i >= 0; i--) {
    const maxLeft = getMaxLeft(i)
    let countForPosition = 0
    const levelOne = Math.pow(5, i)

    if (i === highestExponent) {
      if (Math.abs(runningValue - levelOne) > maxLeft) { // You'll never get there by adding, need to double up and subtract
        countForPosition = 2
      } else {
        countForPosition = 1
      }
    } else if (runningValue > decimalValue) {
      if (runningValue - decimalValue > levelOne + maxLeft) {
        countForPosition = -2
      } else if (runningValue - decimalValue > maxLeft) {
        countForPosition = -1
      } else {
        countForPosition = 0
      }
    } else if (runningValue < decimalValue) {
      if (decimalValue - runningValue > levelOne + maxLeft) {
        countForPosition = 2
      } else if (decimalValue - runningValue >= maxLeft) {
        countForPosition = 1
      } else {
        countForPosition = 0
      }
    } else {
      countForPosition = 0
    }
    snafuValues.push(decimalToSnafuDigit(countForPosition))
    runningValue = determineRunningValue(snafuValues, highestExponent)
  }

  let snafuString = ''
  snafuValues.forEach(value => {
    snafuString += value
  })
  return snafuString
}

export const getSumOfAllBalloons = input => {
  const convertedDecimalValues = input.map(snafuToDecimalConverter)
  const decimalSum = convertedDecimalValues.reduce((total, currentValue) => total + currentValue, 0)
  return decimalToSnafuConverter(decimalSum)
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return getSumOfAllBalloons(input)
}


run({
  part1: {
    tests: [
      {
        input: `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`,
        expected: '2=-1=0',
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
})
