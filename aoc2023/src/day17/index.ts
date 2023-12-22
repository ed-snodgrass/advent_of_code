import run from "aocrunner"
import PriorityQueue from "../utils/PriorityQueue";
// import PriorityQueue from "../utils/PriorityQueue.js";

export const parseInput = (rawInput: string): string[][] => rawInput.split('\n').map(row => row.split(''))
export const parseToNumbers = (input: string[][]) => input.map(row => row.map(heatLoss => Number.parseInt(heatLoss)))

export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

const DirectionOffsets = [
  {yOffset: -1, xOffset: 0}, // NORTH
  {yOffset: 0, xOffset: 1}, //  EAST
  {yOffset: 1, xOffset: 0}, //  SOUTH
  {yOffset: 0, xOffset: -1}, // WEST
]

type Node = {
  x: number
  y: number
  heatLoss: number
  direction: Direction
  stepCount: number
  // previous: Node | null
}

const getNextNode = (input: number[][], node: Node, nextDirection: Direction) => {
  const directionOffset = DirectionOffsets[nextDirection]
  const nextX = node.x + directionOffset.xOffset
  const nextY = node.y + directionOffset.yOffset
  if (nextY >= 0 && nextY < input.length && nextX >= 0 && nextX < input[nextY].length) {
    return {
      x: nextX,
      y: nextY,
      direction: nextDirection,
      stepCount: node.direction === nextDirection ? node.stepCount + 1 : 0,
      heatLoss: node.heatLoss + input[nextY][nextX],
      // previous: node,
    }
  }
}

const left = (input: number[][], node: Node) => {
  let nextDirection = node.direction
  switch (node.direction) {
    case Direction.NORTH:
      nextDirection = Direction.WEST
      break
    case Direction.WEST:
      nextDirection = Direction.SOUTH
      break
    case Direction.SOUTH:
      nextDirection = Direction.EAST
      break
    case Direction.EAST:
      nextDirection = Direction.NORTH
      break
  }
  return getNextNode(input, node, nextDirection)
}
const right = (input: number[][], node: Node) => {
  let nextDirection = node.direction
  switch (node.direction) {
    case Direction.NORTH:
      nextDirection = Direction.EAST
      break
    case Direction.EAST:
      nextDirection = Direction.SOUTH
      break
    case Direction.SOUTH:
      nextDirection = Direction.WEST
      break
    case Direction.WEST:
      nextDirection = Direction.NORTH
      break
  }
  return getNextNode(input, node, nextDirection)
}
export const findNextPossibleNodes = (input: number[][], node: Node) => {
  const possibleNodes = []
  if (node.stepCount < 2) {
    const straight = getNextNode(input, node, node.direction)
    if (straight) possibleNodes.push(straight)
  }

  const leftDirection = left(input, node)
  if (leftDirection) possibleNodes.push(leftDirection)

  const rightDirection = right(input, node)
  if (rightDirection) possibleNodes.push(rightDirection)

  return possibleNodes
}

const getVisitedKey = (node: Node) => `${node.x}_${node.y}_${node.direction}_${node.stepCount}`

const traverse = (input: number[][]) => {
  const rowEnd = input.length - 1
  const columnEnd = input[0].length - 1
  const visited: string[] = []
  function comparator(thisNode: Node, otherNode: Node) {
    let value = thisNode.heatLoss - otherNode.heatLoss
    if (value === 0 && thisNode.direction === otherNode.direction) value = thisNode.stepCount - otherNode.stepCount
    if (value === 0) value = otherNode.y + otherNode.x - thisNode.y - thisNode.x
    return value
  }

  const queue = new PriorityQueue<Node>(comparator)

  const firstNode = {x: 0, y: 0, heatLoss: 0, stepCount: 0, direction: Direction.EAST}
  // const firstNode = {x: 0, y: 0, heatLoss: 0, stepCount: 0, direction: Direction.EAST, previous: null}
  queue.enqueue(firstNode)
  while(!queue.isEmpty()) {
    const current = queue.dequeue()
    if (visited.includes(getVisitedKey(current))) {
      continue
    }
    visited.push(getVisitedKey(current))
    if (current.x === columnEnd && current.y === rowEnd) {
      return {fullState: current, totalHeatLoss: current.heatLoss}
    }
    const availableNodes = findNextPossibleNodes(input, current)
    availableNodes.forEach(node => {
      // if (!visited.includes(getVisitedKey(node))) {
      //   queue.enqueue(node)
      //   visited.push(getVisitedKey(node))
      // }
      queue.enqueue(node)
    })
  }
  return {fullState: undefined, totalHeatLoss: -1}
}

export const part1 = (rawInput: string) => {
  const input = parseToNumbers(parseInput(rawInput))
  const {fullState, totalHeatLoss} = traverse(input)
  console.log(totalHeatLoss);
  return totalHeatLoss
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput =
  `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 102,
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

const drawGrid = (input: number[][], path: Node[]) => {
  const grid = input.map((row, rowIndex) => {
    return row.map((heatLoss, columnIndex) => {
      const pathItem = path.find(item => item.x === columnIndex && item.y === rowIndex)
      if (pathItem) {
        switch (pathItem.direction) {
          case Direction.SOUTH:
            return 'v'
          case Direction.WEST:
            return '<'
          case Direction.EAST:
            return '>'
          case Direction.NORTH:
            return '^'
        }
      }
      return heatLoss
    }).join('')
  }).join('\n')
  console.log(grid);
}
