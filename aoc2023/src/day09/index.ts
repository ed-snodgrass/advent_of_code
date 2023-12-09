import run from "aocrunner"

export const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n')
  return lines.map(line => line.split(' ').map(item => Number.parseInt(item)))
}

export const extrapolate = (sequences: number[][]) => {
  let nextValue: number
  const reversedSequences = sequences.reverse()
  reversedSequences.forEach((sequence, index) => {
    if (index === 0) {
      sequence.push(0)
    } else {
      nextValue = reversedSequences[index - 1][reversedSequences[index - 1].length - 1] + sequence[sequence.length - 1]
      sequence.push(nextValue)
    }
  })
  return nextValue
}

export const predictNextValue = (history: number[]) => {
  const sequences = [history]
  const determineNextSequence = (sequence: number[]) => {
    const currentSequence = []
    sequence.forEach((sequenceItem, index) => {
      if (index < sequence.length - 1) {
        currentSequence.push(sequence[index + 1] - sequenceItem)
      }
    })
    sequences.push(currentSequence)
    if (currentSequence.every(item => item === 0)) {

    } else {
      determineNextSequence(currentSequence)
    }
  }
  determineNextSequence(sequences[sequences.length - 1])
  // console.log(sequences);
  return extrapolate(sequences)
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const nextValues = input.map(predictNextValue)
  return nextValues.reduce((acc, value) => acc + value)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const nextValues = input.map(predictNextValue)
  return nextValues.reduce((acc, value) => acc + value)
}

export const exampleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 114,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
