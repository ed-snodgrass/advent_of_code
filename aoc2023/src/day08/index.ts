import run from "aocrunner"

type NetworkNode = {
  nodeName: string, R: string, L: string
}

export const seek = (instructions: string[], network: NetworkNode[]) => {
  let currentNode = network.find(node => node.nodeName === 'AAA')
  let targetNode = network.find(node => node.nodeName === 'ZZZ')
  let count = 0
  let finished = false
  let index = 0
  while (!finished) {
    if (!currentNode) {
      finished = true
    } else {
      count++
      currentNode = network.find(node => node.nodeName === currentNode[instructions[index]])
      finished = currentNode.nodeName === targetNode.nodeName
    }
    if (++index === instructions.length) {
      index = 0
    }
  }
  return count
}

const greatestCommonDivisor = (a: number, b: number) => {
  return !b ? a : greatestCommonDivisor(b, a % b)
}

const leastCommonMultiple = (a: number, b: number) => {
  return a * (b / greatestCommonDivisor(a, b))
}

const seek2 = (instructions: string[], network: NetworkNode[]) => {
  let currentNodes = network.filter((node) => {
    return node.nodeName.endsWith("A");
  });
  const shortestPaths = currentNodes.map(currentNode => {
    let count = 0;
    let finished = false;
    let index = 0;
    while (!finished) {
      if (!currentNode) {
        finished = true
      } else {
        count++
        currentNode = network.find(node => node.nodeName === currentNode[instructions[index]])
        finished = currentNode.nodeName.endsWith('Z')
      }
      if (++index === instructions.length) {
        index = 0
      }
    }
    return count;
  })
  return shortestPaths.reduce(leastCommonMultiple)
};


export const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n')

  return {
    instructions: lines[0].split(''),
    network: [...lines.slice(2, lines.length)].map(line => {
      const lineMatch = line.match(/^(?<nodeName>.*) = \((?<left>.*), (?<right>.*)\)/)
      return {
        nodeName: lineMatch.groups.nodeName,
        R: lineMatch.groups.right,
        L: lineMatch.groups.left,
      }
    })
  }
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return seek(input.instructions, input.network)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return seek2(input.instructions, input.network)
}

export const exampleInput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 2,
       },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
