import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

function findCommonCharacters(firstCompartment, secondCompartment) {
  const commonCharacters = []
  for (let i = 0; i < firstCompartment.length; i++) {
    if (secondCompartment.includes(firstCompartment[i])) {
      commonCharacters.push(firstCompartment[i])
    }
  }
  return commonCharacters
}

function findCharacterPriority(commonCharacter) {
  if (commonCharacter.charCodeAt(0) >= 97) {
    return commonCharacter.charCodeAt(0) - 96
  } else {
    return commonCharacter.charCodeAt(0) - 64 + 26
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return input.reduce((accumulator, currentValue) => {
    const compartmentSize = Math.floor(currentValue.length / 2)
    const firstCompartment = currentValue.substring(0, compartmentSize)
    const secondCompartment = currentValue.substring(compartmentSize)
    const commonCharacter = findCommonCharacters(firstCompartment, secondCompartment)[0]
    return accumulator + findCharacterPriority(commonCharacter)
  }, 0)
}

function findCommonCharactersOfThree(inputElement, inputElement2, inputElement3) {
  const commonCharacters = findCommonCharacters(inputElement, inputElement2);
  const badge = findCommonCharacters(commonCharacters, inputElement3);
  return badge[0];
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let score = 0
  let groupIndex = 0
  while (groupIndex < input.length) {
    const badge = findCommonCharactersOfThree(input[groupIndex], input[groupIndex + 1], input[groupIndex + 2])
    score += findCharacterPriority(badge)
    groupIndex += 3
  }
  return score
}

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
