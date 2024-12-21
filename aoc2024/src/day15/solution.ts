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

export const parseInput = (rawInput: string) => {
  const splitInput = rawInput.split('\n\n');
  const warehouseMap = splitInput[0].split('\n').map(line => line.split(''))
  const movements = splitInput[1].split('\n').join('').split('').map(movement => DIRECTIONS[movement as keyof typeof DIRECTIONS])

  let robotPosition
  for (let i = 0; i < warehouseMap.length; i++) {
    const line = warehouseMap[i];
    if (line.includes(ROBOT)) {
      robotPosition = [line.indexOf(ROBOT), i]
    }
  }

  return {warehouseMap, movements, robotPosition}
}

const findBoxesToMove = (warehouseMap: string[][], currentPosition: [number, number], direction: Direction): [number, number][]|undefined => {
  const boxesToMove: [number, number][] = []
  const [directionX, directionY] = direction

  let [currentX, currentY] = currentPosition
  let [newBoxX, newBoxY] = [currentX + directionX, currentY + directionY]
  let nextItem = warehouseMap[newBoxY][newBoxX]

  do {
    nextItem = warehouseMap[newBoxY][newBoxX]
    if (nextItem === WALL) {
      return undefined
    } else if (nextItem === EMPTY) {
      boxesToMove.push(currentPosition)
      return boxesToMove
    } else {
      boxesToMove.push(currentPosition)
      currentPosition = [newBoxX, newBoxY]

      currentX = currentPosition[0]
      currentY = currentPosition[1]

      newBoxX = currentX + directionX
      newBoxY = currentY + directionY
    }
  } while (nextItem === BOX)
  return boxesToMove
}

export const attemptMove = (warehouseMap: string[][], robotPosition: [number, number], direction: Direction) => {
  const [directionX, directionY] = direction
  const [currentRobotX, currentRobotY] = robotPosition
  let [newRobotX, newRobotY] = [currentRobotX + directionX, currentRobotY + directionY]
  const newPositionItem = warehouseMap[newRobotY][newRobotX]
  const hasWallInNewPosition = newPositionItem === WALL

  if (newPositionItem === BOX) {
    const boxesToMove = findBoxesToMove(warehouseMap, [newRobotX, newRobotY], direction)
    if (boxesToMove && boxesToMove.length) {
      boxesToMove.forEach(([boxX, boxY], index) => {
        warehouseMap[boxY + direction[1]][boxX + direction[0]] = BOX
      })
      warehouseMap[currentRobotY][currentRobotX] = EMPTY
      warehouseMap[newRobotY][newRobotX] = ROBOT
      // printGrid(warehouseMap)
      return {newMap: warehouseMap, newPosition: [newRobotX, newRobotY] as [number, number]}
    }
  } else if (!hasWallInNewPosition) {
    warehouseMap[currentRobotY][currentRobotX] = EMPTY
    warehouseMap[newRobotY][newRobotX] = ROBOT
    // printGrid(warehouseMap)
    return {newMap: warehouseMap, newPosition: [newRobotX, newRobotY] as [number, number]}
  }
  return {newMap: warehouseMap, newPosition: robotPosition}
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
  // console.log(`INITIAL`)
  // printGrid(warehouseMap)
  const finishedWarehouseMap = performAllMoves(warehouseMap, robotPosition as [number, number], movements)
  // printGrid(finishedWarehouseMap)
  return calculateGps(finishedWarehouseMap)
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
