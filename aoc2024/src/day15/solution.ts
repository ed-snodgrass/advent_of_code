export const WALL = '#'
export const EMPTY = '.'
export const BOX = 'O'
export const ROBOT = '@'

export type Direction = [number, number];

export const RIGHT:Direction = [1, 0]
export const DOWN:Direction = [0, 1]
export const LEFT:Direction = [-1, 0]
export const UP:Direction = [0, -1]

export const DIRECTIONS = {
  '^': UP,
  '>': RIGHT,
  'v': DOWN,
  '<': LEFT,
}

export const findRobot = (warehouseMap: string[][]) => {
  for (let y = 0; y < warehouseMap.length; y++) {
    for (let x = 0; x < warehouseMap[y].length; x++) {
      if (warehouseMap[y][x] === ROBOT) {
        return [x, y]
      }
    }
  }
  return [-1, -1]
}

export const parseInput = (rawInput: string) => {
  const splitInput = rawInput.split('\n\n');
  const warehouseMap = splitInput[0].split('\n').map(line => line.split(''))
  const movements = splitInput[1].split('\n').join('').split('').map(movement => DIRECTIONS[movement as keyof typeof DIRECTIONS])

  let robotPosition = findRobot(warehouseMap)

  return {warehouseMap, movements, robotPosition}
}

export const attemptMove = (warehouseMap: string[][], robotPosition: [number, number], direction: Direction) => {
  const [directionX, directionY] = direction
  const [currentRobotX, currentRobotY] = robotPosition
  let [newRobotX, newRobotY] = [currentRobotX + directionX, currentRobotY + directionY]
  let newPositionItem = warehouseMap[newRobotY][newRobotX]

  let canMove = true

  while (true) {
      if (newPositionItem === EMPTY) {
        break
      } else if (newPositionItem === WALL) {
        canMove = false
        break
      } else if (newPositionItem === BOX) {
        newRobotX = newRobotX + directionX
        newRobotY = newRobotY + directionY
        newPositionItem = warehouseMap[newRobotY][newRobotX]
      } else {
        throw new Error(`Invalid tile ${newPositionItem} at [x,y]: [${newRobotX}, ${newRobotY}]`)
      }
  }

  if (!canMove) return {newMap: warehouseMap, newPosition: robotPosition}
  warehouseMap[robotPosition[1]][robotPosition[0]] = EMPTY
  const newPosition = [robotPosition[0] + directionX, robotPosition[1] + directionY] as [number, number]
  if (warehouseMap[newPosition[1]][newPosition[0]] == BOX) {
    warehouseMap[newRobotY][newRobotX] = BOX
  }
  warehouseMap[newPosition[1]][newPosition[0]] = ROBOT

  return {newMap: warehouseMap, newPosition: newPosition as [number, number]}
}

export const performAllMoves = (warehouseMap: string[][], robotPosition: [number, number], movements: Direction[]) => {
  let newMap = warehouseMap
  let newPosition: [number, number] = robotPosition
  movements.forEach(movement => {
    const moveResults = attemptMove(newMap, newPosition, movement)
    newMap = moveResults.newMap
    newPosition = moveResults.newPosition
  })
  return newMap
}

export const calculateGps = (warehouseMap: string[][]) => {
  const boxes = []
  for(let y = 0; y < warehouseMap.length; y++) {
    for (let x = 0; x < warehouseMap[y].length; x++) {
      if (warehouseMap[y][x] === BOX) boxes.push({x, y})
    }
  }
  return boxes.map(box => (box.y * 100) + box.x).reduce((sum, value) => value + sum)
}


export const part1 = (rawInput: string):number => {
  const {warehouseMap, movements, robotPosition} = parseInput(rawInput)
  const finishedWarehouseMap = performAllMoves(warehouseMap, robotPosition as [number, number], movements)
  return calculateGps(finishedWarehouseMap)
}

export const calculateGps2 = (warehouseMap: string[][]) => {
  const boxes = []
  // const boxMap: Record<string, {left: [number, number], right: [number, number]}> = {}
  for(let y = 0; y < warehouseMap.length; y++) {
    for (let x = 0; x < warehouseMap[y].length; x++) {
      if (warehouseMap[y][x] === '[') boxes.push({x, y})
    }
  }
  //TODO modify to first find the distance from the left/right edge based on location
  return boxes.map(box => (box.y * 100) + box.x).reduce((sum, value) => value + sum)
}

export const translateMap = (originalMap: string[][]): string[][] => {
  return originalMap.map(line => {
    const newLine: string[] = []
    line.forEach(tile => {
      switch (tile) {
        case WALL:
          newLine.push(WALL, WALL)
          break
        case BOX:
          newLine.push('[', ']')
          break
        case EMPTY:
          newLine.push(EMPTY, EMPTY)
          break
        case ROBOT:
          newLine.push(ROBOT, EMPTY)
          break
        default:
          throw Error(`Invalid Tile Value: ${tile}`)
      }
    })
    return newLine
  })
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const printGrid = (grid: number[][]|string[][]) => {
  console.log(grid.map(row => row.join('')).join('\n'))
}

export const smallerInput = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`

export const exampleInputPart1 =  `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`

export const exampleInputPart2 = exampleInputPart1
