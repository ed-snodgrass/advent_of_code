import run from "aocrunner"

const parseInput = (rawInput) => rawInput
export const SHAPE_HORIZONTAL = 'SHAPE_HORIZONTAL'
export const SHAPE_PLUS = 'SHAPE_PLUS'
export const SHAPE_BACKWARDS_L = 'SHAPE_BACKWARDS_L'
export const SHAPE_VERTICAL = 'SHAPE_VERTICAL'
export const SHAPE_SQUARE = 'SHAPE_SQUARE'

export const RIGHT = '>'
export const LEFT = '<'

const shapeList = [SHAPE_SQUARE, SHAPE_VERTICAL, SHAPE_BACKWARDS_L, SHAPE_PLUS, SHAPE_HORIZONTAL]
const chamberWidth = 7

export const retrieveJetPattern = (input) => {
  const jetPattern = []
  for (let i = input.length - 1; i >= 0; i--) {
    jetPattern.push(input[i])
  }
  return jetPattern
}
export const chamberToString = chamber => {
  let chamberString = ''
  chamber.forEach((row, rowIndex) => {
    if (row.length > chamberWidth) {
      throw new Error(`Row ${rowIndex} is wider than chamberWidth by ${row.length - chamberWidth}`)
    }
    rowIndex === chamber.length - 1 ? chamberString += '+' : chamberString += '|'
    row.forEach(position => {
      chamberString += position
    })
    rowIndex === chamber.length - 1 ? chamberString += '+' : chamberString += '|\n'
  })
  return chamberString
}

export const initiateChamber = () => {
  const chamber = [[]]
  for (let j = 0; j < chamberWidth; j++) {
    chamber[0].push('-')
  }
  return chamber
}

const findLeftEdgeCoordinate = chamber => {
  for (let i = 0; i < chamber.length; i++) {
    const chamberRow = chamber[i]
    for (let j = 0; j < chamberRow.length; j++) {
      if (chamberRow[j] === '@') {
        return {x: j, y: i}
      }
    }
  }
}

const nextLineEmpty = row => {
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== '.') {
      return false
    }
  }
  return true
}

const spawnHorizontalRockType = (chamber) => {
  const rockHeight = 1
  for (let i = 0; i < rockHeight; i++) {
    const row = []
    for (let j = 0; j < chamberWidth; j++) {
      if (i === 0 && j >= 2 && j <= 5) {
        row.push('@')
      } else {
        row.push('.')
      }
    }
    chamber.unshift(row)
  }
  return chamber
}
const horizontalCannotMoveDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  return chamber[y + 1][x] === '#' || chamber[y + 1][x + 1] === '#' || chamber[y + 1][x + 2] === '#' || chamber[y + 1][x + 3] === '#' || chamber[y + 1].includes('-')
}

const spawnPlusRockType = (chamber) => {
  const rockHeight = 3
  for (let i = 0; i < rockHeight; i++) {
    const row = []
    for (let j = 0; j < chamberWidth; j++) {
      if (i === 0 && j === 3) {
        row.push('@')
      } else if (i === 1 && j >= 2 && j <= 4) {
        row.push('@')
      } else if (i === 2 && j === 3) {
        row.push('@')
      } else {
        row.push('.')
      }
    }
    chamber.unshift(row)
  }
  return chamber
}
const plusCannotMoveDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  return chamber[y + 3][x] === '#' ||
    chamber[y + 2][x - 1] === '#' ||
    chamber[y + 2][x + 1] === '#' ||
    chamber[y + 3].includes('-')
}

const spawnBackwardsLRockType = (chamber) => {
  const rockHeight = 3
  for (let i = rockHeight - 1; i >= 0; i--) {
    const row = []
    for (let j = 0; j < chamberWidth; j++) {
      if (i === 0 && j === 4) {
        row.push('@')
      } else if (i === 1 && j === 4) {
        row.push('@')
      } else if (i === 2 && j >= 2 && j <= 4) {
        row.push('@')
      } else {
        row.push('.')
      }
    }
    chamber.unshift(row)
  }
  return chamber
}
const backwardsLCannotMoveDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  return chamber[y + 3][x] === '#' ||
    chamber[y + 3][x - 1] === '#' ||
    chamber[y + 3][x - 2] === '#' ||
    chamber[y + 3].includes('-')
}
const moveBackwardsLDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.'
  chamber[y + 2][x - 1] = '.'
  chamber[y + 2][x - 2] = '.'
  chamber[y + 3][x] = '@'
  chamber[y + 3][x - 1] = '@'
  chamber[y + 3][x - 2] = '@'

  if (nextLineEmpty(chamber[y])) {
    chamber.splice(y, 1)
  }

  return chamber
}

