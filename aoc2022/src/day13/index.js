import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')
export const capturePacketPairs = (input) => {
  const packetPairs = []
  let i = 0
  while (i < input.length) {
    packetPairs.push([JSON.parse(input[i]), JSON.parse(input[i + 1])])
    i += 3
  }
  return packetPairs
}

export const capturePackets = (input) => {
  return capturePacketPairs(input).flat()
}

export const sortPackets = packets => {
  return [...packets, [[2]], [[6]]].sort(compareTwoValues)
}

export const getProductOfDividerIndices = (sortedPackets) => {
  const first = sortedPackets.findIndex((packet) => packet?.length === 1 && packet[0]?.length === 1 && packet[0][0] === 2)
  const second = sortedPackets.findIndex((packet) => packet?.length === 1 && packet[0]?.length === 1 && packet[0][0] === 6)

  return (first + 1) * (second + 1)
}

// eslint-disable-next-line complexity
export const compareTwoValues = (left, right) => {
  // console.log(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`)
  if (left === undefined && (!!right || right === 0)) {
    return -1
  } else if (right === undefined && (!!left || left === 0)) {
    return 1
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length < right.length) {
      let valueIndex = 0
      let listComparisonValue
      do {
        listComparisonValue = compareTwoValues(left[valueIndex], right[valueIndex])
        valueIndex++

        if (valueIndex === left.length && listComparisonValue === 0) {
          return -1
        }
      } while (valueIndex < left.length && !listComparisonValue)

      return listComparisonValue
    } else if (left.length > right.length) {
      let valueIndex = 0
      let listComparisonValue
      do {
        listComparisonValue = compareTwoValues(left[valueIndex], right[valueIndex])
        valueIndex++

        if (valueIndex === right.length && listComparisonValue === 0) {
          return 1
        }
      } while (valueIndex < right.length && !listComparisonValue)

      return listComparisonValue
    } else {
      let listComparisonValue
      for (let valueIndex = 0; valueIndex < left.length && !listComparisonValue; valueIndex++) {

        listComparisonValue = compareTwoValues(left[valueIndex], right[valueIndex])
      }
      return listComparisonValue
    }
  } else if (Array.isArray(left)) {
    return compareTwoValues(left, [right])
  } else if (Array.isArray(right)) {
    return compareTwoValues([left], right)
  }
  if (left < right) {
    return -1
  } else if (left > right) {
    return 1
  }
  return 0
}

export const comparePacketPair = (packetPair) => {
  return compareTwoValues(packetPair[0], packetPair[1])
}

export const processPacketPairInput = (input) => {
  const packetPairs = capturePacketPairs(input)
  const packetValues = packetPairs.map(packetPair => comparePacketPair(packetPair))

  let sum = 0
  packetValues.forEach((packetValue, index) => {
    if (packetValue <= 0) {
      sum += (index + 1)
    }
  })
  return sum
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return processPacketPairInput(input)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const packets = capturePackets(input)
  const sortedPackets = sortPackets(packets)
  return getProductOfDividerIndices(sortedPackets)
}

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
