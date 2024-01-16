import run from "aocrunner"

type PathPosition = {
  x: number,
  y: number,
  value: string,
  vertex: number,
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
  // const endVertex = isPart2 ? findStartVertex() : findEndVertex(grid)
  const endVertex = findEndVertex(grid)
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
export const findEnd = (grid: { x: number, y: number }[][]) => {
  return {x: grid[grid.length - 1].length - 2, y: grid.length - 1}
}

export const checkPaths = (grid: PathPosition[][], isPart2: boolean = false) => {
  const endVertex = findEndVertex(grid)
  const startVertex = findStartVertex()
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

const isSame = (x: number, y: number, coordinate: {x: number, y: number}) => {
  return coordinate.y === y && coordinate.x === x
}
export function findForks(grid: PathPosition[][]): {x: number, y: number, vertex: number, connections: number[]}[] {
  const start = {x: 1, y: 0}
  const end = {x: grid[grid.length - 1].length -2, y: grid.length - 1}
  const forks = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].value !== '#') {
        const connections = []
        if (i > 0) {
          // check up
          if (grid[i - 1][j].value !== '#') connections.push({x: j, y: i - 1})
        }
        if (i < grid.length - 1) {
          // check down
          if (grid[i + 1][j].value !== '#') connections.push({x: j, y: i + 1})
        }
        if (j > 0) {
          //check left
          if (grid[i][j - 1].value !== '#') connections.push({x: j - 1, y: i})
        }
        if (j < grid[i].length - 1) {
          //check right
          if (grid[i][j + 1].value !== '#') connections.push({x: j + 1, y: i})
        }
        if (connections.length >= 3) { //>= 3 because directed, so we know we're not going backwards, but there's always one other option, so there's always 2
          forks.push({x: j, y: i})
        }
      }
    }
  }
  return [start, end, ...forks]
}

export const findEdges = (grid: PathPosition[][]) => {
  const forks: {x: number, y: number}[] = [...findForks(grid)]
  const edges = {}
  forks.forEach((fork) => {
    edges[`${fork.x}_${fork.y}`] = []

    const visited: Set<string> = new Set()
    const queue = [{...fork, count: 0}]
    do {
      const {x, y, count} = queue.pop()
      // if not the first step and is another fork
      if (count > 0 && !(fork.x ===x && fork.y === y) && forks.find(anotherFork => isSame(x, y, anotherFork))) {
        edges[`${fork.x}_${fork.y}`].push({x, y, count})
        continue
      }
      const connections = []
      if (y > 0) {
        // check up
        if (grid[y - 1][x].value !== '#') connections.push({x: x, y: y - 1})
      }
      if (y < grid.length - 1) {
        // check down
        if (grid[y + 1][x].value !== '#') connections.push({x: x, y: y + 1})
      }
      if (x > 0) {
        //check left
        if (grid[y][x - 1].value !== '#') connections.push({x: x - 1, y: y})
      }
      if (x < grid[y].length - 1) {
        //check right
        if (grid[y][x + 1].value !== '#') connections.push({x: x + 1, y: y})
      }
      connections.forEach(connection => {
        // const isInVisited = !!visited.find(visitedItem => isSame(connection.x, connection.y, visitedItem))
        if (!visited.has(`${connection.x}_${connection.y}`)) {
          queue.push({...connection, count: count + 1})
          visited.add(`${connection.x}_${connection.y}`)
        }
      })
    } while (queue.length)
  })
  return edges
}

export const findPath = (edges: Record<string, {x: number, y: number, count: number}[]>, end: {x: number, y: number}) => {
  const visited: Set<string> = new Set()

  const dfs = (edgeKey: string) => {
    if (edgeKey === `${end.x}_${end.y}`) {
      return 0
    }
    visited.add(edgeKey)
    let maxValue = -Infinity
    const connections = edges[edgeKey]
    connections.forEach(connection => {
      if (!visited.has(`${connection.x}_${connection.y}`)) {
        maxValue = Math.max(maxValue, dfs(`${connection.x}_${connection.y}`) + connection.count)
      }
    })

    // @ts-ignore
    delete visited.delete(edgeKey)

    return maxValue
  }
  return dfs('1_0')
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return checkPaths(input)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const edges = findEdges(input)
  const end = findEnd(input)
  return findPath(edges, end)
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
