import run from "aocrunner"

export const RIGHT = '>'
export const DOWN = 'v'
export const LEFT = '<'
export const UP = '^'
export const facings = [RIGHT, DOWN, LEFT, UP]

export const EMPTY = ' '
export const TILE = '.'
export const WALL = '#'

export const calculatePassword = (row, column, facing) => {
  return (1000 * row) + (4 * column) + facings.indexOf(facing)
}

export const plotGraph = graph => {
  let output = ''
  for (let row = 0; row < graph.length; row++) {
    for (let column = 0; column < graph[row].length; column++) {
      output += graph[row][column].facing ? graph[row][column].facing : graph[row][column].base
    }
    output += '\n'
  }
  return output
}

export const parseInput = (input) => {
  const initialData = input.split('\n\n')
  const graph = parseGraph(initialData[0])
  const instructions = parseInstructions(initialData[1])
  return {graph, instructions}
}

export const parseInstructions = (instructionInput) => {
  const instructionParser = /(\d+|[LR])/g
  const matcher = instructionInput.match(instructionParser)
  return matcher.map(match => isNaN(match) ? match : Number(match))
}

export const parseGraph = graphInput => {
  const graph = []
  const graphLines = graphInput.split('\n')
  const width = Math.max(...graphLines.map(graphLine => graphLine.length))
  console.log('Graph Width: ', width)
  for (let rowIndex = 0; rowIndex < graphLines.length; rowIndex++) {
    const row = []
    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      if (columnIndex < graphLines[rowIndex].length) {
        row.push({base: graphLines[rowIndex][columnIndex], row: rowIndex + 1, column: columnIndex + 1})
      } else {
        row.push({base: EMPTY, row: rowIndex + 1, column: columnIndex + 1})
      }
    }
    graph.push(row)
  }
  // console.log(plotGraph(graph))
  return graph
}
export const findStart = (graph) => {
  for (let columnIndex = 0; columnIndex < graph[0].length; columnIndex++) {
    if (graph[0][columnIndex].base === TILE) {
      graph[0][columnIndex].facing = RIGHT
      return graph[0][columnIndex]
    }
  }
}

export const performFacing = (graph, current, instruction) => {
  switch (current.facing) {
    case RIGHT:
      if (instruction === 'L') {
        graph[current.row - 1][current.column - 1].facing = UP
      } else if (instruction === 'R') {
        graph[current.row - 1][current.column - 1].facing = DOWN
      }
      break
    case DOWN:
      if (instruction === 'L') {
        graph[current.row - 1][current.column - 1].facing = RIGHT
      } else if (instruction === 'R') {
        graph[current.row - 1][current.column - 1].facing = LEFT
      }
      break
    case LEFT:
      if (instruction === 'L') {
        graph[current.row - 1][current.column - 1].facing = DOWN
      } else if (instruction === 'R') {
        graph[current.row - 1][current.column - 1].facing = UP
      }
      break
    case UP:
      if (instruction === 'L') {
        graph[current.row - 1][current.column - 1].facing = LEFT
      } else if (instruction === 'R') {
        graph[current.row - 1][current.column - 1].facing = RIGHT
      }
      break
  }
  return graph[current.row - 1][current.column - 1]
}
const findIndexOfFirstNonEmptyFromTop = (graph, current) => {
  return graph.findIndex(graphRow => graphRow[current.column - 1].base !== EMPTY)
}

const findIndexOfFirstNonEmptyFromBottom = (graph, current) => {
  return (graph.length - [...graph].reverse().findIndex(graphRow => graphRow[current.column - 1].base !== EMPTY)) - 1
}

const getNext = (graph, current) => {
  const firstNonEmptyFromRight = graph[current.row - 1].length - [...graph[current.row - 1]].reverse().findIndex(item => item.base !== EMPTY)
  const firstNonEmptyFromLeft = graph[current.row - 1].findIndex(item => item.base !== EMPTY)
  const indexOfFirstNonEmptyFromBottom = findIndexOfFirstNonEmptyFromBottom(graph, current)
  const indexOfFirstNonEmptyFromTop = findIndexOfFirstNonEmptyFromTop(graph, current)

  switch (current.facing) {
    case RIGHT:
      if (current.column === firstNonEmptyFromRight) {
        return graph[current.row - 1][firstNonEmptyFromLeft]
      } else {
        return graph[current.row - 1][current.column]
      }
    case LEFT:
      if (current.column - 1 === 0 || graph[current.row - 1][current.column - 1 - 1].base === EMPTY) {
        return graph[current.row - 1][firstNonEmptyFromRight - 1]
      } else {
        return graph[current.row - 1][current.column - 2]
      }
    case DOWN:
      if (current.row - 1 === indexOfFirstNonEmptyFromBottom) {
        return graph[indexOfFirstNonEmptyFromTop][current.column - 1]
      } else {
        return graph[current.row][current.column - 1]
      }
    case UP:
      if (current.row - 1 === indexOfFirstNonEmptyFromTop) {
        return graph[indexOfFirstNonEmptyFromBottom][current.column - 1]
      } else {
        return graph[current.row - 2][current.column - 1]
      }
  }
}

