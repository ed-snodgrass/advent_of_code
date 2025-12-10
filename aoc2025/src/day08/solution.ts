type JunctionBox = {
  X: number
  Y: number
  Z: number
}

export const parseInput = (rawInput: string): JunctionBox[] => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const numbers = line.split(',')
      return { X: Number(numbers[0]), Y: Number(numbers[1]), Z: Number(numbers[2]) }
    })
}

export function euclideanDistance(a: JunctionBox, b: JunctionBox) {
  return Math.sqrt(Math.pow(a.X - b.X, 2) + Math.pow(a.Y - b.Y, 2) + Math.pow(a.Z - b.Z, 2))
}

export function junctionBoxToString(junctionBox: JunctionBox) {
  return `${junctionBox.X}_${junctionBox.Y}_${junctionBox.Z}`
}

export function stringToJunctionBox(junctionBoxString: string): JunctionBox {
  const numbers = junctionBoxString.split('_')
  return { X: Number(numbers[0]), Y: Number(numbers[1]), Z: Number(numbers[2]) }
}

export function mergeCircuits(closestJunctionBoxPair: any[], circuits: string[]) {
  const circuitA = circuits.find((circuit) => circuit.includes(junctionBoxToString(closestJunctionBoxPair[0])))

  if (circuitA && circuitA.includes(junctionBoxToString(closestJunctionBoxPair[1]))) {
    return circuits
  }
  const circuitsToMerge = closestJunctionBoxPair
    .map((junctionBox) => {
      return circuits.findIndex((circuit) => circuit.includes(junctionBoxToString(junctionBox)))
    })
    .sort()
  if (circuits[circuitsToMerge[0]].length >= circuits[circuitsToMerge[1]].length) {
    circuits[circuitsToMerge[0]] = `${circuits[circuitsToMerge[0]]}:${circuits[circuitsToMerge[1]]}`
    delete circuits[circuitsToMerge[1]]
    // console.log(circuitsToMerge)
  } else {
    circuits[circuitsToMerge[1]] = `${circuits[circuitsToMerge[1]]}:${circuits[circuitsToMerge[0]]}`
    delete circuits[circuitsToMerge[0]]
    // console.log(circuitsToMerge)
  }
  return circuits
}

export function createJunctionBoxDistanceMap(junctionBoxes: JunctionBox[]) {
  const circuitCandidateMap = new Map<string, { other: string; distance: number }[]>()

  for (let i = 0; i < junctionBoxes.length; i++) {
    const junctionBoxA = junctionBoxes[i]
    const candidates = []
    for (let j = 0; j < junctionBoxes.length; j++) {
      if (j !== i) {
        candidates.push(junctionBoxes[j])
        // const distance = euclideanDistance(junctionBoxA, junctionBoxB)
        // circuitCandidateMap.set(`${junctionBoxToString(junctionBoxA)}:${junctionBoxToString(junctionBoxB)}`, distance)
      }
    }
    circuitCandidateMap.set(
      `${junctionBoxToString(junctionBoxA)}`,
      candidates
        .map((candidate) => {
          return {
            other: junctionBoxToString(candidate),
            distance: euclideanDistance(junctionBoxA, candidate),
          }
        })
        .sort((a, b) => a.distance - b.distance),
    )
  }
  return circuitCandidateMap
}

export function findClosestJunctionBoxes(junctionBoxes: JunctionBox[], lastDistance: number): [JunctionBox, JunctionBox] {
  let closestDistance: number = Infinity
  let closestJunctionBoxPair = []

  for (let i = 0; i < junctionBoxes.length; i++) {
    const junctionBoxA = junctionBoxes[i]
    for (let j = 0; j < junctionBoxes.length; j++) {
      if (j !== i) {
        const junctionBoxB = junctionBoxes[j]
        const current = euclideanDistance(junctionBoxA, junctionBoxB)
        if (current < closestDistance && current > lastDistance) {
          closestDistance = current
          closestJunctionBoxPair = [junctionBoxA, junctionBoxB]
        }
      }
    }
  }
  return closestJunctionBoxPair as [JunctionBox, JunctionBox]
}

export const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const connectedJunctionBoxes = connectJunctionBoxesUsingMap(input, true)
  let circuits: string[] = connectedJunctionBoxes[0]
  circuits.sort((a, b) => b.length - a.length)
  let product = 1
  for (let i = 0; i < 3; i++) {
    product *= circuits[i].split(':').length
  }
  return product
}

export const findClosestJunctionBoxesUsingMap = (
  junctionBoxDistanceMap: Map<string, { other: string; distance: number }[]>,
  lastDistance: number,
) => {
  let closestDistance: number = Infinity
  let closestJunctionBoxPair = []

  const junctionBoxes = Array.from(junctionBoxDistanceMap.keys()).map(stringToJunctionBox)

  for (let i = 0; i < junctionBoxes.length; i++) {
    const junctionBoxA = junctionBoxes[i]
    const aKey = junctionBoxToString(junctionBoxA)
    const otherJunctionBoxes = junctionBoxDistanceMap.get(aKey).filter((jb) => jb.distance > lastDistance)
        const junctionBoxBKey = otherJunctionBoxes[0].other
        const junctionBoxB = stringToJunctionBox(junctionBoxBKey)
        const current = euclideanDistance(junctionBoxA, junctionBoxB)
        if (current < closestDistance && current > lastDistance) {
          closestDistance = current
          closestJunctionBoxPair = [junctionBoxA, junctionBoxB]
        }
  }
  return closestJunctionBoxPair as [JunctionBox, JunctionBox]
}


export const connectJunctionBoxesUsingMap = (input, useEscapeHatch = false): [string[], [JunctionBox, JunctionBox]] => {
  const junctionBoxDistanceMap = createJunctionBoxDistanceMap(input)
  let circuits: string[] = input.map(junctionBoxToString)
  let escapeHatch: number = Infinity
  if (useEscapeHatch) escapeHatch = input.length === 20 ? 10 : 1000

  let lastDistance = -Infinity
  let connectionsCount = 0
  let startTime = Date.now()
  let lastNewPair: [JunctionBox, JunctionBox]
  while (connectionsCount < escapeHatch && circuits.length > 1) {
    const newPair = findClosestJunctionBoxesUsingMap(junctionBoxDistanceMap, lastDistance)
    if (circuits.length === 2) {
      lastNewPair = newPair
    }
    circuits = mergeCircuits(newPair, circuits).filter((circuit) => !!circuit)
    lastDistance = euclideanDistance(newPair[0], newPair[1])
    if (connectionsCount % 10 === 0) {
      console.log(`${connectionsCount} of ${escapeHatch} took ${Date.now() - startTime}`)
      startTime = Date.now()
    }
    connectionsCount++
  }
  return [circuits, lastNewPair]
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const connectedJunctionBoxes = connectJunctionBoxesUsingMap(input)
  let lastPair: [JunctionBox, JunctionBox] = connectedJunctionBoxes[1]
  console.log(lastPair)
  console.log(lastPair[0].X * lastPair[1].X)
  return lastPair[0].X * lastPair[1].X
}

export const exampleInputPart1 = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

export const exampleInputPart2 = exampleInputPart1
