export const parseInput = (rawInput: string) => {
  const lines = rawInput.trim().split('\n')
  const numberLines = lines.slice(0, lines.length - 1)
  const theNumbers = numberLines.map(numberLine => numberLine.trim().split(/\s+/).map(item => parseInt(item)))
  const theOperators = lines[lines.length - 1].split(/\s+/)
  return {theNumbers, theOperators}
}

export const performOperation = (column: number, input: {theNumbers: number[][], theOperators: string[]}) => {
  const {theNumbers, theOperators} = input
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

export const part1 = (rawInput: string):number => {
  const {theNumbers, theOperators} = parseInput(rawInput)
  const answers = []
  for (let i = 0; i < theNumbers[0].length; i++) {
    answers.push(performOperation(i, {theNumbers, theOperators}))
  }
  return answers.reduce((acc, currentValue) => acc + currentValue, 0)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

export const exampleInputPart2 = exampleInputPart1