const marchForward = (graph, start, stepsCount) => {
  let current = start
  for (let i = 0; i < stepsCount; i++) {
    const next = getNext(graph, current)
    if (!next) {
      return current
    }
    if (next && next.base === WALL) {
      return current
    } else {
      next.facing = current.facing
      current = next
    }
  }
  return current
}

export const followInstructions = (start, graph, instructions) => {
  let current = start

  for (let i = 0; i < instructions.length; i++) {
    if (isNaN(instructions[i])) {
      current = performFacing(graph, current, instructions[i])
    } else {
      current = marchForward(graph, current, instructions[i])
    }
    // console.log(plotGraph(graph))
  }
  // console.log(plotGraph(graph))
  return current
}

const part1 = (rawInput) => {
  const parsedInput = parseInput(rawInput)
  const start = findStart(parsedInput.graph)
  const finalPosition = followInstructions(start, parsedInput.graph, parsedInput.instructions)
  return calculatePassword(finalPosition.row, finalPosition.column, finalPosition.facing)
}
const isOnEdgeOfFaceOne = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize * 3) {
        const newRow = ((cubeSize * 3) - current.row + 1)
        const newColumn = cubeSize * 4
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
    case LEFT:
      if (current.column === (cubeSize * 2) + 1) {
        const newRow = cubeSize + 1
        const newColumn = (cubeSize * 2) - (cubeSize - current.row)
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize) {
        const newRow = current.row + 1
        const newColumn = current.column
        // if (!graph[newRow -1]) {
        //   graph[newRow - 1] = []
        // }
        // if (!graph[newRow -1][newColumn - 1]) {
        //   graph[newRow -1][newColumn - 1] = {base: EMPTY, row: newRow -1 , column: newColumn -1 }
        // }
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
    case UP:
      if (current.row === 1) {
        const newRow = cubeSize + 1
        const newColumn = cubeSize - (current.column - (cubeSize * 2)) + 1
        // console.log('graph.length', graph.length)
        // console.log('graph[newRow - 1]', graph[newRow - 1])
        // console.log('graph[0].length', graph[0].length)
        // if (!graph[newRow -1]) {
        //   graph[newRow - 1] = []
        // }
        // if (!graph[newRow -1][newColumn - 1]) {
        //   graph[newRow -1][newColumn - 1] = {base: EMPTY, row: newRow -1 , column: newColumn -1 }
        // }
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
  }
}
const isOnEdgeOfFaceTwo = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize) {
        const newRow = current.row
        const newColumn = current.column + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
    case LEFT:
      if (current.column === 1) {
        const newRow = cubeSize * 3
        const newColumn = (cubeSize * 3) + ((cubeSize * 2) - current.row) + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize * 2) {
        const newRow = cubeSize * 3
        const newColumn = (cubeSize * 3) - (current.column - 1)
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
    case UP:
      if (current.row === cubeSize + 1) {
        const newRow = 1
        const newColumn = (cubeSize * 3) - (current.column - 1)
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
  }
}

const isOnEdgeOfFaceThree = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize * 2) {
        const newRow = current.row
        const newColumn = current.column + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
    case LEFT:
      if (current.column === cubeSize + 1) {
        const newRow = current.row
        const newColumn = current.column - 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize * 2) {
        const newRow = (cubeSize * 2) + (((cubeSize * 2) - current.column) + 1)
        const newColumn = (cubeSize * 2) + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
    case UP:
      if (current.row === cubeSize + 1) {
        const newRow = current.column - cubeSize
        const newColumn = (cubeSize * 2) + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
  }
}

const isOnEdgeOfFaceFour = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize * 3) {
        const newRow = (cubeSize * 2) + 1
        const newColumn = (cubeSize * 3) + ((cubeSize * 2) - current.row) + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
    case LEFT:
      if (current.column === (cubeSize * 2) + 1) {
        const newRow = current.row
        const newColumn = current.column - 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize * 2) {
        const newRow = current.row + 1
        const newColumn = current.column
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = DOWN
          return next
        }
      }
      break
    case UP:
      if (current.row === cubeSize + 1) {
        const newRow = current.row - 1
        const newColumn = current.column
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
  }
}

