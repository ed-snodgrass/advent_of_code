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

export function arrangeWireNames(strings: string[]) {
  return strings.sort().join(',')
}

export function findConnectionsWithZOutputAndAnXOrYInput(wiredConnections: WiredConnection[], allWires: string) {
  const connectionsWithZOutputAndAnXOrYInput: WiredConnection[] = []
  wiredConnections.forEach((wiredConnection) => {
    const { inputWires, gate, output } = wiredConnection
    const [inputWire1, inputWire2] = inputWires
    if ((inputWire1.startsWith('x') || inputWire1.startsWith('y') || inputWire2.startsWith('x') || inputWire2.startsWith('y')) && output.startsWith('z')) {
      connectionsWithZOutputAndAnXOrYInput.push(wiredConnection)
    }
  })
  return connectionsWithZOutputAndAnXOrYInput
}

export function findConnectionsWithSingleWires(wiredConnections: WiredConnection[], allWires: string) {
  const connectionsWithSingleWires: WiredConnection[] = []
  wiredConnections.forEach((wiredConnection) => {
    const { inputWires, gate, output } = wiredConnection
    const [inputWire1, inputWire2] = inputWires
    if (allWires.split(inputWire1).length <= 2) {
      connectionsWithSingleWires.push(wiredConnection)
    }
    if (allWires.split(inputWire2).length <= 2) {
      connectionsWithSingleWires.push(wiredConnection)
    }
  })
  return connectionsWithSingleWires
}

export const part2 = (rawInput: string): string => {
  const { wiredConnections } = parseInput(rawInput)
  const gatesToSwap:WiredConnection[] = []
  const exclusiveOrGatesWithXYInputs = wiredConnections.filter(wiredConnection => {
    const [wire1, wire2] = wiredConnection.inputWires
    return wiredConnection.gate === 'XOR' && (wire1.startsWith('x') || wire1.startsWith('y')) && (wire2.startsWith('x') || wire2.startsWith('y')) && !wire1.startsWith('x00') && !wire2.startsWith('y00')
  })
  exclusiveOrGatesWithXYInputs.forEach(wiredConnection => {
    if (wiredConnection.output.startsWith('z') && !(wiredConnection.inputWires[0].startsWith('x') || wiredConnection.inputWires[0].startsWith('y'))) {
      gatesToSwap.push(wiredConnection)
    }
  })
  const exclusiveOrGatesWithoutXYInputs = wiredConnections.filter(wiredConnection => {
    const [wire1, wire2] = wiredConnection.inputWires
    return wiredConnection.gate === 'XOR' && !(wire1.startsWith('x') || wire1.startsWith('y') || wire2.startsWith('x') || wire2.startsWith('y'))
  })
  exclusiveOrGatesWithoutXYInputs.forEach(wiredConnection => {
    if (!wiredConnection.output.startsWith('z')) {
      gatesToSwap.push(wiredConnection)
    }
  })
  wiredConnections.forEach(wiredConnection => {
    if ((wiredConnection.gate === 'OR' || wiredConnection.gate === 'AND') && wiredConnection.output.startsWith('z') && wiredConnection.output !== 'z45') {
      gatesToSwap.push(wiredConnection)
    }
  })
  exclusiveOrGatesWithXYInputs.forEach(wiredConnection => {
    const output = wiredConnection.output
    if (output !== 'z00' && !gatesToSwap.map(gateToSwap => gateToSwap.output).includes(output)) {
      const gatesThatDoNotOutputToExclusiveOrGateWithoutXYInputs = exclusiveOrGatesWithoutXYInputs.filter(exclusiveOrGateWithoutXYInputs => {
        return exclusiveOrGateWithoutXYInputs.inputWires.includes(output)
      })
      if (gatesThatDoNotOutputToExclusiveOrGateWithoutXYInputs.length === 0) {
        gatesToSwap.push(wiredConnection)
        // find the other swapped wire
        // the XOR of this gate should get XORd to the z__ associated to the x__/y__ inputs and grab that one _not_ associated with an OR
        //https://en.wikipedia.org/wiki/Adder_(electronics)#/media/File:Fulladder.gif
        const otherConnection = exclusiveOrGatesWithoutXYInputs.find(connection => {
          return connection.output.endsWith(wiredConnection.inputWires[0].slice(1))
        })
        if (otherConnection) {
          const incomingConnections = wiredConnections.filter(connection => {
            const [wire1, wire2] = otherConnection.inputWires
            return (connection.output === wire1 || connection.output === wire2)
          })
          const connectionToSwap = incomingConnections.find(connection => connection.gate !== 'OR')
          if (connectionToSwap) {
            gatesToSwap.push(connectionToSwap)
          }
        }
      }
    }
  })

  return arrangeWireNames(gatesToSwap.map(fullGate => fullGate.output))
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
