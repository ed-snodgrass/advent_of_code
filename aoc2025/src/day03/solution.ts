export const parseInput = (rawInput: string) => {
  return rawInput.trim().split('\n').map(bank => bank.split('').map(joltage => parseInt(joltage)))
}

export function findTotalOutputJoltage(joltages: number[]) {
  return joltages.reduce((acc, currentValue)=> acc + currentValue, 0)
}

export function findLargestJoltage (bank: number[]) {
  let largestValue = bank[0]
  let largestValueIndex = 0
  for (let i = 1; i < bank.length - 1; i++) {
    if (bank[i] > largestValue) {
      largestValue = bank[i]
      largestValueIndex = i
    }
  }
  // console.log(`largest number is bank[${largestValueIndex} => ${bank[largestValueIndex]}`)
  let theRest = bank.slice(largestValueIndex + 1)
  let theRestLargestValueIndex = 0
  let theRestLargestValue = theRest[theRestLargestValueIndex]
  for (let i = 1; i < theRest.length; i++) {
    if (theRest[i] > theRestLargestValue) {
      theRestLargestValue = theRest[i]
      theRestLargestValueIndex = i
    }
  }
  return parseInt(`${bank[largestValueIndex]}${theRest[theRestLargestValueIndex]}`)
}

export const part1 = (rawInput: string):number => {
  const banks = parseInput(rawInput)
  const joltages = banks.map(findLargestJoltage)
  return findTotalOutputJoltage(joltages)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `987654321111111
811111111111119
234234234234278
818181911112111`

export const exampleInputPart2 = exampleInputPart1
