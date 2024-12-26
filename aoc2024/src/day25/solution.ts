export const parseInput = (rawInput: string) => {
  const rawSchematics = rawInput.split('\n\n');
  const locks = []
  const keys = []
  for (const rawSchematic of rawSchematics) {
    const schematic = rawSchematic.split('\n').map(line => line.split(''))
    if (schematic[0].every(char => char === '#') && schematic[schematic.length - 1].every(char => char === '.')) {
      locks.push(schematic)
    } else if (schematic[0].every(char => char === '.') && schematic[schematic.length - 1].every(char => char === '#')) {
      keys.push(schematic)
    }
  }
  return {locks, keys}
}

export const getLockPinHeights = (lock: string[][]) => {
  let pinHeights = Array(lock[0].length).fill(-1)
  for (let i = lock.length - 1; i >= 0; i--) {
    for (let j = 0; j < lock[i].length; j++) {
      if (lock[i][j] === '#' && pinHeights[j] === -1) {
        pinHeights[j] = i
      }
    }
  }
  return pinHeights
}

export function getKeyHeights(key: string[][]) {
  let keyHeights = Array(key[0].length).fill(-1)
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key[i].length; j++) {
      if (key[i][j] === '#' && keyHeights[j] === -1) {
        keyHeights[j] = key.length - 1 - i
      }
    }
  }
  return keyHeights
}

export function testLockFitment(lockHeights: number[], keyHeights: number[], maxHeight: number) {
  let fits = true
  for (let i = 0; i < lockHeights.length; i++) {
    if (lockHeights[i] + keyHeights[i] >= maxHeight) {
      fits = false
    }
  }
  return fits
}

export const part1 = (rawInput: string):number => {
  const {locks, keys} = parseInput(rawInput)
  const lockPinHeights = locks.map(getLockPinHeights)
  const keyHeights = keys.map(getKeyHeights)
  let count = 0
  for (let i = 0; i < lockPinHeights.length; i++) {
    const lockPinHeight = lockPinHeights[i]
    for (let j = 0; j < keyHeights.length; j++) {
      const keyHeight = keyHeights[j]
      if (testLockFitment(lockPinHeight, keyHeight, locks[0].length - 1)) {
        count += 1
      }
    }
  }
  return count
}

export const exampleInputPart1 =  `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`
