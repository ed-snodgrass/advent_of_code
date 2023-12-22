// class Maze {
//   private maze: string|number[][];
//   private visited: boolean[][];
//   private start: [number, number];
//   private end: [number, number];
//
//   constructor(maze: string|number[][]) {
//     this.maze = maze;
//     this.visited = Array.from({ length: maze.length }, () =>
//       Array(maze[0].length).fill(false)
//     );
//     this.findStartAndEnd();
//   }
//
//   private findStartAndEnd() {
//     for (let i = 0; i < this.maze.length; i++) {
//       for (let j = 0; j < this.maze[i].length; j++) {
//         if (this.maze[i][j] === "S") {
//           this.start = [i, j];
//         } else if (this.maze[i][j] === "E") {
//           this.end = [i, j];
//         }
//       }
//     }
//   }
//
//   private isValidMove(row: number, col: number): boolean {
//     return (
//       row >= 0 &&
//       row < this.maze.length &&
//       col >= 0 &&
//       col < this.maze[0].length &&
//       this.maze[row][col] !== "#" &&
//       !this.visited[row][col]
//     );
//   }
//
//   private depthFirstSearch(row: number, col: number): boolean {
//     if (row === this.end[0] && col === this.end[1]) {
//       // Reached the destination
//       return true;
//     }
//
//     if (!this.isValidMove(row, col)) {
//       return false;
//     }
//
//     this.visited[row][col] = true;
//
//     // Explore in four directions: up, down, left, right
//     const directions = [
//       [-1, 0], // Up
//       [1, 0], // Down
//       [0, -1], // Left
//       [0, 1], // Right
//     ];
//
//     for (const [dx, dy] of directions) {
//       const newRow = row + dx;
//       const newCol = col + dy;
//
//       if (this.depthFirstSearch(newRow, newCol)) {
//         // If the path is found, mark the current cell as part of the path
//         this.maze[row][col] = ".";
//         return true;
//       }
//     }
//
//     return false;
//   }
//
//   public solveMaze(): void {
//     if (!this.start || !this.end) {
//       console.log("Start or end not found in the maze.");
//       return;
//     }
//
//     if (!this.depthFirstSearch(this.start[0], this.start[1])) {
//       console.log("No path found to the destination.");
//     } else {
//       console.log("Path found:");
//       for (const row of this.maze) {
//         console.log(row.join(""));
//       }
//     }
//   }
// }
//
// // Example usage
// const mazeData = [
//   ["S", ".", ".", "#", ".", "."],
//   ["#", "#", ".", "#", ".", "#"],
//   [".", ".", ".", ".", ".", "."],
//   ["#", "#", "#", "#", "#", "#"],
//   [".", ".", ".", ".", ".", "E"],
// ];
//
// const mazeSolver = new Maze(mazeData);
// mazeSolver.solveMaze();
