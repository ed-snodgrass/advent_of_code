export const parseInput = (rawInput: string) => {
  const lines = rawInput.trim().split('\n')
  const numberLines = lines.slice(0, lines.length - 1)
  const theNumbers = numberLines.map((numberLine) =>
    numberLine
      .trim()
      .split(/\s+/)
      .map((item) => parseInt(item)),
  )
  const theOperators = lines[lines.length - 1].split(/\s+/)
  return { theNumbers, theOperators }
}

export const performOperation = (column: number, input: { theNumbers: number[][]; theOperators: string[] }) => {
  const { theNumbers, theOperators } = input
  const columnNumbers = theNumbers.map((row) => row[column])
  if (theOperators[column] === '*') {
    return columnNumbers.reduce((acc, currentValue) => {
      return acc * currentValue
    }, 1)
  } else if (theOperators[column] === '+') {
    return columnNumbers.reduce((acc, currentValue) => {
      return acc + currentValue
    }, 0)
  }
}

export const part1 = (rawInput: string): number => {
  const { theNumbers, theOperators } = parseInput(rawInput)
  const answers = []
  for (let i = 0; i < theNumbers[0].length; i++) {
    answers.push(performOperation(i, { theNumbers, theOperators }))
  }
  return answers.reduce((acc, currentValue) => acc + currentValue, 0)
}

export const printGrid = (grid: number[][] | string[][]) => {
  console.log(grid.map((row) => row.join('')).join('\n'))
}
export const findRanges = (operatorLine: string[], lineLength) => {
  const operators = operatorLine
  const separatorIndexes = []
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '+') separatorIndexes.push(i)
  }

  const ranges = []
  for (let i = 0; i < separatorIndexes.length; i++) {
    const start = separatorIndexes[i]
    const end = separatorIndexes[i + 1] ? separatorIndexes[i + 1] - 2 : lineLength - 1
    ranges.push([start, end])
  }
  return ranges
}

export const addOrMultiply = (operator: string, columnNumbers: number[]) => {
  if (operator === '*') {
    return columnNumbers.reduce((acc, currentValue) => {
      return acc * currentValue
    }, 1)
  } else if (operator === '+') {
    return columnNumbers.reduce((acc, currentValue) => {
      return acc + currentValue
    }, 0)
  }
}

export const parseInput2 = (rawInput: string) => {
  const lines = rawInput
    .trim()
    .split('\n')
    .map((line) => line.split(''))
  const operatorLine = lines[lines.length - 1]
  const ranges = findRanges(operatorLine, lines[0].length)

  const numbers: string[][] = []
  const operators: string[] = []
  for (let j = 0; j < ranges.length; j++) {
    const numbersForLine = []
    const currentRange = ranges[j]
    operators.push(operatorLine[currentRange[0]])
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i]
      numbersForLine.push(line.slice(currentRange[0], currentRange[1] + 1).join(''))
    }
    numbers.push(numbersForLine)
  }
  const transposedNumbers = transposeGrid(numbers)
  return { numbers: transposedNumbers, operators, ranges }
}

export const transposeGrid = (grid: string[][]) => {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))
}

export const performOperationRtl = (
  column: number,
  input: { numbers: string[][]; operators: string[]; ranges: number[] },
) => {
  const { numbers, operators, ranges } = input

  const range = ranges[column]
  const columnNumbers = numbers.map((row) => row[column])
  const newNumbers = []
  for (let i = range[1] - range[0]; i >= 0; i--) {
    const newNumber = parseInt(
      columnNumbers
        .map((valueString) => valueString[i])
        .join('')
        .trim(),
    )
    newNumbers.push(newNumber)
  }
  return addOrMultiply(operators[column], newNumbers)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput2(rawInput)
  const { operators } = input
  let output = 0
  for (let k = 0; k < operators.length; k++) {
    output += performOperationRtl(k, input)
  }
  return output
}

export const exampleInputPart1 = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

export const exampleInputPart2 = exampleInputPart1
