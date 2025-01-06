export interface Point {x: number, y: number}
export interface Position extends Point {heading: Heading }
export type Heading = '^'|'>'|'v'|'<'
export const DIRECTIONS: Map<string, [number, number]> = new Map([
  ["^", [0, -1]],
  [">", [1, 0]],
  ["v", [0, 1]],
  ["<", [-1, 0]],
]);
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
  visitedPositions.push(currentPosition)
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
  grid[currentPosition.y][currentPosition.x] = currentHeading
  // console.log(grid.map(line => line.join('')).join('\n'))
  return visitedPositions
}

export const part1 = (rawInput: string):number => {
  const {startingPosition, grid} = parseInput(rawInput)
  const visitedPositions = markGuardPath({...startingPosition!, heading: '^'}, grid)
  return visitedPositions.length
}

const findAllObstacles = (grid: string[][]) => {
  const obstacles: Point[] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === OBSTACLE) {
        obstacles.push({x: j, y: i})
      }
    }
  }
  return obstacles
}

type LoopPossibility = {
  point: Point,
  // heading: Heading,
  diffX?: number,
  diffY?: number
}

const findAllAlignedObstacles = (currentPoint: Point, obstacles: Point[]) => {
  const possibleAlignments: LoopPossibility[] = []
  const {x, y} = currentPoint
  const obstaclesAlongY = obstacles.filter(obstacle => {
    return (obstacle.y === y + 1 && obstacle.x > x + 1) || (obstacle.y === y - 1 && obstacle.x < x - 1)
  })
  if (obstaclesAlongY.length === 1) {
    const {x: nx, y: ny} = obstaclesAlongY[0]
    possibleAlignments.push({point: {x: nx, y: ny}, diffX: x - nx})
  } else if (obstaclesAlongY.length > 1) {
    const {x: nx, y: ny} = obstaclesAlongY.sort((a, b) => a.x - b.x)[0]
    possibleAlignments.push({point: {x: nx, y: ny}, diffX: x - nx})
  }

  const obstaclesAlongX = obstacles.filter(obstacle => {
    return (obstacle.x === x - 1 && obstacle.y > y + 1) || (obstacle.x === x + 1 && obstacle.y < y - 1)
  })
  if (obstaclesAlongX.length === 1) {
    const {x: nx, y: ny} = obstaclesAlongX[0]
    possibleAlignments.push({point: {x: nx, y: ny}, diffY: Math.abs(y - ny)})
  } else if (obstaclesAlongX.length > 1) {
    const {x: nx, y: ny} = obstaclesAlongX.sort((a, b) => b.y - a.y)[0]
    possibleAlignments.push({point: {x: nx, y: ny}, diffY: y - ny})
  }
  return possibleAlignments
}

export const findPossibleLoops = (obstacles: Point[], startingPosition: Point) => {
  const possibleNewObstacles: Point[] = []
  const obstacleAlignments = new Map<string, LoopPossibility[]>()

  for (let i = 0; i < obstacles.length; i++) {
    const possibleAlignments = findAllAlignedObstacles(obstacles[i], obstacles)
    const {x,y} = obstacles[i]
    obstacleAlignments.set(`${x},${y}`, possibleAlignments)
  }
  obstacleAlignments.forEach((possibleAlignments, obstacleKey) => {
    const [originalX, originalY] = obstacleKey.split(',').map(Number)
    let possibleLoop = [obstacles.find(obstacle => obstacle.x === originalX && obstacle.y === originalY)!]
    for (const possibleAlignment of possibleAlignments) {
      if (obstacleAlignments.has(`${possibleAlignment.point.x},${possibleAlignment.point.y}`)) {
        const otherAlignments = obstacleAlignments.get(`${possibleAlignment.point.x},${possibleAlignment.point.y}`)!.filter(otherAlignment => {
          return `${otherAlignment.point.x},${otherAlignment.point.y}` !== obstacleKey
        })
        if (otherAlignments?.length === 1) {
          possibleLoop.push(possibleAlignment.point)
          possibleLoop.push(otherAlignments[0].point)
        }
      }
    }
    if (possibleLoop.length === 3) {
      const [a, b, c] = possibleLoop
      let d
      if (a.x < b.x && a.y < b.y && (a.x - b.x) + (c.x - (a.x - 1)) === 0 && (b.y - c.y) + ((c.y - 1) - a.y) === 0) {
        d = {x: a.x - 1, y: c.y - 1}
      } else if (a.x > b.x && a.y < b.y && (a.y - b.y) + (c.y - (a.y - 1)) === 0 && (a.x - (c.x + 1)) - (b.x - c.x) === 0) {
        d = {x: c.x + 1, y: a.y - 1}
      } else if (a.x > b.x && a.y > b.y && (a.x - b.x) + (c.x - (a.x + 1)) === 0 && (b.y - c.y) + ((c.y + 1) - a.y) === 0) {
        d = {x: a.x + 1, y: c.y + 1}
      } else if (a.x < b.x && a.y > b.y && (a.y - b.y) - ((a.y + 1) - c.y) === 0 && (b.x - c.x) + ((c.x - 1) - a.x) === 0) {
        d = {x: c.x - 1, y: a.y + 1}
      }

      //TODO check for obstacles between (d.x + 1, d.y) and (a.x, a.y)
      //TODO check for obstacles between (d.x, d.y) and (c.x, c.y - 1)
      if (d && !(d.x === startingPosition.x && d.y === startingPosition.y)) {
        possibleNewObstacles.push(d)
      }
    }
  })
  return possibleNewObstacles
}

export const findObstaclesAlongPath = (obstacles: Point[], path: Position[]) => {
  const obstaclesAlongPath: Point[] = []
  const obstaclesAsStrings = obstacles.map(obstacle => `${obstacle.x},${obstacle.y}`)
  for (let i = 0; i < path.length - 1; i++) {
    const {x, y, heading} = path[i]
    const direction = DIRECTIONS.get(heading)!
    const [dx, dy] = direction
    const nextPosition = {x: x + dx, y: y + dy}
    // console.log(`path: ${x},${y} -> ${nextPosition.x},${nextPosition.y}`)
    if (obstaclesAsStrings.includes(`${nextPosition.x},${nextPosition.y}`)) {
      obstaclesAlongPath.push(nextPosition)
    }
  }
  return obstaclesAlongPath
}

export const part2 = (rawInput: string): number => {
  const {startingPosition, grid} = parseInput(rawInput)
  if (!startingPosition) {
    throw new Error('No starting position')
  }
  const visitedPositions = markGuardPath({...startingPosition, heading: '^'}, grid)
  const obstacles = findAllObstacles(grid)
  const obstaclesAlongPath: Point[] = findObstaclesAlongPath(obstacles, visitedPositions)
  const possibleLoops = findPossibleLoops(obstacles, startingPosition)

  return -1
}

export const exampleInputPart1 =  `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

