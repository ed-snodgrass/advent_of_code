import run from "aocrunner"

import {part1, part2, exampleInputPart1, exampleInputPart2} from "./solution.js"

run({
  part1: {
    tests: [
      {
        input: exampleInputPart1,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInputPart2,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
