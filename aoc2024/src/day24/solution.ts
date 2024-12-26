export const parseInput = (rawInput: string) => {
  const [rawInitialValues, rawWiredConnections] =  rawInput.split("\n\n")
  const initialWireValues = rawInitialValues.split("\n").map(line => line.split(": ")).map(([key, value]) => ({key, value: Number(value)}))
  const wiredConnections:WiredConnection[] = rawWiredConnections.split("\n").map(line => {
    const [connection, output] = line.split(" -> ")
    const [inputWire1, gate, inputWire2] = connection.split(" ")
    return {inputWires: [inputWire1, inputWire2], gate, output}
  })

  return {
    initialWireValues,
    wiredConnections
  }
}

export function executeGate(gate: string, inputValues: [number, number]): number {
  if (gate === "AND") {
    return inputValues[0] & inputValues[1]
  }
  if (gate === "OR") {
    return inputValues[0] | inputValues[1]
  }
  if (gate === "XOR") {
    return inputValues[0] ^ inputValues[1]
  }
  throw new Error("Invalid gate")
}

export function convertBinaryToDecimal(binaryInputString: string):number {
  return parseInt(binaryInputString, 2)
}
function createWireMap(initialWireValues: { key: string; value: number; }[], outputs: string[]): Record<string, number> {
  const wireMap: Record<string, number> = {}
  initialWireValues.forEach(initialWireValue => {
    wireMap[initialWireValue.key] = initialWireValue.value
  })
  const wireMapKeys = Object.keys(wireMap)
  outputs.forEach(output => {
    if (!wireMapKeys.includes(output)) {
      wireMap[output] = -1
    }
  })
  return wireMap
}
export function createBinaryStringFromZOutputs(outputs: [string, number][]) {
  return outputs.filter(([key]) => key.startsWith('z')).sort((a,b) => a[0].localeCompare(b[0])).map(([, value]) => value).reverse().join('')
}

type WiredConnection = {
  inputWires:[string, string],
  gate:string,
  output: string
}

export const part1 = (rawInput: string):number => {
  const { initialWireValues, wiredConnections } = parseInput(rawInput)
  const outputs = wiredConnections.map(connection => connection.output)
  const wireMap = createWireMap(initialWireValues, outputs)

  const initialWireKeys = initialWireValues.map(wire => wire.key)

  const retries: WiredConnection[] = []
  wiredConnections.forEach((wiredConnection) => {
    const { inputWires, gate, output } = wiredConnection
    const [inputWire1, inputWire2] = inputWires
    if (initialWireKeys.includes(inputWire1) && initialWireKeys.includes(inputWire2)) {
      wireMap[output] = executeGate(gate, [wireMap[inputWire1], wireMap[inputWire2]])
    } else {
      retries.push(wiredConnection)
    }
  })
  while (retries.length > 0) {
    const retry = retries.shift()
    if (!retry) {
      break
    }
    const { inputWires, gate, output } = retry
    const [inputWire1, inputWire2] = inputWires
    if (wireMap[inputWire1] !== -1 && wireMap[inputWire2] !== -1) {
      wireMap[output] = executeGate(gate, [wireMap[inputWire1], wireMap[inputWire2]])
    } else {
      retries.push(retry)
    }
  }

  const binaryString = createBinaryStringFromZOutputs(Object.entries(wireMap))
  return convertBinaryToDecimal(binaryString)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 =  `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`

export const exampleInputPart2 = exampleInputPart1
