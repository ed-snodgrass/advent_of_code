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

  const counts = countRobotsByQuadrants(robots, gridWidth, gridHeight)
  return calculateSafetyFactor(counts)
}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const hasCluster = (robots: Robot[]) => {
  robots.sort((a, b) => {
    const [aX, aY] = a.position
    const [bX, bY] = b.position
    if (aY === bY) {
      return aX - bX
    }
    return aY - bY
  })
  let hasCluster = false
  for (let i = 0; i < robots.length; i++) {
    const robotsAtSameY = robots.filter((robot) => robot.position[1] === robots[i].position[1])
    if (robotsAtSameY.length >= 30) {
      let nextToEachOther = 0
      for (let j = 0; j < robotsAtSameY.length - 1; j++) {
        //check xs to see if the difference is 1
        if (Math.abs(robotsAtSameY[j].position[0] - robotsAtSameY[j + 1].position[0]) === 1) {
          nextToEachOther++
        }
        if (nextToEachOther >= 30) {
          hasCluster = true
          break
        }
      }
    }
  }
  return hasCluster
}

export function nextXSeconds(robots: Robot[], gridWidth: number, gridHeight: number, endSeconds: number) {
  let newRobots = [...robots]
  for (let i = 0; i < endSeconds; i++) {
    newRobots = nextSecond(newRobots, gridWidth, gridHeight)
    if (hasCluster(newRobots)) {
      // console.log(`###############${i + 1}###############`)
      // printGrid(initGrid(gridWidth, gridHeight), newRobots)
      return i + 1
    }
  }
  return -1
}

export const part2 = (rawInput: string) => {
  let robots = parseInput(rawInput)
  const [gridWidth, gridHeight] = robots.reduce((acc, robot) => {
    const [x, y] = robot.position
    if (x > acc[0]) {
      acc[0] = x
    }
    if (y > acc[1]) {
      acc[1] = y
    }
    return acc
  }, [0, 0])
  return nextXSeconds(robots, gridWidth + 1, gridHeight + 1, 10000)

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
