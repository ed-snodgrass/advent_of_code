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
export const flipGridBack = (pattern: string[]) => {
  const grid = makeGrid(pattern)
  return flipGrid(flipGrid(flipGrid(grid)))
}

export const makeGrid = (pattern: string[]) => {
  return pattern.map(patternLine => patternLine.split(''))
}

export const findVerticalMirror = (pattern: string[]) => {
  const grid = makeGrid(pattern)
  const flippedGrid = flipGrid(grid)
  // console.log(flippedGrid.map(row => row.join('')).join('\n'));
  return findHorizontalMirror(flippedGrid.map(line => line.join('')))
}

const hasSmudge = (line1: string, line2: string) => {
  if (!line1 || !line2) {
    return
  }
  let diffCount = 0
  const line1Array = line1.split('')
  const line2Array = line2.split('')
  for (let i = 0; i < line1.length; i++) {
    if (line1Array[i] !== line2Array[i]) {
      diffCount++
    }
  }
  return diffCount === 1
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

function getMirrorPosition(stringArray: string[]) {
  let mirrorIndex = -1;
  for (let reflectionIndex = 0; reflectionIndex < stringArray.length - 1 && mirrorIndex < 0; reflectionIndex++) {
    const line1 = stringArray[reflectionIndex];
    const line2 = stringArray[reflectionIndex + 1];
    let smudgeCount = hasSmudge(line1, line2) ? 1 : 0;

    if (line1 === line2 || hasSmudge(line1, line2)) {
      for (let comparisonIndex = 1; reflectionIndex + comparisonIndex < stringArray.length; comparisonIndex++) {
        const firstItemToCompare = stringArray[reflectionIndex - comparisonIndex];
        const secondItemToCompare = stringArray[reflectionIndex + 1 + comparisonIndex];
        if (
          firstItemToCompare === secondItemToCompare || (!firstItemToCompare && !!secondItemToCompare) ||
          (!!firstItemToCompare && !secondItemToCompare) || (hasSmudge(firstItemToCompare, secondItemToCompare) && smudgeCount < 1)
        ) {
          if (hasSmudge(firstItemToCompare, secondItemToCompare)) {
            smudgeCount++;
          }
          mirrorIndex = reflectionIndex;
        } else {
          mirrorIndex = -1;
          break;
        }
      }
    }
    if (smudgeCount !== 1) {
      mirrorIndex = -1;
    }
  }

  if (mirrorIndex >= 0) {
    return mirrorIndex + 1;
  }
  return 0;
}
function getSmudgeFreeMirrorIndex(pattern: string[]) {
  const horizontalLine = getMirrorPosition(pattern);
  if (horizontalLine) {
    return horizontalLine * 100;
  }
  const verticalLinePosition = getMirrorPosition(
    flipGrid(pattern.map(line => line.split(""))).map(line => line.join("")),
  );
  if (verticalLinePosition) {
    return verticalLinePosition;
  }

  return 0;
}
export const part2 = (rawInput: string) => {
  const patterns = parseInput(rawInput)
  const smudgeFreePatternMirrorResults = patterns.map(pattern => getSmudgeFreeMirrorIndex(pattern))

  return smudgeFreePatternMirrorResults.reduce((sum, value) => sum + value)
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
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
