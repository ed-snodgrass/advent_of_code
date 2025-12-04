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

export function findInvalidIds2(rangeStart: number, rangeEnd: number): number[] {
  const invalidIds = []
  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (isInvalid(i)) {
      invalidIds.push(i)
    }
  }
  return invalidIds
}

export function findInvalidScore2(idRanges: number[][]) {
  return idRanges
    .flatMap(idRange => findInvalidIds2(idRange[0], idRange[1]))
    .reduce((acc, currentValue)=> acc + currentValue, 0)
}

export function isInvalid(id: number) {
  const stringId = id.toString()
  if (stringId.length === 1) {
    return false
  }
  if (Array.from(new Set(stringId.split(''))).length === 1) {
    return true
  }
  for (let i = 2; i < stringId.length; i++) {
    const chunks = stringId.match(new RegExp(`.{1,${i}}`, 'g'));
    if (chunks.length > 1 && Array.from(new Set(chunks)).length === 1) {
      return true
    }
  }
  return false
}

export const part1 = (rawInput: string):number => {
  return findInvalidScore(parseInput(rawInput))
}

export const part2 = (rawInput: string): number => {
  return findInvalidScore2(parseInput(rawInput))
}

export const exampleInputPart1 =  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

export const exampleInputPart2 = exampleInputPart1
