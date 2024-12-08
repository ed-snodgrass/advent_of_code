export const parseInput = (rawInput: string): number[][]|undefined => {
  const input = rawInput.split('\n');
  const mulMatches = input.join('').match(/(?<instruction>mul\(\d+,\d+\))/g)
  const digitMatches = mulMatches ? mulMatches.join(':').match(/\d+,\d+/g) : []

  return digitMatches ? digitMatches.map((digit) => digit.split(",").map(Number)) : []
}

export const isEnabled = (enabled: boolean, currentIndex: number, nextDontIndex: number, nextDoIndex: number): boolean => {
  if (enabled) {
    if (nextDontIndex === -1) {
      return true
    }
    if (currentIndex < nextDontIndex) {
      return true
    } else {
      if (nextDoIndex === -1) {
        return false
      } else if (currentIndex > nextDoIndex){
        return nextDoIndex > nextDontIndex
      }
      return false
    }
  } else {
    if (nextDoIndex === -1) {
      return false
    }
    if (currentIndex < nextDoIndex) {
      return false
    } else {
      if (nextDontIndex === -1) {
        return currentIndex > nextDoIndex
      } else {
        if (currentIndex < nextDontIndex && currentIndex > nextDoIndex) {
          return true
        }
        return nextDontIndex < nextDoIndex;
      }
    }
  }
}

export const updateNext = (current: number, dontIndex: number, dontIndexes: number[], doIndex: number, doIndexes: number[]): boolean[] => {
  if (dontIndexes.length === 0 && doIndexes.length === 0) {
    return [false, false]
  }
  if (current < dontIndex) {
    if (current < doIndex) {
      return [false, false]
    } else if (current > doIndex) {
      return [false, true]
    }
    return [false, false]
  } else if (current > dontIndex) {
    if (current > doIndex) {
      return [true, true]
    } else if (current < doIndex) {
      return [true, false]
    }
    return [true, false]
  }
  return [true, true]
}

const getIndexesAndMultiplierValues = (inputString:string) => {
  const doPattern = /do\(\)/g;
  let doMatch
  const doIndexes = []
  while((doMatch = doPattern.exec(inputString)) !== null) {
    doIndexes.push(doMatch.index)
  }
  const dontPattern = /don't\(\)/g;
  let dontMatch
  const dontIndexes = []
  while((dontMatch = dontPattern.exec(inputString)) !== null) {
    dontIndexes.push(dontMatch.index)
  }

  const multiplierPattern = /mul\(\d+,\d+\)/g
  let multiplierMatch
  const multiplierIndexes = []
  const multipliers = []
  while((multiplierMatch = multiplierPattern.exec(inputString)) !== null) {
    multiplierIndexes.push(multiplierMatch.index)
    multipliers.push(multiplierMatch[0])
  }
  return {doIndexes, dontIndexes, multiplierIndexes, multipliers}
}

export const parseInputWithConditionals = (rawInput: string): number[][]|undefined => {
  const input = rawInput.split('\n');
  const fullString = input.join('')
  let {doIndexes, dontIndexes, multiplierIndexes, multipliers} = getIndexesAndMultiplierValues(fullString)

  const validMultipliers: string[] = []
  let enabled = true
  let nextDoIndex = doIndexes.shift() || -1
  let nextDontIndex = dontIndexes.shift() || -1

  for (let i = 0; i < multiplierIndexes.length; i++) {
    const currentIndex = multiplierIndexes[i]
    enabled = isEnabled(enabled, currentIndex, nextDontIndex, nextDoIndex)

    const [updateDont, updateDo] = updateNext(currentIndex, nextDontIndex, dontIndexes, nextDoIndex, doIndexes)
    if (updateDont) {
      nextDontIndex = dontIndexes.shift() || -1
    }
    if (updateDo) {
      nextDoIndex = doIndexes.shift() || -1
    }
    if (enabled) {
      validMultipliers.push(multipliers[i])
    }
  }
  const digitMatches = validMultipliers ? validMultipliers.join(':').match(/\d+,\d+/g) : []

  return digitMatches ? digitMatches.map((digit) => digit.split(",").map(Number)) : []
}
export const exampleInputPart1 =  `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

export const exampleInputPart2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

export const processMultipliers = (parsedInput: number[][]|undefined) => {
  if (!parsedInput) {
    return 0
  }
  return parsedInput.reduce((acc, current) => {
    const product = current[0] * current[1]
    acc += product
    return acc
  }, 0)
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return processMultipliers(input)
}

export const part2 = (rawInput: string) => {
  const input = parseInputWithConditionals(rawInput)

  return processMultipliers(input)
}
