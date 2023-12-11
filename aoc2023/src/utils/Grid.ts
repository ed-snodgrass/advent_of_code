
export type GridNode = {
  x: number,
  y: number,
  v: string,
  hasVisited?: boolean,
}

export default class Grid {
  grid: GridNode[][]
  start: GridNode

  constructor(inputLines: string[], startCharacter?: string) {
    this.grid = []

    inputLines.forEach((line: string, rowNum: number) => {
      this.grid[rowNum] = []
      line.split('').forEach((character, columnNumber) => {
        const gridNode = {x: columnNumber, y: rowNum, v: character, hasVisited: false}
        this.grid[rowNum].push(gridNode)
        if (startCharacter && character === startCharacter) {
          this.start = gridNode
        }
      })
    })
  }

  replaceStart(replacementCharacter: string) {
    this.grid[this.start.y][this.start.x].v = replacementCharacter
  }

  visit(x: number, y: number) {
    this.grid[y][x].hasVisited = true
  }

  getNode(x: number, y: number) {
    return this.grid[y][x]
  }

  toString() {
    let gridString = ''
    for (let yIndex = 0; yIndex < this.grid.length; yIndex++) {
      for (let xIndex = 0; xIndex < this.grid[yIndex].length; xIndex++) {
        gridString += this.grid[yIndex][xIndex]
      }
      gridString += '\n'
    }
    return gridString
  }
}
