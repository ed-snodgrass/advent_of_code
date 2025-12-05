export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split(""))
}
const ROLL_OF_PAPER = '@'

function isInCorner(grid: string[][], x: number, y: number) {
  if (x === 0 && y === 0) {
    return true
  }
  if (x === grid[0].length - 1 && y === 0) {
    return true
  }
  if (x === 0 && y === grid.length - 1) {
    return true
  }
  return x === grid[grid.length - 1].length - 1 && y === grid.length - 1;
}

export function isBlocked(grid: string[][], x: number, y: number) {
  if (isInCorner(grid, x, y)) {
    return false
  }
  let numberOfRollsInAdjacentPositions = 0
  if (y > 0) {
    const yToCheck = y - 1

    if (grid[yToCheck][x] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
    if (x > 0 && grid[yToCheck][x - 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
    if (x < grid[yToCheck].length - 1 && grid[yToCheck][x + 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
  }
  if (y < grid.length - 1) {
    const yToCheck = y + 1

    if (grid[yToCheck][x] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
    if (x > 0 && grid[yToCheck][x - 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
    if (x < grid[yToCheck].length - 1 && grid[yToCheck][x + 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
  }
  if (x > 0 && grid[y][x - 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
  if (x < grid[y].length - 1 && grid[y][x + 1] === ROLL_OF_PAPER) numberOfRollsInAdjacentPositions++
  return numberOfRollsInAdjacentPositions >= 4
}
export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  let paperRollsCount = 0
  for (let yIndex = 0; yIndex < input.length; yIndex++) {
    for (let xIndex = 0; xIndex < input.length; xIndex++) {
      if (input[yIndex][xIndex] === ROLL_OF_PAPER && !isBlocked(input, xIndex, yIndex)) paperRollsCount++
    }
  }
  return paperRollsCount
}
type Point = {x: number; y: number}
export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  let paperRollsRemoved = 0
  let initial = true
  let rollsToRemove: Point[] = []
  while (initial || rollsToRemove.length > 0) {
    initial = false
    rollsToRemove = []
    for (let yIndex = 0; yIndex < input.length; yIndex++) {
      for (let xIndex = 0; xIndex < input.length; xIndex++) {
        if (input[yIndex][xIndex] === ROLL_OF_PAPER && !isBlocked(input, xIndex, yIndex)) {
          rollsToRemove.push({x: xIndex, y: yIndex})
        }
      }
    }
    rollsToRemove.forEach(rollToRemove => {
      input[rollToRemove.y][rollToRemove.x] = 'x'
      paperRollsRemoved++
    })
  }
  return paperRollsRemoved
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
