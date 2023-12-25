import run from "aocrunner"

export type Module = {
  name: string
  type: ModuleType
  connections: string[]
  status?: Status
  incomingPulseMap?: Map<string, Pulse>
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

export const parseInput = (rawInput: string) : Module[] => {
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
  modules.filter((module) => module.type === ModuleType.CONJUNCTION)
    .forEach(conjunctionModule => {
    const incomingConnections = modules.reduce((agg, module) => {
      if (module.connections.includes(conjunctionModule.name)) {
        agg.push(module.name)
      }
      return agg
    }, [])
    conjunctionModule.incomingPulseMap = new Map(incomingConnections.map((connection: string) => [connection, Pulse.LOW]))

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

const sendPulseToModule = (currentModuleState: Module[], pulseToProcess: {fromModule: Module, destinationModule: Module, pulse: Pulse}) => {
  const nextPulses = []

  let lowCount = 0
  let highCount = 0
  switch (pulseToProcess.destinationModule.type) {
    case ModuleType.CONJUNCTION:
      pulseToProcess.destinationModule.incomingPulseMap.set(pulseToProcess.fromModule.name, pulseToProcess.pulse)

      if (Array.from(pulseToProcess.destinationModule.incomingPulseMap.values()).every(value => value === Pulse.HIGH)) {
        pulseToProcess.destinationModule.connections.forEach(connection => {
          // console.log(`${pulseToProcess.destinationModule.name} -LOW-> ${connection}`)
          lowCount++
          nextPulses.push({fromModule: pulseToProcess.destinationModule, destinationModule: findModuleByName(currentModuleState, connection), pulse: Pulse.LOW})
        })
      } else {
        pulseToProcess.destinationModule.connections.forEach(connection => {
          // console.log(`${pulseToProcess.destinationModule.name} -HIGH-> ${connection}`)
          highCount++
          nextPulses.push({fromModule: pulseToProcess.destinationModule, destinationModule: findModuleByName(currentModuleState, connection), pulse: Pulse.HIGH})
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
            nextPulses.push({fromModule: pulseToProcess.destinationModule, destinationModule: findModuleByName(currentModuleState, connection), pulse: Pulse.LOW})
          })
        } else {
          pulseToProcess.destinationModule.status = Status.ON
          pulseToProcess.destinationModule.connections.forEach(connection => {
            highCount++
            // console.log(`${pulseToProcess.destinationModule.name} -HIGH-> ${connection}`)
            nextPulses.push({fromModule: pulseToProcess.destinationModule, destinationModule: findModuleByName(currentModuleState, connection), pulse: Pulse.HIGH})
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
    lowCount+= pulsesSentByModule.low
    highCount+= pulsesSentByModule.high
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

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
