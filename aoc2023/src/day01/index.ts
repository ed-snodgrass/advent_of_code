import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').filter(line => line !== '\n')
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const allDigits = input.map(line => {
    return line.match(/\d/g)
  })
  let total = 0
  allDigits.forEach(digits => {
    const digitsString = `${digits[0]}${digits[digits.length - 1]}`
    total += Number.parseInt(digitsString)
  })
  return total
}
const singles = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};

const replaceFirstWord = (line) => {
  let newLine = line
  let lowestIndex = Infinity
  let lowestIndexKey = ''
  Object.keys(singles).forEach(key => {
    const indexOfKey = newLine.indexOf(key)
    if (indexOfKey < lowestIndex && indexOfKey >= 0) {
      lowestIndex = indexOfKey
      lowestIndexKey = key
    }
  })
  if (lowestIndexKey) {
    // console.log(lowestIndex)
    // console.log(lowestIndexKey)
    // console.log(newLine.substring(0, lowestIndex))
    newLine = newLine.substring(0, lowestIndex) + singles[lowestIndexKey] + newLine.substring(lowestIndex + lowestIndexKey.length)

  }
  // console.log(newLine)
  return newLine
}
const replaceLastWord = (line: string) => {
  let newLine = line
  let greatestIndex = -1
  let greatestIndexKey = ''
  Object.keys(singles).forEach(key => {
    const indexOfKey = newLine.indexOf(key)
    if (indexOfKey > greatestIndex && indexOfKey < line.length) {
      greatestIndex = indexOfKey
      greatestIndexKey = key
    }
  })
  if (greatestIndexKey) {
    // console.log(greatestIndex)
    // console.log(greatestIndexKey)
    // console.log(newLine.substring(0, greatestIndex))
    newLine = newLine.substring(0, greatestIndex) + singles[greatestIndexKey] + newLine.substring(greatestIndex + greatestIndexKey.length)

  }
  // console.log(newLine)
  return newLine
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const convertedStrings = input.map(line => {
    let newLine = line

    newLine = replaceFirstWord(newLine)
    let shouldContinue = true
    const keys = Object.keys(singles)
    while (shouldContinue) {
      shouldContinue = false
      for (let i = 0; i < keys.length && !shouldContinue; i++) {
        if (newLine.includes(keys[i])) {
          shouldContinue = true
          // newLine = replaceLastWord(newLine)
          newLine = replaceLastWord(newLine)

        }
      }
    }
    // console.log(newLine)
    // Object.keys(singles).forEach(key => {
    //
    // })
    // let keyIsFound = false
    //   do {
    //     Object.keys(singles).forEach(key => {
    //       if (newLine.includes(key)) {
    //         keyIsFound = true
    //         newLine = replaceFirstWord(newLine)
    //       }
    //     })
    //   } while (keyIsFound)
    // newLine = replaceLastWord(newLine)
    return newLine
  })

  const allDigits = convertedStrings.map(line => {
    return line.match(/\d/g)
  })

  let total = 0
  allDigits.forEach(digits => {
    const digitsString = `${digits[0]}${digits[digits.length - 1]}`
    total += Number.parseInt(digitsString)
  })
  return total
}

export const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 142,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
