export const parseInput = (rawInput: string) => {
  const redTileLocations = rawInput.trim().split('\n').map(line => line.split(',').map(lineItem => parseInt(lineItem)))

  return redTileLocations
}

export const part1 = (rawInput: string):number => {
  const redTileLocations = parseInput(rawInput)

  return redTileLocations.length
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

export const exampleInputPart2 = exampleInputPart1
