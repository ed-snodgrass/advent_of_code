export const parseInput = (rawInput: string) => {
  const grid = rawInput.split('\n').map(line => line.split('').map(Number))
  const trailheads = []
  const summits = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        trailheads.push({ x: j, y: i, value: 0 })
      }
      if (grid[i][j] === 9) {
        summits.push({ x: j, y: i, value: 9 })
      }
    }
  }
  return {grid, trailheads, summits}
}

interface Position {
  x: number
  y: number
  value: number
}

const directions = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
]

export const isOnMap = (grid: number[][], position:{x:number, y:number}) => {
  return position.y >= 0 && position.y < grid.length && position.x >= 0 && position.x < grid[0].length
}

const dfs = (
  grid: number[][],
  current: Position,
  visited: Set<string>,
  target: Position
): boolean => {
  if (current.x === target.x && current.y === target.y) {
    // Reached the target
    return true;
  }

  const key = `${current.x},${current.y}`;
  visited.add(key);

  for (const [dx, dy] of directions) {
    const next = {
      x: current.x + dx,
      y: current.y + dy,
      value: grid[current.y + dy]?.[current.x + dx] ?? -1,
    };

    if (
      isOnMap(grid, next) &&
      !visited.has(`${next.x},${next.y}`) &&
      next.value === current.value + 1 // Ensure it's a valid path
    ) {
      const foundPath = dfs(grid, next, visited, target);
      if (foundPath) {
        return true; // Stop if we've already found a valid path to the summit
      }
    }
  }

  visited.delete(key);
  return false; // No path found
};

export const findPathsFromTrailhead = (
  grid: number[][],
  trailhead: Position,
  summits: Position[]
): number => {
  const visitedSummits = new Set<string>();
  let pathCount = 0;

  for (const summit of summits) {
    const visited = new Set<string>();
    const summitKey = `${summit.x},${summit.y}`;
    if (
      !visitedSummits.has(summitKey) && // Ensure this summit is not already visited
      dfs(grid, trailhead, visited, summit)
    ) {
      pathCount++;
      visitedSummits.add(summitKey); // Mark this summit as visited for this trailhead
    }
  }

  return pathCount;
};
const dfs2 = (
  grid: number[][],
  current: Position,
  visited: Set<string>,
  target: Position,
  path: Position[]
): Position[][] => {
  // If the current position is the target, return the completed path
  if (current.x === target.x && current.y === target.y) {
    return [path.slice()]; // Return a copy of the current path as a successful one
  }

  const key = `${current.x},${current.y}`;
  visited.add(key);

  const allPaths: Position[][] = []; // Collect all valid paths from this point

  for (const [dx, dy] of directions) {
    const next = {
      x: current.x + dx,
      y: current.y + dy,
      value: grid[current.y + dy]?.[current.x + dx] ?? -1,
    };

    if (
      isOnMap(grid, next) &&
      !visited.has(`${next.x},${next.y}`) &&
      next.value === current.value + 1 // Ensure it's a valid path (value increases by 1)
    ) {
      // Add the next position to the path and recursively explore further
      path.push(next);
      const pathsFromNext = dfs2(grid, next, visited, target, path);
      allPaths.push(...pathsFromNext);
      path.pop(); // Backtrack for other potential paths
    }
  }

  visited.delete(key); // Unmark this position
  return allPaths;
};
export const findPathsFromTrailhead2 = (
  grid: number[][],
  trailhead: Position,
  summits: Position[]
): Position[][] => {
  const allPaths: Position[][] = [];

  for (const summit of summits) {
    const visited = new Set<string>();
    const pathsToSummit = dfs2(grid, trailhead, visited, summit, [trailhead]);
    allPaths.push(...pathsToSummit); // Collect all paths to this summit
  }

  return allPaths;
};

export const part1 = (rawInput: string): number => {
  const { grid, trailheads, summits } = parseInput(rawInput);

  return trailheads
    .map((trailhead) => findPathsFromTrailhead(grid, trailhead, summits))
    .reduce((a, b) => a + b, 0);
};

export const part2 = (rawInput: string): number => {
  const { grid, trailheads, summits } = parseInput(rawInput);

  const allPaths: Position[][] = trailheads.flatMap((trailhead) =>
    findPathsFromTrailhead2(grid, trailhead, summits)
  );
  return allPaths.length;
}

export const exampleInputPart1 =  `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

export const exampleInputPart2 = exampleInputPart1
