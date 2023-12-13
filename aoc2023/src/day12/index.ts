import run from "aocrunner"

type SpringCondition = {
  status: string,
  index: number
}

type DamageRecord = {
  springConditions: SpringCondition[],
  groupings: number[]
}

export const parseInput = (rawInput: string): DamageRecord[] => rawInput.split('\n').map(line => {
  const parts = line.split(' ')
  return {springConditions: parts[0].split('').map((condition, index) => ({status: condition, index})), groupings: parts[1].split(',').map(group => Number.parseInt(group))}
})

const getGroupsOfDamaged = (springConditions: SpringCondition[]) => {
  const groupsOfDamaged: SpringCondition[][] = []
  let group: SpringCondition[]
  springConditions.forEach((springCondition, index) => {
    // console.log(springCondition);
    if (springCondition.status === '#') {
      if (!group?.length) {
        group = []
      }
      group.push(springCondition)
      if (index === springConditions.length - 1) {
        groupsOfDamaged.push(group)
      }
    } else {
      if (group?.length) {
        groupsOfDamaged.push(group)
        group = undefined
      }
    }
  })
  return groupsOfDamaged
}

function combinations(array: number[], combinationLength: number) {
  const newArray = new Array(1 << array.length).fill(undefined).map(
    (e1, i) => array.filter((e2, j) => i & 1 << j));
  return newArray.filter(a => a.length === combinationLength)
}

const buildString = (springConditions: SpringCondition[]) => {
  return springConditions.map(condition => condition.status).join('')
}

export const findPossibleReplacementOptions = (springConditions: SpringCondition[], hiddenCount: number) => {
  const unknownIndexes = springConditions.filter(condition => condition.status === '?').map((condition) => condition.index)
  const allArrangements : SpringCondition[][] = []

  const allPossibleIndexCombinations = combinations(unknownIndexes, hiddenCount)
  // console.log('allPossibleIndexCombinations', allPossibleIndexCombinations);
  allPossibleIndexCombinations.forEach((pairedIndexes) => {
    allArrangements.push(springConditions.map((springCondition, index) => {
      if (springCondition.status === '?') {
        if (pairedIndexes.includes(springCondition.index)) {
          return {status: '#', index: springCondition.index}
        } else {
          return {status: '.', index: springCondition.index}
        }
      }
      return springCondition
    }))
  })
  return allArrangements
}
export const findArrangementCount = (damageRecord: DamageRecord) => {
  // console.log(JSON.stringify(damageRecord))
  const originalString = damageRecord.springConditions.map(condition => condition.status).join('')
  // console.log('originalString', originalString);
  const totalSprings = damageRecord.springConditions.length
  const damaged = damageRecord.springConditions.filter((condition, index) => condition.status === '#')
  const unknownCondition = damageRecord.springConditions.filter((condition, index) => condition.status === '?')
  const knownDamagedCount = damaged.length
  const totalDamagedCount = damageRecord.groupings.reduce((sum, value) => sum + value, 0)
  const hiddenCount = totalDamagedCount - knownDamagedCount

  const numberOfGroups = damageRecord.groupings.length
  const newSpringConditions: SpringCondition[] = []
  const allPossibleReplacementOptions = findPossibleReplacementOptions(damageRecord.springConditions, hiddenCount)
  const allValidArrangements = []
  allPossibleReplacementOptions.forEach(replacementOption => {
    const groupsOfDamaged = getGroupsOfDamaged(replacementOption)
    if (groupsOfDamaged.length === numberOfGroups) {
      let isCorrectLength = true
      damageRecord.groupings.forEach((grouping, index) => {
        if (groupsOfDamaged[index].length !== grouping) {
          isCorrectLength = false
        }
      })
      if (isCorrectLength) {
        allValidArrangements.push(groupsOfDamaged)
      }
    }
  })

  return allValidArrangements.length
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  input.map(findArrangementCount)
  return input.map(findArrangementCount).reduce((sum, value) => sum + value, 0)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}
export const exampleInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`


run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 21,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
