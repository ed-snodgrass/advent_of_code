const convertRawClawConfig = (rawClawConfig: string[]) => {
  const buttonAMatch = rawClawConfig[0].match(/Button A: X\+(?<x>\d+), Y\+(?<y>\d+)/)
  const buttonBMatch = rawClawConfig[1].match(/Button B: X\+(?<x>\d+), Y\+(?<y>\d+)/)
  const prizeMatches = rawClawConfig[2].match(/Prize: X=(?<x>\d+), Y=(?<y>\d+)/)

  if (buttonAMatch?.groups && buttonBMatch?.groups && prizeMatches?.groups) {
    const buttonA: [number, number] = [Number(buttonAMatch.groups.x), Number(buttonAMatch.groups.y)]
    const buttonB: [number, number] = [Number(buttonBMatch.groups.x), Number(buttonBMatch.groups.y)]
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

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)

  return -1
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
