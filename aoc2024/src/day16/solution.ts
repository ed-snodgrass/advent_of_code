import PriorityQueue from "../utils/PriorityQueue"
// import PriorityQueue from "../utils/PriorityQueue.js"

export const END = "E"
export const START = "S"
export const WALL = "#"
export const EMPTY = "."

export const TURN_COST = 1000
export const MOVE_COST = 1

export type Direction = [number, number]

export const EAST = ">"
export const SOUTH = "v"
export const WEST = "<"
export const NORTH = "^"

export const DIRECTIONS = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
}

export const findItem = (grid: string[][], item: string): [number, number] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return [x, y]
      }
    }
  }
  return [-1, -1] as [number, number]
}

export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split(""))
}

export type Node = {
  x: number
  y: number
  cost: number
  direction: string
}
function oppositeDirection(direction: string, direction2: string) {
  switch (direction) {
    case EAST:
      return direction2 === WEST
    case SOUTH:
      return direction2 === NORTH
    case WEST:
      return direction2 === EAST
    case NORTH:
      return direction2 === SOUTH
  }
  throw new Error(`Invalid direction: ${direction}`)
}

function findNextPossibleNodes(grid: string[][], current: Node): Node[] {
  const possibleNodes: Node[] = []

  for (const direction in DIRECTIONS ) {
    const tempCost = direction === current.direction ? current.cost + MOVE_COST : current.cost + TURN_COST + MOVE_COST
    const [directionX, directionY] = DIRECTIONS[direction as keyof typeof DIRECTIONS]
    const [newX, newY] = [current.x + directionX, current.y + directionY]
    if (newX < 0 || newY < 0 || newX >= grid.length || newY >= grid[0].length) continue
    if (grid[newY][newX] === WALL) continue
    if (oppositeDirection(direction, current.direction)) continue

    possibleNodes.push({ x: newX, y: newY, cost: tempCost, direction: direction as string })
  }
  return possibleNodes
}

export const findBestPath = (maze: string[][], start: [number, number], end: [number, number]) => {
  const [startX, startY] = start
  const [endX, endY] = end

  function comparator(thisNode: Node, otherNode: Node) {
    return thisNode.cost - otherNode.cost
  }

  const visited: string[] = []
  const queue = new PriorityQueue<Node>(comparator)
  const firstNode = { x: startX, y: startY, direction: EAST, cost: 0 }

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
    const availableNodes = findNextPossibleNodes(maze, current)
    availableNodes.forEach((node) => {
      queue.enqueue(node)
    })
  }

  return -1
}

export const part1 = (rawInput: string): number => {
  const maze = parseInput(rawInput)
  const start = findItem(maze, START)
  const end = findItem(maze, END)

  if (start[0] === -1 || start[1] === -1 || end[0] === -1 || end[1] === -1) {
    throw new Error("Invalid maze")
  }
  return findBestPath(maze, start, end)
}

const nodeKey = (node: Node) => `${node.x}_${node.y}_${node.direction}`

interface PathNode extends Node {
  path: Node[]
}

export const findAllBestPaths = (
  maze: string[][],
  startNode: Node,
  end: [number, number],
  bestScore: number
) => {
  function comparator(thisNode: Node, otherNode: Node) {
    return thisNode.cost - otherNode.cost
  }
  const [endX, endY] = end
  const bestPaths: Node[][] = []
  const visited = new Map<string, number>

  const firstNode = { ...startNode, path: [startNode] as Node[] }
  const queue = new PriorityQueue<PathNode>(comparator)
  queue.enqueue(firstNode)

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()!
    const {x,y, cost, path} = currentNode
    const currentKey = nodeKey(currentNode)

    if (cost > bestScore) continue
    if (visited.has(currentKey) && visited.get(currentKey)! < cost) continue

    visited.set(currentKey, cost)

    if (endX === x && endY === y && cost === bestScore) {
      bestPaths.push(path)
      continue
    }

    const neighbors = findNextPossibleNodes(maze, currentNode)
    for (const neighbor of neighbors) {
      const neighborKey = nodeKey(neighbor)
      if (visited.has(neighborKey)) continue
      if (neighbor.cost > bestScore) continue
      queue.enqueue({...neighbor, path: [...path, neighbor] as Node[]})
    }
  }

  return bestPaths
}

export const part2 = (rawInput: string): number => {
  const printOutput = false
  const maze = parseInput(rawInput)
  const [startX, startY] = findItem(maze, START)
  const startNode = {x: startX, y: startY, cost: 0, direction: EAST}
  const end = findItem(maze, END)
  const bestScore = findBestPath(maze, [startX, startY], end)
  const bestPaths = findAllBestPaths(maze, startNode, end, bestScore)

  const tilesOnABestPath = new Set<string>()
  bestPaths.forEach((path) => {
    path.forEach((node) => {
      tilesOnABestPath.add(`${node.x},${node.y}`)
    })
  })
  if (printOutput) {
    bestPaths.forEach((path) => {
      printMazePath(maze, path)
    })
    printMazeTiles(maze, tilesOnABestPath)
  }
  return tilesOnABestPath.size
}

export const printMazeTiles = (maze: string[][], tilesOnABestPath: Set<string>) => {
  let mazeString = ""
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (tilesOnABestPath.has(`${x},${y}`)) {
        mazeString += "O"
      } else {
        mazeString += maze[y][x]
      }
    }
    mazeString += "\n"
  }
  console.log(mazeString)
}
export const printMazePath = (maze: string[][], path: Node[]) => {
  let mazeString = ""
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const foundNode = path.find((node) => node.x === x && node.y === y)
      if (foundNode) {
        mazeString += foundNode.direction
      } else {
        mazeString += maze[y][x]
      }
    }
    mazeString += "\n"
  }
  console.log(mazeString)
}

export const exampleInputPart1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

export const exampleInputPart2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`
