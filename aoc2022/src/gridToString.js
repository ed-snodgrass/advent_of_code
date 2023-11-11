export default function (grid) {
  let gridString = ''
  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    for (let xIndex = 0; xIndex < grid[yIndex].length; xIndex++) {
      gridString += grid[yIndex][xIndex]
    }
    gridString += '\n'
  }
  return gridString
}
