import { createCharacterGrid } from "../utils/grid"
import { BasicDirections } from "../utils/directions"
// import { createCharacterGrid } from "../utils/grid.js"
// import { BasicDirections } from "../utils/directions.js"

export const parseInput = (rawInput: string) => {
  return createCharacterGrid(rawInput)
}

export const findRegions = (grid: string[][]): number[][] => {
  const rows = grid.length;
  const cols = grid[0].length;

  // Create a visited array to track cells that have been processed
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Create a region ID array to track the region each cell belongs to
  const regionIds = Array.from({ length: rows }, () => Array(cols).fill(-1));

  let currentRegionId = 0;
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
    const stack: [number, number][] = [[r, c]];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (
        isOutOfBounds(x, y) ||
        alreadyVisited(x, y) ||
        mismatched(x, y, char)
      ) {
        continue;
      }

      // Mark as visited and assign the region ID
      visited[x][y] = true;
      regionIds[x][y] = currentRegionId;

      // Add all potential neighbors to the stack
      for (const [dx, dy] of BasicDirections) {
        stack.push([x + dx, y + dy]);
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isNewRegion(r, c)) {
        dfs(r, c, grid[r][c]);
        currentRegionId++;
      }
    }
  }

  return regionIds;
};

export const findDistinctRegions = (regionIds: number[][]) => {
  return Array.from(new Set(regionIds.flat()))
}
export const findDistinctPlants = (grid: string[][]) => {
  return Array.from(new Set(grid.flat()))
}

export const calculatePerimeter = (regionIds: number[][], targetId: number) => {
  let perimeter = 0
  const plantsWithinRegion = []
  for(let i = 0; i < regionIds.length; i++) {
    for (let j = 0; j < regionIds.length; j++) {
      if (regionIds[i][j] === targetId) {
        plantsWithinRegion.push({ x: j, y: i})
      }
    }
  }
  const plantsAsString = JSON.stringify(plantsWithinRegion)
  for (const plant of plantsWithinRegion) {
    // if no plant above, add one
    if (!plantsAsString.includes(`{"x":${plant.x},"y":${plant.y - 1}}`)){
      perimeter++
    }
    // if no plant below, add one
    if(!plantsAsString.includes(`{"x":${plant.x},"y":${plant.y + 1}}`)){
      perimeter++
    }
    // if no plant left,  add one
    if(!plantsAsString.includes(`{"x":${plant.x - 1},"y":${plant.y}}`)){
      perimeter++
    }
    // if no plant right, add one
    if(!plantsAsString.includes(`{"x":${plant.x + 1},"y":${plant.y}}`)){
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
    const area = flatRegionIds.filter(id => id === regionId).length
    const perimeter = calculatePerimeter(regionIds, regionId)
    totalScore += area * perimeter
  }
  return totalScore
}

export const part1 = (rawInput: string):number => {
  const grid = parseInput(rawInput)
  const regions = findRegions(grid)
  return calculateRegionScore(regions)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const miniSampleInput = `AAAA
BBCD
BBCC
EEEC`

export const exampleInputPart1 =  `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

export const exampleInputPart2 = exampleInputPart1
