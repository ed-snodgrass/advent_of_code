export const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n\n');
  const registers = lines[0].split('\n')
  const registerA = Number(registers[0].replace('Register A: ', ''))
  const registerB = Number(registers[1].replace('Register B: ', ''))
  const registerC = Number(registers[2].replace('Register C: ', ''))
  const program = lines[1].replace('Program: ', '').split(',').map(Number)
  return {registerA, registerB, registerC, program}
}

function determineOperand(operandDesignator: number, isLiteralOpcode: boolean, registerA: number, registerB: number, registerC: number): number {
  if (isLiteralOpcode) {
    return operandDesignator
  }
  if (operandDesignator <= 3) {
    return operandDesignator
  }
  if (operandDesignator === 4) {
    return registerA
  }
  if (operandDesignator === 5) {
    return registerB
  }
  if (operandDesignator === 6) {
    return registerC
  }
  if (operandDesignator === 7) {
    throw new Error('Invalid combo operand')
  }
  return -1
}

function determineOperandType(opcode: number) {
  return !(opcode === 0 || opcode === 2 || opcode === 5 || opcode === 6 || opcode === 7);
}

export function identifyInstruction(program: number[], registerA: number, registerB: number, registerC: number):Instruction[] {
  const instructions: Instruction[] = []
  let instructionPointer = 0

  while (instructionPointer < program.length) {
    const isLiteralOpcode = determineOperandType(program[instructionPointer])
    const operand = determineOperand(program[instructionPointer + 1], isLiteralOpcode, registerA, registerB, registerC)
    instructions.push({opcode: program[instructionPointer], operand})

    instructionPointer += 2
  }
  return instructions
}

export type Instruction = {
  opcode: number;
  operand: number;
}
export type InstructionResult = {
  registerA: number;
  registerB: number;
  registerC: number;
  instructionPointer: number;
  output?: number;
}
export function performInstruction(instruction: Instruction, registerA: number, registerB: number, registerC: number, instructionPointer: number):InstructionResult | undefined {
  if (instruction.opcode === 0) {
    return {registerA: Math.trunc(registerA / Math.pow(2, instruction.operand)), registerB, registerC, instructionPointer: instructionPointer + 2}
  }
  if (instruction.opcode === 1) {
    return {registerA, registerB: registerB ^ instruction.operand, registerC, instructionPointer: instructionPointer + 2}
  }
  if (instruction.opcode === 2) {
    return {registerA, registerB: instruction.operand % 8, registerC, instructionPointer: instructionPointer + 2}
  }
  if (instruction.opcode === 3) {
    if (registerA === 0) {
      return {registerA, registerB, registerC, instructionPointer: instructionPointer + 2}
    } else {
      return {registerA, registerB, registerC, instructionPointer: instruction.operand}
    }
  }
  if (instruction.opcode === 4) {
    return { registerA, registerB: registerB ^ registerC, registerC, instructionPointer: instructionPointer + 2 }
  }
  if (instruction.opcode === 5) {
    return {output: instruction.operand % 8, registerA, registerB, registerC, instructionPointer: instructionPointer + 2}
  }
  if (instruction.opcode === 6) {
    return {registerA, registerB: Math.trunc(registerA / Math.pow(2, instruction.operand)), registerC, instructionPointer: instructionPointer + 2}
  }
  if (instruction.opcode === 7) {
    return {registerA, registerB, registerC: Math.trunc(registerA / Math.pow(2, instruction.operand)), instructionPointer: instructionPointer + 2}
  }
  return undefined
}

export type ProgramState = {
  registerA: number; registerB: number; registerC: number; program: number[]
}

export function runProgram(initialState: ProgramState) {
  const outputs: number[] = []
  let instructionPointer = 0
  let {registerA, registerB, registerC, program} = initialState

  while (instructionPointer < program.length - 1) {
    const opcode = program[instructionPointer]
    const isLiteralOpcode = determineOperandType(opcode)
    const operand = determineOperand(program[instructionPointer + 1], isLiteralOpcode, registerA, registerB, registerC)
    const instruction = {opcode, operand}
    const result = performInstruction(instruction, registerA, registerB, registerC, instructionPointer)
    if (result) {
      registerA = result.registerA
      registerB = result.registerB
      registerC = result.registerC
      instructionPointer = result.instructionPointer
      if (result.output || result.output === 0) {
        outputs.push(result.output)
      }
    }
  }

  return {output: outputs.join(','), registerA, registerB, registerC, instructionPointer}
}

export const part1 = (rawInput: string):string => {
  const initialState = parseInput(rawInput)

  return runProgram(initialState).output
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

export const exampleInputPart2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`
