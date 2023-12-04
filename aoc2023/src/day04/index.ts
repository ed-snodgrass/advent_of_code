import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n')

export const getScores = (parsedInput: string[]) => {
  return parsedInput.map(card => {
    const cardMatch = card.match(/Card\s+(?<id>\d+):\s+(?<winningNumbers>.*)\s\|\s+(?<yourNumbers>.*)/)
    const winningNumbers = cardMatch.groups.winningNumbers.split(/\s+/)
    const yourNumbers = cardMatch.groups.yourNumbers.split(/\s+/)
    const matchingNumbers = yourNumbers.filter(yourNumber => winningNumbers.includes(yourNumber))
    const score = matchingNumbers.reduce((acc) => {
      if (acc === 0) {
        return 1
      } else {
        return acc * 2
      }
    }, 0)
    return {id: cardMatch.groups.id, winningNumbers, yourNumbers, score }
  })
}
export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const scores = getScores(input)

  return scores.reduce((acc, score) => {
    return acc + score.score
  }, 0)
}

export const getCards = (parsedInput: string[]) => {
  return parsedInput.map((card) => {
    const cardMatch = card.match(/Card\s+(?<id>\d+):\s+(?<winningNumbers>.*)\s\|\s+(?<yourNumbers>.*)/)
    const winningNumbers = cardMatch.groups.winningNumbers.split(/\s+/)
    const yourNumbers = cardMatch.groups.yourNumbers.split(/\s+/)
    const matchingNumbers = yourNumbers.filter(yourNumber => winningNumbers.includes(yourNumber))
    return {id: cardMatch.groups.id, winningNumbers, yourNumbers, matchingNumbers}
  })
}

const getCopyCounts = (cards: { id: string, matchingNumbers: string | any[] }[]) => {
  const cardCounts = cards.map(card => 1)
  cards.forEach((card, index) => {
      for(let i = 0; i < card.matchingNumbers.length; i++) {
        const targetCard = index + i + 1
        if (cardCounts[targetCard]) {
          cardCounts[targetCard] += cardCounts[index]
        } else {
          console.error('should not be here')
          cardCounts[targetCard] = cardCounts[index]
        }
      }
  })
  return cardCounts
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const cards = getCards(input)
  const counts = getCopyCounts(cards)
  return Object.values(counts).reduce((acc, value) => acc + value, 0)
}

export const exampleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 13,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
