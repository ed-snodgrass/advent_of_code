export interface Point {x: number, y: number}
export interface Position extends Point {heading: Heading }
export type Heading = '^'|'>'|'v'|'<'

const OBSTACLE = '#'

export const parseInput = (rawInput: string) => {
  let startingPosition: Point | undefined
  const grid = rawInput.split('\n').map(line => line.split(''))
  for (let i = 0; i < grid.length && !startingPosition; i++) {
    for (let j = 0; j < grid[i].length && !startingPosition; j++) {
      startingPosition = grid[i][j] === '^' ? {x: j, y: i} : undefined
    }
  }
  return {startingPosition, grid}
}

const atEdge = (position: Point, grid: string[][]) => {
  return position.x === 0 || position.x === grid[0].length - 1 || position.y === 0 || position.y === grid.length - 1
}
const MAX_MOVES = 1000000

const getNextPosition = (currentPosition: Point, heading: Heading): Point => {
  switch (heading) {
    case '<':
      return {x: currentPosition.x - 1, y: currentPosition.y}
    case '>':
      return {x: currentPosition.x + 1, y: currentPosition.y}
    case 'v':
      return {x: currentPosition.x, y: currentPosition.y + 1}
    case '^':
      return {x: currentPosition.x, y: currentPosition.y - 1}
    default:
      return currentPosition
  }
}

export const markGuardPath = (startingPosition: Position, grid: string[][]) => {
  let moves = 0
  const visitedPositions: Position[] = []
  let currentPosition = startingPosition
  let currentHeading: Heading = startingPosition.heading

  while (moves < MAX_MOVES && !atEdge(currentPosition, grid)) {
    const nextPosition = getNextPosition(currentPosition, currentHeading)
    if (grid[nextPosition.y][nextPosition.x] === OBSTACLE) {
      currentHeading = currentHeading === '^' ? '>' : currentHeading === '>' ? 'v' : currentHeading === 'v' ? '<' : '^'
    } else {
      moves++
      if (grid[currentPosition.y][currentPosition.x] !== 'X') {
        visitedPositions.push(currentPosition)
        grid[currentPosition.y][currentPosition.x] = 'X'
      }
      currentPosition = {x: nextPosition.x, y: nextPosition.y, heading: currentHeading}
    }
  }
  visitedPositions.push(currentPosition)
  grid[currentPosition.y][currentPosition.x] = currentHeading
  // console.log(grid.map(line => line.join('')).join('\n'))
  return visitedPositions
}

export const part1 = (rawInput: string):number => {
  const {startingPosition, grid} = parseInput(rawInput)
  const visitedPositions = markGuardPath({...startingPosition!, heading: '^'}, grid)
  return visitedPositions.length
}

export const findPossibleLoops = (grid: string[][], path: Position[]) => {
  const possibleNewObstacles: Point[] = []
  for (let i = path.length - 1; i > 1; i--) {
    const possibleObstacle = path[i]
    const visitedCounts = new Map<string, number>()
    let tempGrid = [...grid.map(line => [...line])]
    tempGrid[possibleObstacle.y][possibleObstacle.x] = '#'

    let currentPosition = path[i - 1]
    let currentHeading = currentPosition.heading
    let isLoop = false
    while (!isLoop && !atEdge(currentPosition, tempGrid)) {
      const nextPosition = getNextPosition(currentPosition, currentHeading)
      if (tempGrid[nextPosition.y][nextPosition.x] === OBSTACLE) {
        currentHeading = currentHeading === '^' ? '>' : currentHeading === '>' ? 'v' : currentHeading === 'v' ? '<' : '^'
      } else {
        const currentKey = `${currentPosition.x},${currentPosition.y}_${currentHeading}`
        visitedCounts.set(currentKey, (visitedCounts.get(currentKey) || 0) + 1)
        if (visitedCounts.get(currentKey) === 3) {
          possibleNewObstacles.push(possibleObstacle)
          break
        }
        currentPosition = {x: nextPosition.x, y: nextPosition.y, heading: currentHeading}
      }
    }
  }

  return possibleNewObstacles
}

export const part2 = (rawInput: string): number => {
  const {startingPosition, grid} = parseInput(rawInput)
  if (!startingPosition) {
    throw new Error('No starting position')
  }
  const visitedPositions = markGuardPath({...startingPosition, heading: '^'}, grid)
  const possibleLoops = findPossibleLoops(grid, visitedPositions)

  return possibleLoops.length
}

export const exampleInputPart1 =
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

