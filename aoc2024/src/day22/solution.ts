export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(Number)
}

export const calculateSecretNumber = (secretNumber: number): number => {
  let newSecretNumber
  newSecretNumber = prune(mix(secretNumber * 64, secretNumber))
  newSecretNumber = prune(mix(Math.floor(newSecretNumber / 32), newSecretNumber))
  newSecretNumber = prune(mix(newSecretNumber * 2048, newSecretNumber))
  return newSecretNumber
}

export const mix = (value: number, secretNumber: number): number => {
  return Number(BigInt(secretNumber) ^ BigInt(value))
}

export const prune = (value: number): number => {
  return value % 16777216
}

export const runCalculations = (initialSecretNumber:number) => {
  let currentSecretNumber = initialSecretNumber
  for (let i = 0; i < 2000; i++) {
    currentSecretNumber = calculateSecretNumber(currentSecretNumber)
  }
  return currentSecretNumber
}

export const part1 = (rawInput: string):number => {
  const initialSecretNumbers = parseInput(rawInput)
  const secretNumbers = initialSecretNumbers.map(runCalculations)
  return secretNumbers.reduce((acc, current) => acc + current, 0)
}

export const findSecretNumberLists = (initialSecretNumber: number) => {
  const secretNumberList = []
  let currentSecretNumber = initialSecretNumber
  secretNumberList.push(currentSecretNumber)
  for (let i = 0; i < 2000; i++) {
    currentSecretNumber = calculateSecretNumber(currentSecretNumber)
    secretNumberList.push(currentSecretNumber)
  }
  return secretNumberList
}

function findKeysStartingWith(map: Map<string, number>, prefix: string): string[] {
  return Array.from(map.keys()).filter(key => key.startsWith(prefix));
}

export const organizeBuyerData = (initialSecretNumbers: number[]) => {
  console.time('organizeBuyerData')
  const buyersSecrets = initialSecretNumbers.map(findSecretNumberLists)
  const allSequenceScoresAsStrings = new Map<string, string>();
  const buyerIds = buyersSecrets.map(buyerSecrets => buyerSecrets[0])
  let sequenceSuffix = ''

  buyerIds.forEach((buyerId) => {
    sequenceSuffix += `_${buyerId}:0`
  })
  function setAllSequenceScores(sequence: string, buyerId: number, price: number) {
    const foundSequence = allSequenceScoresAsStrings.get(sequence)!
    let newSequenceValues
    if (foundSequence) {
      newSequenceValues = foundSequence.replace(`_${buyerId}:0`, `_${buyerId}:${price}`)
    } else {
      newSequenceValues = sequenceSuffix.replace(`_${buyerId}:0`, `_${buyerId}:${price}`)
    }
    allSequenceScoresAsStrings.set(sequence, newSequenceValues)
  }

  buyersSecrets.forEach((buyerSecrets) => {
    const buyerId = buyerSecrets[0]
    const buyerSecretsRecords: SecretRecord[] = []
    buyerSecrets.forEach((secretNumber, index) => {
      const price = Number(secretNumber.toString().slice(-1))
      const change = index === 0 ? null : price - Number(buyerSecrets[index - 1].toString().slice(-1))
      buyerSecretsRecords.push({secretNumber, price, change})
    })
    const sequenceScores = new Map<string, number>();
    const changes = buyerSecretsRecords.filter(record => record.change !== null).map(record => record.change) as number[];
    const prices = buyerSecretsRecords.filter(record => record.change !== null).map(record => record.price) as number[];
    for (let i = 0; i <= changes.length - 4; i++) {
      const sequence = changes.slice(i, i + 4).join(',')

      let scoreForSequence = prices[i+3]
      if (!sequenceScores.has(sequence) || scoreForSequence > sequenceScores.get(sequence)!) {
        sequenceScores.set(sequence, scoreForSequence);
        setAllSequenceScores(sequence, buyerId, scoreForSequence)
      }
    }
  })
  console.timeEnd('organizeBuyerData')
  return allSequenceScoresAsStrings
}

type SecretRecord = {
  secretNumber: number,
  price: number,
  change: number|null
}

function calculateBestScore(allSequenceScores: Map<string, string>) {
  console.time('calculateBestScore')
  console.time('calculateBestScore setup')
  const allSequences = Array.from(new Set(Array.from(allSequenceScores.keys()).map(key => key.split('_')[0])))
  const sequenceScores = new Map<string, number>();
  console.timeEnd('calculateBestScore setup')

  console.log(`Calculating best score for ${allSequences.length} sequences...`)
  let time = new Date().getTime()
  for (let i = 0; i < allSequences.length; i++) {
    let scoreForSequence = 0
    const sequence = allSequences[i]
    const validSequenceKeys = allSequenceScores.get(sequence)!
    const buyerIdsAndPrices = validSequenceKeys.slice(1).split('_')
    const prices = buyerIdsAndPrices.map(key => Number(key.split(':')[1]))
    scoreForSequence = prices.reduce((acc, current) => acc + current, 0)

    sequenceScores.set(sequence, scoreForSequence)
    if (i % 1000 === 0) {
      console.log(`Sequence ${i} of ${allSequences.length} took ${new Date().getTime() - time}ms`)
      time = new Date().getTime()
    }
  }
  console.timeEnd('calculateBestScore')
  const sortedSequences = Array.from(sequenceScores.entries()).sort((a, b) => {
    return b[1] - a[1]
  });
  console.log(sortedSequences[0])
  return sortedSequences[0][1]
}

export const part2 = (rawInput: string): number => {
  const initialSecretNumbers = parseInput(rawInput)
  console.time('organizeBuyerData')
  const organizedBuyerData = organizeBuyerData(initialSecretNumbers)
  console.timeEnd('organizeBuyerData')
  return calculateBestScore(organizedBuyerData)
}

export const exampleInputPart1 =  `1
10
100
2024`

export const exampleInputPart2 = `1
2
3
2024`
