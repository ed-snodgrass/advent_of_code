
export const SPLITTER_CHAR = '^'
export const START_CHAR = 'S'
export const BEAM_CHAR = '|'


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

export const createCharacterGrid = (rawInput:string): string[][] => {
  return rawInput.trim().split('\n').map(line => line.split(''))
}

export const parseInput = (rawInput: string) => {
    return createCharacterGrid(rawInput)
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  const startPosition = findItem(input, START_CHAR)
  let splitCount = 0
  let previousBeamPaths = [startPosition[0]]

  for (let i = startPosition[1] + 2; i < input.length; i += 2) {
    const currentBeamPaths = []
    const splitPoints = []
    for (let j = 0; j < previousBeamPaths.length; j++) {
      if (input[i][previousBeamPaths[j]] === SPLITTER_CHAR) {
        splitCount++
        splitPoints.push(previousBeamPaths[j])
        currentBeamPaths.push(previousBeamPaths[j] - 1)
        currentBeamPaths.push(previousBeamPaths[j] + 1)
      }
    }
    const leftOverBeams = previousBeamPaths.filter(beam => !splitPoints.includes(beam))
    previousBeamPaths = Array.from(new Set([...currentBeamPaths, ...leftOverBeams]))
  }
  return splitCount
}

export const findAllPossibleBeamLocations = (input: string[][]) => {
  const startPosition = findItem(input, START_CHAR)
  const allPossibleBeamLocations = [[ startPosition[0], startPosition[1] + 1]]
  input[startPosition[1] + 1][startPosition[0]] = BEAM_CHAR
  let previousBeamPaths = [startPosition[0]]
  for (let i = startPosition[1] + 2; i < input.length; i += 2) {
    const currentBeamPaths = []
    const splitPoints = []
    for (let j = 0; j < previousBeamPaths.length; j++) {
      if (input[i][previousBeamPaths[j]] === SPLITTER_CHAR) {
        // input[i][previousBeamPaths[j] - 1] = BEAM_CHAR
        // input[i][previousBeamPaths[j] + 1] = BEAM_CHAR
        splitPoints.push(previousBeamPaths[j])
        currentBeamPaths.push(previousBeamPaths[j] - 1)
        currentBeamPaths.push(previousBeamPaths[j] + 1)
      }
    }
    const leftOverBeams = previousBeamPaths.filter(beam => !splitPoints.includes(beam))
    for (let beam of leftOverBeams) {
      input[i][beam] = BEAM_CHAR
      allPossibleBeamLocations.push([beam, i])
    }
    previousBeamPaths = Array.from(new Set([...currentBeamPaths, ...leftOverBeams]))
    const newBeamPaths = previousBeamPaths.map(beam => [beam, i + 1])
    // newBeamPaths.forEach(([beam, y]) => input[y][beam] = BEAM_CHAR)
    newBeamPaths.forEach(([beam, y]) => {
      if (input[y]) input[y][beam] = BEAM_CHAR
    })
    allPossibleBeamLocations.push(...newBeamPaths)
  }
  return allPossibleBeamLocations.sort((a, b) => a[1] - b[1])
}

export const buildBeamToParentsMap = (input: string[][]) => {
  let beamToPathsMap = new Map<string, string[]>
  for (let rowIndex = 1; rowIndex < input.length; rowIndex += 2) {
    for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
      if (input[rowIndex][colIndex] === BEAM_CHAR) {
        const beamKey = `${rowIndex}_${colIndex}`
        const parents = []
        // let beamCount = 0
        // if beam above, add 1
        if (input[rowIndex - 1][colIndex] === BEAM_CHAR && input[rowIndex - 2][colIndex] === BEAM_CHAR) {
          parents.push(`${rowIndex - 2}_${colIndex}`)
        }
        if (colIndex > 0 && input[rowIndex - 1][colIndex - 1] === SPLITTER_CHAR && input[rowIndex - 2][colIndex - 1] === BEAM_CHAR) {
          parents.push(`${rowIndex - 2}_${colIndex - 1}`)
        }
        if (colIndex < input[rowIndex].length - 1 && input[rowIndex - 1][colIndex + 1] === SPLITTER_CHAR && input[rowIndex - 2][colIndex + 1] === BEAM_CHAR) {
          parents.push(`${rowIndex - 2}_${colIndex + 1}`)
        }
        beamToPathsMap.set(beamKey, parents)
      }
    }

  }
  return beamToPathsMap
}

export const part2 = (rawInput: string): number => {
  const grid = parseInput(rawInput)
  const startPosition = findItem(grid, START_CHAR)

  const allPossibleBeamLocations = findAllPossibleBeamLocations(grid)
  allPossibleBeamLocations.sort((a, b) => b[1] - a[1])
  const beamToParentsMap = buildBeamToParentsMap(grid)
  const lastBeams = allPossibleBeamLocations.filter(beam => beam[1] === grid.length - 1)
  let count = 0

  const beamPathCountMap = new Map<string, number>()

  const countLeafs = (beamKey: string, beamToParentsMap: Map<string, string[]>, startPosition: [number, number]) => {
    if (beamPathCountMap.has(beamKey)) {
      return beamPathCountMap.get(beamKey)
    }
    if (beamKey === `${startPosition[1]}_${startPosition[0]}`) {
      beamPathCountMap.set(beamKey, 0)
      return 0
    }
    let count = 0

    if (beamToParentsMap.has(beamKey)) {
      const beamParents = beamToParentsMap.get(beamKey)
      if (beamParents.length) {
        count += beamParents.length - 1
        beamParents.forEach((parentBeam) => {
          count += countLeafs(parentBeam, beamToParentsMap, startPosition)
        })
      }
    }
    beamPathCountMap.set(beamKey, count)

    return count
  }


  lastBeams.forEach(beam => {
    count += 1
    count += countLeafs(`${beam[1]}_${beam[0]}`, beamToParentsMap, startPosition)
  })

  return count
}

export const exampleInputPart1 =  `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

export const exampleInputPart2 = exampleInputPart1

export const snippetFromInput = `...S...
.......
...^...
.......
..^.^..
.......
.^.^.^.
.......
..^....
.......
....^..
.......`
