import run from "aocrunner"

import gridToString from '../gridToString.js'

export const PART_ONE_X_OFFSET = 400 // could capture this programmatically
const PART_ONE_START_X = 500 - PART_ONE_X_OFFSET
export const PART_TWO_X_OFFSET = 0 // could capture this programmatically
const PART_TWO_START_X = 500 - PART_TWO_X_OFFSET

const START_Y = 0 // could capture a Y_OFFSET programmatically

const parseInput = (rawInput) => rawInput.split('\n')

export const dropPieceOfSand = (grid, startX) => {
  let y = START_Y
  let x = startX
  let canStillMove = true

  while (canStillMove) {
    if (y + 1 >= grid.length) {
      return
    }
    if (x + 1 >= grid[y].length || x - 1 < 0) {
      return
    }
    if (grid[y + 1][x] === '.') {
      y++
    } else if (grid[y + 1][x - 1] === '.') {
      y++
      x--
    } else if (grid[y + 1][x + 1] === '.') {
      y++
      x++
    } else {
      canStillMove = false
    }
  }
  return {x, y}
}

export const partOneDropAllSand = (grid) => {
  const activeGrid = [...grid]
  let hasHitAbyss = false
  let count = 0
  while (!hasHitAbyss) {
    const sandRestingPosition = dropPieceOfSand(activeGrid, PART_ONE_START_X)

    if (!sandRestingPosition) {
      hasHitAbyss = true
    } else {
      activeGrid[sandRestingPosition.y][sandRestingPosition.x] = 'o'
      count++
    }
  }
  return count
}

export const partOneCreateGrid = (rockStructureCoordinateLines) => {
  const grid = []
  for (let yIndex = 0; yIndex < 200; yIndex++) {
    const row = []
    for (let xIndex = 0; xIndex < (600 - PART_ONE_X_OFFSET); xIndex++) {
      row.push('.')
    }
    grid.push(row)
  }
  grid[START_Y][PART_ONE_START_X] = '+'
  rockStructureCoordinateLines.forEach(rockStructure => {
    rockStructure.forEach(coordinateLine => {
      coordinateLine.forEach(coordinate => {
        grid[coordinate.y][coordinate.x] = '#'
      })
    })
  })
  // drawGrid(grid)
  return grid
}

export const partOneParsePath = (rawPath) => {
  const pathPositions = rawPath.split('->').map(pathPosition => {
    const pointParts = pathPosition.trim().split(',')
    return {x: Number(pointParts[0]) - PART_ONE_X_OFFSET, y: Number(pointParts[1])}
  })
  const pathLines = []
  for (let i = 0; i < pathPositions.length - 1; i++) {
    const pathLine = []
    const firstCoordinate = pathPositions[i]
    const secondCoordinate = pathPositions[i + 1]
    pathLine.push(firstCoordinate)
    if (firstCoordinate.x === secondCoordinate.x) {
      if (firstCoordinate.y > secondCoordinate.y) {
        // vertical line, going up (+ y)
        for (let j = 0; j < (firstCoordinate.y - secondCoordinate.y) - 1; j++) {
          pathLine.push({x: firstCoordinate.x, y: firstCoordinate.y - (j + 1)})
        }
      } else {
        // vertical line, going down (- y)
        for (let j = 0; j < (secondCoordinate.y - firstCoordinate.y) - 1; j++) {
          pathLine.push({x: firstCoordinate.x, y: secondCoordinate.y - (j + 1)})
        }
      }

    } else {
      if (firstCoordinate.x > secondCoordinate.x) {

        // horizontal line, going right (- x)
        for (let j = 0; j < (firstCoordinate.x - secondCoordinate.x) - 1; j++) {
          pathLine.push({x: firstCoordinate.x - (j + 1), y: secondCoordinate.y})
        }
      } else {
        // horizontal line, going left (+ x)
        for (let j = 0; j < (secondCoordinate.x - firstCoordinate.x) - 1; j++) {
          pathLine.push({x: firstCoordinate.x + (j + 1), y: secondCoordinate.y})
        }
      }
    }
    pathLine.push(secondCoordinate)
    pathLines.push(pathLine)
  }
  // console.log(JSON.stringify(pathLines))
  return pathLines
}