const isOnEdgeOfFaceFive = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize * 3) {
        const newRow = current.row
        const newColumn = current.column + 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
    case LEFT:
      if (current.column === (cubeSize * 2) + 1) {
        const newRow = cubeSize * 2
        const newColumn = (cubeSize + 1) + ((cubeSize * 3) - current.row)
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize * 3) {
        const newRow = cubeSize * 2
        const newColumn = 1 + ((cubeSize * 3) - current.column)
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
    case UP:
      if (current.row === (cubeSize * 2) + 1) {
        const newRow = current.row - 1
        const newColumn = current.column
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = UP
          return next
        }
      }
      break
  }
}

const isOnEdgeOfFaceSix = (graph, current, cubeSize) => {
  switch (current.facing) {
    case RIGHT:
      if (current.column === cubeSize * 4) {
        const newRow = (cubeSize * 3) - current.row + 1
        const newColumn = cubeSize * 3
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
    case LEFT:
      if (current.column === (cubeSize * 3) + 1) {
        const newRow = current.row
        const newColumn = current.column - 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
    case DOWN:
      if (current.row === cubeSize * 3) {
        const newRow = cubeSize + 1 + ((cubeSize * 4) - current.column)
        const newColumn = 1
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = RIGHT
          return next
        }
      }
      break
    case UP:
      if (current.row === (cubeSize * 2) + 1) {
        const newRow = (cubeSize * 4) - current.column + cubeSize + 1
        const newColumn = cubeSize * 3
        const next = graph[newRow - 1][newColumn - 1]
        if (next.base === WALL) {
          return current
        } else {
          next.facing = LEFT
          return next
        }
      }
      break
  }
}

const isWrapping = (graph, current) => {
  const cubeSize = graph.length / 3
  if (current.row >= 1 && current.row <= cubeSize) {
    return isOnEdgeOfFaceOne(graph, current, cubeSize)
  } else if (current.row >= cubeSize + 1 && current.row <= cubeSize * 2) {
    if (current.column >= 1 && current.column <= graph[current.row - 1].length / 4) {
      return isOnEdgeOfFaceTwo(graph, current, cubeSize)
    } else if (current.column >= (graph[current.row - 1].length / 4) + 1 && current.column <= (graph[current.row - 1].length / 4) * 2) {
      return isOnEdgeOfFaceThree(graph, current, cubeSize)
    } else if (current.column >= ((graph[current.row - 1].length / 4) * 2) + 1 && current.column <= (graph[current.row - 1].length / 4) * 3) {
      return isOnEdgeOfFaceFour(graph, current, cubeSize)
    }
  } else if (current.row >= (cubeSize * 2) + 1 && current.row <= cubeSize * 3) {
    if (current.column >= ((graph[current.row - 1].length / 4) * 2) + 1 && current.column <= (graph[current.row - 1].length / 4) * 3) {
      return isOnEdgeOfFaceFive(graph, current, cubeSize)
    } else if (current.column >= ((graph[current.row - 1].length / 4) * 3) + 1 && current.column <= graph[current.row - 1].length) {
      return isOnEdgeOfFaceSix(graph, current, cubeSize)
    }
  }
}
const getNextPart2 = (graph, current) => {
  const wrappedNext = isWrapping(graph, current)
  if (wrappedNext) {
    return wrappedNext
  }
  let next
  switch (current.facing) {
    case RIGHT:
      next = graph[current.row - 1][current.column]
      break
    case LEFT:
      next = graph[current.row - 1][current.column - 2]
      break
    case DOWN:
      next = graph[current.row][current.column - 1]
      break
    case UP:
      next = graph[current.row - 2][current.column - 1]
      break
  }
  next.facing = current.facing
  return next
}
const marchForwardPart2 = (graph, start, stepsCount) => {
  let current = start
  for (let i = 0; i < stepsCount; i++) {
    const next = getNextPart2(graph, current)
    if (!next) {
      return current
    }
    if (next && next.base === WALL) {
      return current
    } else {
      current = next
    }
  }
  return current
}
const followInstructionsPart2 = (start, graph, instructions) => {
  let current = start

  for (let i = 0; i < instructions.length; i++) {
    if (isNaN(instructions[i])) {
      current = performFacing(graph, current, instructions[i])
    } else {
      current = marchForwardPart2(graph, current, instructions[i])
    }
    // console.log(plotGraph(graph))
  }
  // console.log(plotGraph(graph))
  return current
}
const part2 = (rawInput) => {
  console.log('running part2');
  const parsedInput = parseInput(rawInput)
  const start = findStart(parsedInput.graph)
  const finalPosition = followInstructionsPart2(start, parsedInput.graph, parsedInput.instructions)
  return calculatePassword(finalPosition.row, finalPosition.column, finalPosition.facing)
}

const testInput = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 6032,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 5031,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
