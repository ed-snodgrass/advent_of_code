import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n')

const matchAllSymbols = (text: string) => {
  return text.matchAll(/[^\d.]/gu)
}

const matchAllNumbers = (text: string) => {
  return text.matchAll(/\d+/gu)
}
export const findAllSymbols = (rawInput: string) => {
  const lines = parseInput(rawInput)
  const symbols = []
  lines.forEach((line, index) => {
    const y = index
    const matchedSymbols = [...matchAllSymbols(line)]
    matchedSymbols.forEach(matchedSymbol => {
      symbols.push({x: matchedSymbol.index, y, symbol: matchedSymbol[0]})
    })
  })
  return symbols
}

const isAdjacent = (numberAsString: string, numberY: number, numberX: number, symbols: {x: number, y: number, symbol?: string}[]) => {
  const stringLength = numberAsString.length
  const onSameLine = () => {
    const symbolsOnSameLine = symbols.filter((symbol) => symbol.y === numberY)
    return symbolsOnSameLine.find(symbol => symbol.x >= numberX - 1 && symbol.x <= numberX + stringLength)
  }
  const hasAbove = () => {
    const symbolsAbove = symbols.filter((symbol) => symbol.y === numberY - 1)
    return symbolsAbove.find(symbol => symbol.x >= numberX - 1 && symbol.x <= numberX + stringLength)
  }
  const hasBelow = () => {
    const symbolsBelow = symbols.filter((symbol) => symbol.y === numberY + 1)
    return symbolsBelow.find(symbol => symbol.x >= numberX - 1 && symbol.x <= numberX + stringLength)
  }
  return onSameLine() || hasAbove() || hasBelow()
}

export const findNumbersTouchingSymbols = (rawInput: string) => {
  const symbols = findAllSymbols(rawInput)
  const lines = parseInput(rawInput)
  const partNumbers = []
  lines.forEach((line, index) => {
    const y = index
    const matchedNumbers = [...matchAllNumbers(line)]
    matchedNumbers.forEach((matchedNumber) => {
      if (isAdjacent(matchedNumber[0], y, matchedNumber.index, symbols)) {
        partNumbers.push(matchedNumber[0])
      }
    })
  })
  return partNumbers
}
export const findObjectsTouchingGears = (rawInput: string, possibleGears: {x: number, y: number, symbol: string}[]) => {
  const lines = parseInput(rawInput)
  const partNumbers = []
  lines.forEach((line, index) => {
    const y = index
    const matchedNumbers = [...matchAllNumbers(line)]
    matchedNumbers.forEach((matchedNumber) => {
      if (isAdjacent(matchedNumber[0], y, matchedNumber.index, possibleGears)) {
        partNumbers.push({x: matchedNumber.index, y, value: matchedNumber[0]})
      }
    })
  })
  return partNumbers
}

export const part1 = (rawInput: string) => {
  const numbersTouchingSymbols = findNumbersTouchingSymbols(rawInput)
  return numbersTouchingSymbols.reduce((acc, value) => acc + Number.parseInt(value), 0)
}

export const findGears = (rawInput:string) => {
  const possibleGears = findAllSymbols(rawInput).filter(symbol => symbol.symbol === '*')
  const objectsTouchingSymbols = findObjectsTouchingGears(rawInput, possibleGears)
  const gears = []
  possibleGears.forEach(gear => {
    const objectsTouchingGear = objectsTouchingSymbols.filter(numberObject => {
      if (gear.y === numberObject.y && gear.x >= numberObject.x - 1 && gear.x <= numberObject.x + numberObject.value.length) {
        return numberObject
      } else if (gear.y === numberObject.y - 1 && gear.x >= numberObject.x - 1 && gear.x <= numberObject.x + numberObject.value.length) {
        return numberObject
      } else if (gear.y === numberObject.y + 1 && gear.x >= numberObject.x - 1 && gear.x <= numberObject.x + numberObject.value.length) {
        return numberObject
      }
    })
    if (objectsTouchingGear.length === 2) {
      gears.push({...gear, value1: objectsTouchingGear[0].value, value2: objectsTouchingGear[1].value})
    }
  })
  return gears
}

export const part2 = (rawInput: string) => {
  const gears = findGears(rawInput)
  return gears.reduce((acc, gear) => {
    return acc + (Number.parseInt(gear.value1) * Number.parseInt(gear.value2))
  }, 0)
}

export const exampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 4361,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
