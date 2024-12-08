
export const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(line => line.trim().split(''))
}

export function countWordOccurrencesDiagonally(puzzle: string[][], word: string): number {
  const numRows = puzzle.length;
  const numCols = puzzle[0].length;
  const wordLength = word.length;
  const middleIndex = Math.floor(wordLength / 2);

  let count = 0;

  function checkCross(x: number, y: number): boolean {
    const startingX = x - middleIndex;
    const endingX = x + middleIndex;
    const startingY = y + middleIndex;
    const endingY = y - middleIndex;

    if (startingX < 0 || endingX >= numRows || endingY < 0 || startingY >= numCols) {
      return false;
    }

    return ((puzzle[startingX][startingY] === 'M' && puzzle[endingX][endingY] === 'S')
        || (puzzle[startingX][startingY] === 'S' && puzzle[endingX][endingY] === 'M'))
      && ((puzzle[startingX][endingY] === 'M' && puzzle[endingX][startingY] === 'S')
        || (puzzle[startingX][endingY] === 'S' && puzzle[endingX][startingY] === 'M'));
  }
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (puzzle[row][col] === word[middleIndex]) {
        if (checkCross(row, col)) {
          count++;
        }
      }
    }
  }

  return count;
}
export function countWordOccurrences(puzzle: string[][], word: string): number {
  const numRows: number = puzzle.length;
  const numCols: number = puzzle[0].length;
  const wordLength: number = word.length;
  let count: number = 0;

  const reversedWord: string = word.split('').reverse().join('');

  const directionVectors: [number, number][] = [
    [1, 0],  // horizontal right
    [0, 1],  // vertical down
    [1, 1],  // diagonal down-right
    [1, -1], // diagonal down-left
  ];

  // Function to check word existence in one direction
  function checkDirection(x: number, y: number, xDir: number, yDir: number, targetWord: string): boolean {
    for (let i = 0; i < wordLength; i++) {
      const newX: number = x + i * xDir;
      const newY: number = y + i * yDir;
      if (
        newX < 0 || newX >= numRows ||
        newY < 0 || newY >= numCols ||
        puzzle[newX][newY] !== targetWord[i]
      ) {
        return false;
      }
    }
    return true;
  }

  // Iterate through each cell in the puzzle matrix
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Check each possible direction
      directionVectors.forEach(([xDir, yDir]) => {
        if (checkDirection(row, col, xDir, yDir, word)) {
          count++;
        }
        if (checkDirection(row, col, xDir, yDir, reversedWord)) {
          count++;
        }
      });
    }
  }

  return count;
}

export const exampleInputPart1 =  `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

export const exampleInputPart2 = exampleInputPart1

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return countWordOccurrences(input, 'XMAS')
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  // console.log(JSON.stringify(input))
  return countWordOccurrencesDiagonally(input, 'MAS')
}
