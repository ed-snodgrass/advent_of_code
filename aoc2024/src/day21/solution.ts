export const numericKeypad = `789
456
123
 0A`
  .split("\n")
  .map((line) => line.split(""))

export const directionalKeypad = ` ^A
<v>`
  .split("\n")
  .map((line) => line.split(""))

const findNumericKeypadLocations = () => {
  const buttonMap: Record<string, [number, number]> = {}
  numericKeypad.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value !== " ") buttonMap[value] = [columnIndex, rowIndex]
    })
  })
  return buttonMap
}
const findDirectionalKeypadLocations = () => {
  const buttonMap: Record<string, [number, number]> = {}
  directionalKeypad.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value !== " ") buttonMap[value] = [columnIndex, rowIndex]
    })
  })
  return buttonMap
}
const numericKeypadLocations = findNumericKeypadLocations()
const directionalKeypadLocations = findDirectionalKeypadLocations()

export const findShortestPathsOnNumericKeypad = (code: string): string[] => {
  const buttonPresses = code.split("")
  const buttonLocations = buttonPresses.map((button) => numericKeypadLocations[button])
  const startingPoint = numericKeypadLocations["A"]
  const shortestPathToReachAllLocations = findShortestPathToReachAllLocations(numericKeypad, [
    startingPoint,
    ...buttonLocations,
  ])
  if (shortestPathToReachAllLocations === "No Path Available") {
    throw new Error("No Path Available")
  }
  return shortestPathToReachAllLocations.paths.map((path) => translateRouteToDirectionalString(path, buttonLocations))
}
export const findShortestPathsOnDirectionalKeypad = (instructions: string): string[] => {
  const buttonPresses = instructions.split("")
  const buttonLocations = buttonPresses.map((button) => directionalKeypadLocations[button])
  const startingPoint = directionalKeypadLocations["A"]
  const shortestPathToReachAllLocations = findShortestPathToReachAllLocations(directionalKeypad, [
    startingPoint,
    ...buttonLocations,
  ])
  if (shortestPathToReachAllLocations === "No Path Available") {
    throw new Error("No Path Available")
  }
  return shortestPathToReachAllLocations.paths.map((path) => translateRouteToDirectionalString(path, buttonLocations))
}

export function findShortestSequence(code: string) {
  const shortestPathsForNumericKeypad = findShortestPathsOnNumericKeypad(code)
  let sequences: string[] = []
  shortestPathsForNumericKeypad.forEach((path) => {
    const shortestPathsOnDirectionalKeypad1 = findShortestPathsOnDirectionalKeypad(path)
    shortestPathsOnDirectionalKeypad1.forEach((keypad1Entry) => {
      const shortestPathsOnDirectionalKeypad2 = findShortestPathsOnDirectionalKeypad(keypad1Entry)
      sequences.push(shortestPathsOnDirectionalKeypad2[0])
    })
  })
  return sequences.sort((a, b) => a.length - b.length)[0].length
}

export const calculateComplexity = (codes: string[], shortestSequences: number[]) => {
  let complexity = 0
  codes.forEach((code, index) => {
    const numericPart = Number(code.slice(0, -1))
    complexity += numericPart * shortestSequences[index]
  })
  return complexity
}

export const parseInput = (rawInput: string) => {
  return rawInput.split("\n")
}

export const part1 = (rawInput: string): number => {
  const codes = parseInput(rawInput)
  let total = 0

  codes.forEach((code) => {
    const numericPart = Number(code.slice(0, -1))
    const minimumCost = findShortestSequence2(numericKeypadAllPathsGraph, code, 3)
    total += numericPart * minimumCost
  })
  return total
}

type DirectionSymbol = "v" | ">" | "^" | "<"
type Graph = Map<string, Record<string, string[]>>
const directionsWithOffsets: { offset: Point; symbol: DirectionSymbol }[] = [
  { offset: [0, 1], symbol: "v" }, // down
  { offset: [1, 0], symbol: ">" }, // right
  { offset: [0, -1], symbol: "^" }, // up
  { offset: [-1, 0], symbol: "<" }, // left
]

const findKeyPosition = (key: string, keypad: string[][]): Point | null => {
  for (let y = 0; y < keypad.length; y++) {
    for (let x = 0; x < keypad[y].length; x++) {
      if (keypad[y][x] === key) return [x, y]
    }
  }
  return null
}

