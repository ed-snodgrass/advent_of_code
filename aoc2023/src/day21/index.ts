import run from "aocrunner"

type Node = {
  x: number
  y: number
}

export const findViablePathsFromNode = (grid: string[][], node: Node): Node[] => {

  const viableNextOptions : Node[] = []
  const startY = node.y
  const startX = node.x

  const north: Node = startY > 0 ? {y: startY - 1, x: startX} : undefined
  const south =  startY < grid.length - 1 ? {y: startY + 1, x: startX} : undefined
  const east = startX < grid[0].length - 1 ? {y: startY, x: startX + 1} : undefined
  const west = startX > 0 ? {y: startY, x: startX - 1} : undefined

  const canGoNorth = !!north && grid[north.y][north.x] !== '#'
  const canGoSouth = !!south && grid[south.y][south.x] !== '#'
  const canGoEast = !!east && grid[east.y][east.x] !== '#'
  const canGoWest = !!west && grid[west.y][west.x] !== '#'

  if (canGoNorth) viableNextOptions.push(north)
  if (canGoSouth) viableNextOptions.push(south)
  if (canGoEast) viableNextOptions.push(east)
  if (canGoWest) viableNextOptions.push(west)

  return viableNextOptions
}

export const nodeToString = (node: Node) => {
  return `${node.x}_${node.y}`
}

export const parseInput = (rawInput: string) => {
  let startingPosition: Node | undefined
  const grid = rawInput.split('\n').map(line => line.split(''))
  for (let i = 0; i < grid.length && !startingPosition; i++) {
    for (let j = 0; j < grid[i].length && !startingPosition; j++) {
      startingPosition = grid[i][j] === 'S' ? {x: j, y: i} : undefined
    }
  }
  return {startingPosition, grid}
}

export const takeStep = (grid: string[][], lastPositions: {x: number, y: number}[]) => {
  let nextPositions = []
  lastPositions.forEach(node => {
    nextPositions.push(...findViablePathsFromNode(grid, node))
  })
  return  Array.from(new Set(nextPositions.map(result => JSON.stringify(result))))
    .map(stringNewPosition => JSON.parse(stringNewPosition))
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numberOfSteps = input.grid.length === 11 ? 6 : 64
  let stepCount = 0
  let newPositions: Node[] = [input.startingPosition]
  while (stepCount < numberOfSteps) {
    const stepResults = takeStep(input.grid, newPositions)
    newPositions = Array.from(new Set(stepResults.map(result => JSON.stringify(result))))
      .map(stringNewPosition => JSON.parse(stringNewPosition))

    stepCount++
  }
  return newPositions.length
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: "",
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
