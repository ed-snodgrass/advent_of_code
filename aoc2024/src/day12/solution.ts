// import { createCharacterGrid } from "../utils/grid"
// import { BasicDirections } from "../utils/directions"
import { createCharacterGrid } from "../utils/grid.js"
import { BasicDirections } from "../utils/directions.js"

export const parseInput = (rawInput: string) => {
  return createCharacterGrid(rawInput)
}

export const findRegions = (grid: string[][]): number[][] => {
  const rows = grid.length
  const cols = grid[0].length

  // Create a visited array to track cells that have been processed
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  // Create a region ID array to track the region each cell belongs to
  const regionIds = Array.from({ length: rows }, () => Array(cols).fill(-1))

  let currentRegionId = 0
  const isNewRegion = (r: number, c: number) => {
    return !visited[r][c]
  }

  const isOutOfBounds = (x: number, y: number) => {
    return x < 0 || x >= rows || y < 0 || y >= cols
  }
  const alreadyVisited = (x: number, y: number) => {
    return visited[x][y]
  }
  const mismatched = (x: number, y: number, char: string) => {
    return grid[x][y] !== char
  }
  const dfs = (r: number, c: number, char: string) => {
    const stack: [number, number][] = [[r, c]]

    while (stack.length > 0) {
      const [x, y] = stack.pop()!
      if (isOutOfBounds(x, y) || alreadyVisited(x, y) || mismatched(x, y, char)) {
        continue
      }

      // Mark as visited and assign the region ID
      visited[x][y] = true
      regionIds[x][y] = currentRegionId

      // Add all potential neighbors to the stack
      for (const [dx, dy] of BasicDirections) {
        stack.push([x + dx, y + dy])
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isNewRegion(r, c)) {
        dfs(r, c, grid[r][c])
        currentRegionId++
      }
    }
  }

  return regionIds
}

export const findDistinctRegions = (regionIds: number[][]) => {
  return Array.from(new Set(regionIds.flat()))
}
export const findDistinctPlants = (grid: string[][]) => {
  return Array.from(new Set(grid.flat()))
}

export const calculatePerimeter = (regionIds: number[][], targetId: number) => {
  let perimeter = 0
  const plantsWithinRegion = []
  for (let i = 0; i < regionIds.length; i++) {
    for (let j = 0; j < regionIds.length; j++) {
      if (regionIds[i][j] === targetId) {
        plantsWithinRegion.push({ x: j, y: i })
      }
    }
  }
  const plantsAsString = JSON.stringify(plantsWithinRegion)
  for (const plant of plantsWithinRegion) {
    // if no plant above, add one
    if (!plantsAsString.includes(`{"x":${plant.x},"y":${plant.y - 1}}`)) {
      perimeter++
    }
    // if no plant below, add one
    if (!plantsAsString.includes(`{"x":${plant.x},"y":${plant.y + 1}}`)) {
      perimeter++
    }
    // if no plant left,  add one
    if (!plantsAsString.includes(`{"x":${plant.x - 1},"y":${plant.y}}`)) {
      perimeter++
    }
    // if no plant right, add one
    if (!plantsAsString.includes(`{"x":${plant.x + 1},"y":${plant.y}}`)) {
      perimeter++
    }
  }

  return perimeter
}

export const calculateRegionScore = (regionIds: number[][]) => {
  const distinctRegions = findDistinctRegions(regionIds)
  let totalScore = 0
  const flatRegionIds = regionIds.flat()
  for (const regionId of distinctRegions) {
    const area = flatRegionIds.filter((id) => id === regionId).length
    const perimeter = calculatePerimeter(regionIds, regionId)
    totalScore += area * perimeter
  }
  return totalScore
}

export const part1 = (rawInput: string): number => {
  const grid = parseInput(rawInput)
  const regions = findRegions(grid)
  return calculateRegionScore(regions)
}

