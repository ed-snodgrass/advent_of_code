
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

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `125 17`

export const exampleInputPart2 = exampleInputPart1
