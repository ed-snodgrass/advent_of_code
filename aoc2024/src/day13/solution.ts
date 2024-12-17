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

function minimumScoreToTarget(clawConfig: ClawConfig) {
  const [a1, b1] = clawConfig.buttonA;
  const [a2, b2] = clawConfig.buttonB;
  const [x, y] = clawConfig.prizeLocation
  const cost1 = 3; // Cost of move 1
  const cost2 = 1; // Cost of move 2

  // Helper function to compute if values are integers
  function isInteger(value: number) {
    return Number.isInteger(value);
  }

  // Compute the determinant of the coefficient matrix
  const determinant = a1 * b2 - a2 * b1;

  // If the determinant is zero, the system of equations is linearly dependent (no unique solution)
  if (determinant === 0) {
    return -1;
  }

  // Solve for m and n using Cramer's rule
  const m = (x * b2 - y * a2) / determinant;
  const n = (y * a1 - x * b1) / determinant;

  // Ensure both m and n are integers
  if (!isInteger(m) || !isInteger(n) || m < 0 || n < 0) {
    return -1; // Invalid solution
  }

  // Calculate the cost based on m and n
  return cost1 * m + cost2 * n
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

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
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
