import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n')

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

export const getType = (hand: string, useJokers: boolean = false): number => {
  const cardArray = hand.split('')
  if (cardArray.every((character, index, array) => character === array[0])) {
    return 6
  }
  const cardCounts = cardArray.reduce((acc, value) => {
    if (acc[value]) {
      acc[value] += 1
    } else {
      acc[value] = 1
    }
    return acc
  }, {})
  const cardValueCounts = Object.values(cardCounts)
  const hasJokers = useJokers && cardArray.includes('J')
  let numberOfJokers = 0
  if (hasJokers) {
    numberOfJokers = cardArray.reduce((acc, card) => card === 'J' ? acc + 1 : acc, 0)
  }
  // @ts-ignore
  const maxValue = Math.max(...cardValueCounts)
  if (maxValue === 4) {
    if (hasJokers) return 6
    return 5
  }
  if (maxValue === 3 && numberOfJokers !== 3) {
    if (numberOfJokers === 2) {
      return 6
    }
    if (numberOfJokers === 1) {
      return 5
    }
    if (cardValueCounts.includes(2)) {
      return 4
    }
    return 3
  }
  if (maxValue === 3 && numberOfJokers === 3) {
    if (cardValueCounts.includes(2)) {
      return 6
    }
    return 5
  }
  if (maxValue === 2) {
    const numberOfPairs = cardValueCounts.reduce((acc: number, value: number): number => value === 2 ? acc + 1 : acc, 0)
    if (numberOfJokers === 2 && numberOfPairs === 1) {
      return 3
    }
    if (numberOfJokers === 2 && numberOfPairs === 2) {
      return 5
    }
    if (numberOfJokers === 1 && numberOfPairs === 2) {
      return 4
    }
    if (numberOfJokers === 1) {
      return 3
    }
    if (numberOfPairs === 2) {
      return 2
    }
    return 1
  }
  return numberOfJokers ? 1 : 0
}

export const rankHands = (hands: {hand: string, bid: number}[], useJokers: boolean = false) => {
  let cardRankings = [...cards]
  if (useJokers) {
    cardRankings.splice(cardRankings.indexOf('J'), 1)
    cardRankings.unshift('J')
  }
  hands.sort((a, b) => {
    if (getType(a.hand, useJokers) === getType(b.hand, useJokers)) {
      const cardArray1 = a.hand.split('')
      const cardArray2 = b.hand.split('')
      let difference: number
      for (let i = 0; i < 5 && !difference; i++) {
        if (cardArray1[i] !== cardArray2[i]) {
          difference = cardRankings.indexOf(cardArray1[i]) - cardRankings.indexOf(cardArray2[i])
        }
      }
      return difference
    }
    return getType(a.hand, useJokers) - getType(b.hand, useJokers)
  })
  return hands
}

export const getHands = (parsedInput: string[]) => {
  // console.log(parsedInput);
  return parsedInput.map(line => {
    const splitLine = line.split(' ')
    return {
      hand: splitLine[0],
      bid: Number.parseInt(splitLine[1])
    }
  })
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const rankedHands = rankHands(getHands(input))
  return rankedHands.reduce((acc, hand, index) => {
    return acc + (hand.bid * (index + 1))
  }, 0)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const rankedHands = rankHands(getHands(input), true)
  return rankedHands.reduce((acc, hand, index) => {
    return acc + (hand.bid * (index + 1))
  }, 0)
}

export const exampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 6440,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
