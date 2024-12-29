export const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => line.split("-"))
}

export function narrowNetworkTriads(initialList: string[]) {
  return initialList.filter(triad => {
    const computers = triad.split(',')
    return computers.some(computer => computer.startsWith('t'))
  })
}

export function findTriads(computerPairs: string[][]) {
  const triads: string[][] = []
  for(const computerPair of computerPairs) {
    const [a,b] = computerPair
    const otherPairs = computerPairs.filter(pair => pair[0] === a || pair[1] === a)
    otherPairs.forEach(otherPair => {
      if (!(otherPair[0] === a && otherPair[1] === b) || (otherPair[1] === a && otherPair[0] === b)){
        if (otherPair[0] === a) {
          if (computerPairs.some(pair => pair[0] === b && pair[1] === otherPair[1])) {
            triads.push([a,b, otherPair[1]])
          }
        } else if (otherPair[1] === a) {
          if (computerPairs.some(pair => pair[0] === b && pair[1] === otherPair[0])) {
            triads.push([a,b, otherPair[0]])
          }
        }
      }
    })
  }
  const sortedTriads = triads.map(triad => triad.sort((a,b) => a.localeCompare(b)).join(','))
  return Array.from(new Set(sortedTriads))
}

export const part1 = (rawInput: string):number => {
  const computerPairs = parseInput(rawInput)
  const triads = findTriads(computerPairs).sort((a,b) => a[0].localeCompare(b[0]))
  const narrowedTriads = narrowNetworkTriads(triads)
  return narrowedTriads.length
}

const findAllConnections = (computerPairs: string[][]) => {
  const connections: Record<string, string[]> = {}

  for (const [a,b] of computerPairs) {
    if (!connections[a]) {
      connections[a] = [b]
    } else {
      connections[a].push(b)
    }
    if (!connections[b]) {
      connections[b] = [a]
    } else {
      connections[b].push(a)
    }
  }
  return connections
}

export const findLargestSetOfConnections = (computerPairs: string[][]): string | undefined => {
  const connections = findAllConnections(computerPairs)
  const networkMap: Map<string, number> = new Map()

  for (let connectionsKey in connections) {
    const otherConnections = connections[connectionsKey].map(connection => {
      return {key: connection, connections: connections[connection].filter(item => item !== connectionsKey)}
    })
    const network = [connectionsKey]
    let score = 0
    otherConnections.forEach(otherConnection => {
      const allOtherConnectionsFlattened = otherConnections.map(connection => connection.connections).flat()
      score += allOtherConnectionsFlattened.reduce((acc, value) => {
        return value === otherConnection.key ? acc + 1 : acc
      }, 0)
      if (otherConnections.map(connection => connection.connections).flat().some(connection => connection.includes(otherConnection.key))) {
        network.push(otherConnection.key)
      }
    })
    const networkKey = network.sort((a,b) => a.localeCompare(b)).join(',')
    if (networkMap.has(networkKey)) {
      const currentScore = networkMap.get(networkKey)
      networkMap.set(networkKey, !!currentScore ? currentScore + score : 0)
    } else {
      networkMap.set(networkKey, score)
    }
  }
  let bestNetwork: {network: string, score: number} | undefined
  networkMap.forEach((score, network) => {
    if (!bestNetwork || score > bestNetwork.score) {
      bestNetwork = {network, score}
    }
  })
  return bestNetwork?.network
}

export const part2 = (rawInput: string): string => {
  const computerPairs = parseInput(rawInput)
  const largestSetOfConnections = findLargestSetOfConnections(computerPairs)
  if (!largestSetOfConnections) {
    throw new Error('No largest set of connections found')
  }
  return largestSetOfConnections
}

export const exampleInputPart1 =  `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`

