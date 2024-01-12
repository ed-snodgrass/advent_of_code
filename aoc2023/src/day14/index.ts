import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split(''))

export const tiltNorth = (input: string[][]) => {
  let movedRocks = 0;
  do {
    movedRocks = 0;
    for (let i = 1; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === 'O' && (input[i - 1][j] !== 'O' && input[i - 1][j] !== '#')) {
          input[i - 1][j] = 'O'
          input[i][j] = '.'
          movedRocks++
        }
      }
    }
  } while (movedRocks > 0)

  return input
}
export const tiltWest = (input: string[][]) => {
  let movedRocks = 0;
  do {
    movedRocks = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 1; j < input[i].length; j++) {
        if (input[i][j] === 'O' && (input[i][j - 1] !== 'O' && input[i][j - 1] !== '#')) {
          input[i][j - 1] = 'O'
          input[i][j] = '.'
          movedRocks++
        }
      }
    }
  } while (movedRocks > 0)
  return input
}
export const tiltSouth = (input: string[][]) => {
  let movedRocks = 0;
  do {
    movedRocks = 0;
    for (let i = input.length - 2; i >= 0; i--) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === 'O' && (input[i + 1][j] !== 'O' && input[i + 1][j] !== '#')) {
          input[i + 1][j] = 'O'
          input[i][j] = '.'
          movedRocks++
        }
      }
    }
  } while (movedRocks > 0)

  return input
}

export const tiltEast = (input: string[][]) => {
  let movedRocks = 0;
  do {
    movedRocks = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (j + 1 < input[i].length && input[i][j] === 'O' && (input[i][j + 1] !== 'O' && input[i][j + 1] !== '#')) {
          input[i][j + 1] = 'O'
          input[i][j] = '.'
          movedRocks++
        }
      }
    }
  } while (movedRocks > 0)

  return input
}

export const calculateNorthLoad = (input: string[][]) => {
  return input.reduce((load, value, currentIndex) => {
    const loadForLine = value.reduce((lineSum, lineItem) => {
      if (lineItem === 'O') {
        const rowsFromSouth = input.length - currentIndex
        lineSum += rowsFromSouth
      }
      return lineSum
    }, 0)
    return load + loadForLine
  }, 0)
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const tiltedNorth = tiltNorth(input)
  // console.log(tiltedNorth);
  return calculateNorthLoad(tiltedNorth)
}

export const tiltCycle = (input: string[][]) => {
  input = tiltNorth(input)
  input = tiltWest(input)
  input = tiltSouth(input)
  input = tiltEast(input)

  return input
}

const gridToString = (grid: string[][]) => {
  return grid.map(gridRow => gridRow.join('')).join('\n')
}

export const part2 = (rawInput: string) => {
  let grid = parseInput(rawInput)
  let grids = []
  const cache: string[] = [gridToString(grid)]
  let tiltCycleCount = 0
  let first: number
  while (!first) {
    tiltCycleCount++
    grid = tiltCycle(grid)
    const inputString = gridToString(grid)
    // console.log(`After ${tiltCycleCount} cycles: \n${inputString}`)
    if (cache.includes(inputString)) {
      first = cache.indexOf(inputString)
      break
    } else {
      grids.push(grid)
      cache.push(inputString)
    }
  }
  first = cache.indexOf(gridToString(grid))
  console.log(`cycleCount: ${tiltCycleCount}`)
  console.log(`first: ${first}`)
  const indexOfFinalGrid = (1000000000 - first) % (tiltCycleCount - first) + first
  console.log(`indexOfFinalGrid: ${indexOfFinalGrid}`)
  return calculateNorthLoad(parseInput(cache[indexOfFinalGrid]))
}

export const exampleInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 136,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
