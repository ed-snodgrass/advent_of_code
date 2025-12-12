type Machine = {
  indicatorLightDiagram: string[]
  buttonWiringSchematics: number[][]
  joltageRequirements: number[]
}

export const parseInput = (rawInput: string) => {
  const machines: Machine[] = rawInput.trim().split('\n').map(machineString => machineString.split(' ')).map(machineParts => {
    const indicatorLightDiagram = machineParts[0].substring(1, machineParts[0].length - 1).split('')
    const joltageRequirements = machineParts[machineParts.length - 1].substring(1, machineParts[machineParts.length - 1].length - 1).split(',').map(joltageValue => Number(joltageValue))
    const buttonWiringSchematics = machineParts.slice(1, machineParts.length - 1).map(buttonWiringSchematicString => {
      return buttonWiringSchematicString.substring(1, buttonWiringSchematicString.length - 1).split(',').map(part => Number(part))
    })
    return { indicatorLightDiagram, buttonWiringSchematics, joltageRequirements }
  })

  return machines
}

export const part1 = (rawInput: string):number => {
  const machines: Machine[] = parseInput(rawInput)

  return -1
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
