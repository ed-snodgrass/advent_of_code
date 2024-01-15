import run from "aocrunner"

import {Deque} from "../utils/Deque";
// import {Deque} from "../utils/Deque.js";

export type Module = {
  name: string
  type: ModuleType
  connections: string[]
  status?: Status
  incomingPulseMap?: Record<string, Pulse>
}

export enum ModuleType {
  BROADCAST = 'broadcast',
  CONJUNCTION = '&',
  FLIP_FLOP = '%',
  UNTYPED = 'untyped'
}

export enum Pulse {
  LOW,
  HIGH
}

export enum Status {
  OFF,
  ON,
}

export const parseInput = (rawInput: string): Module[] => {
  const modules: Module[] = []
  rawInput.split('\n').forEach((line: string) => {
    let type: ModuleType
    const parts = line.split(" -> ")
    let name: string = parts[0]
    switch (line.substring(0, 1)) {
      case 'b':
        type = ModuleType.BROADCAST
        name = parts[0]
        break
      case ModuleType.CONJUNCTION:
        type = ModuleType.CONJUNCTION
        name = name.substring(1)
        break
      case ModuleType.FLIP_FLOP:
        type = ModuleType.FLIP_FLOP
        name = name.substring(1)
        break
    }
    const module: Module = {
      name,
      type,
      connections: parts[1].split(',').map((connection: string) => connection.trim()),
    }
    if (module.type === ModuleType.FLIP_FLOP) {
      module.status = Status.OFF
    }
    modules.push(module)
  })
  modules.forEach(module => {
    if (module.type === ModuleType.CONJUNCTION) {
      const incomingConnections = modules.reduce((agg, otherModule) => {
        if (otherModule.connections.includes(module.name)) {
          agg.push(otherModule.name)
        }
        return agg
      }, [])
      module.incomingPulseMap = {}
      incomingConnections.forEach((connection: string) => {
        module.incomingPulseMap[connection] = Pulse.LOW
      })

    }
  })
  const untypedModules = []
  modules.forEach((module) => {
    const moduleConnections = module.connections
    moduleConnections.forEach((connection: string) => {
      const existingModule = modules.find(connectionsModule => connectionsModule.name === connection)
      if (!existingModule && !untypedModules.includes(connection)) {
        untypedModules.push(connection)
      }
    })
  })
  modules.push(...untypedModules.map(untypedModule => ({
    name: untypedModule,
    type: ModuleType.UNTYPED,
    connections: undefined
  })))

  return modules
}

const findModuleByName = (modules: Module[], name: string) => modules.find(module => module.name === name)
const findModuleByType = (modules: Module[], type: string) => modules.find(module => module.type === type)

const sendPulseToModule = (currentModuleState: Module[], pulseToProcess: {
  fromModule: Module,
  destinationModule: Module,
  pulse: Pulse
}) => {
  const nextPulses = []

  let lowCount = 0
  let highCount = 0
  switch (pulseToProcess.destinationModule.type) {
    case ModuleType.CONJUNCTION:
      pulseToProcess.destinationModule.incomingPulseMap[pulseToProcess.fromModule.name] = pulseToProcess.pulse

      if (Object.values(pulseToProcess.destinationModule.incomingPulseMap).every(value => value === Pulse.HIGH)) {
        pulseToProcess.destinationModule.connections.forEach(connection => {
          // console.log(`${pulseToProcess.destinationModule.name} -LOW-> ${connection}`)
          lowCount++
          nextPulses.push({
            fromModule: pulseToProcess.destinationModule,
            destinationModule: findModuleByName(currentModuleState, connection),
            pulse: Pulse.LOW
          })
        })
      } else {
        pulseToProcess.destinationModule.connections.forEach(connection => {
          // console.log(`${pulseToProcess.destinationModule.name} -HIGH-> ${connection}`)
          highCount++
          nextPulses.push({
            fromModule: pulseToProcess.destinationModule,
            destinationModule: findModuleByName(currentModuleState, connection),
            pulse: Pulse.HIGH
          })
        })
      }
      break
    case ModuleType.FLIP_FLOP:
      if (pulseToProcess.pulse === Pulse.LOW) {
        if (pulseToProcess.destinationModule.status === Status.ON) {
          pulseToProcess.destinationModule.status = Status.OFF
          pulseToProcess.destinationModule.connections.forEach(connection => {
            lowCount++
            // console.log(`${pulseToProcess.destinationModule.name} -LOW-> ${connection}`)
            nextPulses.push({
              fromModule: pulseToProcess.destinationModule,
              destinationModule: findModuleByName(currentModuleState, connection),
              pulse: Pulse.LOW
            })
          })
        } else {
          pulseToProcess.destinationModule.status = Status.ON
          pulseToProcess.destinationModule.connections.forEach(connection => {
            highCount++
            // console.log(`${pulseToProcess.destinationModule.name} -HIGH-> ${connection}`)
            nextPulses.push({
              fromModule: pulseToProcess.destinationModule,
              destinationModule: findModuleByName(currentModuleState, connection),
              pulse: Pulse.HIGH
            })
          })
        }
      }
      break
    case ModuleType.UNTYPED:
      break
  }

  return {nextPulsesToProcess: nextPulses, pulsesSentByModule: {low: lowCount, high: highCount}}
}

