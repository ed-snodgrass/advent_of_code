export const SPLITTER_CHAR = '^'
export const START_CHAR = 'S'

export const findItem = (grid: string[][], item: string): [number, number] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return [x, y]
      }
    }
  }
  return [-1, -1] as [number, number]
}

export const createCharacterGrid = (rawInput:string): string[][] => {
  return rawInput.split('\n').map(line => line.split(''))
}

export const parseInput = (rawInput: string) => {
    return createCharacterGrid(rawInput)
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  const startPosition = findItem(input, START_CHAR)
  let splitCount = 0
  let previousBeamPaths = [startPosition[0]]

  for (let i = startPosition[1] + 2; i < input.length; i += 2) {
    const currentBeamPaths = []
    const splitPoints = []
    for (let j = 0; j < previousBeamPaths.length; j++) {
      if (input[i][previousBeamPaths[j]] === SPLITTER_CHAR) {
        splitCount++
        splitPoints.push(previousBeamPaths[j])
        currentBeamPaths.push(previousBeamPaths[j] - 1)
        currentBeamPaths.push(previousBeamPaths[j] + 1)
      }
    }
    const leftOverBeams = previousBeamPaths.filter(beam => !splitPoints.includes(beam))
    previousBeamPaths = Array.from(new Set([...currentBeamPaths, ...leftOverBeams]))
  }
  return splitCount
}

export const findAllPossibleBeamLocations = (input: string[][]) => {
  const startPosition = findItem(input, START_CHAR)
  const allPossibleBeamLocations = [[ startPosition[0], startPosition[1] + 1]]

  let previousBeamPaths = [startPosition[0]]
  for (let i = startPosition[1] + 2; i < input.length; i += 2) {
    const currentBeamPaths = []
    const splitPoints = []
    for (let j = 0; j < previousBeamPaths.length; j++) {
      if (input[i][previousBeamPaths[j]] === SPLITTER_CHAR) {
        splitPoints.push(previousBeamPaths[j])
        allPossibleBeamLocations.push()
        currentBeamPaths.push(previousBeamPaths[j] - 1)
        currentBeamPaths.push(previousBeamPaths[j] + 1)
      }
    }
    const uniqueNewBeamPaths = Array.from(new Set(currentBeamPaths.map(beam => [beam, i + 1])))
    allPossibleBeamLocations.push(...uniqueNewBeamPaths)
  }
  return allPossibleBeamLocations
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

export const exampleInputPart2 = exampleInputPart1

export const snippetFromInput = `...S...
.......
...^...
.......
..^.^..
.......
.^.^.^.
.......
..^....
.......
....^..
.......`