const spawnVerticalRockType = (chamber) => {
  const rockHeight = 4
  for (let i = 0; i < rockHeight; i++) {
    const row = []
    for (let j = 0; j < chamberWidth; j++) {
      if ((i === 0 || i < 4) && j === 2) {
        row.push('@')
      } else {
        row.push('.')
      }
    }
    chamber.unshift(row)
  }
  return chamber
}
const verticalCannotMoveDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  return chamber[y + 4][x] === '#' ||
    chamber[y + 4].includes('-')
}

const spawnSquareRockType = (chamber) => {
  const rockHeight = 2
  for (let i = 0; i < rockHeight; i++) {
    const row = []
    for (let j = 0; j < chamberWidth; j++) {
      if (j === 2 || j === 3) {
        row.push('@')
      } else {
        row.push('.')
      }
    }
    chamber.unshift(row)
  }
  return chamber
}
const squareCannotMoveDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  return chamber[y + 2][x] === '#' ||
    chamber[y + 2][x + 1] === '#' ||
    chamber[y + 2].includes('-')
}
const moveSquareDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.'
  chamber[y][x + 1] = '.'
  chamber[y + 2][x] = '@'
  chamber[y + 2][x + 1] = '@'

  if (nextLineEmpty(chamber[y])) {
    chamber.splice(y, 1)
  }
  return chamber
}
const movePlusDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.'
  chamber[y + 1][x + 1] = '.'
  chamber[y + 1][x - 1] = '.'
  chamber[y + 2][x + 1] = '@'
  chamber[y + 2][x - 1] = '@'
  chamber[y + 3][x] = '@'

  if (nextLineEmpty(chamber[y])) {
    chamber.splice(y, 1)
  }
  return chamber
}

const moveHorizontalDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.'
  chamber[y][x + 1] = '.'
  chamber[y][x + 2] = '.'
  chamber[y][x + 3] = '.'
  chamber[y + 1][x] = '@'
  chamber[y + 1][x + 1] = '@'
  chamber[y + 1][x + 2] = '@'
  chamber[y + 1][x + 3] = '@'

  if (nextLineEmpty(chamber[y])) {
    chamber.splice(y, 1)
  }
  return chamber
}

const moveVerticalDown = (chamber) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.'
  chamber[y + 4][x] = '@'

  if (nextLineEmpty(chamber[y])) {
    chamber.splice(y, 1)
  }
  return chamber
}

