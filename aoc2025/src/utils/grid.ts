export const createNumberGrid = (rawInput:string): number[][] => {
  return rawInput.split('\n').map(line => line.split('').map(Number))
}

export const createCharacterGrid = (rawInput:string): string[][] => {
  return rawInput.split('\n').map(line => line.split(''))
}

export const printGrid = (grid: number[][]|string[][]) => {
  console.log(grid.map(row => row.join('')).join('\n'))
}

