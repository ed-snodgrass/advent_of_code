import run from "aocrunner"

import {part1, part2, exampleInputPart1} from "./solution.js"

run({
  part1: {
    tests: [
      {
        input: exampleInputPart1,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInputPart1,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
