export const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n\n');
  const registers = lines[0].split('\n')
  const registerA = Number(registers[0].replace('Register A: ', ''))
  const registerB = Number(registers[1].replace('Register B: ', ''))
  const registerC = Number(registers[2].replace('Register C: ', ''))
  const program = lines[1].replace('Program: ', '').split(',').map(Number)
  return {registerA, registerB, registerC, program}
}

export const part1 = (rawInput: string):number => {
  const input = parseInput(rawInput)

  return -1
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

export const exampleInputPart2 = exampleInputPart1
