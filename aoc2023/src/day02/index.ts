import run from "aocrunner"

export const availableCubes = {
  blues: 14, reds: 12, greens: 13
}

export const parseInput = (rawInput: string) => rawInput.split('\n')
export const getGames = (rawInput: string) => {
  return parseInput(rawInput).map(line => {
    const foundGameIdMatch = line.match(/Game\s(?<id>\d+):\s/)
    const gameId = Number.parseInt(foundGameIdMatch.groups.id)
    const showings = line.replace(/Game\s\d+:\s/u, '').split(';').map(showing => {
      const foundBlueCubesShown = showing.match(/(?<blues>\d+)\sblue/u)
      const foundRedCubesShown = showing.match(/(?<reds>\d+)\sred/u)
      const foundGreenCubesShown = showing.match(/(?<greens>\d+)\sgreen/u)
      return {
        blues: Number.parseInt(foundBlueCubesShown?.groups.blues) || 0,
        reds: Number.parseInt(foundRedCubesShown?.groups.reds) || 0,
        greens: Number.parseInt(foundGreenCubesShown?.groups.greens) || 0
      }
    })

    return {
      id: gameId,
      showings,
    }
  })
}

export const getPossibleGames = (rawInput: string) => {
  const allGames = getGames(rawInput)
  return allGames.filter(game => {
    const showingChecks = game.showings.map(showing => {
      return showing.blues > availableCubes.blues || showing.reds > availableCubes.reds || showing.greens > availableCubes.greens
    })
    return showingChecks.every((value) => !value)
  })
}
export const part1 = (rawInput: string) => {
  return getPossibleGames(rawInput).reduce((accumulator, currentGame)=> {
    accumulator += currentGame.id
    return accumulator
  }, 0)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

export const exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 8,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: exampleInput,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
