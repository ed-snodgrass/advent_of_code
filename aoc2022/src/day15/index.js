import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

export const parseSensorAndBeacon = (input) => {
  const pattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
  const match = input.match(pattern)
  return {sensor: {x: Number(match[1]), y: Number(match[2])}, beacon: {x: Number(match[3]), y: Number(match[4])}}
}

const initiateGrid = (numXs) => {
  // const grid = []
  // for (let yIndex = 0; yIndex <= numYs; yIndex++) {
  const row = []
  for (let xIndex = 0; xIndex <= numXs; xIndex++) {
    row.push('.')
  }
  // grid.push(row)
  // }
  return row
}

export const calculateDistance = (sensor, beacon) => {
  let xDiff = 0
  let yDiff = 0

  if ((sensor.y > 0 && beacon.y < 0) || (beacon.y > 0 && sensor.y < 0)) {
    yDiff = Math.abs(sensor.y) + Math.abs(beacon.y) + 1
  } else if (sensor.y > beacon.y) {
    yDiff = sensor.y - beacon.y
  } else if (beacon.y > sensor.y) {
    yDiff = beacon.y - sensor.y
  }
  if ((sensor.x > 0 && beacon.x < 0) || (beacon.x > 0 && sensor.x < 0)) {
    xDiff = Math.abs(sensor.x) + Math.abs(beacon.x) + 1
  } else if (sensor.x > beacon.x) {
    xDiff = sensor.x - beacon.x
  } else if (beacon.x > sensor.x) {
    xDiff = beacon.x - sensor.x
  }
  return {xDiff, yDiff}
}

export const findOffsets = (parsedInput) => {
  let xHigh = 0
  let xLow = 0
  let yHigh = 0
  let yLow = 0

  parsedInput.forEach(input => {
    const {xDiff, yDiff} = calculateDistance(input.sensor, input.beacon)
    const distance = xDiff + yDiff
    if (input.sensor.x - distance < xLow) {
      xLow = input.sensor.x - distance
    }
    if (input.sensor.x + distance > xHigh) {
      xHigh = input.sensor.x + distance
    }
    if (input.sensor.y - distance < yLow) {
      yLow = input.sensor.y - distance
    }
    if (input.sensor.y + distance > yHigh) {
      yHigh = input.sensor.y + distance
    }
    if (input.beacon.x - distance < xLow) {
      xLow = input.beacon.x - distance
    }
    if (input.beacon.x + distance > xHigh) {
      xHigh = input.beacon.x + distance
    }
    if (input.beacon.y - distance < yLow) {
      yLow = input.beacon.y - distance
    }
    if (input.beacon.y + distance > yHigh) {
      yHigh = input.beacon.y + distance
    }
  })
  return {xHigh, xLow, yHigh, yLow}
}

const graphBeaconsAndSensors = (theRowToProcess, parsedInput) => {
  const {xHigh, xLow, yHigh, yLow} = findOffsets(parsedInput)
  const grid = initiateGrid(xHigh + Math.abs(xLow))

  const getValue = (xPosition) => {
    return grid[xPosition] === '.' ? '#' : grid[xPosition]
  }
  parsedInput.forEach(input => {
    if (input.sensor.y === theRowToProcess) {
      grid[input.sensor.x + Math.abs(xLow)] = 'S'
    }
    if (input.beacon.y === theRowToProcess) {
      grid[input.beacon.x + Math.abs(xLow)] = 'B'
    }
  })
  // console.log('plotted all sensors and beacons')
  // console.log(JSON.stringify(grid))
  parsedInput.forEach(input => {
    // console.log(`plotting invalid beacon positions between sensor: ${JSON.stringify(input.sensor)} and  beacon: ${JSON.stringify(input.beacon)}`)
    // console.time(`plotting invalid beacon positions between sensor: ${JSON.stringify(input.sensor)} and  beacon: ${JSON.stringify(input.beacon)}`)
    const {xDiff, yDiff} = calculateDistance(input.sensor, input.beacon)
    const y = input.sensor.y
    const x = input.sensor.x + Math.abs(xLow)
    for (let i = 0; i <= xDiff + yDiff; i++) {
      if (y + i === theRowToProcess || y - i === theRowToProcess) {
        grid[x] = getValue(x)
        for (let j = 1; j <= (xDiff + yDiff) - i; j++) {
          grid[x + j] = getValue(x + j)
          grid[x - j] = getValue(x - j)
        }
      }
    }
    // console.timeEnd(`plotting invalid beacon positions between sensor: ${JSON.stringify(input.sensor)} and  beacon: ${JSON.stringify(input.beacon)}`)

    // drawGrid(grid)
  })

  // drawGrid(grid)
  return grid
}

export const findInputItemsCrossingRow = (row, inputLines) => {
  const parsedInput = inputLines.map(parseSensorAndBeacon)
  // console.log(`parsedInput.length: ${parsedInput.length}`)
  const itemsCrossingRow = []
  parsedInput.forEach(input => {
    const {xDiff, yDiff} = calculateDistance(input.sensor, input.beacon)
    if (input.sensor.y > row && input.sensor.y - (yDiff + xDiff) < row) {
      itemsCrossingRow.push(input)
    } else if (input.sensor.y <= row && input.sensor.y + (yDiff + xDiff) > row) {
      itemsCrossingRow.push(input)
    }
  })
  // console.log(`itemsCrossingRow.length: ${itemsCrossingRow.length}`)
  return itemsCrossingRow
}
const queryForInvalidBeaconPositionsAtRow = (row, inputLines) => {
  const parsedInput = findInputItemsCrossingRow(row, inputLines)
  // console.log('parsed input')
  const plottedPositions = graphBeaconsAndSensors(row, parsedInput)
  // console.log('plotted positions')
  // const {yLow} = findOffsets(parsedInput)
  // console.log('found offsets')
  return plottedPositions.reduce((count, item) => item === '#' ? count + 1 : count, 0)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  if(input.length === 14) {
    return queryForInvalidBeaconPositionsAtRow(10, input)
  }

  return queryForInvalidBeaconPositionsAtRow(2000000, input)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  if(input.length === 14) {
    return queryForInvalidBeaconPositionsAtRow(10, input)
  }

  return queryForInvalidBeaconPositionsAtRow(2000000, input)
}

const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26,
      },
    ],
    solution: (rawInput) => part1(rawInput),
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 56000011,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
