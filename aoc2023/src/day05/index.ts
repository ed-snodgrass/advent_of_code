import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split('\n\n')

export const findSeeds = (input: string) => {
  const inputMatch = input.match(/^seeds:\s(?<seeds>.*)$/)
  return inputMatch.groups.seeds.split(' ').map(seed => Number.parseInt(seed))
}

export const findMap = (input: string) => {
  const lines = input.split('\n')
  lines.splice(0, 1)
  return lines.map(line => {
    const values = line.split(' ')
    return {
      destinationRangeStart: Number.parseInt(values[0]),
      sourceRangeStart: Number.parseInt(values[1]),
      rangeLength: Number.parseInt(values[2])
    }
  })
}
export const findMappedValue = (value: number, mapping: {sourceRangeStart: number, destinationRangeStart: number, rangeLength: number}[]) => {
  let inRange = false
  let nextValue: number

  for (let i = 0; i < mapping.length && !inRange; i++) {
    const sourceRangeStart = mapping[i].sourceRangeStart
    const rangeLength = mapping[i].rangeLength
    if (value >= sourceRangeStart && value <= sourceRangeStart + (rangeLength - 1)) {
      inRange = true
      const nextValueOffset = value - sourceRangeStart
      nextValue = mapping[i].destinationRangeStart + nextValueOffset
    }
  }
  if (!inRange) {
    nextValue = value
  }
  return nextValue
}

type mapType = {
  sourceRangeStart: number,
  destinationRangeStart: number,
  rangeLength: number
}

const findLocationForSeed = (seed, seedToSoilMap: mapType[], soilToFertilizerMap: mapType[], fertilizerToWaterMap: mapType[], waterToLightMap: mapType[], lightToTemperatureMap: mapType[], temperatureToHumidityMap: mapType[], humidityToLocationMap: mapType[]) => {
  const soilNumber = findMappedValue(seed, seedToSoilMap)
  const fertilizerNumber = findMappedValue(soilNumber, soilToFertilizerMap)
  const waterNumber = findMappedValue(fertilizerNumber, fertilizerToWaterMap)
  const lightNumber = findMappedValue(waterNumber, waterToLightMap)
  const temperatureNumber = findMappedValue(lightNumber, lightToTemperatureMap)
  const humidityNumber = findMappedValue(temperatureNumber, temperatureToHumidityMap)
  return findMappedValue(humidityNumber, humidityToLocationMap)
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const seeds = findSeeds(input[0])
  const seedToSoilMap = findMap(input[1])
  const soilToFertilizerMap = findMap(input[2])
  const fertilizerToWaterMap = findMap(input[3])
  const waterToLightMap = findMap(input[4])
  const lightToTemperatureMap = findMap(input[5])
  const temperatureToHumidityMap = findMap(input[6])
  const humidityToLocationMap = findMap(input[7])

  const seedLocations = seeds.map(seed => {
    return findLocationForSeed(seed, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap)
  })
  return seedLocations.reduce((prev, current) => (prev < current) ? prev : current)
}

export const findSeedRanges = (input: string) => {
  const inputMatch = input.match(/^seeds:\s(?<seeds>.*)$/)
  const seedValues = inputMatch.groups.seeds.split(' ').map(seed => Number.parseInt(seed))
  const seedRanges: {initialValue: number, range: number}[] = []
  for (let i = 0; i < seedValues.length; i += 2) {
    seedRanges.push({initialValue: seedValues[i], range: seedValues[i+1]})
  }
  return seedRanges
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const seedRanges = findSeedRanges(input[0])

  const seedToSoilMap = findMap(input[1])
  const soilToFertilizerMap = findMap(input[2])
  const fertilizerToWaterMap = findMap(input[3])
  const waterToLightMap = findMap(input[4])
  const lightToTemperatureMap = findMap(input[5])
  const temperatureToHumidityMap = findMap(input[6])
  const humidityToLocationMap = findMap(input[7])

  let smallestLocation = Infinity
  seedRanges.forEach((seedRange, index) => {
    for (let i = seedRange.initialValue; i < seedRange.initialValue + (seedRange.range - 1); i++) {
        const location = findLocationForSeed(i, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap)
        if (location < smallestLocation) {
          smallestLocation = location
          console.log(`new smallest location: ${smallestLocation}`)
        } else {
        }
    }
    console.log(`finished range: ${index}`)
  })
  return smallestLocation
}

export const exampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 35,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
