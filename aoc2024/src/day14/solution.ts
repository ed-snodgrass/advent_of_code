export const parseInput = (rawInput: string): Robot[] => {
  return rawInput.split("\n").map((line) => {
    const lineMatch = line.match(
      /p=(?<position>\d+,\d+) v=(?<velocity>-?\d+,-?\d+)/,
    )
    const position = lineMatch?.groups?.position?.split(",").map(Number) || []
    const velocity = lineMatch?.groups?.velocity?.split(",").map(Number) || []
    return { position, velocity }
  })
}

export type Robot = {
  position: number[]
  velocity: number[]
}

export function calculateSafetyFactor(robotCounts: number[]) {
  return robotCounts.reduce((acc, robotCount) => robotCount * acc)
}

export function moveRobot(robot: Robot, gridWidth: number, gridHeight: number): Robot {
  let newX, newY
  const [x, y] = robot.position
  const [vx, vy] = robot.velocity
  if (vx > 0) {
    if (x + vx < gridWidth) {
      newX = x + vx
    } else {
      newX = (x + vx) % gridWidth
    }
  } else {
    if (x + vx >= 0) {
      newX = x + vx
    } else {
      newX = gridWidth + ((x + vx) % gridWidth)
    }
  }

  if (vy > 0) {
    if (y + vy < gridHeight) {
      newY = y + vy
    } else {
      newY = (y + vy) % gridHeight
    }
  } else {
    if (y + vy >= 0) {
      newY = y + vy
    } else {
      newY = gridHeight + ((y + vy) % gridHeight)
    }
  }

  return { ...robot, position: [newX, newY] }
}

export function countRobotsByQuadrants(
  robots: Robot[],
  gridWidth: number,
  gridHeight: number,
) {
  const middleX = Math.floor(gridWidth / 2)
  const middleY = Math.floor(gridHeight / 2)
  const quadrants = [0, 0, 0, 0]
  robots.forEach((robot) => {
    const [x, y] = robot.position

    if (x < middleX) {
      if (y < middleY) {
        quadrants[0]++
      } else if (y > middleY) {
        quadrants[1]++
      }
    } else if (x > middleX) {
      if (y < middleY) {
        quadrants[2]++
      } else if (y > middleY) {
        quadrants[3]++
      }
    }
  })
  return quadrants
}

export function nextSecond(
  robots: Robot[],
  gridWidth: number,
  gridHeight: number,
) {
  return robots.map((robot) => moveRobot(robot, gridWidth, gridHeight))
}

export function next100Seconds(robots: Robot[], gridWidth: number, gridHeight: number) {
  let newRobots = [...robots]
  for (let i = 0; i < 100; i++) {
    newRobots = nextSecond(newRobots, gridWidth, gridHeight)
  }
  return newRobots
}

const initGrid = (gridWidth:number, gridHeight: number) => {
  const grid: string[][] = []
  for (let i = 0; i < gridHeight; i++) {
    grid.push(new Array(gridWidth).fill("."))
  }
  return grid
}

const printGrid = (grid: string[][], robots: Robot[]) => {
  robots.forEach((robot) => {
    const [x, y] = robot.position
    grid[y][x] = grid[y][x] === "." ? "1" : (Number(grid[y][x]) + 1).toString()
  })
  console.log(grid.map((row) => row.join("")).join("\n"))
}

export const part1 = (rawInput: string): number => {
  let gridWidth, gridHeight

  let robots = parseInput(rawInput)

  if (robots.length === 12) {
    gridWidth = 11
    gridHeight = 7
  } else {
    gridWidth = 101
    gridHeight = 103
  }
  robots = next100Seconds(robots, gridWidth, gridHeight)

  // printGrid(initGrid(gridWidth, gridHeight), robots)
  const counts = countRobotsByQuadrants(robots, gridWidth, gridHeight)
  return calculateSafetyFactor(counts)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

export const exampleInputPart2 = exampleInputPart1
