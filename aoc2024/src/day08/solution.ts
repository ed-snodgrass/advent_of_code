export const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(line => line.split(''))
}

export const findAntennas = (grid: string[][]) => {
  const antennas: Antenna[] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j]
      if (cell !== '.') {
        antennas.push({x: j, y: i, cell})
      }
    }
  }
  return antennas
}

export const isOnMap = (x: number, y: number, grid: string[][]) => {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length
}

export const findFrequencies = (antennas: Antenna[]) => {
  return antennas.reduce((acc: string[], antenna) => {
    if (!acc.includes(antenna.cell)) {
      acc.push(antenna.cell)
    }
    return acc
  }, [])
}

export type Antenna = { x: number, y: number, cell: string }

const makeUnique = (items: { x: number, y: number }[]): { x: number, y: number }[] => {
  const uniqueItems = new Map<string, { x: number, y: number }>();

  for (const item of items) {
    const key = `${item.x},${item.y}`;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, item);
    }
  }

  return Array.from(uniqueItems.values());
};

export const findAntinodesByFrequency = (grid: string[][], antennasWithFrequency: Antenna[]) => {
  const antinodes: { x:number, y:number }[] = []
  for (let j = 0; j < antennasWithFrequency.length; j++) {
    for (let k = j + 1; k < antennasWithFrequency.length; k++) {
      let antennaA, antennaB
      if (antennasWithFrequency[j].y > antennasWithFrequency[k].y) {
        antennaA = antennasWithFrequency[j]
        antennaB = antennasWithFrequency[k]
      } else {
        antennaA = antennasWithFrequency[k]
        antennaB = antennasWithFrequency[j]
      }

      const xDistance = antennaA.x - antennaB.x
      const yDistance = antennaA.y - antennaB.y

      const antinode1 = {x: antennaA.x + xDistance, y: antennaA.y + yDistance}
      const antinode2 = {x: antennaB.x - xDistance, y: antennaB.y - yDistance}

      if (isOnMap(antinode1.x, antinode1.y, grid)) {
        antinodes.push(antinode1)
      }
      if (isOnMap(antinode2.x, antinode2.y, grid)) {
        antinodes.push(antinode2)
      }
    }
  }
  return antinodes
}

export const findAntinodesByFrequencyUntilEdge = (grid: string[][], antennasWithFrequency: Antenna[]) => {
  const antinodes: { x:number, y:number }[] = []
  for (let j = 0; j < antennasWithFrequency.length; j++) {
    for (let k = j + 1; k < antennasWithFrequency.length; k++) {
      let antennaA, antennaB
      if (antennasWithFrequency[j].y > antennasWithFrequency[k].y) {
        antennaA = antennasWithFrequency[j]
        antennaB = antennasWithFrequency[k]
      } else {
        antennaA = antennasWithFrequency[k]
        antennaB = antennasWithFrequency[j]
      }
      antinodes.push({x: antennaA.x, y: antennaA.y})
      antinodes.push({x: antennaB.x, y: antennaB.y})
      const xDistance = antennaA.x - antennaB.x
      const yDistance = antennaA.y - antennaB.y

      let antinode1 = {x: antennaA.x + xDistance, y: antennaA.y + yDistance}
      while(isOnMap(antinode1.x, antinode1.y, grid)) {
        antinodes.push(antinode1)
        antinode1 = {x: antinode1.x + xDistance, y: antinode1.y + yDistance}
      }

      let antinode2 = {x: antennaB.x - xDistance, y: antennaB.y - yDistance}
      while (isOnMap(antinode2.x, antinode2.y, grid)) {
        antinodes.push(antinode2)
        antinode2 = {x: antinode2.x - xDistance, y: antinode2.y - yDistance}
      }
    }
  }
  return antinodes
}



export const findAntinodeCount = (grid: string[][], antennas: Antenna[], frequencies: string[], accumulationFunction: Function) => {
  let antinodes: {x:number, y:number }[] = []
  for (let i = 0; i < frequencies.length; i++) {
    const frequency = frequencies[i]
    const antennasWithFrequency = antennas.filter(antenna => antenna.cell === frequency)

    antinodes.push(...accumulationFunction(grid, antennasWithFrequency))
  }
  return makeUnique(antinodes).length
}

export const part1 = (rawInput: string):number => {
  const grid = parseInput(rawInput)
  const antennas = findAntennas(grid)
  const frequencies = findFrequencies(antennas)

  return findAntinodeCount(grid, antennas, frequencies, findAntinodesByFrequency)
}

export const part2 = (rawInput: string): number => {
  const grid = parseInput(rawInput)
  const antennas = findAntennas(grid)
  const frequencies = findFrequencies(antennas)

  return findAntinodeCount(grid, antennas, frequencies, findAntinodesByFrequencyUntilEdge)
}

export const exampleInputPart1 =  `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

export const exampleInputPart2 = exampleInputPart1
