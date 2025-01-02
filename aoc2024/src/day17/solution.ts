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
const adv = (registerA: number, operand: number, instructionPointer: number) => {
  const newRegisterA = Math.trunc(registerA / Math.pow(2, operand))
  const newInstructionPointer = instructionPointer + 2
  return [newRegisterA, newInstructionPointer]
}
const bxl = (registerB: number, operand: number, instructionPointer: number) => {
  const newRegisterB = Number(BigInt(registerB) ^ BigInt(operand))
  const newInstructionPointer = instructionPointer + 2
  return [newRegisterB, newInstructionPointer]
}
const bst = (operand: number, instructionPointer: number) => {
  const newRegisterB = ((operand % 8) + 8) % 8
  const newInstructionPointer = instructionPointer + 2
  return [newRegisterB, newInstructionPointer]
}
const jnz = (registerA: number, operand: number, instructionPointer: number) => {
  return registerA === 0 ? instructionPointer + 2 : operand
}

const bxc = (registerB: number, registerC: number, instructionPointer: number) => {
  const newRegisterB = Number(BigInt(registerB) ^ BigInt(registerC))
  const newInstructionPointer = instructionPointer + 2
  return [newRegisterB, newInstructionPointer]
}

const out = (operand: number, instructionPointer: number) => {
  const output = ((operand % 8) + 8) % 8
  const newInstructionPointer = instructionPointer + 2
  return [output, newInstructionPointer]
}

export function performInstruction(instruction: Instruction, registerA: number, registerB: number, registerC: number, instructionPointer: number):InstructionResult | undefined {
  let newRegisterA = registerA, newRegisterB = registerB, newRegisterC = registerC, newInstructionPointer = instructionPointer, output

  if (instruction.opcode === 0) {
    const response = adv(registerA, instruction.operand, instructionPointer)
    newRegisterA = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 1) {
    const response = bxl(registerB, instruction.operand, instructionPointer)
    newRegisterB = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 2) {
    const response = bst(instruction.operand, instructionPointer)
    newRegisterB = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 3) {
    newInstructionPointer = jnz(registerA, instruction.operand, instructionPointer)
  }
  if (instruction.opcode === 4) {
    const response = bxc(registerB, registerC, instructionPointer)
    newRegisterB = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 5) {
    const response = out(instruction.operand, instructionPointer)
    output = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 6) {
    const response = adv(registerA, instruction.operand, instructionPointer)
    newRegisterB = response[0]
    newInstructionPointer = response[1]
  }
  if (instruction.opcode === 7) {
    const response = adv(registerA, instruction.operand, instructionPointer)
    newRegisterC = response[0]
    newInstructionPointer = response[1]
  }

  return {registerA: newRegisterA, registerB: newRegisterB, registerC: newRegisterC, instructionPointer: newInstructionPointer, output}
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

export const exampleInputPart2 = `Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`
