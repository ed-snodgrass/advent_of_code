import PriorityQueue from "../utils/PriorityQueue"
// import PriorityQueue from "../utils/PriorityQueue.js"

export const parseInput = (rawInput: string): [number, number][] => {
  return rawInput.split("\n").map((line) => {
    const [a, b] = line.split(",").map(Number)
    return [a, b] as [number, number]
  })
}

export const createGrid = (height: number, width: number) => {
  const grid: string[][] = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      row.push('.')
    }
    grid.push(row)
  }
  return grid
}
const CORRUPTED = '#'

export const processBytes = (grid: string[][], bytes: [number, number][], numberOfBytes: number) => {
  bytes.slice(0, numberOfBytes).forEach(([x, y]) => {
    grid[y][x] = CORRUPTED
  })
  return grid
}

export const gridToString = (grid: string[][]) => {
  let output = ''
  for (let i = 0; i < grid.length; i++) {
    output += grid[i].join('') + '\n'
  }
  return output.trim()
}
export type Node = {
  x: number,
  y: number
  cost: number
}

export const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]
function findNextPossibleNodes(grid: string[][], current: Node):Node[] {
  const possibleNodes:Node[] = []
  DIRECTIONS.forEach(([directionX, directionY]) => {
    const [newX, newY] = [current.x + directionX, current.y + directionY]
    if (newX >= 0 && newY >= 0 && newX < grid.length && newY < grid[0].length && grid[newY][newX] !== CORRUPTED) {
      possibleNodes.push({x: newX, y: newY, cost: current.cost + 1})
    }
  })
  return possibleNodes
}

export const findBestPath = (grid: string[][], start: [number, number], end: [number, number]) => {
  const [startX, startY] = start
  const [endX, endY] = end

  function comparator(thisNode: Node, otherNode: Node) {
    return thisNode.cost - otherNode.cost
  }
  const visited: string[] = []
  const queue = new PriorityQueue<Node>(comparator)
  const firstNode = {x: startX, y: startY, cost: 0}

  queue.enqueue(firstNode)
  let current: Node
  while (!queue.isEmpty()) {
    current = queue.dequeue()!

    if (visited.includes(`${current.x}_${current.y}`)) {
      continue
    }
    if (current.x === endX && current.y === endY) {
      return current.cost
    }
    visited.push(`${current.x}_${current.y}`)
    const availableNodes = findNextPossibleNodes(grid, current)
    availableNodes.forEach(node => {
      queue.enqueue(node)
    })
  }

  return -1
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  let grid: string[][]
  let bestPathCost:number
  if (input.length === 25) {
    grid = createGrid(7, 7)
    grid = processBytes(grid, input, 12)
    bestPathCost = findBestPath(grid, [0, 0], [6, 6])
  } else {
    grid = createGrid(71, 71)
    grid = processBytes(grid, input, 1024)
    bestPathCost = findBestPath(grid, [0, 0], [70, 70])
  }
  return bestPathCost
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

export const exampleInputPart2 = exampleInputPart1
