import run from "aocrunner"

// import PriorityQueue from "../utils/PriorityQueue";
import PriorityQueue from "../utils/PriorityQueue.js";
export const parseInput = (rawInput: string) : string[][] => rawInput.split('\n').map(row => row.split(''))
export enum Direction {
  NORTH = 1,
  EAST =  2,
  SOUTH = 3,
  WEST =  4,
}

const DirectionOffsets = {
  [Direction.NORTH]: {yOffset: -1, xOffset: 0}, // NORTH
  [Direction.EAST]: {yOffset: 0, xOffset: 1}, //  EAST
  [Direction.SOUTH]: {yOffset: 1, xOffset: 0}, //  SOUTH
  [Direction.WEST]: {yOffset: 0, xOffset: -1}, // WEST
}

const drawGrid = (input: string[][], path: Node[]) => {
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

const left = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.WEST
    case Direction.WEST:
      return Direction.SOUTH
    case Direction.SOUTH:
      return Direction.EAST
    case Direction.EAST:
      return Direction.NORTH
  }
}
const right = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.EAST
    case Direction.EAST:
      return Direction.SOUTH
    case Direction.SOUTH:
      return Direction.WEST
    case Direction.WEST:
      return Direction.NORTH
  }
}

type Node = {
  x: number,
  y: number,
  direction: Direction,
  stepCount: number,
}

const findHeatLoss = (input: number[][]) => {
  const numberOfRows = input.length;
  const numberOfColumns = input[0].length;
  const visited: string[] = []

  const compareTwoStates = (a: State, b: State) => {
    let value = a.cost - b.cost
    if (value === 0 && a.node.direction === b.node.direction) {
      value =  b.node.stepCount - a.node.stepCount
    }
    if (value === 0) {
      value = b.node.y + b.node.x - a.node.y - a.node.x
      // value = a.node.y + a.node.x - b.node.y - b.node.x
    }
    return value
  }
  const nodeToString = (node: Node) => `${node.x}_${node.y}_${node.direction}_${node.stepCount}`
  const queue = new PriorityQueue<State>(compareTwoStates);
  queue.enqueue(new State({y: 0, x: 1, direction: Direction.EAST, stepCount: 1}, input[0][1], null));
  queue.enqueue(new State({y: 1, x: 0, direction: Direction.SOUTH, stepCount: 1}, input[1][0], null));
  while (!queue.isEmpty()) {
    const currentState = queue.dequeue();
    if (visited.includes(nodeToString(currentState.node))) {
      continue;
    }

    visited.push(nodeToString(currentState.node));
    if (currentState.node.y === numberOfRows - 1 && currentState.node.x === numberOfColumns - 1) {
      return {fullState: currentState, totalHeatLoss: currentState.cost}
    }
    currentState.addAllNextOptions(queue, input);
  }
  return {fullState: undefined, totalHeatLoss: -1}
}

class State {
  node: Node
  cost: number
  previous: State

  constructor(node: Node, cost: number, previous: State) {
    this.node = node
    this.cost = cost
    this.previous = previous
  }

  addNext(out: PriorityQueue<State>, direction: Direction, input: number[][]) {
    const nextY = this.node.y + DirectionOffsets[direction].yOffset;
    const nextX = this.node.x + DirectionOffsets[direction].xOffset;
    if (nextY >= 0 && nextY < input.length && nextX >= 0 && nextX < input[nextY].length) {
      const numberOfSteps = this.node.direction === direction ? this.node.stepCount + 1 : 0;
      const nextState = new State({ y: nextY, x: nextX, direction, stepCount: numberOfSteps}, this.cost + input[nextY][nextX], this);
      out.enqueue(nextState);
    }
  }

  addAllNextOptions(out: PriorityQueue<State>, input: number[][]) {
    if (this.node.stepCount < 2) {
      this.addNext(out, this.node.direction, input);
    }
    this.addNext(out, left(this.node.direction), input);
    this.addNext(out, right(this.node.direction), input);
  }
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const {totalHeatLoss} = findHeatLoss(input.map(row => row.map(heatLossString => Number.parseInt(heatLossString))))
  // const path = []
  // let currentState = fullState
  // do {
  //   path.push(currentState.node)
  //   currentState = currentState.previous
  // } while(!!currentState)
  // drawGrid(input, path)
  return totalHeatLoss
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `2413432311323
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
