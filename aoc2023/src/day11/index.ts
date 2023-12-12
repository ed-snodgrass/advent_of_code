import run from "aocrunner"
import Grid from "../utils/Grid.js";
// import Grid from "../utils/Grid";

export type Galaxy = {
  number: number
  position: {
    x: number
    y: number
  }
  originalPosition?: {
    x: number
    y: number
  }
}

const findRowsToExpand = (linesGrid: string[][]) => {
  const rowsToExpand = []

  linesGrid.forEach((row, index) => {
    if (row.every(rowItem => rowItem === '.')){
      rowsToExpand.push(index)
    }
  })
  return rowsToExpand
}

const findColumnsToExpand = (linesGrid: string[][]) => {
  const columnsToExpand = []
  for (let i = 0; i < linesGrid[0].length; i++) {
    const column = linesGrid.map(line => line[i])
    if (column.every(columnItem => columnItem === '.')) {
      columnsToExpand.push(i)
    }
  }
  return columnsToExpand
}

export const parseInput = (rawInput: string, expansionCount: number = 1) => {
  const lines = rawInput.split('\n')
  let linesGrid = lines.map(line => line.split(''))

  return new Grid(linesGrid.map(line => line.join('')))
}

export const parseWithoutExpansion = (rawInput: string) => {
  const lines = rawInput.split('\n')
  let linesGrid = lines.map(line => line.split(''))
  return new Grid(linesGrid.map(line => line.join('')))
}

export const numberTheGalaxies = (grid: Grid) => {
  const galaxies = []
  let galaxyCount = 1
  for (let yIndex = 0; yIndex < grid.grid.length; yIndex++) {
    for (let xIndex = 0; xIndex < grid.grid[yIndex].length; xIndex++) {
      if (grid.grid[yIndex][xIndex].v === '#') {
        galaxies.push({number: galaxyCount, position: {x: xIndex, y: yIndex}})
        galaxyCount++
      }
    }
  }
  return galaxies
}

export const pairTheGalaxies = (galaxies: Galaxy[]) => {
  return galaxies.flatMap((galaxy, index) => {
    return galaxies.slice(index + 1).map(otherGalaxy => [galaxy.number, otherGalaxy.number])
  })
}

export const findShortestDistance = (galaxy1: Galaxy, galaxy2: Galaxy) => {
  const absoluteValueOfXDiff = Math.abs(galaxy1.position.x - galaxy2.position.x)
  const absoluteValueOfYDiff = Math.abs(galaxy1.position.y - galaxy2.position.y)
  return absoluteValueOfXDiff + absoluteValueOfYDiff
}

const expandGalaxies = (rowsToExpand: number[], columnsToExpand: number[], initialGalaxies: Galaxy[], expansionCount: number) => {
  const expandedGalaxies = initialGalaxies.map(galaxy => {
    return {
      ...galaxy,
      originalPosition: {...galaxy.position}
    }
  })
  rowsToExpand.forEach(row => {
    expandedGalaxies.forEach(initialGalaxy => {
      if (initialGalaxy.originalPosition.y > row) {
        // console.log(`going right cuz row ${row}:`, initialGalaxy);
        initialGalaxy.position.y += expansionCount > 1 ? expansionCount - 1 : expansionCount
      }
    })
  })
  columnsToExpand.forEach(column => {
    expandedGalaxies.forEach(initialGalaxy => {
      if (initialGalaxy.originalPosition.x > column) {
        // console.log(`going right cuz column ${column}:`, initialGalaxy);
        initialGalaxy.position.x += expansionCount > 1 ? expansionCount - 1 : expansionCount
      }
    })
  })
  return expandedGalaxies
}

export const findAllTheLengths = (rawInput: string, expansionCount: number = 1) => {
  const lines = rawInput.split('\n')
  let linesGrid = lines.map(line => line.split(''))
  const initialGrid = parseWithoutExpansion(rawInput)
  const initialGalaxies = numberTheGalaxies(initialGrid)
  const rowsToExpand = findRowsToExpand(linesGrid)
  const columnsToExpand = findColumnsToExpand(linesGrid)
  const galaxies = expandGalaxies(rowsToExpand, columnsToExpand, initialGalaxies, expansionCount)
  const galaxyPairs = pairTheGalaxies(galaxies)
  return galaxyPairs.map(galaxyPair => findShortestDistance(
    galaxies.find(galaxy => galaxy.number === galaxyPair[0]),
    galaxies.find(galaxy => galaxy.number === galaxyPair[1])
  )).reduce((acc, value) => acc + value, 0)
}

export const part1 = (rawInput: string) => {
  return findAllTheLengths(rawInput, 1)
}

export const part2 = (rawInput: string) => {
  return findAllTheLengths(rawInput, 1000000)
}

export const exampleInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 374,
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
