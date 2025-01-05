export const replaceStone = (engraving: number) => {
  if (engraving === 0) {
    return [1]
  }
  const engravingString = engraving.toString()
  if (engravingString.length % 2 === 0) {
    const middle = engravingString.length / 2
    return [Number(engravingString.slice(0, middle)), Number(engravingString.slice(middle))]
  }
  return [engraving * 2024]
}

export const parseInput = (rawInput: string) => {
  return rawInput.split(" ").map(Number)
}

export const performBlink = (engravings: number[]) => {
  const newStones = []
  for (const engraving of engravings) {
    newStones.push(...replaceStone(engraving))
  }

  return newStones
}

export const performBlinkMany = (stones: number[], blinks: number) => {
  let newStones: number[] = stones
  for (let i = 0; i < blinks; i++) {
    newStones = performBlink(newStones)
  }
  return newStones
}

export const part1 = (rawInput: string):number => {
  const initialStones = parseInput(rawInput)
  return performBlinkMany(initialStones, 25).length
}

export const performBlink2 = (stones: Map<number, number>) => {
  const newStones = new Map<number, number>()
  for (const [stone, count] of stones) {
    const replacementStones = replaceStone(stone)
    replacementStones.forEach(replacementStone => {
      if (newStones.has(replacementStone)) {
        newStones.set(replacementStone, newStones.get(replacementStone)! + count)
      } else {
        newStones.set(replacementStone, count)
      }
    })
  }
  return newStones
}

export const performBlinkManyPart2 = (initialStones: Map<number, number>, blinks: number) => {
  let newStones = initialStones
  for (let i = 0; i < blinks; i++) {
    console.time(`Blink ${i + 1}`)
    newStones = performBlink2(newStones)
    console.timeEnd(`Blink ${i + 1}`)
  }
  return newStones
}

export const part2 = (rawInput: string): number => {
  const initialStones = parseInput(rawInput)
  const initialCounts = new Map<number, number>()
  for (const stone of initialStones) {
    if (initialCounts.has(stone)) {
      initialCounts.set(stone, initialCounts.get(stone)! + 1)
    } else {
      initialCounts.set(stone, 1)
    }
  }
  return [...performBlinkManyPart2(initialCounts, 75)].reduce((acc, [stone, count]) => acc + count, 0)
}

export const exampleInputPart1 =  `125 17`
