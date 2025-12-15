export const parseInput = (rawInput: string) => {
  const deviceMap = new Map<string, string[]>()

  rawInput
    .trim()
    .split('\n')
    .forEach((line) => {
      const parts = line.split(': ')
      const key = parts[0]
      const connections = parts[1].split(' ')
      deviceMap.set(key, connections)
    })

  return deviceMap
}

const dfs = (devices: Map<string, string[]>, current: string, visited: Set<string>, path: string[]) => {
  const allPaths: string[][] = []
  if (current === 'out') {
    return [path.slice()]
  }

  visited.add(current)

  if (devices.has(current)) {
    devices.get(current).forEach((deviceKey) => {
      if (!visited.has(deviceKey)) {
        path.push(deviceKey)
        const pathsFromNewDevice = dfs(devices, deviceKey, visited, path)
        allPaths.push(...pathsFromNewDevice)
        path.pop()
      }
    })
  }

  visited.delete(current)
  return allPaths
}

export const findAllPaths = (devices: Map<string, string[]>, start: string) => {
  const visited = new Set<string>()
  return dfs(devices, start, visited, [start])
}

export const part1 = (rawInput: string): number => {
  const deviceMap = parseInput(rawInput)

  return findAllPaths(deviceMap, 'you').length
}

function countPathsWithBothNodes(devices: Map<string, string[]>, start: string): number {
  const memo = new Map<string, number>()

  function count(node: string, seenA: boolean, seenB: boolean): number {
    if (node === 'out') {
      return seenA && seenB ? 1 : 0
    }

    const key = `${node}|${seenA}|${seenB}`
    if (memo.has(key)) {
      return memo.get(key)!
    }

    const newSeenA = seenA || node === 'fft'
    const newSeenB = seenB || node === 'dac'

    let totalPaths = 0
    const neighbors = devices.get(node)

    if (neighbors) {
      for (const neighbor of neighbors) {
        totalPaths += count(neighbor, newSeenA, newSeenB)
      }
    }

    memo.set(key, totalPaths)
    return totalPaths
  }

  return count(start, false, false)
}

export const part2 = (rawInput: string): number => {
  const deviceMap = parseInput(rawInput)
  return countPathsWithBothNodes(deviceMap, 'svr')
}

export const exampleInputPart1 = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`

export const exampleInputPart2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`
