export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => {
    const equationParts = line.split(": ")
    const testValue = Number.parseInt(equationParts[0].trim())
    const numbers = equationParts[1].split(" ").map(Number)

    return { testValue, numbers }
  })
}

function generateAllPossibleArrays(size: number) {
  const allArrays = [];
  const totalCombinations = Math.pow(2, size);

  for (let i = 0; i < totalCombinations; i++) {
    const array = [];
    for (let j = 0; j < size; j++) {
      // Using bitwise AND to determine if the j-th bit is set
      array.push((i & (1 << j)) !== 0);
    }
    allArrays.push(array);
  }

  return allArrays;
}

export const determineCalibrationPossibility = (testValue: number, numbers: number[]): boolean => {
  const possibleOperatorOptions = generateAllPossibleArrays(numbers.length - 1)

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
  const validEquations = input.filter(equation => determineCalibrationPossibility(equation.testValue, equation.numbers))
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
