import run from "aocrunner"
import Grid, {GridNode} from "../utils/Grid.js";
// import Grid, {GridNode} from "../utils/Grid";


export const verticalConnector = '|'
export const horizontalConnector = '-'
export const northEastConnector = 'L'
export const northWestConnector = 'J'
export const southWestConnector = '7'
export const southEastConnector = 'F'
export const ground = '.'
export const startingPosition = 'S'

export const northOptions = [verticalConnector, southEastConnector, southWestConnector] // y - 1
export const southOptions = [verticalConnector, northEastConnector, northWestConnector] // y + 1
export const westOptions = [horizontalConnector, northEastConnector, southEastConnector] // x - 1
export const eastOptions = [horizontalConnector, northWestConnector, southWestConnector] // x + 1

export const parseInput = (rawInput: string) => {
  return new Grid(rawInput.split('\n'), startingPosition)
}

export const findStartingPoint = (grid: Grid) => {
  return grid.start
}
export const determineStartingPoint = (grid: Grid) => {
  let previousNode: DirectionNode = {x: Infinity, y: Infinity, v: '', stepsFromStart: 0, hasVisited: true, previousDirection: ''}
  const openings = findViablePathsFromNode(grid, grid.start, previousNode, 0, '')

  const openingsValues = openings.map(opening => opening.v)
  if (openings[0].v === openings[1].v) {
    if (openings[0].v === horizontalConnector) {
      return horizontalConnector
    }
    if (openings[0].v === verticalConnector) {
      return verticalConnector
    }
  }
  if (openingsValues.includes(horizontalConnector) && openingsValues.includes(verticalConnector)) {
    const horizontalOpening = openings.find(opening => opening.v === horizontalConnector)
    const verticalOpening = openings.find(opening => opening.v === verticalConnector)

    if (verticalOpening.previousDirection === 'north' && horizontalOpening.previousDirection === 'west') {
      return 'J'
    }
    if (verticalOpening.previousDirection === 'north' && horizontalOpening.previousDirection === 'east') {
      return 'L'
    }
    if (horizontalOpening.previousDirection === 'east' && verticalOpening.previousDirection === 'south') {
      return 'F'
    }
    if (horizontalOpening.previousDirection === 'west' && verticalOpening.previousDirection === 'south') {
      return '7'
    }
  }
  if (openingsValues.includes(northEastConnector) && openingsValues.includes(verticalConnector)) {
    const verticalOpening = openings.find(opening => opening.v === verticalConnector)
    if (verticalOpening.previousDirection === 'south') {
      return verticalConnector
    }
  }
  if (openingsValues.includes(southWestConnector) && openingsValues.includes(verticalConnector)) {
    const verticalOpening = openings.find(opening => opening.v === verticalConnector)
    if (verticalOpening.previousDirection === 'south') {
      return verticalConnector
    }
  }
  if (openingsValues.includes(northWestConnector) && openingsValues.includes(verticalConnector)) {
    const verticalOpening = openings.find(opening => opening.v === verticalConnector)
    if (verticalOpening.previousDirection === 'south') {
      return southEastConnector
    }
  }
}

interface DirectionNode extends GridNode {
  stepsFromStart: number
  previousNode?: DirectionNode
  previousDirection: string
}

export const findViablePathsFromNode = (grid: Grid, node: GridNode, previousNode: DirectionNode, stepsFromStart: number, previousDirection: string): DirectionNode[] => {
  grid.visit(node.x, node.y)
  const viableNextOptions : DirectionNode[] = []
  const startY = node.y
  const startX = node.x
  const north = startY > 0 ? grid.grid[startY - 1][startX] : undefined
  const south =  startY < grid.grid.length - 1 ? grid.grid[startY + 1][startX] : undefined
  const east = startX < grid.grid[0].length - 1 ? grid.grid[startY][startX + 1] : undefined
  const west = startX > 0 ? grid.grid[startY][startX - 1] : undefined

  const canGoNorth = !!north && northOptions.includes(north.v)
  const canGoSouth = !!south && southOptions.includes(south.v)
  const canGoEast = !!east && eastOptions.includes(east.v)
  const canGoWest = !!west && westOptions.includes(west.v)

  if (canGoNorth) {
    const nextNode = grid.getNode(startX, startY - 1)
    if (previousDirection !== 'south' && (southOptions.includes(node.v) || node.v === 'S')) {
      viableNextOptions.push({...nextNode, previousDirection: 'north', stepsFromStart: stepsFromStart + 1})
    }
  }
  if (canGoEast) {
    const nextNode = grid.getNode(startX + 1, startY)
    if (previousDirection !== 'west' && (westOptions.includes(node.v)|| node.v === 'S')) {
      viableNextOptions.push({...nextNode, previousDirection: 'east', stepsFromStart: stepsFromStart + 1})
    }
  }
  if (canGoSouth) {
    const nextNode = grid.getNode(startX, startY + 1)
    if (previousDirection !== 'north' && (northOptions.includes(node.v) || node.v === 'S')) {
      viableNextOptions.push({...nextNode, previousDirection: 'south', stepsFromStart: stepsFromStart + 1})
    }
  }
  if (canGoWest) {
    const nextNode = grid.getNode(startX - 1, startY)
    if (previousDirection !== 'east' && (eastOptions.includes(node.v)|| node.v === 'S')) {
      viableNextOptions.push({...nextNode, previousDirection: 'west', stepsFromStart: stepsFromStart + 1})
    }
  }
  return viableNextOptions
}

export const findFullLoop = (grid: Grid) => {
  const path = []
  let previousNode: DirectionNode = {x: Infinity, y: Infinity, v: '', stepsFromStart: 0, hasVisited: true, previousDirection: ''}
  path.push(grid.start)
  let initialOptions =  findViablePathsFromNode(grid, grid.start, previousNode, 0, '')
  previousNode = {...grid.start, previousDirection: '', stepsFromStart: 1}
  let nextStop = initialOptions[0]
  path.push(nextStop)
  let isStartingPosition = nextStop.x === grid.start.x && nextStop.y === grid.start.y
  while (!isStartingPosition) {
      const tempNextStop = {...nextStop}
      nextStop = findViablePathsFromNode(grid, nextStop, previousNode, previousNode.stepsFromStart, tempNextStop.previousDirection)[0];
      path.push(nextStop)
      isStartingPosition = nextStop.x === grid.start.x && nextStop.y === grid.start.y
      previousNode = tempNextStop
  }
  return path
}

export const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)

  const startingPointConnector = determineStartingPoint(grid)
  grid.replaceStart(startingPointConnector)
  const fullLoop = findFullLoop(grid)
  return (fullLoop.length -1) / 2
}

export const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)

  const startingPointConnector = determineStartingPoint(grid)
  grid.replaceStart(startingPointConnector)
  const fullLoop = findFullLoop(grid)
  console.log(fullLoop);
  return
}

export const exampleInput = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`
export const exampleInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 4,
       },
      {
        input: exampleInput2,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 1,
      },
      {
        input: `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
      {
        input: `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
