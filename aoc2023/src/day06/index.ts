import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n')

export const getRaces = (lines: string[]) => {
  const times = lines[0].replace(/Time:\s+/, ' ').split(/\s+/)
  const distances = lines[1].replace(/Distance:\s+/, ' ').split(/\s+/)

  const races = []
  for (let i = 1; i < times.length; i++) {
    races.push({time: Number.parseInt(times[i]), distance: Number.parseInt(distances[i])})
  }
  return races
}

export const getWinningWays = (race: {distance: number, time: number}) => {
  const ways = []
  for (let i = race.time; i > 0; i--) {
    if (i * (race.time - i) > race.distance) {
      ways.push(i)
    }
  }
  return ways.length
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const races = getRaces(input)
  const winningWays = races.map(getWinningWays)
  return winningWays.reduce((acc, value) => acc * value, 1)
}

export const getRace = (lines: string[]) => {
  const time = lines[0].replace(/Time:\s+/, ' ').replace(/\s+/g, '')
  const distance = lines[1].replace(/Distance:\s+/, ' ').replace(/\s+/g, '')

  return {time: Number.parseInt(time), distance: Number.parseInt(distance)}
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const race = getRace(input)
  return getWinningWays(race)
}

export const exampleInput = `Time:      7  15   30
Distance:  9  40  200`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 288,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
