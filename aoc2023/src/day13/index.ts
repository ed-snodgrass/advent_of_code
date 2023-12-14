import run from "aocrunner"

export const parseInput = (rawInput: string) => {
  const rawPatterns = rawInput.split('\n\n')

  return rawPatterns.map(rawPattern => rawPattern.split('\n'))
}

export const flipGrid = (grid: string[][]) => {
  // console.log(grid.map(row => row.join('')).join('\n'));
  const flippedGrid: string[][] = []
  for (let xIndex = 0; xIndex < grid[0].length; xIndex++) {
    const newRow = []
    for (let yIndex = grid.length - 1; yIndex >= 0 ; yIndex--) {
      newRow.push(grid[yIndex][xIndex])
    }
    // console.log(newRow.join(''));
    flippedGrid.push(newRow)
  }
  return flippedGrid
}

export const makeGrid = (pattern: string[]) => {
  const grid: string[][] = []

  pattern.forEach((line: string, rowNum: number) => {
    grid[rowNum] = []
    line.split('').forEach((character, columnNumber) => {
      // const gridNode = {x: columnNumber, y: rowNum, v: character}
      grid[rowNum].push(character)
    })
  })
  return grid
}

export const findVerticalMirror = (pattern: string[]) => {
  const grid = makeGrid(pattern)
  const flippedGrid = flipGrid(grid)
  // console.log(flippedGrid.map(row => row.join('')).join('\n'));
  return findHorizontalMirror(flippedGrid.map(line => line.join('')))
}

export const findHorizontalMirror = (pattern: string[]) => {
  let mirrorIndexes = []
  // console.log(pattern.join('\n'));
  for (let i = 0; i < pattern.length - 1; i++) {
     if (pattern[i] === pattern[i + 1]) {
       mirrorIndexes.push(i)
     }
  }
  // console.log('mirrorIndexes: ', mirrorIndexes);
  let trueMirrorIndex = -1
  mirrorIndexes.forEach(mirrorIndex => {
    if (trueMirrorIndex < 0) {
      let badIndex = false
      let count = 1
      for (let i = mirrorIndex; i >= 0 && mirrorIndex + count < pattern.length && !badIndex; i--) {
        // console.log(`pattern[${i}] !== pattern[${mirrorIndex + count}] => ${pattern[i]} !== ${pattern[mirrorIndex + count]} => ${pattern[i] !== pattern[mirrorIndex + count]}`)
        if (pattern[i] !== pattern[mirrorIndex + count]) {
          badIndex = true
          break
        }
        count++
      }
      if(!badIndex) trueMirrorIndex = mirrorIndex
    }
  })
  // console.log(`trueMirrorIndex: ${trueMirrorIndex}`);
  return trueMirrorIndex
}

export const part1 = (rawInput: string) => {
  const patterns = parseInput(rawInput)

  return patterns.map(pattern => {
    const verticalMirrorIndex = findVerticalMirror(pattern)
    // console.log('verticalMirrorIndex', verticalMirrorIndex);
    if (verticalMirrorIndex >= 0) {
      return verticalMirrorIndex + 1
    } else {
      return (findHorizontalMirror(pattern) + 1) * 100
    }
  }).reduce((sum, value) => sum + value)
}
export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 405,
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
