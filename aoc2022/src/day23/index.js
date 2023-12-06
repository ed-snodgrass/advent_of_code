import run from "aocrunner"

const parseInput = (rawInput) => rawInput
export const getTunnels = (rawInput) => {

}
export const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

export const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}
export const testInput = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 110,
      },
    ],
    solution: part1,
  },
  // part2: {
  //   tests: [
  //     {
  //       input: testInput,
  //       expected: "",
  //     },
  //   ],
  //   solution: part2,
  // },
  trimTestInputs: true,
  onlyTests: false,
})
