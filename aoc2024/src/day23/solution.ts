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

export const findLargestSetOfConnections = (computerPairs: string[][]): string[] => {
  const largestSetOfConnections = new Set<string>()

  return Array.from(largestSetOfConnections)
}

export const part2 = (rawInput: string): string => {
  const computerPairs = parseInput(rawInput)
  const largestSetOfConnections = findLargestSetOfConnections(computerPairs)

  return largestSetOfConnections.join(',')
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

