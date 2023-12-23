import run from "aocrunner"
// import {findNumberOfPointsWithinPolygon, shoelace} from "../utils/polygon";
import {findNumberOfPointsWithinPolygon, shoelace} from "../utils/polygon.js";

type DigPlanItem = {
  direction: Direction
  digCount: number
  hexValue: string
}

export const gridToString = (grid: string[][]) => {
  let gridString = "";
  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    for (let xIndex = 0; xIndex < grid[yIndex].length; xIndex++) {
      gridString += grid[yIndex][xIndex];
    }
    gridString += "\n";
  }
  return gridString;
}

export const parseInput = (rawInput: string): DigPlanItem[] => {
  return rawInput.split('\n').map(line => {
    const inputParts = line.split(' ')
    return {
      direction: inputParts[0] as Direction,
      digCount: Number.parseInt(inputParts[1]),
      hexValue: inputParts[2].replace(/[()]/g, '')
    }
  })
}

export enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}

type Node = {
  x: number
  y: number
  direction: Direction
}

export const createInitialGrid = (digPlan: DigPlanItem[]) => {
  let rows = 1
  let columns = 1
  let currentX = 0
  let currentY = 0

  digPlan.forEach(instruction => {
    // console.log(instruction);
    switch(instruction.direction) {
      case Direction.RIGHT:
        if (columns < currentX + instruction.digCount) {
          columns += instruction.digCount
        }
        currentX += instruction.digCount
        break
      case Direction.DOWN:
        if (rows < currentY + instruction.digCount) {
          rows += instruction.digCount
        }
        currentY += instruction.digCount
        break
      case Direction.LEFT:
        currentX -= instruction.digCount
        break
      case Direction.UP:
        currentY -= instruction.digCount
        break
    }
  })
  return Array(rows).fill([]).map(() => Array(columns).fill('.'))
}

export const drawExterior = (digPlan: DigPlanItem[], exterior: string[][]) => {
  let currentX = 1
  let currentY = 1
  const drawnExterior = exterior.map(row => row.map(rowItem => rowItem))
  digPlan.forEach(instruction => {
    // console.log(instruction);
    switch(instruction.direction) {
      case Direction.RIGHT:
        for (let i = 0; i < instruction.digCount; i++) {
          drawnExterior[currentY - 1][currentX - 1 + i] = '#'
        }
        currentX += instruction.digCount
        break
      case Direction.DOWN:
        for (let i = 0; i < instruction.digCount; i++) {
          drawnExterior[currentY - 1 + i][currentX - 1] = '#'
        }
        currentY += instruction.digCount
        break
      case Direction.LEFT:
        for (let i = 0; i < instruction.digCount; i++) {
          drawnExterior[currentY - 1][currentX - 1 - i] = '#'
        }
        currentX -= instruction.digCount
        break
      case Direction.UP:
        for (let i = 0; i < instruction.digCount; i++) {
          drawnExterior[currentY - 1 - i][currentX - 1] = '#'
        }
        currentY -= instruction.digCount
        break
    }
  })
  console.log(drawnExterior.map(row => row.join('')).join('\n'));
  return drawnExterior.map(row => row.join('')).join('\n')
}
export const mapExterior = (digPlan: DigPlanItem[]) => {
  let currentX = 1
  let currentY = 1
  const exteriorNodes = []
  digPlan.forEach(instruction => {
    // console.log(instruction);
    switch(instruction.direction) {
      case Direction.RIGHT:
        for (let i = 0; i < instruction.digCount; i++) {
          exteriorNodes.push({x: currentX - 1 + i, y: currentY - 1})
        }
        currentX += instruction.digCount
        break
      case Direction.DOWN:
        for (let i = 0; i < instruction.digCount; i++) {
          exteriorNodes.push({x: currentX - 1, y: currentY - 1 + i})
        }
        currentY += instruction.digCount
        break
      case Direction.LEFT:
        for (let i = 0; i < instruction.digCount; i++) {
          exteriorNodes.push({x: currentX - 1 - i, y: currentY - 1})
        }
        currentX -= instruction.digCount
        break
      case Direction.UP:
        for (let i = 0; i < instruction.digCount; i++) {
          exteriorNodes.push({x: currentX - 1, y: currentY - 1 - i})
        }
        currentY -= instruction.digCount
        break
    }
  })
  return exteriorNodes
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const exterior = mapExterior(input)
  const polygonArea = shoelace(exterior)
  const numberOfPoints = findNumberOfPointsWithinPolygon(exterior.length - 1, 0, polygonArea)
  console.log(numberOfPoints)
  return Math.floor(numberOfPoints) + exterior.length
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 62,
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
