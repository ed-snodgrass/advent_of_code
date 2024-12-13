export const parseInput = (rawInput: string) => {
  const lines = rawInput.split("").map(Number)
  let fileBlocks: number[] = []
  let freeSpace: number[] = []
  while (lines.length) {
    const shiftedFileBlock = lines.shift()
    if (shiftedFileBlock !== undefined) {
      fileBlocks.push(shiftedFileBlock)
    }
    const shiftedFreeSpace = lines.shift()
    if (shiftedFreeSpace !== undefined) {
      freeSpace.push(shiftedFreeSpace)
    }
  }

  let disk = []
  let index = 0
  for (let i = 0; i < fileBlocks.length; i++) {
    for (let j = 0; j < fileBlocks[i]; j++) {
      disk[index] = i
      index++
    }
    if (freeSpace[i]) {
      for (let j = 0; j < freeSpace[i]; j++) {
        disk[index] = '.'
        index++
      }
    }
  }
  return {disk, fileBlocks, freeSpace}
}

export const rearrange = (disk: string) => {
  const firstDotIndex = disk.indexOf('.')
  const lastNumberIndex = disk.length - [...disk].reverse().findIndex((char) => char !== '.') - 1
  const newDiskArray = [...disk]
  newDiskArray[firstDotIndex] = disk[lastNumberIndex]
  newDiskArray[lastNumberIndex] = '.'
  return newDiskArray.join("")
}

export const calculateChecksum = (disk: number[]) => {
  let checksum = 0
  for (let i = 0; i < disk.length; i++) {
    checksum += i * Number(disk[i])
  }
  return checksum
}

export const rearrangeFullDisk = (disk: any[]) => {
  const tempDisk = [...disk]
  console.log("rearranging")
  const reverseDisk = [...tempDisk].reverse()
  for (let i = 0; i < tempDisk.length; i++) {
    const currentCharacter = tempDisk[i]
    if (currentCharacter === ".") {
      let nextNumber: string | undefined = ""
      do {
        nextNumber = reverseDisk.shift()
        if (nextNumber !== ".") {
          tempDisk[i] = nextNumber ? nextNumber.toString() : "."
          tempDisk.pop()
        } else {
          reverseDisk.pop()
          tempDisk.pop()
        }
      } while (nextNumber === ".")
    } else {
      reverseDisk.pop()
    }
  }
  return tempDisk
}

export const part1 = (rawInput: string): number => {
  const {disk} = parseInput(rawInput)
  const newDisk = rearrangeFullDisk(disk)
  return calculateChecksum(newDisk)
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
}

export const exampleInputPart1 = `2333133121414131402`

export const exampleInputPart2 = exampleInputPart1
