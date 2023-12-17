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

export const cycle = (input: string[][]) => {
  input = tiltNorth(input)
  input = tiltWest(input)
  input = tiltSouth(input)
  input = tiltEast(input)

  return input
}

const numberOfCycles = 1000000000
export const part2 = (rawInput: string) => {
  let timeStart = Date.now()
  let input = parseInput(rawInput)
  for (let i = 0; i < numberOfCycles; i ++) {
    input = cycle(input)
    if (i % 1000000 === 0) {
      console.log(`iteration[${i/1000000}m] took ${Date.now() - timeStart} milliseconds`)
      timeStart = Date.now()
    }
  }
  return calculateNorthLoad(input)
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
