export const END = "E"
export const START = "S"
export const WALL = "#"
export const TRACK = "."

export const DIRECTIONS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

export const findItem = (grid: string[][], item: string): [number, number] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return [x, y]
      }
    }
  }
  return [-1, -1] as [number, number]
}

export const identifyRoute = (grid: string[][], start: [number, number]) => {
  const [startX, startY] = start
  const route: string[] = []
  route.push(`${startX}_${startY}`)

  let current: [number, number] = start
  let found = false
  while (!found) {
    const [x, y] = current
    for (const [dx, dy] of DIRECTIONS) {
      const [newX, newY] = [x + dx, y + dy]
      if (newX >= 0 && newY >= 0 && newY < grid.length && newX < grid[newY].length) {
        if (route.includes(`${newX}_${newY}`)) {
          continue
        }
        if (grid[newY][newX] === TRACK) {
          route.push(`${newX}_${newY}`)
          current = [newX, newY]
          break
        } else if (grid[newY][newX] === END) {
          route.push(`${newX}_${newY}`)
          found = true
          break
        }
      }
    }
  }
  return route
}

export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split(""))
}

export function findCheats(raceTrack: string[][], route: string[]) {
  const allPossibleCheats: [number, number][] = []
  const allPossibleCheatSavings: number[] = []
  for (let i = 0; i < route.length - 1; i++) {
    const [x, y] = route[i].split("_").map(Number)
    const indexOfCurrent = route.indexOf(route[i])
    for (const [dx, dy] of DIRECTIONS) {
      const [newX, newY] = [x + dx, y + dy]
      const [newX2, newY2] = [x + 2 * dx, y + 2 * dy]
      if (newX2 >= 0 && newY2 >= 0 && newY2 < raceTrack.length && newX2 < raceTrack[newY2].length) {
        if (
          raceTrack[newY][newX] === WALL &&
          (raceTrack[newY2][newX2] === TRACK || raceTrack[newY2][newX2] === END) &&
          indexOfCurrent < route.indexOf(`${newX2}_${newY2}`)
        ) {
          const cheatIndex = route.indexOf(`${newX2}_${newY2}`)
          // console.log(`cheat at ${newX2}_${newY2} has difference of index ${cheatIndex - indexOfCurrent}`)
          allPossibleCheats.push([newX, newY])
          allPossibleCheatSavings.push(cheatIndex - indexOfCurrent - 2)
        }
      }
    }
  }
  return { allPossibleCheats, allPossibleCheatSavings }
}

export const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const route = identifyRoute(input, findItem(input, START))
  const cheats = findCheats(input, route)
  return cheats.allPossibleCheatSavings.filter((savings) => savings >= 100).length
}

function calculateDistance(start: [number, number], destination: [number, number]) {
  const [startX, startY] = start
  const [destinationX, destinationY] = destination
  return Math.abs(destinationX - startX) + Math.abs(destinationY - startY)
}

function findValidCheats(route: string[], gridWithCosts: number[][]) {
  let numberOfCheatsOver100 = 0
  for (let i = 0; i < route.length - 1; i++) {
    const [x1, y1] = route[i].split("_").map(Number)
    for (let j = i + 1; j < route.length; j++) {
      const [x2, y2] = route[j].split("_").map(Number)
      if (x1 === x2 && y1 === y2) {
        continue
      }
      const distance = calculateDistance([x1, y1], [x2, y2])
      if (distance <= 20) {
        let diff = Math.abs(gridWithCosts[y2][x2] - gridWithCosts[y1][x1]) - distance
        if (diff >= 100) {
          numberOfCheatsOver100 += 1
        }
      }
    }
  }
  return numberOfCheatsOver100
}

export const part2 = (rawInput: string): number => {
  const racetrack = parseInput(rawInput)
  const route = identifyRoute(racetrack, findItem(racetrack, START))
  const gridWithCosts: number[][] = racetrack.map((line) => line.map((item) => -1))
  route
    .map((item) => item.split("_").map(Number))
    .forEach(([x, y], index) => {
      gridWithCosts[y][x] = index
    })

  return findValidCheats(route, gridWithCosts)
}

export const exampleInputPart1 = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`

export const exampleInputPart2 = exampleInputPart1
