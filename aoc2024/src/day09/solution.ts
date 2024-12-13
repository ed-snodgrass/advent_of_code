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
      disk[index] = i.toString()
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

export const calculateChecksum = (disk: any[]) => {
  let checksum = 0
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
      checksum += i * Number(disk[i])

    }
  }
  return checksum
}

export const rearrangeFullDisk = (disk: any[]) => {
  const tempDisk = [...disk]
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

export const performFullFileMovement = (disk: any[], fileBlocks: number[]) => {
  const tempDisk = [...disk]
  for (let fileBlockId = fileBlocks.length - 1; fileBlockId >= 0; fileBlockId--) {
    const fileBlockWidth = fileBlocks[fileBlockId];
    let currentDotIndex = tempDisk.indexOf('.');
    const fileBlockIndex = tempDisk.indexOf(fileBlockId.toString());

    let canMove = false;

    for (let i = currentDotIndex; i < fileBlockIndex; i++) {

      if (tempDisk[i] !== '.') {
        currentDotIndex = tempDisk.indexOf('.', i)
        i = currentDotIndex
      } else {
        if (i - currentDotIndex === fileBlockWidth - 1) {
          canMove = true;
          break;
        }
      }
    }

    if (canMove) {
      // console.log(`found room for file block ${fileBlockId}`);
      for (let i = 0; i < fileBlockWidth; i++) {
        tempDisk[i + fileBlockIndex] = '.'
      }
      for (let i = currentDotIndex; i < currentDotIndex + fileBlockWidth; i++) {
        tempDisk[i] = fileBlockId.toString();
      }
    } else {
      // console.log(`no space for file block ${fileBlockId}`);
    }
  }
  return tempDisk;
}

export const part2 = (rawInput: string): number => {
  const {disk, fileBlocks} = parseInput(rawInput)
  const newDisk = performFullFileMovement(disk, fileBlocks)
  return calculateChecksum(newDisk)
}

export const exampleInputPart1 = `2333133121414131402`

export const exampleInputPart2 = exampleInputPart1
