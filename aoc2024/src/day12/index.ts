import run from "aocrunner"

import { part1, part2, exampleInputPart1, exampleInputPart2, miniSampleInput } from "./solution.js"

run({
  part1: {
    tests: [
      {
        input: miniSampleInput,
        expected: 140,
      },
      {
        input: exampleInputPart1,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInputPart2,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
