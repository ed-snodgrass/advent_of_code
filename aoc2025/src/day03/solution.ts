export const parseInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split('\n')
    .map((bank) => bank.split('').map((joltage) => parseInt(joltage)))
}

export function findTotalOutputJoltage(joltages: number[]) {
  return joltages.reduce((acc, currentValue) => acc + currentValue, 0)
}

export function findLargestJoltage(bank: number[], sequenceLength: 2 | 12 = 2) {
  const values = []
  let largestValue = bank[0]
  let largestValueIndex = 0
  let targetLength = bank.length - (sequenceLength - 1)

  for (let i = 1; i < targetLength; i++) {
    if (bank[i] > largestValue) {
      largestValue = bank[i]
      largestValueIndex = i
    }
  }
  values.push(largestValue)

  let nextIndex = largestValueIndex
  let theRest = bank
  while (values.length < sequenceLength) {
    theRest = theRest.slice(nextIndex + 1)
    targetLength = theRest.length - (sequenceLength - values.length - 1)

    let theRestLargestValueIndex = 0
    let theRestLargestValue = theRest[theRestLargestValueIndex]
    for (let i = 0; i < targetLength; i++) {
      if (theRest[i] > theRestLargestValue) {
        theRestLargestValue = theRest[i]
        theRestLargestValueIndex = i
      }
    }
    values.push(theRestLargestValue)
    nextIndex = theRestLargestValueIndex
  }
  return parseInt(values.join(''))
}

export const part1 = (rawInput: string): number => {
  const banks = parseInput(rawInput)
  const joltages = banks.map((bank) => findLargestJoltage(bank, 2))
  return findTotalOutputJoltage(joltages)
}

export const part2 = (rawInput: string): number => {
  const banks = parseInput(rawInput)
  const joltages = banks.map((bank) => findLargestJoltage(bank, 12))
  return findTotalOutputJoltage(joltages)
}

export const exampleInputPart1 = `987654321111111
811111111111119
234234234234278
818181911112111`

export const exampleInputPart2 = exampleInputPart1
