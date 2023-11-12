import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const createCube = line => {
  const coordinates = line.split(',')
  return { x: coordinates[0], y: coordinates[1], z: coordinates[2] }
}
const parseCubes = data => {
  return data.map(cubeLine => {
    return createCube(cubeLine)
  })
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const allCubes = parseCubes(input)
  let exposedSidesCount = 0

  const connectedToPrevious = (currentCube, previousCube) => {
    if (currentCube.x === previousCube.x && currentCube.y === previousCube.y && Math.abs(currentCube.z - previousCube.z) === 1) {
      return true
    }
    if (currentCube.y === previousCube.y && currentCube.z === previousCube.z && Math.abs(currentCube.x - previousCube.x) === 1) {
      return true
    }
    if (currentCube.z === previousCube.z && currentCube.x === previousCube.x && Math.abs(currentCube.y - previousCube.y) === 1) {
      return true
    }
  }

  for (let i = 0; i < allCubes.length; i++) {
    exposedSidesCount += 6
    if (i > 0) {
      for (let j = 0; j < i; j++) {
        if (connectedToPrevious(allCubes[i], allCubes[j])) {
          exposedSidesCount -= 2
        }
      }
    }
  }
  return exposedSidesCount
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`,
        expected: 64,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`,
        expected: 58,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
