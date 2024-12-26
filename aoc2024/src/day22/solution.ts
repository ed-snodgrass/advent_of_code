export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(Number)
}

export const calculateSecretNumber = (secretNumber: number): number => {
  let newSecretNumber
  newSecretNumber = prune(mix(secretNumber * 64, secretNumber))
  newSecretNumber = prune(mix(Math.floor(newSecretNumber / 32), newSecretNumber))
  newSecretNumber = prune(mix(newSecretNumber * 2048, newSecretNumber))
  return newSecretNumber
}

export const mix = (value: number, secretNumber: number): number => {
  return Number(BigInt(secretNumber) ^ BigInt(value))
}

export const prune = (value: number): number => {
  return value % 16777216
}

export const runCalculations = (initialSecretNumber:number) => {
  let currentSecretNumber = initialSecretNumber
  for (let i = 0; i < 2000; i++) {
    currentSecretNumber = calculateSecretNumber(currentSecretNumber)
  }
  return currentSecretNumber
}

export const part1 = (rawInput: string):number => {
  const initialSecretNumbers = parseInput(rawInput)
  const secretNumbers = initialSecretNumbers.map(runCalculations)
  return secretNumbers.reduce((acc, current) => acc + current, 0)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `1
10
100
2024`

export const exampleInputPart2 = exampleInputPart1
