import run from "aocrunner"

import {part1, exampleInputPart1} from "./solution.js"

run({
  part1: {
    tests: [
      {
        input: exampleInputPart1,
        expected: 2,
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
})
