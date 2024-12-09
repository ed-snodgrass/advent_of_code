export const parseInput = (rawInput: string) => {
  let startingPosition: {x: number, y: number} | undefined
  const grid = rawInput.split('\n').map(line => line.split(''))
  for (let i = 0; i < grid.length && !startingPosition; i++) {
    for (let j = 0; j < grid[i].length && !startingPosition; j++) {
      startingPosition = grid[i][j] === '^' ? {x: j, y: i} : undefined
    }
  }
  return {startingPosition, grid}
}

const atEdge = (position: {x: number, y: number}, grid: string[][]) => {
  return position.x === 0 || position.x === grid[0].length - 1 || position.y === 0 || position.y === grid.length - 1
}
const MAX_MOVES = 1000000

const getNextPosition = (currentPosition: {x: number, y: number}, heading: '^'|'>'|'v'|'<'): {x: number, y: number} => {
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

export const markGuardPath = (startingPosition: {x: number, y: number}, grid: string[][]) => {
  let moves = 0
  const visitedPositions: {x: number, y: number}[] = []
  let currentPosition = startingPosition
  visitedPositions.push(currentPosition)
  let currentHeading: '^'|'>'|'v'|'<' = '^'
  while (moves < MAX_MOVES && !atEdge(currentPosition, grid)) {
    const nextPosition = getNextPosition(currentPosition, currentHeading)
    if (grid[nextPosition.y][nextPosition.x] === '#') {
      currentHeading = currentHeading === '^' ? '>' : currentHeading === '>' ? 'v' : currentHeading === 'v' ? '<' : '^'
    } else {
      moves++
      if (grid[currentPosition.y][currentPosition.x] !== 'X') {
        visitedPositions.push(currentPosition)
        grid[currentPosition.y][currentPosition.x] = 'X'
      }
      currentPosition = nextPosition
    }
  }
  grid[currentPosition.y][currentPosition.x] = currentHeading
  // console.log(grid.map(line => line.join('')).join('\n'))
  return visitedPositions
}

export const part1 = (rawInput: string):number => {
  const {startingPosition, grid} = parseInput(rawInput)
  const visitedPositions = markGuardPath(startingPosition!, grid)
  return visitedPositions.length
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

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

export const exampleInputPart2 = exampleInputPart1
