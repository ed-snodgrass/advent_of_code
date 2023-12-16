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

  return input.map(inputLine => inputLine.join('')).join('\n')
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
  return calculateNorthLoad(parseInput(tiltedNorth))
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
