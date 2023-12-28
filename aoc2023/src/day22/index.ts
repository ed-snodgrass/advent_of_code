import run from "aocrunner"

enum Direction {
  x = 'x',
  y = 'y',
  z = 'z'
}

export type CubePosition = {
  x: number
  y: number
  z: number
}

export type Brick = {
  top: number,
  bottom: number,
  direction: Direction,
  firstEnd: CubePosition,
  secondEnd: CubePosition,
  brickLength: number,
  supportingBricks: Brick[]
}

type BrickSupports = {
  brick: Brick
  supportedBricks: Brick[]
}

export const parseInput = (rawInput: string) => {
  let maxX = 0
  let maxY = 0
  let maxZ = 0
  let bricks = []

  rawInput.split('\n').forEach(line => {
    const parts = line.split('~').map(part => part.split(',').map(char => Number.parseInt(char)))

    const firstX = parts[0][0]
    const firstY = parts[0][1]
    const firstZ = parts[0][2]
    const secondX = parts[1][0]
    const secondY = parts[1][1]
    const secondZ = parts[1][2]

    const firstEnd =  {x: firstX, y: firstY, z: firstZ}
    const secondEnd =  {x: secondX, y: secondY, z: secondZ}
    maxX = Math.max(maxX, firstX, secondX)
    maxY = Math.max(maxY, firstY, secondY)
    maxZ = Math.max(maxZ, firstZ, secondZ)
    let brickLength = 0
    let direction: Direction
    if (firstEnd.x !== secondEnd.x) {
      brickLength = firstEnd.x - secondEnd.x
      direction = Direction.x
    } else if (firstEnd.y !== secondEnd.y) {
      brickLength = firstEnd.y - secondEnd.y
      direction = Direction.y
    } else {
      brickLength = firstEnd.z - secondEnd.z
      direction = Direction.z
    }

    const top = Math.max(firstZ, secondZ)
    const bottom = direction === Direction.z ? Math.min(firstZ, secondZ) - 1 : top - 1
    bricks.push({
      top,
      bottom,
      firstEnd,
      secondEnd,
      direction,
      brickLength: Math.abs(brickLength) + 1,
    })
  })
  bricks.sort((a, b) => {
    return a.top - b.top
  })
  return {bricks, maxX, maxY, maxZ}
}

export const dropABrick = (brick: Brick) => {
  brick.top = brick.top - 1
  brick.bottom = brick.bottom - 1
  brick.firstEnd = {...brick.firstEnd, z: brick.firstEnd.z - 1}
  brick.secondEnd = {...brick.secondEnd, z: brick.secondEnd.z - 1}
  return brick
}

export const findSupportingBricks = (sortedBricks: Brick[], brick: Brick) => {
  let supportingBricks = []
  let currentLevel = brick.bottom

  do {
    const bricksBelow = sortedBricks.filter(sortedBrick => sortedBrick.top === currentLevel)

    const brickAboveMaxY = Math.max(brick.firstEnd.y, brick.secondEnd.y)
    const brickAboveMinY = Math.min(brick.firstEnd.y, brick.secondEnd.y)

    const brickAboveMaxX = Math.max(brick.firstEnd.x, brick.secondEnd.x)
    const brickAboveMinX = Math.min(brick.firstEnd.x, brick.secondEnd.x)

    bricksBelow.forEach(brickBelow => {
      const brickBelowMaxX = Math.max(brickBelow.firstEnd.x, brickBelow.secondEnd.x)
      const brickBelowMinX = Math.min(brickBelow.firstEnd.x, brickBelow.secondEnd.x)
      const brickBelowMaxY = Math.max(brickBelow.firstEnd.y, brickBelow.secondEnd.y)
      const brickBelowMinY = Math.min(brickBelow.firstEnd.y, brickBelow.secondEnd.y)

      if (brickBelowMaxY >= brickAboveMinY && brickBelowMinY <= brickAboveMaxY && brickBelowMaxX >= brickAboveMinX && brickBelowMinX <= brickAboveMaxX) {
        supportingBricks.push(brickBelow)
      }
    })
    if (supportingBricks.length === 0 && brick.bottom > 0) {
      brick = dropABrick(brick)
    }
    currentLevel--
  } while (supportingBricks.length === 0 && currentLevel > 0)
  return supportingBricks
}

const brickToKey = (brick: Brick) => {
  return `${brick.firstEnd.x}_${brick.firstEnd.y}_${brick.firstEnd.z}~${brick.secondEnd.x}_${brick.secondEnd.y}_${brick.secondEnd.z}`
}

export const letEmFall = (bricks: Brick[], maxZ: number) => {
  const brickMap = new Map<string, BrickSupports>()
  // start where top is 2, see if someone is below, if not, drop it on down.
  let currentTop = 2
  while (currentTop <= maxZ) {
    const currentBricks = bricks.filter(brick => brick.top === currentTop)
    currentBricks.forEach(currentBrick => {
      const bricksBelow: Brick[] = findSupportingBricks(bricks, currentBrick)
      currentBrick.supportingBricks = bricksBelow
      bricksBelow.forEach(supporterBrick => {
        const brickKey = brickToKey(supporterBrick)
        if (brickMap.has(brickKey)) {
          const brickSupport = brickMap.get(brickKey)
          brickSupport.supportedBricks.push(currentBrick)
          brickMap.set(brickKey, {
            brick: supporterBrick,
            supportedBricks: brickSupport.supportedBricks
          })
        } else {
          brickMap.set(brickKey, {
            brick: supporterBrick,
            supportedBricks: [currentBrick]
          })
        }
      })
    })
    currentTop++
  }
  return brickMap
}

export const identifyBricksToDisintegrate = (brickSupports: Map<string, BrickSupports>, allBricks: Brick[]) => {
  const nonSupportiveBricksCount = allBricks.length - brickSupports.size
  const keysToDisintegrate = []

  const canDisintegrate = (brickSupport: BrickSupports) => {
    const supportsZBrick = !!brickSupport.supportedBricks.filter(supportedBrick => {
      return supportedBrick.direction === Direction.z
    }).length

    const allSupportedBricksSupportedByAnotherBrick = brickSupport.supportedBricks.every( (supportedBrick) => {
      return supportedBrick.supportingBricks.length > 1
    })
    return !supportsZBrick && allSupportedBricksSupportedByAnotherBrick
  }

  brickSupports.forEach((value, key) => {
    if (canDisintegrate(value)) {
      keysToDisintegrate.push(key)
    }
  })
  return keysToDisintegrate.length + nonSupportiveBricksCount
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const brickSupportsMap = letEmFall(input.bricks, input.maxZ)
  return identifyBricksToDisintegrate(brickSupportsMap, input.bricks)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 5,
       },
       {
         input: `0,0,1~0,0,2
1,0,1~2,0,1
1,0,2~1,0,2
0,0,3~1,0,3`,
         expected: 3,
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