export const calculateNumberOfSides = (plantsInRegion: string[]) => {
  if (plantsInRegion.length <= 2) return 4

  const plantPositions = plantsInRegion.map((plant) => plant.split(",").map(Number))
  const xPositions = plantPositions.map((position) => position[0])
  const yPositions = plantPositions.map((position) => position[1])
  const xMin = Math.min(...xPositions)
  const xMax = Math.max(...xPositions)
  const yMin = Math.min(...yPositions)
  const yMax = Math.max(...yPositions)
  const xRange = xMax - xMin
  if (xRange === 0) return 4
  const yRange = yMax - yMin
  if (yRange === 0) return 4

  const plantsAsString = JSON.stringify(plantPositions)

  let possibleEdgesString = new Set<string>()
  for (const [x, y] of plantPositions) {
    if (!plantsAsString.includes(`[${x},${y - 1}]`)) {
      possibleEdgesString.add(`${x},${y - 1}_top`)
    }
    if (!plantsAsString.includes(`[${x},${y + 1}]`)) {
      possibleEdgesString.add(`${x},${y + 1}_bottom`)
    }
    if (!plantsAsString.includes(`[${x - 1},${y}]`)) {
      possibleEdgesString.add(`${x - 1},${y}_left`)
    }
    if (!plantsAsString.includes(`[${x + 1},${y}]`)) {
      possibleEdgesString.add(`${x + 1},${y}_right`)
    }
  }
  const groupsByDirections = groupsByDirection(possibleEdgesString)
  return groupsByDirections.length
}

const groupsByDirection = (possibleEdges: Set<string>) => {
  const groups: string[][] = []
  const remaining = new Set<string>()
  for (const item of Array.from(possibleEdges)) {
    remaining.add(item)
  }
  const parseCoordinate = (item: string): [number, number, string] => {
    const [coordinate, suffix] = item.split("_")
    const [x, y] = coordinate.split(",").map(Number)
    return [x, y, suffix]
  }
  const areConnected = (item1: string, item2: string): boolean => {
    const [x1, y1, dir1] = parseCoordinate(item1)
    const [x2, y2, dir2] = parseCoordinate(item2)

    return dir1 === dir2 && ((x1 === x2 && Math.abs(y1 - y2) === 1) || (y1 === y2 && Math.abs(x1 - x2) === 1))
  }
  const floodFillGroup = (start: string, group: string[]): void => {
    const stack = [start]
    while (stack.length > 0) {
      const current = stack.pop()!
      if (!remaining.has(current)) continue

      group.push(current)
      remaining.delete(current)

      for (const next of Array.from(remaining)) {
        if (areConnected(current, next)) {
          stack.push(next)
        }
      }
    }
  }
  for (const item of Array.from(remaining)) {
    if (remaining.has(item)) {
      const group: string[] = []
      floodFillGroup(item, group)
      groups.push(group)
    }
  }
  return groups
}

export const createRegionToPlantsMap = (regionIds: number[][]) => {
  const distinctRegions = findDistinctRegions(regionIds)
  const regionToPlantsMap = new Map<number, string[]>()
  distinctRegions.forEach((regionId) => {
    regionToPlantsMap.set(regionId, [])
  })
  for (let y = 0; y < regionIds.length; y++) {
    for (let x = 0; x < regionIds[y].length; x++) {
      const region = regionIds[y][x]
      regionToPlantsMap.set(region, [...regionToPlantsMap.get(region)!, `${x},${y}`])
    }
  }
  return regionToPlantsMap
}

export const calculateBulkDiscount = (regionIds: number[][]) => {
  const regionToPlantsMap = createRegionToPlantsMap(regionIds)
  const costs: number[] = []
  regionToPlantsMap.forEach((plants) => {
    const numberOfSides = calculateNumberOfSides(plants)
    const area = plants.length
    costs.push(numberOfSides * area)
  })
  return costs.reduce((acc, cost) => acc + cost, 0)
}

export const part2 = (rawInput: string): number => {
  const grid = parseInput(rawInput)
  const regions = findRegions(grid)

  return calculateBulkDiscount(regions)
}

export const miniSampleInput = `AAAA
BBCD
BBCC
EEEC`

export const exampleInputPart1 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
