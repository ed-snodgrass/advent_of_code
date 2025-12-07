import { printGrid } from '../utils/grid'

export const SPLITTER_CHAR = '^'
export const START_CHAR = 'S'
export const BEAM_CHAR = '|'


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
  input[startPosition[1] + 1][startPosition[0]] = BEAM_CHAR
  let previousBeamPaths = [startPosition[0]]
  for (let i = startPosition[1] + 2; i < input.length; i += 2) {
    const currentBeamPaths = []
    const splitPoints = []
    for (let j = 0; j < previousBeamPaths.length; j++) {
      if (input[i][previousBeamPaths[j]] === SPLITTER_CHAR) {
        input[i][previousBeamPaths[j] - 1] = BEAM_CHAR
        input[i][previousBeamPaths[j] + 1] = BEAM_CHAR
        splitPoints.push(previousBeamPaths[j])
        currentBeamPaths.push(previousBeamPaths[j] - 1)
        currentBeamPaths.push(previousBeamPaths[j] + 1)
      }
    }
    const leftOverBeams = previousBeamPaths.filter(beam => !splitPoints.includes(beam))
    for (let beam of leftOverBeams) {
      input[i][beam] = BEAM_CHAR
      allPossibleBeamLocations.push([beam, i])
    }
    previousBeamPaths = Array.from(new Set([...currentBeamPaths, ...leftOverBeams]))
    const newBeamPaths = previousBeamPaths.map(beam => [beam, i + 1])
    newBeamPaths.forEach(([beam, y]) => input[y][beam] = BEAM_CHAR)
    allPossibleBeamLocations.push(...newBeamPaths)
  }
  return allPossibleBeamLocations.sort((a, b) => a[1] - b[1])
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
