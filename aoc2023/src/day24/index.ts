import run from "aocrunner"

type Position = { x: number, y: number, z: number }
type Velocity = { x: number, y: number, z: number }
type Hailstone = { position: Position, velocity: Velocity, slope: number, yIntercept: number }
type HailstonePair = { one: Hailstone, two: Hailstone }

export const calculateSlope = (position: Position, velocity: Velocity) => {
  const nextPoint = travelOneNanosecond(position, velocity)
  if (position.x === nextPoint.position.x) {
    return undefined
  }
  return (nextPoint.position.y - position.y) / (nextPoint.position.x - position.x)
}

export const parseInput = (rawInput: string) : Hailstone[] => {
  const lines = rawInput.split('\n').map(line => line.split('@').map(part => part.trim()))

  return lines.map(lineItem => {
    const positions = lineItem[0].split(',').map(position => Number.parseInt(position))
    const velocities = lineItem[1].split(',').map(position => Number.parseInt(position))
    const position = {x: positions[0], y: positions[1], z: positions[2]}
    const velocity = {x: velocities[0], y: velocities[1], z: velocities[2]}
    const slope = calculateSlope(position, velocity)
    const yIntercept = position.y - (slope * position.x)
    return {
      position,
      velocity,
      slope,
      yIntercept,
    }
  })
}

export const travelOneNanosecond =  (position: Position, velocity: Velocity) => {
  return {
    velocity,
    position: {
      x: position.x + velocity.x,
      y: position.y + velocity.y,
      z: position.z + velocity.z,
    }
  }
}

export const findHailstonePairs = (allHailstones: Hailstone[]) => {
  const pairs: HailstonePair[] = []
  for (let i = 0; i < allHailstones.length - 1; i++) {
    for (let j = i + 1; j < allHailstones.length; j++) {
      pairs.push({one: allHailstones[i], two: allHailstones[j]})
    }
  }
  // console.log(JSON.stringify(pairs));
  return pairs
}

export const findIntersection = (hailstonePair: HailstonePair) => {
  const slopeDiff = hailstonePair.one.slope - hailstonePair.two.slope
  if (slopeDiff === 0) {
    return undefined
  }
  const x = (hailstonePair.two.yIntercept - hailstonePair.one.yIntercept) / slopeDiff
  return {
    x: x,
    y: (hailstonePair.one.slope * x) + hailstonePair.one.yIntercept,
  }
}

const wasInThePast = (intersection: {x: number, y: number}, hailstone: Hailstone) => {
  if (hailstone.velocity.x > 0 && intersection.x < hailstone.position.x) {
    return true
  } else if (hailstone.velocity.x < 0 && intersection.x > hailstone.position.x) {
    return true
  }
  if (hailstone.velocity.y > 0 && intersection.y < hailstone.position.y) {
    return true
  } else if (hailstone.velocity.y < 0 && intersection.y > hailstone.position.y) {
    return true
  }
}

export const part1 = (rawInput: string) => {
  const hailstones = parseInput(rawInput)
  const hailstonePairs = findHailstonePairs(hailstones)
  const min = hailstones.length > 5 ? 200000000000000 : 7
  const max = hailstones.length > 5 ? 400000000000000 : 27
  const counts = hailstonePairs.map(hailstonePair => {
    const intersection = findIntersection(hailstonePair)
//     console.log(`HailstoneA: ${hailstonePair.one.position.x}, ${hailstonePair.one.position.y}, ${hailstonePair.one.position.z}\n
// HailstoneB: ${hailstonePair.two.position.x}, ${hailstonePair.two.position.y}, ${hailstonePair.two.position.z}\n
// ${JSON.stringify(intersection)}`)
    if (intersection && !wasInThePast(intersection, hailstonePair.one) && !wasInThePast(intersection, hailstonePair.two)) {
      if (intersection.x >= min && intersection.y >= min && intersection.y <= max && intersection.x <= max) {
        return 1
      }
    }
    return 0
  })

  return counts.reduce((sum, value) => sum + value, 0)
}

export const part2 = (rawInput: string) => {
  const hailstones = parseInput(rawInput)

  return
}

export const exampleInput = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 2,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 47,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