const bfsAllShortestPaths = (startKey: string, keypad: string[][]): Record<string, string[]> => {
  const start = findKeyPosition(startKey, keypad)
  if (!start) return {}

  const queue: { point: Point; path: string; distance: number }[] = [{ point: start, path: "", distance: 0 }]
  const visitedToMinimumDistanceMap: Map<string, number> = new Map()
  const paths: Record<string, string[]> = {}

  while (queue.length > 0) {
    const {
      point: [x, y],
      path,
      distance,
    } = queue.shift()!
    const cellKey = keypad[y][x]

    const cellCoords = `${x},${y}`

    if (visitedToMinimumDistanceMap.has(cellCoords) && visitedToMinimumDistanceMap.get(cellCoords)! < distance) continue

    visitedToMinimumDistanceMap.set(cellCoords, distance)
    if (!paths[cellKey]) {
      paths[cellKey] = []
    }
    if (paths[cellKey].length === 0 || path.length === distance) {
      if (cellKey !== startKey) {
        paths[cellKey].push(path + 'A')
      }
    }

    for (const {
      offset: [dx, dy],
      symbol,
    } of directionsWithOffsets) {
      const nx = x + dx
      const ny = y + dy

      if (
        ny >= 0 &&
        nx >= 0 &&
        ny < keypad.length &&
        nx < keypad[ny].length &&
        keypad[ny][nx] !== " " // Valid cell
      ) {
        const neighborCoords = `${nx},${ny}`

        if (
          !visitedToMinimumDistanceMap.has(neighborCoords) ||
          visitedToMinimumDistanceMap.get(neighborCoords)! >= distance + 1
        ) {
          queue.push({ point: [nx, ny], path: path + symbol, distance: distance + 1 })
        }
      }
    }
  }

  return paths
}

const buildNumericKeypadGraphWithAllPaths = (): Graph => {
  const graph: Graph = new Map()
  const keys = "7894561230A".split("")

  keys.forEach((key) => {
    const allShortestPaths = bfsAllShortestPaths(key, numericKeypad)
    graph.set(key, allShortestPaths)
  })
  return filterGraphPaths(graph)
}

const buildDirectionalKeypadGraphWithAllPaths = (): Graph => {
  const graph: Graph = new Map()
  const keys = "^><vA".split("")

  keys.forEach((key) => {
    const allShortestPaths = bfsAllShortestPaths(key, directionalKeypad)
    graph.set(key, allShortestPaths)
  })
  return filterGraphPaths(graph)
}

const isGroupedByDirection = (path: string[]) => {
  for (let i = 1; i < path.length; i++) {
    if (path[i] !== path[i - 1] && path.slice(0, i).includes(path[i])) {
      return false
    }
  }
  return true
}

const filterGraphPaths = (graph: Graph): Graph => {
  const filteredGraph: Graph = new Map()

  for (const [startKey, targetNodes] of graph.entries()) {
    const filteredTargets: Record<string, string[]> = {}

    for (const [endKey, paths] of Object.entries(targetNodes)) {
      if (startKey !== endKey) {
        const groupedPaths = paths.filter((path) => isGroupedByDirection(path.split("")))
        filteredTargets[endKey] = groupedPaths
      }
    }

    filteredGraph.set(startKey, filteredTargets)
  }

  return filteredGraph
}

const mergeGraphs = (graph1: Graph, graph2: Graph): Graph => {
  const mergedGraph: Graph = new Map(graph1)

  for (const [startKey, targetNodes2] of graph2.entries()) {
    if (!mergedGraph.has(startKey)) {
      mergedGraph.set(startKey, targetNodes2) // If the key is unique to graph2, add it directly
    } else {
      // Merge the target nodes from both graphs
      const targetNodes1 = mergedGraph.get(startKey)! // Retrieve the existing nodes from graph1
      const mergedTargets: Record<string, string[]> = { ...targetNodes1 }

      for (const [endKey, paths2] of Object.entries(targetNodes2)) {
        if (!mergedTargets[endKey]) {
          mergedTargets[endKey] = paths2 // If the target is unique to graph2, add it
        } else {
          // Concatenate and remove duplicates for overlapping keys
          const paths1 = mergedTargets[endKey]
          const combinedPaths = Array.from(new Set([...paths1, ...paths2]))
          mergedTargets[endKey] = combinedPaths
        }
      }

      mergedGraph.set(startKey, mergedTargets) // Update the graph with merged targets
    }
  }

  return mergedGraph
}

const getCacheKey = (keys: string, depth: number) => `${keys}_${depth}`

const numericKeypadAllPathsGraph = buildNumericKeypadGraphWithAllPaths()
const directionalKeypadAllPathsGraph = buildDirectionalKeypadGraphWithAllPaths()
const allPathsGraph = mergeGraphs(numericKeypadAllPathsGraph, directionalKeypadAllPathsGraph)

const getMoves = (graph: Graph, previous: string, target: string) => {
  // const moves: string[] = []
  if (previous === target) {
    return ["A"]
  }
  return graph.get(previous)![target]
}

