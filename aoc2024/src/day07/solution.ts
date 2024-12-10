export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    const equationParts = line.split(": ")
    const testValue = Number.parseInt(equationParts[0].trim())
    const numbers = equationParts[1].split(" ").map(Number)

    return { testValue, numbers }
  })
}

function generateAllPossibleArrays(operators:string[], exponent: number) {
  const allArrays = [];
  const base = operators.length;
  const totalCombinations = Math.pow(base, exponent);
  for (let i = 0; i < totalCombinations; i++) {
    const array = [];
    let currentNumber = i;
    for (let j = 0; j < exponent; j++) {
      array.push(currentNumber % base);
      currentNumber = Math.floor(currentNumber / base);
    }
    allArrays.push(array);
  }

  return allArrays;
}

export const determineCalibrationPossibility = (testValue: number, numbers: number[], operators: string[]): boolean => {
  const possibleOperatorOptions = generateAllPossibleArrays(operators, numbers.length - 1)

  for (let i = 0; i < possibleOperatorOptions.length; i++) {
    let currentValue = numbers[0]

    for (let j = 0; j < numbers.length - 1; j++) {
      const operator = possibleOperatorOptions[i][j]
      const nextValue = numbers[j + 1]
      if (operator) {
        currentValue += nextValue
      } else {
        currentValue *= nextValue
      }
    }
    if (currentValue === testValue) {
      return true
    }
  }
  return false;
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  const validEquations = input.filter(equation => determineCalibrationPossibility(equation.testValue, equation.numbers, ['+', '*']))
  return validEquations.reduce((acc, equation) => acc + equation.testValue, 0)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

export const exampleInputPart2 = exampleInputPart1
