import run from "aocrunner"
import * as fs from "fs";

type PathPosition = {
  x: number,
  y: number,
  value: string,
  vertex: number,
}

type Edge = {
  from: number,
  to: number,
}

export const parseInput = (rawInput: string) => {
  const grid = rawInput.split('\n').map((line, rowIndex) => {
    return line.split('').map((character, columnIndex) => {
      return {x: columnIndex, y: rowIndex, value: character, vertex: undefined}
    })
  })
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].vertex = (i * grid[i].length) + j
    }
  }
  return grid
}

export function createEdgesForGrid(grid: PathPosition[][], isPart2: boolean): Map<number, number[]> {
  const edges: Map<number, number[]> = new Map();
  const endVertex = isPart2 ? findStartVertex() : findEndVertex(grid)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const vertex = i * grid[i].length + j

      if (grid[i][j].value !== '#') {
        const options = []
        if (!isPart2 && ['<','>', '^', 'v'].includes(grid[i][j].value)) {
          switch (grid[i][j].value) {
            case '<':
              if (j > 0) {
                //check left
                // if (grid[i][j - 1].value !== '#') edges.push({from: vertex, to: vertex - 1})
                if (grid[i][j - 1].value !== '#') options.push(vertex - 1)
              }
              break
            case '>':
              if (j < grid[i].length - 1) {
                //check right
                // if (grid[i][j + 1].value !== '#') edges.push({from: vertex, to: vertex + 1})
                if (grid[i][j + 1].value !== '#') options.push(vertex + 1)
              }
              break
            case 'v':
              if (i < grid.length - 1) {
                // check down
                // if (grid[i + 1][j].value !== '#') edges.push({from: vertex, to: vertex + grid[i + 1].length})
                if (grid[i + 1][j].value !== '#') options.push(vertex + grid[i + 1].length)
              }
              break
            case '^':
              if (i > 0) {
                // check up
                // if (grid[i - 1][j].value !== '#') edges.push({from: vertex, to: vertex - grid[i - 1].length})
                if (grid[i - 1][j].value !== '#') options.push(vertex - grid[i - 1].length)
              }
              break
          }
        } else {
          if (i > 0) {
            // check up
            if (grid[i - 1][j].value !== '#') options.push(vertex - grid[i - 1].length)
          }
          if (i < grid.length - 1) {
            // check down
            if (grid[i + 1][j].value !== '#') options.push(vertex + grid[i + 1].length)
          }
          if (j > 0) {
            //check left
            if (grid[i][j - 1].value !== '#') options.push(vertex - 1)
          }
          if (j < grid[i].length - 1) {
            //check right
            if (grid[i][j + 1].value !== '#') options.push(vertex + 1)
          }
        }
        if (vertex !== endVertex) {
          edges.set(vertex, options)
        }
      }
    }
  }
  // console.log(edges)
  return edges;
}

export const findStartVertex = () => {
  return 1
}
export const findEndVertex = (grid: { x: number, y: number }[][]) => {
  console.log(`findEndVertex: ${((grid.length - 1) * grid[grid.length - 1].length) + (grid[grid.length - 1].length - 2)}`)
  return ((grid.length - 1) * grid[grid.length - 1].length) + (grid[grid.length - 1].length - 2)
}

const printPath = (grid, path) => {
  const startIndex = findStartVertex()
  const endVertex = findEndVertex(grid)
  const pathToPrint = []
  for (let i = 0; i < grid.length; i++) {
    const row= []
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].vertex === startIndex) {
        row.push('S')
      } else if (grid[i][j].vertex === endVertex) {
        row.push('E')
      } else if (path.includes(grid[i][j].vertex)) {
        row.push('O')
      } else {
        row.push(grid[i][j].value)
      }
    }
    pathToPrint.push(row)
  }
  console.log(pathToPrint.map(row => row.join('')).join('\n'))
}

export const checkPaths = (grid: PathPosition[][], isPart2: boolean = false) => {
  const endVertex = isPart2 ? findStartVertex() : findEndVertex(grid)
  const startVertex = isPart2 ? findEndVertex(grid) : findStartVertex()
  const edges = createEdgesForGrid(grid, isPart2)
  let paths = []
  let path = []
  const dfs = (edge: number) => {

    if (edge === endVertex) {
      // console.log(JSON.stringify(path))
      // console.log('here')
      // printPath(grid, path)
      paths.push([...path])
    } else {
      for (let neighbor of edges.get(edge)) {
        if (!path.includes(edge) && paths.length < 1000) {
          path.push(edge)
          // printPath(grid, path)
          dfs(neighbor)
        }

      }
    }
    path.pop()
  }
  dfs(startVertex)
  return Math.max(...paths.map(path => path.length))

}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return checkPaths(input)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return checkPaths(input, true)
}

export const exampleInput = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 94,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 154,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
