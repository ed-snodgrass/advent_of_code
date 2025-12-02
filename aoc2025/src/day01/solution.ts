type Rotation = {direction: string, distance: number}

export const parseInput = (rawInput: string): Rotation[] => {
  const lines = rawInput.split('\n');

  return lines.map(line => ({direction: line.charAt(0), distance: parseInt(line.substring(1, line.length))}))
}
const MAX = 99

export const rotateDial = (rotation: Rotation, currentPosition: number)=> {

  if (rotation.direction === 'L') {

    if (currentPosition >= rotation.distance) {
      return currentPosition - rotation.distance
    }
    if (currentPosition + rotation.distance <= MAX) {
      return MAX + 1 - (rotation.distance - currentPosition)
    }
    let newDistance = rotation.distance
    let newPosition = currentPosition
    while (newDistance > 0) {
      if (newPosition > 0) {
        if (newDistance <= newPosition) {
          newPosition = newPosition - newDistance
          newDistance = 0
        } else {
          newDistance = newDistance - newPosition
          newPosition = 0
        }
      } else if(newPosition === 0) {
        newDistance = newDistance - 1
        newPosition = MAX
      }
    }
    return newPosition
  } else if (rotation.direction === 'R') {

  }
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)
  let currentPosition = 50
  let password = 0

  input.forEach(rotation => {
    currentPosition = rotateDial(rotation, currentPosition)
    console.log(`${rotation.direction}${rotation.distance} -> ${currentPosition}`)
    if (currentPosition === 0) password++
  })

  return password
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

export const exampleInputPart2 = exampleInputPart1
