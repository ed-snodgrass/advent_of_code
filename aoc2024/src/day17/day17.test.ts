import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  identifyInstruction,
  performInstruction, runProgram,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');


describe('Day17Test tests', () => {

  describe('part1', () => {
    describe('parseInput', () => {
      describe('example input', () => {
        it('should be...', () => {
          expect(parseInput(exampleInputPart1)).toEqual({
            registerA: 729,
            registerB: 0,
            registerC: 0,
            program: [0,1,5,4,3,0]
          })
        })
      })
      describe('real input', () => {
        it('should be...', () => {
          expect(parseInput(input)).toEqual({
            registerA: 65804993,
            registerB: 0,
            registerC: 0,
            program: [2,4,1,1,7,5,1,4,0,3,4,5,5,5,3,0]
          })
        })
      })
    })
    describe("identifyInstructions", () => {
      describe("when program is 0,1", () => {
        it("should return 1 instruction with opcode 0 and operand 1", () => {
          expect(identifyInstruction([0,1], -1, -1, -1)).toEqual([{opcode: 0, operand: 1}])
        })
      })
      describe("when program is 1,2", () => {
        it("should return 1 instruction with opcode 2 and operand 3", () => {
          expect(identifyInstruction([1,2], -1, -1, -1)).toEqual([{opcode: 1, operand: 2}])
        })
      })
      describe("when program is 2,3", () => {
        it("should return 1 instruction with opcode 2 and operand 3", () => {
          expect(identifyInstruction([2,3], -1, -1, -1)).toEqual([{opcode: 2, operand: 3}])
        })
      })
      describe("when program is 2,4", () => {
        it("should return 1 instruction with opcode 3 and operand of registerA", () => {
          expect(identifyInstruction([2,4], 789, -1, -1)).toEqual([{opcode: 2, operand: 789}])
        })
      })
      describe("when program is 2,5", () => {
        it("should return registerB as operand", () => {
          expect(identifyInstruction([2,5], -1, 567, -1)).toEqual([{opcode: 2, operand: 567}])
        })
      })
      describe("when program is 2,6", () => {
        it("should return registerB as operand", () => {
          expect(identifyInstruction([2,6], -1, -1, 345)).toEqual([{opcode: 2, operand: 345}])
        })
      })
      describe("when program is 2,7", () => {
        it("should return registerB as operand", () => {
          expect(() => identifyInstruction([2,7], -1, -1, -1)).toThrow('Invalid combo operand')
        })
      })
    })

    describe("performInstruction", () => {
      describe("when instruction is opcode 0 and operand 2", () => {
        it("should divide registerA by 4 and write to registerA", () => {
          expect(performInstruction({opcode: 0, operand: 2}, 16, -1, -1, 0)).toEqual(
            {registerA: 4, registerB: -1, registerC: -1, instructionPointer: 2}
          )
        })
      })
      describe("when instruction is opcode 0 and operand 5", () => {
        it("should divide registerA by 4 and write to registerA", () => {
          expect(performInstruction({opcode: 0, operand: 2}, 25, 2, -1, 2)).toEqual(
            {registerA: 6, registerB: 2, registerC: -1, instructionPointer: 4}
          )
        })
      })
      describe("when instruction is opcode 1 and operand 2", () => {
        it("should calculate bitwise XOR of operand and store in B", () => {
          expect(performInstruction({opcode: 1, operand: 2}, -1, 3, -1, 4)).toEqual(
            {registerA: -1, registerB: 1, registerC: -1, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 2 and operand 4", () => {
        it("should return the combo operand modulo 8 as register B", () => {
          expect(performInstruction({opcode: 2, operand: 4}, 500, -1, -1, 4)).toEqual(
            {registerA: 500, registerB: 4, registerC: -1, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 3 and register A is 0", () => {
        it("should do nothing but increase the pointer", () => {
          expect(performInstruction({opcode: 3, operand: 2}, 0, -1, -1, 4)).toEqual(
            {registerA: 0, registerB: -1, registerC: -1, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 3 and register A is greater than 0", () => {
        it("should jump to operand value", () => {
          expect(performInstruction({opcode: 3, operand: 2}, 1, -1, -1, 4)).toEqual(
            {registerA: 1, registerB: -1, registerC: -1, instructionPointer: 2}
          )
        })
      })
      describe("when instruction is opcode 4 and B is 3 and C is 7", () => {
        it("should return registerB as bitwise XOR of B and C", () => {
          expect(performInstruction({opcode: 4, operand: 2}, -1, 3, 7, 4)).toEqual(
            {registerA: -1, registerB: 4, registerC: 7, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 4 and B is 6 and C is 2", () => {
        it("should return registerB as bitwise XOR of B and C", () => {
          expect(performInstruction({opcode: 4, operand: 2}, -1, 6, 2, 4)).toEqual(
            {registerA: -1, registerB: 4, registerC: 2, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 5 operand is 10", () => {
        it("should return output of operand % 8", () => {
          expect(performInstruction({opcode: 5, operand: 10}, -1, -1, -1, 4)).toEqual(
            {output: 2, registerA: -1, registerB: -1, registerC: -1, instructionPointer: 6}
          )
        })
      })
      describe("when instruction is opcode 6 and operand 2", () => {
        it("should divide registerA by 4 and write to registerB", () => {
          expect(performInstruction({opcode: 6, operand: 2}, 16, -1, -1, 0)).toEqual(
            {registerA: 16, registerB: 4, registerC: -1, instructionPointer: 2}
          )
        })
      })
      describe("when instruction is opcode 7 and operand 2", () => {
        it("should divide registerA by 4 and write to registerC", () => {
          expect(performInstruction({opcode: 7, operand: 2}, 16, -1, -1, 0)).toEqual(
            {registerA: 16, registerB: -1, registerC: 4, instructionPointer: 2}
          )
        })
      })
      describe("runProgram", () => {

        describe("when program is 2,6", () => {
          describe("runProgram: If registerC contains 9", () => {
            it("should set registerB to 1", () => {
              expect(runProgram({program: [2,6], registerA: -1, registerB: -1, registerC: 9})).toEqual(
                {registerA: -1, registerB: 1, registerC: 9, instructionPointer: 2, output: ''}
              )
            })
          })
        })
        describe("when program is 5,0,5,1,5,4", () => {
          describe("If registerA contains 10", () => {
            it("should output 0,1,2", () => {
              expect(runProgram({program: [5,0,5,1,5,4], registerA: 10, registerB: -1, registerC: -1}).output).toEqual('0,1,2')
            })
          })
        })
        describe("when program is 0,1,5,4,3,0", () => {

          describe("If register A contains 2024", () => {
            let programResult: {
              output: any
              registerA: any
              registerB: number
              registerC: number
            }
            beforeEach(() => {
              programResult = runProgram({program: [0,1,5,4,3,0], registerA: 2024, registerB: -1, registerC: -1})
            })
            it("should output 4,2,5,6,7,7,7,7,3,1,0", () => {
              expect(programResult.output).toEqual('4,2,5,6,7,7,7,7,3,1,0')
            })
            it("should leave 0 in registerA", () => {
              expect(programResult.registerA).toEqual(0)
            })
          })
        })
        describe("when program is 1,7", () => {
          describe("If register B contains 29", () => {
            it("should leave 26 in registerB", () => {
              expect(runProgram({program: [1,7], registerA: -1, registerB: 29, registerC: -1}).registerB).toEqual(26)
            })
          })
        })
        describe("when program is 4,0", () => {
          describe("If register B contains 2024 and registerC contains 43690", () => {
            it("should leave 44354 in registerB", () => {
              expect(runProgram({program: [4,0], registerA: -1, registerB: 2024, registerC: 43690}).registerB).toEqual(44354)
            })
          })
        })
      })
    })

    describe('example input', () => {
      it('part1 should be 4,6,3,5,6,3,5,2,1,0', () => {
        expect(part1(exampleInputPart1)).toBe('4,6,3,5,6,3,5,2,1,0')
      })
    })
    describe('real input', () => {
      it('part1 should be 5,1,4,0,5,1,0,2,6', () => {
        expect(part1(input)).toBe('5,1,4,0,5,1,0,2,6')
      })
    })
  })
  describe('part2', () => {

    describe('example input with different register A', () => {
      it('part1 should be same as the program 0,3,5,4,3,0', () => {
        expect(part1(exampleInputPart2)).toBe('0,3,5,4,3,0')
      })
    })
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(117440)
      })
    })
    describe('real input', () => {
      it('part2 should be greater than 105541682640808', () => {
        expect(part2(input)).toBeGreaterThan(105541682640808)
      })
      it('part2 should be less than 1512939433576536', () => {
        expect(part2(input)).toBeLessThan(1512939433576536)
      })
      it('part2 should be 202322936867370', () => {
        expect(part2(input)).toBe(202322936867370)
      })
    })
  })
})