const backwardsLIsBlockedFromPush = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    if (x <= 2) {
      return true
    }
    return chamber[y + 2][0] === '@' ||
      (chamber[y + 2][x - 3] && chamber[y + 2][x - 3] === '#') ||
      chamber[y + 1][x - 1] === '#' ||
      chamber[y][x - 1] === '#'
  }
  if (direction === RIGHT) {
    if (x === chamberWidth - 1) {
      return true
    }
    if (x < chamberWidth - 1) {
      return chamber[y][x + 1] === '#' ||
        chamber[y + 1][x + 1] === '#' ||
        chamber[y + 2][x + 1] === '#'
    }
  }
}
const verticalIsBlockedFromPush = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)

  if (direction === LEFT) {
    return x === 0 || chamber[y][x - 1] === '#' ||
      chamber[y + 1][x - 1] === '#' ||
      chamber[y + 2][x - 1] === '#' ||
      chamber[y + 3][x - 1] === '#'
  }
  if (direction === RIGHT) {
    return x === chamberWidth - 1 || chamber[y][x + 1] === '#' ||
      chamber[y + 1][x + 1] === '#' ||
      chamber[y + 2][x + 1] === '#' ||
      chamber[y + 3][x + 1] === '#'
  }
}
const squareIsBlockedFromPush = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)

  if (direction === LEFT) {
    return x === 0 || chamber[y][x - 1] === '#' ||
      chamber[y + 1][x - 1] === '#'
  }
  if (direction === RIGHT) {
    return x + 1 === chamberWidth - 1 || chamber[y][x + 2] === '#' ||
      chamber[y + 1][x + 2] === '#'
  }
  return false
}
const plusIsBlockedFromPush = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)

  if (direction === LEFT) {
    return x - 1 === 0 || chamber[y][x - 1] === '#' ||
      chamber[y + 1][x - 2] === '#' ||
      chamber[y + 2][x - 1] === '#'
  }
  if (direction === RIGHT) {
    return x + 1 === chamberWidth - 1 || chamber[y][x + 1] === '#' ||
      chamber[y + 1][x + 2] === '#' ||
      chamber[y + 2][x + 1] === '#'
  }
  return false
}
const horizontalIsBlockedFromPush = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    return chamber[y][x - 1] === '#' || x === 0
  }
  if (direction === RIGHT) {
    return chamber[y][x + 4] === '#' || x === 3
  }
  return false
}
export const canBePushed = (chamber, direction, rockType) => {
  switch (rockType) {
    case SHAPE_BACKWARDS_L:
      return !backwardsLIsBlockedFromPush(chamber, direction)
    case SHAPE_VERTICAL:
      return !verticalIsBlockedFromPush(chamber, direction)
    case SHAPE_SQUARE:
      return !squareIsBlockedFromPush(chamber, direction)
    case SHAPE_PLUS:
      return !plusIsBlockedFromPush(chamber, direction)
    case SHAPE_HORIZONTAL:
      return !horizontalIsBlockedFromPush(chamber, direction)
    default:
      throw new Error(`Unsupported rockType: ${rockType}`)
  }
}

export const moveDown = (chamber, rockType) => {
  switch (rockType) {
    case SHAPE_BACKWARDS_L:
      return moveBackwardsLDown(chamber)
    case SHAPE_VERTICAL:
      return moveVerticalDown(chamber)
    case SHAPE_SQUARE:
      return moveSquareDown(chamber)
    case SHAPE_PLUS:
      return movePlusDown(chamber)
    case SHAPE_HORIZONTAL:
      return moveHorizontalDown(chamber)
    default:
      throw new Error(`Unsupported rockType: ${rockType}`)
  }
}

export const canMoveDown = (chamber, rockType) => {
  switch (rockType) {
    case SHAPE_BACKWARDS_L:
      return !backwardsLCannotMoveDown(chamber)
    case SHAPE_VERTICAL:
      return !verticalCannotMoveDown(chamber)
    case SHAPE_SQUARE:
      return !squareCannotMoveDown(chamber)
    case SHAPE_PLUS:
      return !plusCannotMoveDown(chamber)
    case SHAPE_HORIZONTAL:
      return !horizontalCannotMoveDown(chamber)
    default:
      throw new Error(`Unsupported rockType: ${rockType}`)
  }
}