export function findShortestSequence2(graph: Graph, code: string, depth: number, cache: Record<string, number> = {}) {
  if (depth === 0) {
    return code.length
  }
  const cacheKey = getCacheKey(code, depth)
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }
  let current = 'A'
  let length = 0
  for (let i = 0; i < code.length; i++) {
    const moves: string[] = getMoves(graph, current, code[i])
    if (depth === 0) {
      length += moves[0].length
    } else {
      length += Math.min(...moves.map(move => findShortestSequence2(directionalKeypadAllPathsGraph, move, depth - 1, cache)))
    }
    current = code[i]
  }
  cache[cacheKey] = length
  return length
}
export const part2 = (rawInput: string): number => {
  const codes = parseInput(rawInput)
  let total = 0

  codes.forEach((code) => {
    const numericPart = Number(code.slice(0, -1))
    const minimumCost = findShortestSequence2(numericKeypadAllPathsGraph, code, 26)
    total += numericPart * minimumCost
  })
  return total
}

export const exampleInputPart1 = `029A
980A
179A
456A
379A`

type Point = [number, number]

const directions: Point[] = [
  [0, 1], // Down
  [1, 0], // Right
  [0, -1], // Up
  [-1, 0], // Left
]
export const translateRouteToDirectionalString = (route: Point[], presses: Point[]) => {
  let translatedRoute = ""
  let pressesIndex = 0
  for (let index = 0; index < route.length; index++) {
    if (index === route.length - 1) {
      translatedRoute += "A"
    } else {
      const [x, y] = route[index]
      const [nx, ny] = route[index + 1]
      const [dx, dy] = [nx - x, ny - y]
      if (dx === 0 && dy === 1) {
        translatedRoute += "v"
      } else if (dx === 1 && dy === 0) {
        translatedRoute += ">"
      } else if (dx === 0 && dy === -1) {
        translatedRoute += "^"
      } else if (dx === -1 && dy === 0) {
        translatedRoute += "<"
      }
      while (pressesIndex < presses.length - 1 && presses[pressesIndex][0] === nx && presses[pressesIndex][1] === ny) {
        pressesIndex++
        translatedRoute += "A"
      }
    }
  }
  return translatedRoute
}
const findShortestPathToReachAllLocations = (
  grid: string[][],
  points: Point[],
): { paths: Point[][]; cost: number } | "No Path Available" => {
  const bfsAllPaths = (start: Point, end: Point, grid: string[][]): { paths: Point[][]; cost: number } => {
    const rows = grid.length
    const cols = grid[0].length

    const queue: { point: Point; path: Point[]; distance: number }[] = [{ point: start, path: [start], distance: 0 }]
    const visited: Map<string, number> = new Map() // Tracks the shortest distance to reach a cell

    const allShortestPaths: Point[][] = []
    let shortestDistance = Infinity

    while (queue.length > 0) {
      const { point, path, distance } = queue.shift()!
      const [x, y] = point

      // If already found a shorter path to this point, skip
      const cellKey = `${x},${y}`
      if (visited.has(cellKey) && visited.get(cellKey)! < distance) {
        continue
      }
      visited.set(cellKey, distance)

      // If this point is the destination
      if (x === end[0] && y === end[1]) {
        if (distance < shortestDistance) {
          // Found a new shorter distance, reset paths
          shortestDistance = distance
          allShortestPaths.length = 0 // Clear previous paths
        }
        if (distance === shortestDistance) {
          allShortestPaths.push(path)
        }
        continue
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < cols &&
          ny < rows &&
          grid[ny][nx] !== " " // Only passable cells
        ) {
          const newDistance = distance + 1
          const nextCellKey = `${nx},${ny}`

          // Only add to queue if the new path is shorter or equal
          if (!visited.has(nextCellKey) || visited.get(nextCellKey)! >= newDistance) {
            queue.push({
              point: [nx, ny],
              path: [...path, [nx, ny]],
              distance: newDistance,
            })
          }
        }
      }
    }

    return {
      paths: allShortestPaths,
      cost: shortestDistance,
    }
  }

  let totalCost = 0 // Cumulative cost of the shortest path
  let possiblePaths: Point[][] = [[points[0]]] // Each path starts from the first point

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i]
    const end = points[i + 1]

    const result = bfsAllPaths(start, end, grid)
    if (result.cost === Infinity) return "No Path Available" // If any segment is unreachable

    totalCost += result.cost

    // Combine the possible paths with the new segment paths
    const newPaths: Point[][] = []
    for (const currentPath of possiblePaths) {
      for (const segment of result.paths) {
        // Concatenate the current path with the segment (without duplicating the starting point of the segment)
        newPaths.push([...currentPath, ...segment.slice(1)])
      }
    }
    possiblePaths = newPaths
  }

  return {
    paths: possiblePaths,
    cost: totalCost,
  }
}
