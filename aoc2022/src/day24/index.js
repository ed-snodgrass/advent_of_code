import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const testInput = `#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: testInput,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
