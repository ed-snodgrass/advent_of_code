export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split(""))
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  console.log(input)
  return -1
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

export const exampleInputPart2 = exampleInputPart1