export const pushBackwardsLRockType = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    chamber[y][x] = '.'
    chamber[y + 1][x] = '.'
    chamber[y + 2][x] = '.'
    chamber[y][x - 1] = '@'
    chamber[y + 1][x - 1] = '@'
    chamber[y + 2][x - 3] = '@'
  } else if (direction === RIGHT) {
    chamber[y][x] = '.'
    chamber[y + 1][x] = '.'
    chamber[y + 2][x - 2] = '.'
    chamber[y][x + 1] = '@'
    chamber[y + 1][x + 1] = '@'
    chamber[y + 2][x + 1] = '@'
  }
  return chamber
}
const pushVerticalRockType = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  chamber[y][x] = '.' // replace current
  chamber[y + 1][x] = '.' // replace current
  chamber[y + 2][x] = '.' // replace current
  chamber[y + 3][x] = '.' // replace current
  if (direction === LEFT) {
    chamber[y][x - 1] = '@'
    chamber[y + 1][x - 1] = '@'
    chamber[y + 2][x - 1] = '@'
    chamber[y + 3][x - 1] = '@'
  } else if (direction === RIGHT) {
    chamber[y][x + 1] = '@'
    chamber[y + 1][x + 1] = '@'
    chamber[y + 2][x + 1] = '@'
    chamber[y + 3][x + 1] = '@'
  }
  return chamber
}
const pushSquareRockType = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    chamber[y][x + 1] = '.' // replace current
    chamber[y + 1][x + 1] = '.' // replace current
    chamber[y][x - 1] = '@'
    chamber[y + 1][x - 1] = '@'
  } else if (direction === RIGHT) {
    chamber[y][x] = '.' // replace current
    chamber[y + 1][x] = '.' // replace current
    chamber[y][x + 2] = '@'
    chamber[y + 1][x + 2] = '@'
  }
  return chamber
}
const pushPlusRockType = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    chamber[y][x] = '.'
    chamber[y + 1][x + 1] = '.'
    chamber[y + 2][x] = '.'
    chamber[y][x - 1] = '@'
    chamber[y + 1][x - 2] = '@'
    chamber[y + 2][x - 1] = '@'
  } else if (direction === RIGHT) {
    chamber[y][x] = '.'
    chamber[y + 1][x - 1] = '.'
    chamber[y + 2][x] = '.'
    chamber[y][x + 1] = '@'
    chamber[y + 1][x + 2] = '@'
    chamber[y + 2][x + 1] = '@'
  }
  return chamber
}
const pushHorizontalRockType = (chamber, direction) => {
  const {x, y} = findLeftEdgeCoordinate(chamber)
  if (direction === LEFT) {
    chamber[y][x + 3] = '.'
    chamber[y][x - 1] = '@'
  } else if (direction === RIGHT) {
    chamber[y][x] = '.'
    chamber[y][x + 4] = '@'
  }
  return chamber
}
export const pushDirection = (chamber, direction, rockType) => {
  switch (rockType) {
    case SHAPE_BACKWARDS_L:
      return pushBackwardsLRockType(chamber, direction)
    case SHAPE_VERTICAL:
      return pushVerticalRockType(chamber, direction)
    case SHAPE_SQUARE:
      return pushSquareRockType(chamber, direction)
    case SHAPE_PLUS:
      return pushPlusRockType(chamber, direction)
    case SHAPE_HORIZONTAL:
      return pushHorizontalRockType(chamber, direction)
    default:
      throw new Error(`Unsupported rockType: ${rockType}`)
  }
}

const addGap = chamber => {
  for (let i = 0; i < 3; i++) {
    chamber.unshift(['.', '.', '.', '.', '.', '.', '.'])
  }
  return chamber
}

export const spawn = (chamber, rockType) => {
  chamber = addGap(chamber)
  switch (rockType) {
    case SHAPE_BACKWARDS_L:
      return spawnBackwardsLRockType(chamber)
    case SHAPE_VERTICAL:
      return spawnVerticalRockType(chamber)
    case SHAPE_SQUARE:
      return spawnSquareRockType(chamber)
    case SHAPE_PLUS:
      return spawnPlusRockType(chamber)
    case SHAPE_HORIZONTAL:
      return spawnHorizontalRockType(chamber)
    default:
      throw new Error(`Unsupported rockType: ${rockType}`)
  }
}

const redrawStoppedRock = chamber => {
  return chamber.map(row => row.map(item => item === '@' ? '#' : item))
}

export const simulateFallingRocks = (input, rockCount) => {
  // const rockCount = 1000000000000
  // const rockCount = 2022
  // const rockCount = 1
  let jetPattern = retrieveJetPattern(input)
  let rockTypeList = [...shapeList]
  let currentRockType = rockTypeList.pop()
  let chamber = initiateChamber()
  chamber = addGap(chamber)
  spawnHorizontalRockType(chamber, 0)
  let i = 1

  do {
    if (jetPattern.length === 0) {
      jetPattern = retrieveJetPattern(input)
    }
    if (rockTypeList.length === 0) {
      rockTypeList = [...shapeList]
    }
    const currentJetPush = jetPattern.pop()
    if (canBePushed(chamber, currentJetPush, currentRockType)) {
      chamber = pushDirection(chamber, currentJetPush, currentRockType)
    }
    if (canMoveDown(chamber, currentRockType)) {
      chamber = moveDown(chamber, currentRockType)
    } else {
      chamber = redrawStoppedRock(chamber)
      if (i === rockCount) {
        // console.log(chamberToString(chamber))
        return chamber.length - 1
      }
      i++
      // console.log(`moving on to rock #${i}`)
      currentRockType = rockTypeList.pop()
      chamber = spawn(chamber, currentRockType)
      // console.log(chamberToString(chamber))
    }
  } while (i <= rockCount)
  return 0
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return simulateFallingRocks(input, 2022)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`,
        expected: 3068,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
