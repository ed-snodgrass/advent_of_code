import * as fs from "fs"
import {
  part1,
  part2,
  parseInput,
  exampleInputPart1,
  exampleInputPart2,
  convertBinaryToDecimal,
  executeGate, createBinaryStringFromZOutputs,
} from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

const simpleInput: string = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`

describe('Day24Test tests', () => {
  describe("createBinaryStringFromOutputs", () => {
    let outputs: [string, number][]
    beforeEach(() => {
      outputs = `bfw: 1
bqk: 1
djm: 1
ffh: 0
fgs: 1
frj: 1
fst: 1
gnj: 1
hwm: 1
kjc: 0
kpj: 1
kwq: 0
mjb: 1
nrd: 1
ntg: 0
pbm: 1
psh: 1
qhw: 1
rvg: 0
tgd: 0
tnw: 1
vdt: 1
wpb: 0
z00: 0
z01: 0
z02: 0
z03: 1
z04: 0
z05: 1
z06: 1
z07: 1
z08: 1
z09: 1
z10: 1
z11: 0
z12: 0`.split('\n').map(item => item.split(': ')).map(item => ([item[0], parseInt(item[1])]))
    })
    it("should return 0011111101000", () => {
      expect(createBinaryStringFromZOutputs(outputs)).toBe('0011111101000')
    })
  })
  describe("executeGate", () => {
    describe("when executing 1 AND 1", () => {
      it("should return 1", () => {
        expect(executeGate('AND', [1,1])).toBe(1)
      })
    })
    describe("when executing 1 AND 0", () => {
      it("should return 0", () => {
        expect(executeGate('AND', [1,0])).toBe(0)
      })
    })
    describe("when executing 0 AND 1", () => {
      it("should return 0", () => {
        expect(executeGate('AND', [0,1])).toBe(0)
      })
    })
    describe("when executing 0 AND 0", () => {
      it("should return 0", () => {
        expect(executeGate('AND', [0,0])).toBe(0)
      })
    })
    describe("when executing 1 OR 1", () => {
      it("should return 1", () => {
        expect(executeGate('OR', [1,1])).toBe(1)
      })
    })
    describe("when executing 1 OR 0", () => {
      it("should return 1", () => {
        expect(executeGate('OR', [1,0])).toBe(1)
      })
    })
    describe("when executing 0 OR 1", () => {
      it("should return 1", () => {
        expect(executeGate('OR', [0,1])).toBe(1)
      })
    })
    describe("when executing 0 OR 0", () => {
      it("should return 0", () => {
        expect(executeGate('OR', [0,0])).toBe(0)
      })
    })
    describe("when executing 1 XOR 1", () => {
      it("should return 0", () => {
        expect(executeGate('XOR', [1,1])).toBe(0)
      })
    })
    describe("when executing 1 XOR 0", () => {
      it("should return 1", () => {
        expect(executeGate('XOR', [1,0])).toBe(1)
      })
    })
    describe("when executing 0 XOR 1", () => {
      it("should return 1", () => {
        expect(executeGate('XOR', [0,1])).toBe(1)
      })
    })
    describe("when executing 0 XOR 0", () => {
      it("should return 0", () => {
        expect(executeGate('XOR', [0,0])).toBe(0)
      })
    })
  })

  describe("parseInput", () => {
    it("should parse simpleInput", () => {
      const {initialWireValues, wiredConnections} = parseInput(simpleInput)
      expect(initialWireValues.length).toBe(6)
      expect(wiredConnections.length).toBe(3)
    })
    it("should parse simpleInput", () => {
      const {initialWireValues, wiredConnections} = parseInput(exampleInputPart1)
      expect(initialWireValues.length).toBe(10)
      expect(wiredConnections.length).toBe(36)
    })
  })

  describe("convertBinaryToDecimal", () => {
    it("should covert 0011111101000 to 2024", () => {
      expect(convertBinaryToDecimal("0011111101000")).toBe(2024)
    })
    it("should covert 100 to 4", () => {
      expect(convertBinaryToDecimal("100")).toBe(4)
    })
  })

  describe('part1', () => {
    describe('simpleInput', () => {
      it('part1 should be 4', () => {
        expect(part1(simpleInput)).toBe(4)
      })
    })
    describe('example input', () => {
      it('part1 should be 2024', () => {
        expect(part1(exampleInputPart1)).toBe(2024)
      })
    })
    describe('real input', () => {
      it.skip('part1 should be...', () => {
        expect(part1(input)).toBe(null)
      })
    })
  })

  describe('part2', () => {
    describe('example input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(null)
      })
    })
    describe('real input', () => {
      it.skip('part2 should be...', () => {
        expect(part2(input)).toBe(null)
      })
    })
  })
})
