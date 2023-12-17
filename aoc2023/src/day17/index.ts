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

export const exampleInput = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 102,
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
