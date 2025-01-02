const convertRawClawConfig = (rawClawConfig: string[]): ClawConfig => {
  const buttonAMatch = rawClawConfig[0].match(/Button A: X\+(?<x>\d+), Y\+(?<y>\d+)/)
  const buttonBMatch = rawClawConfig[1].match(/Button B: X\+(?<x>\d+), Y\+(?<y>\d+)/)
  const prizeMatches = rawClawConfig[2].match(/Prize: X=(?<x>\d+), Y=(?<y>\d+)/)

  if (buttonAMatch?.groups && buttonBMatch?.groups && prizeMatches?.groups) {
    const buttonAX: number = Number(buttonAMatch.groups.x)
    const buttonAY: number = Number(buttonAMatch.groups.y)
    const buttonBX: number = Number(buttonBMatch.groups.x)
    const buttonBY: number = Number(buttonBMatch.groups.y)

    const buttonA: Button = [buttonAX, buttonAY]
    const buttonB: Button = [buttonBX, buttonBY]
    const prizeLocation: [number, number] = [Number(prizeMatches.groups.x), Number(prizeMatches.groups.y)]
    return {
      buttonA,
      buttonB,
      prizeLocation
    }
  } else {
    throw new Error('Invalid claw config')
  }
}

export const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n\n")
    .map((clawConfig) => clawConfig.split("\n"))
    .map(convertRawClawConfig)
}
type Button = [number, number]

export type ClawConfig = {
  buttonA: Button
  buttonB: Button
  prizeLocation: [number, number]
}

function cramerSolve(a: [number, number], b: [number, number],x: number, y:number): [number, number] {
  const [a1, b1] = a
  const [a2, b2] = b

  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    return [-1,-1]
  }

  const m:number = (x * b2 - y * a2) / determinant;
  const n:number = (y * a1 - x * b1) / determinant;
  if (!Number.isInteger(m) || !Number.isInteger(n) || m < 0 || n < 0) {
    return [-1,-1]
  }
  return [m, n]
}

function minimumScoreToTarget(clawConfig: ClawConfig) {
  const [a1, b1] = clawConfig.buttonA;
  const [a2, b2] = clawConfig.buttonB;
  const [x, y] = clawConfig.prizeLocation
  const costOfMove1 = 3;
  const costOfMove2 = 1;

  const [m, n] = cramerSolve([a1, b1], [a2, b2], x, y);
  if (!Number.isInteger(m) || !Number.isInteger(n) || m < 0 || n < 0) {
    return -1;
  }
  return costOfMove1 * m + costOfMove2 * n
}

export const part1 = (rawInput: string):number => {
  const clawConfigs = parseInput(rawInput)
  const minimumScoreToTargets = clawConfigs.map(minimumScoreToTarget)

  return minimumScoreToTargets.reduce((acc, score) => {
    if (score > 0) {
      return acc + score
    } else {
      return acc
    }
  }, 0)
}

export const part2 = (rawInput: string):number => {
  const clawConfigs = parseInput(rawInput).map((clawConfig: ClawConfig) => {
    const [a, b] = clawConfig.prizeLocation
    return {...clawConfig, prizeLocation: [a + 10000000000000, b + 10000000000000] as [number, number]}
  })
  const minimumScoreToTargets = clawConfigs.map(minimumScoreToTarget)

  return minimumScoreToTargets.reduce((acc, score) => {
    if (score > 0) {
      return acc + score
    } else {
      return acc
    }
  }, 0)
}

export const exampleInputPart1 =  `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

export const exampleInputPart2 = exampleInputPart1
