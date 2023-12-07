import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n')

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const types = ['high_card', 'one_pair', 'two_pair', 'three_of_a_kind', 'full_house', 'four_of_a_kind', 'five_of_a_kind']
export const compareHandsOfType = (hand1: string, hand2: string) => {
  let winner: string

  for (let i = 0; i < 5 && !winner; i++) {

    if (cards.indexOf(hand1[i]) === cards.indexOf(hand2[i])) continue
    if (cards.indexOf(hand1[i]) > cards.indexOf(hand2[i])) {
      winner = hand1
      break
    } else if (cards.indexOf(hand1[i]) < cards.indexOf(hand2[i])) {
      winner = hand2
    }
  }
  return winner
}

export const getType = (hand: string): number => {
  //if all cards are same, 5
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
  // console.log(cardCounts);
  const cardValueCounts = Object.values(cardCounts)
  // console.log(cardValueCounts);
  // @ts-ignore
  const maxValue = Math.max(...cardValueCounts)
  if (maxValue === 4) {
    return 5
  }
  if (maxValue === 3) {
    if (cardValueCounts.includes(2)) {
      return 4
    }
    return 3
  }
  if (maxValue === 2) {
    return <number>cardValueCounts.reduce((acc: number, value: number) => value === 2 ? acc + 1 : acc, 0)
  }
  return 0
}

export const rankHands = (hands: {hand: string, bid: number}[]) => {
  hands.sort((a, b) => {
    if (getType(a.hand) === getType(b.hand)) {
      const cardArray1 = a.hand.split('')
      const cardArray2 = b.hand.split('')
      let difference: number
      for (let i = 0; i < 5 && !difference; i++) {
        if (cardArray1[i] !== cardArray2[i]) {
          difference = cards.indexOf(cardArray1[i]) - cards.indexOf(cardArray2[i])
        }
      }
      return difference
    }
    return getType(a.hand) - getType(b.hand)
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

  return
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
