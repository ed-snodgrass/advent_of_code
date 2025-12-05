export const parseInput = (rawInput: string) => {
  const lines = rawInput.trim().split('\n\n')
  const freshRanges = lines[0].split('\n').map(range => range.split('-').map(rangeItem => parseInt(rangeItem)))
  const availableIngredients = lines[1].split('\n').map(ingredient => parseInt(ingredient))

  return { freshRanges, availableIngredients }
}

export const part1 = (rawInput: string):number => {
  const { freshRanges, availableIngredients } = parseInput(rawInput)
  let freshCount = 0
  for (let i = 0; i < availableIngredients.length; i++) {
    let isFresh = false
    for (let j = 0; j < freshRanges.length && !isFresh; j++) {
      isFresh = availableIngredients[i] >= freshRanges[j][0] && availableIngredients[i] <= freshRanges[j][1]
      if (isFresh) freshCount++
    }
  }
  return freshCount
}

export const part2 = (rawInput: string): number => {
  const { freshRanges, availableIngredients } = parseInput(rawInput)
  let freshIngredientCount = 0

  return freshIngredientCount
}

export const exampleInputPart1 =  `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

export const exampleInputPart2 = exampleInputPart1
