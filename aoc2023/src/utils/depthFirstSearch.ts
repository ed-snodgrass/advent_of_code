

function depthFirstSearch(start, end, visited, path, row: number, col: number, previousRow: number, previousCol: number, isValidMove: Function): boolean {
  if (row === end[0] && col === end[1]) {
    // Reached the destination
    return true;
  }

  if (!isValidMove(row, col, previousRow, previousCol)) {
    return false;
  }

  visited[row][col] = true;

  // Explore in four directions: up, down, left, right
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (depthFirstSearch(start, end, visited, path, newRow, newCol, row, col, isValidMove)) {
      // If the path is found, mark the current cell as part of the path
      // this.grid[row][col] = ".";
      path.push({y: newRow, x: newCol})
      return true;
    }
  }

  return false;
}

export default depthFirstSearch
