import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split('').map(char => char as Tile))

export const countEnergizedTiles = (input: string[][]) => {
  // console.log(input);
  return input.reduce((energizedTilesCount, row) => {
    return energizedTilesCount + row.reduce((rowSum, value) => rowSum + (value === '#' ? 1 : 0), 0)
  }, 0)
}

export const plotEnergizedTiles = (input: string[][], energizedTiles: { y: number, x: number }[]) => {
  const grid = []
  for (let i = 0; i < input.length; i++) {
    grid.push([...input[i].map(_ => '')])
  }
  energizedTiles.forEach(tile => {
    grid[tile.y][tile.x] = '#'
  })
  return grid
}

const getNextTile = (input: Tile[][], xIndex: number, yIndex: number, direction: Direction) => {
  switch (direction) {
    case Direction.RIGHT:
      if (xIndex < input[yIndex].length - 1) {
        return input[yIndex][xIndex + 1]
      }
      break
    case Direction.LEFT:
      if (xIndex > 0) {
        return input[yIndex][xIndex - 1]
      }
      break
    case Direction.UP:
      if (yIndex > 0) {
        return input[yIndex - 1][xIndex]
      }
      break
    case Direction.DOWN:
      if (yIndex < input.length - 1) {
        return input[yIndex + 1][xIndex]
      }
      break

    default:
      return
  }
}

enum Direction {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  UP = 'UP',
  DOWN = 'DOWN'
}

enum Tile {
  EMPTY = '.',
  FORWARD_MIRROR = '/',
  BACK_MIRROR = '\\',
  HORIZONTAL_SPLITTER = '-',
  VERTICAL_SPLITTER = '|',
}

const findNextPosition = (x: number, y: number, direction: Direction, input: Tile[][]) => {
  switch (direction) {
    case Direction.RIGHT:
      if (x < input[y].length - 1) {
        return {xIndex: x + 1, yIndex: y}
      }
      break
    case Direction.LEFT:
      if (x > 0) {
        return {yIndex: y, xIndex: x - 1}
      }
      break
    case Direction.UP:
      if (y > 0) {
        return {yIndex: y - 1, xIndex: x}
      }
      break
    case Direction.DOWN:
      if (y < input.length - 1) {
        return {yIndex: y + 1, xIndex: x}
      }
      break
  }
}

const getPossibleNextDirections = (fullDirection: {
  y: number,
  x: number,
  direction: Direction,
  currentTile: string,
  nextTile: string
}, input: Tile[][], energizedTiles: any[]) => {
  // console.log(fullDirection)
  if (!fullDirection.nextTile) {
    return
  }
  const {xIndex, yIndex} = findNextPosition(fullDirection.x, fullDirection.y, fullDirection.direction, input)
  const getNext = (): Direction[] => {
    switch (fullDirection.nextTile) {
      case Tile.EMPTY:
        return [fullDirection.direction]
      case Tile.FORWARD_MIRROR:
        switch (fullDirection.direction) {
          case Direction.RIGHT:
            return [Direction.UP]
          case Direction.DOWN:
            return [Direction.LEFT]
          case Direction.LEFT:
            return [Direction.DOWN]
          case Direction.UP:
            return [Direction.RIGHT]
          default:
            return undefined
        }
      case Tile.BACK_MIRROR:
        switch (fullDirection.direction) {
          case Direction.RIGHT:
            return [Direction.DOWN]
          case Direction.DOWN:
            return [Direction.RIGHT]
          case Direction.LEFT:
            return [Direction.UP]
          case Direction.UP:
            return [Direction.LEFT]
          default:
            return undefined
        }
      case Tile.HORIZONTAL_SPLITTER: {
        switch (fullDirection.direction) {
          case Direction.RIGHT:
          case Direction.LEFT:
            return [fullDirection.direction]
          case Direction.UP:
          case Direction.DOWN:
            return [Direction.RIGHT, Direction.LEFT]
          default:
            return undefined
        }
      }
      case Tile.VERTICAL_SPLITTER: {
        switch (fullDirection.direction) {
          case Direction.RIGHT:
          case Direction.LEFT:
            return [Direction.UP, Direction.DOWN]
          case Direction.UP:
          case Direction.DOWN:
            return [fullDirection.direction]
          default:
            return undefined
        }
      }
      default:
        break
    }
  }
  const nextDirections = getNext()
  const possible = []
  nextDirections.forEach(nextDirection => {
    const alreadyAttempted = !!energizedTiles.find((tile: {
      x: number;
      y: number;
      direction: Direction
    }) => tile.x === xIndex && tile.y === yIndex && tile.direction === nextDirection)
    if (!alreadyAttempted) {

      switch (nextDirection) {
        case Direction.RIGHT:
          if (xIndex < input[yIndex].length) {
            possible.push({
              y: yIndex,
              x: xIndex,
              direction: nextDirection,
              currentTile: input[yIndex][xIndex],
              nextTile: getNextTile(input, xIndex, yIndex, nextDirection)
            })
          }
          break
        case Direction.LEFT:
          if (xIndex >= 0) {
            possible.push({
              y: yIndex,
              x: xIndex,
              direction: nextDirection,
              currentTile: input[yIndex][xIndex],
              nextTile: getNextTile(input, xIndex, yIndex, nextDirection)
            })
          }
          break
        case Direction.UP:
          if (yIndex >= 0) {
            possible.push({
              y: yIndex,
              x: xIndex,
              direction: nextDirection,
              currentTile: input[yIndex][xIndex],
              nextTile: getNextTile(input, xIndex, yIndex, nextDirection)
            })
          }
          break
        case Direction.DOWN:
          if (yIndex < input.length) {
            possible.push({
              y: yIndex,
              x: xIndex,
              direction: nextDirection,
              currentTile: input[yIndex][xIndex],
              nextTile: getNextTile(input, xIndex, yIndex, nextDirection)
            })
          }
          break
        default:
          console.error('INVALID DIRECTION')
      }
    }
  })
  return possible
}

