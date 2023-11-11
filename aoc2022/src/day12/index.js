import run from "aocrunner"
import Graph from "../Graph.js";
import Queue from "../Queue.js";

const END = 'E'
const START = 'S'

export const findStart = (grid) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      if (grid[rowIndex][columnIndex] === START.charCodeAt(0)) {
        return {x: columnIndex, y: rowIndex, v: START.charCodeAt(0)}
      }
    }
  }
}
export const findStarts = (grid) => {
  const starts = []
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      if (grid[rowIndex][columnIndex] === 'a'.charCodeAt(0)) {
        // it should also have a 'b' connected
        let possibleNode = false
        if (!possibleNode && canMoveTo(grid, columnIndex, rowIndex, columnIndex - 1, rowIndex)) {
          possibleNode = grid[rowIndex][columnIndex - 1] === 'b'.charCodeAt(0)
        }
        if (!possibleNode && canMoveTo(grid, columnIndex, rowIndex, columnIndex, rowIndex - 1)) {
          possibleNode = grid[rowIndex - 1][columnIndex] === 'b'.charCodeAt(0)
        }
        if (!possibleNode && canMoveTo(grid, columnIndex, rowIndex, columnIndex, rowIndex + 1)) {
          possibleNode = grid[rowIndex + 1][columnIndex] === 'b'.charCodeAt(0)
        }
        if (!possibleNode && canMoveTo(grid, columnIndex, rowIndex, columnIndex + 1, rowIndex)) {
          possibleNode = grid[rowIndex][columnIndex + 1] === 'b'.charCodeAt(0)
        }
        if (possibleNode) {
          starts.push({x: columnIndex, y: rowIndex, v: 'a'.charCodeAt(0)})
        }
      }
    }
  }
  return starts
}

export const findEnd = (grid) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      if (grid[rowIndex][columnIndex] === END.charCodeAt(0)) {
        return {x: columnIndex, y: rowIndex, v: END.charCodeAt(0)}
      }
    }
  }
}

const valueAtPosition = (grid, x, y) => grid[y][x] === START.charCodeAt(0) ? 'a'.charCodeAt(0) : grid[y][x]

const isOutOfGrid = (grid, y, nextX, nextY) => {
  return nextY < 0 || nextX < 0 || nextX >= grid[y].length || nextY >= grid.length
}

const node = (x, y, v) => {
  return {x, y, v}
}


const canMoveTo = (grid, x, y, nextX, nextY) => {
  if (isOutOfGrid(grid, y, nextX, nextY)) {
    return false
  }
  const next = valueAtPosition(grid, nextX, nextY)
  const current = valueAtPosition(grid, x, y)
  if (next === END.charCodeAt(0) && current !== 'z'.charCodeAt(0)) {
    return false
  }
  if (current === 'z'.charCodeAt(0) && next === END.charCodeAt(0)) {
    return true
  }
  const diff = next - current
  return diff <= 0 || diff === 1
}

export const findEdgeNodes = (grid, x, y) => {
  const nodeChildren = []
  if (canMoveTo(grid, x, y, x - 1, y)) {
    nodeChildren.push(node(x - 1, y, grid[y][x - 1]))
  }
  if (canMoveTo(grid, x, y, x, y - 1)) {
    nodeChildren.push(node(x, y - 1, grid[y - 1][x]))
  }
  if (canMoveTo(grid, x, y, x, y + 1)) {
    nodeChildren.push(node(x, y + 1, grid[y + 1][x]))
  }
  if (canMoveTo(grid, x, y, x + 1, y)) {
    nodeChildren.push(node(x + 1, y, grid[y][x + 1]))
  }

  return nodeChildren
}

export function buildGrid(input) {
  const grid = []
  const linesOfInput = input.split('\n')

  linesOfInput.forEach((line, rowNum) => {
    grid[rowNum] = []
    line.split('').forEach((character) => {
      grid[rowNum].push(character.charCodeAt(0))
    })
  })
  return grid
}

export function buildGraph(grid) {
  const graph = new Graph(grid.length * grid[0].length)

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      const vertex = node(columnIndex, rowIndex, grid[rowIndex][columnIndex])
      graph.addNode(vertex)
      const edgeNodes = findEdgeNodes(grid, columnIndex, rowIndex)
      edgeNodes.forEach(edgeNode => {
        if (vertex.v === START.charCodeAt(0)) {
          graph.addEdge(vertex, edgeNode, edgeNode.v - 'a'.charCodeAt(0))
        } else if (edgeNode.v === END.charCodeAt(0)) {
          if (vertex.v === 'z'.charCodeAt(0)) {
            graph.addEdge(vertex, edgeNode, 1)
          } else {
            throw new Error('unsupported edge')
          }
        } else {
          if (vertex.v !== END.charCodeAt(0) && edgeNode.v - vertex.v <= 1) {
            graph.addEdge(vertex, edgeNode, edgeNode.v - vertex.v)
          }
        }
      })
    }
  }

  return graph
}

const bfs = (graph, start, end) => {
  const queue = new Queue()
  const explored = []
  queue.enqueue({label: start})
  explored.push({label: start})
  let keepOn = true
  while (!queue.isEmpty() && keepOn) {
    const value = queue.dequeue()
    if (value.label === end) {
      queue.clear()
    } else {

      graph.adjacencyList.get(value.label).forEach(edge => {
        if (!explored.find(someNode => someNode.label === edge.node) && keepOn) {
          explored.push({label: edge.node, parent: value.label})
          if (edge.node === end) {
            keepOn = false
          } else {
            queue.enqueue({label: edge.node, parent: value.label})
          }
        }
      })
    }
  }
  const shortestPath = []
  for (let i = explored.length - 1; i >= 0;) {
    shortestPath.push(explored[i])
    i = explored.findIndex(someNode => someNode.label === explored[i].parent)
  }
  return shortestPath.length - 1
}

export function part1(input) {
  const grid = buildGrid(input)
  const graph = buildGraph(grid)
  const startNode = findStart(grid)
  const end = findEnd(grid)
  return bfs(graph, JSON.stringify(startNode), JSON.stringify(end))
}

export function part2(input) {
    // TODO sooooo slow
  const grid = buildGrid(input)
  const graph = buildGraph(grid)
  const end = findEnd(grid)
  const starts = findStarts(grid)

  let shortestPathLength = Number.MAX_SAFE_INTEGER

  starts.forEach(startNode => {
    const shortestPath = bfs(graph, JSON.stringify(startNode), JSON.stringify(end))
    if (shortestPath < shortestPathLength) {
      shortestPathLength = shortestPath
    }
  })
  return shortestPathLength
}

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
