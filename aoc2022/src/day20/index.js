import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

export const move = (input, itemToMove) => {
  const itemValue = itemToMove.value
  const startIndex = input.findIndex(inputItem => inputItem.originalIndex === itemToMove.originalIndex)
  const distance = itemValue >= 0 ? itemToMove.value % (input.length - 1) : ((itemValue * -1) % (input.length - 1)) * -1

  if (distance === 0) {
    return input
  } else {
    input.splice(startIndex, 1)
    if (distance >= 0) {
      if (distance + startIndex < input.length) {
        input.splice(distance + startIndex, 0, itemToMove)
      } else {
        input.splice((distance + startIndex) - input.length, 0, itemToMove)
      }
    } else {
      const maybeIndex = (input.length + distance + startIndex)
      if (maybeIndex > input.length) {
        input.splice(itemValue + startIndex, 0, itemToMove)
      } else {
        input.splice(maybeIndex, 0, itemToMove)
      }
    }
    return input
  }
}

const move2 = (input, itemToMove) => {
  let itemValue = itemToMove.value
  let newIndex = input.findIndex(inputItem => inputItem.originalIndex === itemToMove.originalIndex)

  if (itemValue > 0) itemValue %= input.length - 1
  if (itemValue < 0) itemValue = ((itemValue * -1) % (input.length - 1)) * -1

  while (itemValue > 0) {
    if (newIndex === input.length - 1) newIndex = 0
    newIndex++
    itemValue--
  }
  while (itemValue < 0) {
    if (newIndex === 0) newIndex = input.length - 1
    newIndex--
    itemValue++
  }
  const indexOfItemToDelete = input.indexOf(input.find((item) => item.originalIndex === itemToMove.originalIndex))
  input.splice(indexOfItemToDelete, 1)

  input.splice(newIndex, 0, itemToMove)
  return input
}

export const mix2 = (input, times = 1) => {
  let temp = [...input]
  for (let j = 0; j < times; j++) {
    for (let i = 0; i < input.length; i++) {
      temp = move2(temp, {originalIndex: i, value: input[i].value})
    }
  }
  return temp
}
export const mix = (initial, times = 1) => {
  let temp = [...initial]
  for (let j = 0; j < times; j++) {
    for (let i = 0; i < initial.length; i++) {
      temp = move(temp, {originalIndex: i, value: initial[i].value})
    }
  }
  return temp
}
export const findCoordinate = (mixed, stepCount) => {
  const zeroIndex = mixed.indexOf(mixed.find(mixedItem => mixedItem.value === 0))
  const remainder = stepCount % (mixed.length)
  if (zeroIndex + remainder > mixed.length) {
    return mixed[Math.abs(mixed.length - zeroIndex - remainder)].value
  } else if (zeroIndex + remainder === mixed.length) {
    return mixed[mixed.length - 1].value
  } else {
    return mixed[zeroIndex + remainder].value
  }
}

const summarize = (mixed, zeroIndex) => {
  const firstCoordinate = mixed[(1000 + zeroIndex) % mixed.length].value
  const secondCoordinate = mixed[(2000 + zeroIndex) % mixed.length].value
  const thirdCoordinate = mixed[(3000 + zeroIndex) % mixed.length].value
  const sumOfAllValues = Number(firstCoordinate) + Number(secondCoordinate) + Number(thirdCoordinate)
  console.log(`Sum of all values: ${sumOfAllValues}`)
  return sumOfAllValues
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const numberInputs = input.map(value => Number(value))
  const indexedNumberData = numberInputs.map((item, index) => ({originalIndex: index, value: item}))
  const mixed = mix(indexedNumberData)
  const zeroIndex = mixed.indexOf(mixed.find(mixedItem => mixedItem.value === 0))
  return summarize(mixed, zeroIndex)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const numberInputs = input.map(value => Number(value) * 811589153)
  const indexedNumberData = numberInputs.map((item, index) => ({originalIndex: index, value: item}))
  const mixed = mix2(indexedNumberData, 10)
  const zeroIndex = mixed.indexOf(mixed.find((item) => item.value === 0))

  return summarize(mixed, zeroIndex)
}

run({
  part1: {
    tests: [
      {
        input: `1
2
-3
3
-2
0
4`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1
2
-3
3
-2
0
4`,
        expected: 1623178306,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
