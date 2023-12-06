import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n')

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = ``

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: "",
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
