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
  const [a1, b1] = clawConfig.buttonA; // Move option 1
  const [a2, b2] = clawConfig.buttonB; // Move option 2
  const cost1 = 3; // Cost of move 1
  const cost2 = 1; // Cost of move 2

  const priorityQueue = [[0, 0, 0]]; // [currentX, currentY, totalScore]
  const visited = new Map(); // To store visited positions with their minimum score

  const getKey = (x:number, y:number) => `${x},${y}`;

  // Dijkstra’s algorithm loop
  while (priorityQueue.length > 0) {
    // Sort the queue by score so we always expand the node with the smallest score
    priorityQueue.sort((a, b) => a[2] - b[2]);

    // @ts-ignore
    const [currentX, currentY, currentScore] = priorityQueue.shift();
    const key = getKey(currentX, currentY);

    if (currentScore > 400) return -1
    if (currentX === clawConfig.prizeLocation[0] && currentY === clawConfig.prizeLocation[1]) return currentScore;

    // If this position has already been visited with a lower score, skip it
    if (visited.has(key) && visited.get(key) <= currentScore) continue;
    visited.set(key, currentScore);

    // Generate new positions with their respective scores
    const nextPositions = [
      [currentX + a1, currentY + b1, currentScore + cost1],
      [currentX + a2, currentY + b2, currentScore + cost2],
    ];

    // Add all valid new positions to the priority queue
    for (const [nextX, nextY, nextScore] of nextPositions) {
      const nextKey = getKey(nextX, nextY);
      if (!visited.has(nextKey) || visited.get(nextKey) > nextScore) {
        priorityQueue.push([nextX, nextY, nextScore]);
      }
    }
  }

  // If the target is unreachable
  return -1;
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
