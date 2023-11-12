import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const [ORE_ROBOT, CLAY_ROBOT, OBSIDIAN_ROBOT, GEODE_ROBOT] = [0, 1, 2, 3]
const ROBOT_TYPES = [ORE_ROBOT, CLAY_ROBOT, OBSIDIAN_ROBOT, GEODE_ROBOT]
export const parseBlueprint = (line) => {
  const blueprintParser = /^Blueprint (\d+):\sEach ore robot costs (\d+) ore\.\sEach clay robot costs (\d+) ore\.\sEach obsidian robot costs (\d+) ore and (\d+) clay\.\sEach geode robot costs (\d+) ore and (\d+) obsidian./
  const matcher = line.match(blueprintParser)
  const id = Number(matcher[1])
  const oreRobotOreCost = Number(matcher[2])
  const clayRobotOreCost = Number(matcher[3])
  const obsidianRobotOreCost = Number(matcher[4])
  const obsidianRobotClayCost = Number(matcher[5])
  const geodeRobotOreCost = Number(matcher[6])
  const geodeRobotObsidianCost = Number(matcher[7])

  const costs = [[oreRobotOreCost, 0, 0], [clayRobotOreCost, 0, 0], [obsidianRobotOreCost, obsidianRobotClayCost, 0], [geodeRobotOreCost, 0, geodeRobotObsidianCost]]
  const greatestOreCost = [oreRobotOreCost, clayRobotOreCost, geodeRobotOreCost, obsidianRobotOreCost].sort((a, b) => {
    return b - a
  })[0]
  const robotLimit = [greatestOreCost, obsidianRobotClayCost, geodeRobotObsidianCost]
  return {id, costs, robotLimit }
}

const initialState = (numberOfMinutes) => ({
  timer: numberOfMinutes,
  minerals: [0, 0, 0],
  bots: [1, 0, 0],
  geodes: 0,
})

const canMake = (state, blueprint, type) => {
  return blueprint.costs[type].every((cost, typeIndex) => cost <= state.minerals[typeIndex])
}

const makeRobot = (state, blueprint, type) => {
  const tempState = {
    timer: state.timer,
    minerals: [...state.minerals],
    bots: [...state.bots],
    geodes: state.geodes,
  }
  while (!canMake(tempState, blueprint, type) && tempState.timer > 1) {
    tempState.minerals = tempState.minerals.map((mineralCount, typeIndex) => mineralCount + tempState.bots[typeIndex])
    tempState.timer = tempState.timer - 1
  }
  tempState.timer = tempState.timer - 1
  const cost = blueprint.costs[type]
  tempState.minerals = tempState.minerals.map((mineralCount, typeIndex) => mineralCount - cost[typeIndex] + tempState.bots[typeIndex])
  if (type === GEODE_ROBOT) {
    tempState.geodes = tempState.geodes + tempState.timer
  } else {
    tempState.bots[type] = tempState.bots[type] + 1
  }
  return tempState
}

const findMaxGeodes = (state, blueprint) => {
  if (state.timer === 1) {
    return state.geodes
  }
  let best = state.geodes
  for (const type of ROBOT_TYPES) {
    if (
      blueprint?.robotLimit[type] < state.bots[type] ||
      (type === ORE_ROBOT && state.bots[CLAY_ROBOT] > 1) ||
      (type === OBSIDIAN_ROBOT && state.bots[CLAY_ROBOT] === 0) ||
      (type === GEODE_ROBOT && state.bots[OBSIDIAN_ROBOT] === 0)) {
      continue
    }
    const nextState = makeRobot(state, blueprint, type)
    if (nextState.timer === 0) {
      continue
    }
    const score = findMaxGeodes(nextState, blueprint)
    best = Math.max(best, score)
  }
  return best
}

export const determineQualityLevel = (blueprint, length) => {
  const state = initialState(length)
  return findMaxGeodes(state, blueprint)
}

export const sumOfQualityLevels = qualityLevels => {
  return qualityLevels.reduce((acc, qualityLevel) => acc + qualityLevel, 0)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split('\n')
  const blueprints = input.map(parseBlueprint)
  const qualityLevels = blueprints.map((blueprint) => {
    return determineQualityLevel(blueprint, 24) * blueprint.id
  })
  return sumOfQualityLevels(qualityLevels)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split('\n')
  const blueprints = input.map(parseBlueprint)
  // NOTE: Test data only has 2 lines of data so
  const blueprintsToCheck = blueprints.length >= 3 ? [blueprints[0], blueprints[1], blueprints[2]] : [blueprints[0], blueprints[1]]
  const qualityLevels = blueprintsToCheck.map((blueprint) => {
    return determineQualityLevel(blueprint, 32)
  })
  return qualityLevels.reduce((acc, qualityLevel) => acc * qualityLevel, 1)
}

const testInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 33,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 3472,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
