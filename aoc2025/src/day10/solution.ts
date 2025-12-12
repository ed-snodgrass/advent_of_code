export type Machine = {
  indicatorLightDiagram: string[]
  buttonWiringSchematics: number[][]
  joltageRequirements: number[]
}

export const parseInput = (rawInput: string) => {
  const machines: Machine[] = rawInput
    .trim()
    .split('\n')
    .map((machineString) => machineString.split(' '))
    .map((machineParts) => {
      const indicatorLightDiagram = machineParts[0].substring(1, machineParts[0].length - 1).split('')
      const joltageRequirements = machineParts[machineParts.length - 1]
        .substring(1, machineParts[machineParts.length - 1].length - 1)
        .split(',')
        .map((joltageValue) => Number(joltageValue))
      const buttonWiringSchematics = machineParts
        .slice(1, machineParts.length - 1)
        .map((buttonWiringSchematicString) => {
          return buttonWiringSchematicString
            .substring(1, buttonWiringSchematicString.length - 1)
            .split(',')
            .map((part) => Number(part))
        })
      return { indicatorLightDiagram, buttonWiringSchematics, joltageRequirements }
    })

  return machines
}

function findMinimumCombinations(
  availableButtons: number[][],
  target: number[],
): { minSteps: number; combination: number[][] } | null {
  const arrayLength = target.length
  const startState = new Array(arrayLength).fill(0)

  const arrayToKey = (arr: number[]): string => arr.join('_')

  if (arrayToKey(startState) === arrayToKey(target)) {
    return { minSteps: 0, combination: [] }
  }

  const queue: [number[], number[][]][] = [[startState, []]]
  const visited = new Set<string>([arrayToKey(startState)])

  while (queue.length > 0) {
    const [currentState, pathTaken] = queue.shift()!

    for (const button of availableButtons) {
      const newState = flipTheBits(currentState, button)
      const newKey = arrayToKey(newState)

      if (newKey === arrayToKey(target)) {
        return {
          minSteps: pathTaken.length + 1,
          combination: [...pathTaken, button],
        }
      }

      if (!visited.has(newKey)) {
        visited.add(newKey)
        queue.push([newState, [...pathTaken, button]])
      }
    }
  }

  return null
}

export function flipTheBits(start: number[], buttonValues: number[]): number[] {
  const flipped = [...start]
  buttonValues.forEach((buttonValue, index) => {
    if (flipped[index] === 1) {
      if (buttonValue === 1) {
        flipped[index] = 0
      } else {
        flipped[index] = 1
      }
    } else if (flipped[index] === 0) {
      if (buttonValue === 1) {
        flipped[index] = 1
      } else {
        flipped[index] = 0
      }
    }
  })
  return flipped
}

export const lightToBits = (indicatorLightDiagram: string[]) => {
  return indicatorLightDiagram.map((light) => {
    if (light === '.') return 0
    if (light === '#') return 1
  })
}

export const buildButtons = (buttonWiringSchematics: number[][], lightDiagramLength: number) => {
  const buttons = []
  buttonWiringSchematics.forEach((buttonWiringSchematic) => {
    const button = Array(lightDiagramLength).fill(0)
    buttonWiringSchematic.forEach((toggle) => {
      button[toggle] = 1
    })
    buttons.push(button)
  })
  return buttons
}

export const configureMachineLights = (machine: Machine) => {
  // console.log(machine)
  const target = lightToBits(machine.indicatorLightDiagram)
  // console.log(target)
  const buttons = buildButtons(machine.buttonWiringSchematics, target.length)
  // console.log(buttons)
  return findMinimumCombinations(buttons, target).minSteps
}

export const part1 = (rawInput: string): number => {
  const machines: Machine[] = parseInput(rawInput)
  return machines.map((configureMachineLights)).reduce((acc, currentValue) => acc + currentValue, 0)
}

export const part2 = (rawInput: string): number => {
  const machines: Machine[] = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`

export const exampleInputPart2 = exampleInputPart1

