export const parseInput = (rawInput: string) => {
  const lines = rawInput.trim().split('\n\n')
  const freshRanges = lines[0].split('\n').map(range => range.split('-').map(rangeItem => parseInt(rangeItem)))
  const availableIngredients = lines[1].split('\n').map(ingredient => parseInt(ingredient))
  freshRanges.sort((a, b) => a[0] - b[0])
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

export function hasOverlap(targetValue: number, range: [number, number]): boolean {
  let [start, end] = range
  return targetValue >= start && targetValue <= end
}
export function findNewStart(smallerRange: [number, number]): number {

  return smallerRange[0] + 1
}

export function countFreshIngredients (freshRanges: [number, number][]): number {
  let count = 0
  count = freshRanges[0][1] - freshRanges[0][0] + 1

  for (let i = 1; i < freshRanges.length; i++) {
    let [start, end] = freshRanges[i]
    let [prevStart, prevEnd] = freshRanges[i - 1]

    if (hasOverlap(start, [prevStart, prevEnd]) || hasOverlap(end, [prevStart, prevEnd]) || hasOverlap(prevStart, [start, end]) || hasOverlap(prevEnd, [start, end])) {
      const newStart = prevEnd + 1
      if (newStart < start) freshRanges[i][0] = newStart

      if (end > newStart) {
        count += end - newStart + 1
      } else {
        // console.log(`start: ${start}, newStart: ${newStart}, end: ${end}, prevStart: ${prevStart}, prevEnd: ${prevEnd}`)
        freshRanges[i][0] = start > prevStart ? prevStart : start
        freshRanges[i][1] = end > prevEnd ? end : prevEnd
      }
    } else {
      count += end - start + 1
    }
  }
  return count
}

export const part2 = (rawInput: string): number => {
  const { freshRanges} = parseInput(rawInput)
  return countFreshIngredients(freshRanges as [number, number][])
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
