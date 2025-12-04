export const parseInput = (rawInput: string) => {
  return rawInput.trim().split(',').map(range => range.split('-').map(rangeValue => parseInt(rangeValue)));
}

export function findInvalidIds(rangeStart: number, rangeEnd: number): number[] {
  const invalidIds = []
  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (i.toString().length % 2 == 0) {
      const middleIndex = i.toString().length / 2
      const firstHalf = i.toString().slice(0, middleIndex)
      const secondHalf = i.toString().slice(middleIndex)
      if (firstHalf === secondHalf) {
        invalidIds.push(i)
      }
    }
  }
  return invalidIds
}

export function findInvalidScore(idRanges: number[][]) {
  return idRanges
    .flatMap(idRange => findInvalidIds(idRange[0], idRange[1]))
    .reduce((acc, currentValue)=> acc + currentValue, 0)
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  return findInvalidScore(input)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

export const exampleInputPart2 = exampleInputPart1