export const visualize = (energizedTiles, input) => {
  const newGrid = []
  for (let i = 0; i < input.length; i++) {
    const row = []

    for (let j = 0; j < input[i].length; j++) {
      const energized = energizedTiles.find(tile => tile.x === j && tile.y === i)
      if (energized) {
        if (energized.currentTile === Tile.EMPTY) {
          if (energized.direction === Direction.DOWN) row.push('v')
          if (energized.direction === Direction.UP) row.push('^')
          if (energized.direction === Direction.LEFT) row.push('<')
          if (energized.direction === Direction.RIGHT) row.push('>')

        } else {
          row.push(energized.currentTile)
        }
      } else {
        row.push(input[i][j])
      }
    }
    newGrid.push(row)
  }
  console.log(newGrid.map(row => row.join('')).join('\n'))
}

const processFromStartingPoint = (input: Tile[][], startingPosition: {y: number, x: number, currentTile: string, nextTile: string, direction: Direction}) => {
  if (startingPosition.x === input[0].length && startingPosition.y === input.length - 1) {
    console.log('here')
  }
  const energizedTiles = []
  let nextDirections = [startingPosition]
  while (nextDirections.length > 0) {
    const currentDirection = nextDirections.pop()
    const possible = getPossibleNextDirections(currentDirection, input, energizedTiles)
    if (possible?.length) {
      energizedTiles.push(...possible)
      nextDirections.push(...possible)

    }
  }
  // console.log(energizedTiles);
  // visualize(energizedTiles, input)
  return countEnergizedTiles(plotEnergizedTiles(input, energizedTiles))
}

export const part1 = (rawInput: string) => {
  // console.log(rawInput);
  const input = parseInput(rawInput)
  // console.log(input);
  // console.log(input.map(row => row.join('')).join('\n'));
  let direction = Direction.RIGHT
  let yIndex = 0
  let xIndex = -1
  const startingPosition = {
    y: yIndex,
    x: xIndex,
    direction,
    currentTile: input[yIndex][xIndex],
    nextTile: getNextTile(input, xIndex, yIndex, direction)
  }
  return processFromStartingPoint(input, startingPosition)
}

export const captureAllStartingPositions = (input: Tile[][]) => {
  const startingPositions = []
  startingPositions.push(...input[0].map((tile, tileIndex) => ({x: tileIndex, y: -1, nextTile: tile, direction: Direction.DOWN})))
  startingPositions.push(...input[input.length - 1].map((tile, tileIndex) => ({x: tileIndex, y: input.length - 2, nextTile: tile, direction: Direction.UP})))

  const firstColumn = []
  const lastColumn = []

  input.forEach((row, yIndex) => {
    firstColumn.push({x: -1, y: yIndex, nextTile: input[yIndex][0], direction: Direction.RIGHT})
    lastColumn.push({x: input[yIndex].length, y: yIndex, nextTile: input[yIndex][input[yIndex].length - 1], direction: Direction.LEFT})
  })
  startingPositions.push(...firstColumn)
  startingPositions.push(...lastColumn)
  return startingPositions
}
type StartingPosition = {
  x: number, y: number, direction: Direction, nextTile: {}
}
export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const startingPositions: StartingPosition[] = captureAllStartingPositions(input)

  // console.log(startingPositions[startingPositions.length - 1]);
  // const count = processFromStartingPoint(input, {...startingPositions[startingPositions.length - 1], currentTile: ''})
  // return count
  return Math.max(...startingPositions.map((startingPosition, index) => {
    const startTime = Date.now()
    // @ts-ignore
    const count = processFromStartingPoint(input, {...startingPosition, currentTile: ''})
    // console.log(`startingPosition: ${JSON.stringify(startingPosition)}, iteration: ${index} took ${Date.now() - startTime}ms with count of: ${count}`)
    return count
  }))
}

export const exampleInput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
