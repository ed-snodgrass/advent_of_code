export const toShape = (shapeText: string) => {
  const shapeLines = shapeText.split('\n').slice(1, 4)
  return shapeLines.map((line) => line.split(''))
}

export const parseInput = (rawInput: string) => {
  const groups = rawInput.trim().split('\n\n')
  const shapes = groups.slice(0, groups.length - 1).map(toShape)
  const regions = groups[groups.length - 1].split('\n').map((regionText) => {
    const regionParts = regionText.split(':').map((text) => text.trim())
    const regionSize = regionParts[0].split('x').map((regionSizePart) => Number(regionSizePart))
    const shapeCounts = regionParts[1].split(' ').map((shapeCount) => Number(shapeCount))

    return { size: regionSize, shapeCounts }
  })
  return { shapes, regions }
}

export const rotate = (grid: string[][]) => {
  return grid[0].map((_, colIndex) => {
    return grid.map((row) => row[colIndex]).reverse()
  })
}

export const part1 = (rawInput: string): number => {
  const { regions } = parseInput(rawInput)
  let count = 0
  regions.forEach(({ size, shapeCounts }) => {
    const [height, width] = size
    let blockCount = 0
    shapeCounts.forEach((shapeCount, index) => {
      blockCount += shapeCount * 8
    })
    if (blockCount < height * width) {
      count++
    }
  })
  return count
}

export const exampleInputPart1 = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
`
