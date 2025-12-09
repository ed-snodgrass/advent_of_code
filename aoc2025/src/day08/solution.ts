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

function mergeCircuits(closestJunctionBoxPair: any[], circuits: string[]) {
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

export function findClosestJunctionBoxes(junctionBoxes: JunctionBox[], circuits: string[]) {
  let closestDistance: number = Infinity
  let closestJunctionBoxPair = []

  for (let i = 0; i < junctionBoxes.length; i++) {
    const junctionBoxA = junctionBoxes[i]
    const circuitA = circuits.find((circuit) => circuit.includes(junctionBoxToString(junctionBoxA)))
    for (let j = 0; j < junctionBoxes.length; j++) {
      if (j !== i) {
        const junctionBoxB = junctionBoxes[j]
        if (!circuitA || !circuitA.includes(junctionBoxToString(junctionBoxB))) {
          const current = euclideanDistance(junctionBoxA, junctionBoxB)
          if (current < closestDistance) {
            closestDistance = current
            closestJunctionBoxPair = [junctionBoxA, junctionBoxB]
          }
        }
      }
    }
  }
  return closestJunctionBoxPair
}

export const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  // console.log(input)
  const escapeHatch = input.length === 20 ? 10 : 1000
  let circuits: string[] = input.map(junctionBoxToString)
  let connectionsCount = 1
  while (connectionsCount < escapeHatch) {
    const newPair = findClosestJunctionBoxes(input, circuits)

    circuits = mergeCircuits(newPair, circuits).filter((circuit) => !!circuit)
    connectionsCount++
  }
  circuits.sort((a, b) => b.length - a.length)
  let product = 1
  for (let i = 0; i < 3; i++) {
    product *= circuits[i].split(':').length
  }
  return product
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
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
