import run from "aocrunner"
import {findNumberOfPointsWithinPolygon, shoelace} from "../utils/polygon";
// import {findNumberOfPointsWithinPolygon, shoelace} from "../utils/polygon.js";

type DigPlanItem = {
  direction: Direction
  digCount: number
  hexValue?: string
}

export function translateHex(s: string) {
  const digCount = parseInt(s.slice(1,6), 16);
  const direction = directionLookup(parseInt(s.slice(6, 7), 10))
  return {direction, digCount};
}

function directionLookup (directionNum: number) {
  switch (directionNum) {
    case 0:
      return Direction.RIGHT
    case 1:
      return Direction.DOWN
    case 2:
      return Direction.LEFT
    case 3:
      return Direction.UP
  }
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
export const parseInput2 = (rawInput: string): DigPlanItem[] => {
  return rawInput.split('\n').map(line => {
    const hexCode = line.split(' ')[2].replace('(', '').replace(')', '')
    return translateHex(hexCode)
  })
}

export enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}

export const mapExterior = (digPlan: DigPlanItem[]) => {
  let currentX = 1
  let currentY = 1
  const exteriorNodes = []
  digPlan.forEach(instruction => {
    // console.log(instruction);
    switch(instruction.direction) {
      case Direction.RIGHT:
        currentX += instruction.digCount
        break
      case Direction.DOWN:
        currentY += instruction.digCount
        break
      case Direction.LEFT:
        currentX -= instruction.digCount
        break
      case Direction.UP:
        currentY -= instruction.digCount
        break
    }
    exteriorNodes.push({x: currentX, y: currentY})
  })
  return exteriorNodes
}

export const countBoundaryItems = (edgeBoundaryNodes: {x: number, y: number}[]) => {
  const firstEdge = edgeBoundaryNodes[0]
  let runningTotal = firstEdge.x === 1 ? Math.abs(firstEdge.y - 1) : Math.abs(firstEdge.x - 1)
  for (let i = 0; i < edgeBoundaryNodes.length - 1; i ++) {
    const thisEdge = edgeBoundaryNodes[i]
    const nextEdge = edgeBoundaryNodes[i + 1]
    if (thisEdge.x === nextEdge.x) {
      runningTotal += Math.abs(thisEdge.y - nextEdge.y)
    } else {
      runningTotal += Math.abs(thisEdge.x - nextEdge.x)
    }
  }
  return runningTotal
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const exterior = mapExterior(input)
  const polygonArea = shoelace(exterior)
  const numberOfBoundaryItems = countBoundaryItems(exterior)
  const numberOfPoints = findNumberOfPointsWithinPolygon(numberOfBoundaryItems - 1, 0, polygonArea)
  return Math.floor(numberOfPoints) + numberOfBoundaryItems
}

export const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput)
  const exterior = mapExterior(input)
  const polygonArea = shoelace(exterior)
  const numberOfBoundaryItems = countBoundaryItems(exterior)
  const numberOfPoints = findNumberOfPointsWithinPolygon(numberOfBoundaryItems, 0, polygonArea)
  return Math.floor(numberOfPoints) + numberOfBoundaryItems
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
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