export const buttonPress = (currentModuleState: Module[]) => {
  let lowCount = 1
  let highCount = 0
  const pulseProcessing = []
  const broadcastModule = currentModuleState.find(module => module.type === ModuleType.BROADCAST)
  broadcastModule.connections.forEach(connection => {
    lowCount++
    const connectedModule = findModuleByName(currentModuleState, connection)
    pulseProcessing.push({fromModule: broadcastModule, destinationModule: connectedModule, pulse: Pulse.LOW})
  })
  let next = pulseProcessing[0]
  let index = 1
  while (next) {
    const {nextPulsesToProcess, pulsesSentByModule} = sendPulseToModule(currentModuleState, next)
    lowCount += pulsesSentByModule.low
    highCount += pulsesSentByModule.high
    pulseProcessing.push(...nextPulsesToProcess)
    next = pulseProcessing[index]
    index++
  }
  return {high: highCount, low: lowCount}
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let lowCount = 0
  let highCount = 0
  for (let i = 0; i < 1000; i++) {
    const {high, low} = buttonPress(input)
    highCount += high
    lowCount += low
  }
  return highCount * lowCount
}


export const greatestCommonDivisor = (a: number, b: number) => {
  return !b ? a : greatestCommonDivisor(b, a % b)
}

export const leastCommonMultiple = (a: number, b: number) : number => {
  return a * (b / greatestCommonDivisor(a, b))
}

type PulseAction = { from: string, to: string, pulse: number }

const buttonPress2 = (connectorModule: Module, input: Module[]) => {
  const cycles = {}
  const seen = JSON.parse(JSON.stringify(connectorModule.incomingPulseMap))

  let buttonPresses = 0;
  while (buttonPresses < 1000000) {
    buttonPresses += 1

    const deque = new Deque<PulseAction>()
    const broadcaster = input.find(module => module.name === 'broadcaster')
    broadcaster.connections.forEach(connection => {
      deque.addRear({from: 'broadcaster', to: connection, pulse: Pulse.LOW})
    })

    while (!deque.isEmpty()) {
      const {from, to, pulse} = deque.removeFront()
      const currentModule = input.find(inputModule => inputModule.name === to)

      if (currentModule.name === connectorModule.name && pulse === 1) {
        seen[from] = seen[from] + 1
        // update cycles
        if (!cycles[from]) {
          cycles[from] = buttonPresses
        }
      }
      // if all the cycles exist, lessss go
      if (Object.keys(cycles).length === 4) {
        return cycles
      }

      if (currentModule.type === ModuleType.FLIP_FLOP) {
        if (pulse === Pulse.LOW) {
          if (currentModule.status === Status.ON) {
            currentModule.status = Status.OFF
            currentModule.connections.forEach(connection => {
              deque.addRear({from: currentModule.name, to: connection, pulse: Pulse.LOW})
            })
          } else {
            currentModule.status = Status.ON
            currentModule.connections.forEach(connection => {
              deque.addRear({from: currentModule.name, to: connection, pulse: Pulse.HIGH})
            })
          }
        }
      } else if (currentModule.type === ModuleType.CONJUNCTION) {
        currentModule.incomingPulseMap[from] = pulse
        if (Object.values(currentModule.incomingPulseMap).every(value => value === Pulse.HIGH)) {
          currentModule.connections.forEach(connection => {
            deque.addRear({from: currentModule.name, to: connection, pulse: Pulse.LOW})
          })
        } else {
          currentModule.connections.forEach(connection => {
            deque.addRear({from: currentModule.name, to: connection, pulse: Pulse.HIGH})
          })
        }
      }
    }
  }
  return cycles
}

export const part2 = (rawInput: string) : number => {
  const input = parseInput(rawInput)
  const rxConnection = input.find(module => module.connections.includes('rx'))

  const cycles = buttonPress2(rxConnection, input)
  return <number>Object.values(cycles).reduce(leastCommonMultiple)
}

export const exampleInput =
  `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 11687500,
      },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
