export const parseInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((lineItem) => parseInt(lineItem))) as [number, number][]
}

export const manhattanDistance = (locationA: [number, number], locationB: [number, number]) => {
  const absoluteValueOfXDiff = Math.abs(locationA[0] - locationB[0])
  const absoluteValueOfYDiff = Math.abs(locationA[1] - locationB[1])
  return absoluteValueOfXDiff + absoluteValueOfYDiff
}

export const findMaxPairs = (redTileLocations: [number, number][]) => {
  let maxPairs: [number, number][]
  let maxDistance = 0
  for (let i = 0; i < redTileLocations.length; i++) {
    for (let j = i + 1; j < redTileLocations.length; j++) {
      const distance = manhattanDistance(redTileLocations[i], redTileLocations[j])
      if (distance > maxDistance) {
        maxDistance = distance
        maxPairs = [redTileLocations[i], redTileLocations[j]]
      }
    }
  }
  return maxPairs
}

export const countTilesBetween = (tiles: [[number, number], [number, number]]) => {
  const width = Math.abs(tiles[0][0] - tiles[1][0]) + 1
  const height = Math.abs(tiles[0][1] - tiles[1][1]) + 1
  return width * height
}

export const part1 = (rawInput: string): number => {
  const redTileLocations = parseInput(rawInput)
  const maxPairs = findMaxPairs(redTileLocations)
  return countTilesBetween(maxPairs as [[number, number], [number, number]])
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