export const partOneParseAllRawPaths = (rawPaths) => {
  return rawPaths.map(partOneParsePath)
}


const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const rockStructureCoordinateLines = partOneParseAllRawPaths(input)
  const grid = partOneCreateGrid(rockStructureCoordinateLines)
  return partOneDropAllSand(grid)
}
export const dropAllSand = (grid) => {
  const activeGrid = [...grid]
  let hasHitAbyss = false
  let count = 0
  while (!hasHitAbyss) {
    const sandRestingPosition = dropPieceOfSand(activeGrid, PART_TWO_START_X)

    if (!sandRestingPosition) {
      hasHitAbyss = true
    } else {
      activeGrid[sandRestingPosition.y][sandRestingPosition.x] = 'o'
      count++
      if (sandRestingPosition.y === START_Y && sandRestingPosition.x === PART_TWO_START_X) {
        hasHitAbyss = true
      }
    }
  }
  return count
}

export const createGrid = (rockStructureCoordinateLines) => {
  const grid = []
  for (let yIndex = 0; yIndex < 200; yIndex++) {
    const row = []
    for (let xIndex = 0; xIndex < (800 - PART_TWO_X_OFFSET); xIndex++) {
      row.push('.')
    }
    grid.push(row)
  }
  grid[START_Y][PART_TWO_START_X] = '+'
  let highestY = 0
  rockStructureCoordinateLines.forEach(rockStructure => {
    rockStructure.forEach(coordinateLine => {
      coordinateLine.forEach(coordinate => {
        if (coordinate.y > highestY) {
          highestY = coordinate.y
        }
        grid[coordinate.y][coordinate.x] = '#'
      })
    })
  })
  for (let i = 0; i < grid[highestY + 2].length; i++) {
    grid[highestY + 2][i] = '#'
  }

  // drawGrid(grid)
  return grid
}

export const parsePath = (rawPath) => {
  const pathPositions = rawPath.split('->').map(pathPosition => {
    const pointParts = pathPosition.trim().split(',')
    return {x: Number(pointParts[0]) - PART_TWO_X_OFFSET, y: Number(pointParts[1])}
  })
  const pathLines = []
  for (let i = 0; i < pathPositions.length - 1; i++) {
    const pathLine = []
    const firstCoordinate = pathPositions[i]
    const secondCoordinate = pathPositions[i + 1]
    pathLine.push(firstCoordinate)
    if (firstCoordinate.x === secondCoordinate.x) {
      if (firstCoordinate.y > secondCoordinate.y) {
        // vertical line, going up (+ y)
        for (let j = 0; j < (firstCoordinate.y - secondCoordinate.y) - 1; j++) {
          pathLine.push({x: firstCoordinate.x, y: firstCoordinate.y - (j + 1)})
        }
      } else {
      // vertical line, going down (- y)
      for (let j = 0; j < (secondCoordinate.y - firstCoordinate.y) - 1; j++) {
        pathLine.push({x: firstCoordinate.x, y: secondCoordinate.y - (j + 1)})
      }
      }

    } else {
      if (firstCoordinate.x > secondCoordinate.x) {

      // horizontal line, going right (- x)
      for (let j = 0; j < (firstCoordinate.x - secondCoordinate.x) - 1; j++) {
        pathLine.push({x: firstCoordinate.x - (j + 1), y: secondCoordinate.y})
      }
      } else {
        // horizontal line, going left (+ x)
        for (let j = 0; j < (secondCoordinate.x - firstCoordinate.x) - 1; j++) {
          pathLine.push({x: firstCoordinate.x + (j + 1), y: secondCoordinate.y})
        }
      }
    }
    pathLine.push(secondCoordinate)
    pathLines.push(pathLine)
  }
  // console.log(JSON.stringify(pathLines))
  return pathLines
}

export const parseAllRawPaths = (rawPaths) => {
  return rawPaths.map(parsePath)
}
const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const rockStructureCoordinateLines = parseAllRawPaths(input)
  const grid = createGrid(rockStructureCoordinateLines)
  return dropAllSand(grid)
}

run({
  part1: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
