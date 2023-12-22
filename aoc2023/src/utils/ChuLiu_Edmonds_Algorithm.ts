// class DisjointSet {
//   parent: number[];
//   rank: number[];
//
//   constructor(size: number) {
//     this.parent = Array.from({ length: size }, (_, i) => i);
//     this.rank = Array(size).fill(0);
//   }
//
//   findSet(value: number): number {
//     if (this.parent[value] !== value) {
//       this.parent[value] = this.findSet(this.parent[value]);
//     }
//     return this.parent[value];
//   }
//
//   unionSets(from: number, to: number): void {
//     let rootFrom = this.findSet(from);
//     let rootTo = this.findSet(to);
//
//     if (rootFrom !== rootTo) {
//       if (this.rank[rootFrom] < this.rank[rootTo]) {
//         [rootFrom, rootTo] = [rootTo, rootFrom];
//       }
//       this.parent[rootTo] = rootFrom;
//       if (this.rank[rootFrom] === this.rank[rootTo]) {
//         this.rank[rootFrom]++;
//       }
//     }
//   }
// }
//
// class CLU_Edge {
//   constructor(public from: number, public to: number, public weight: number) {}
// }
//
// class CLE_Graph {
//   constructor(public numNodes: number, public edges: CLU_Edge[]) {}
//
//   findMinimumSpanningArborescence(root: number): CLU_Edge[] {
//     const selectedEdges: CLU_Edge[] = [];
//     const sortedEdges = this.edges.slice().sort((a, b) => a.weight - b.weight);
//
//     const disjointSet = new DisjointSet(this.numNodes);
//     // console.log(disjointSet);
//     for (const edge of sortedEdges) {
//       const rootFrom = disjointSet.findSet(edge.from);
//       const rootTo = disjointSet.findSet(edge.to);
//
//       if (rootFrom !== rootTo) {
//         selectedEdges.push(edge);
//         disjointSet.unionSets(rootFrom, rootTo);
//       }
//     }
//
//     // Ensure that the selected edges form a valid arborescence rooted at the specified root
//     const rootSet = disjointSet.findSet(root);
//     const rootEdges = selectedEdges.filter((edge) => disjointSet.findSet(edge.from) === rootSet);
//
//     return rootEdges;
//   }
// }
//
// function createEdgesForGrid(grid: number[][]): CLU_Edge[] {
//   const edges: CLU_Edge[] = [];
//
//   // TODO account for not going "Backwards"
//   // TODO account for not moving more than 3 steps in one direction
//
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       const vertex = i * grid[i].length + j;
//
//       // Connect to the right neighbor
//       if (j < grid[i].length - 1) {
//         edges.push({ from: vertex, to: vertex + 1, weight: grid[i][j] });
//       }
//
//       // Connect to the bottom neighbor
//       if (i < grid.length - 1) {
//         edges.push({ from: vertex, to: vertex + grid[i].length, weight: grid[i][j] });
//       }
//
//       // Connect to the bottom-right neighbor
//       if (i < grid.length - 1 && j < grid[i].length - 1) {
//         edges.push({ from: vertex, to: vertex + grid[i].length + 1, weight: grid[i][j] });
//       }
//
//       // Connect to the bottom-left neighbor
//       if (i < grid.length - 1 && j > 0) {
//         edges.push({ from: vertex, to: vertex + grid[i].length - 1, weight: grid[i][j] });
//       }
//     }
//   }
//
//   return edges;
// }
//
// // Example usage
//
// // const numNodes = 5;
// // const edges = [
// //   new Edge(0, 1, 2),
// //   new Edge(0, 2, 1),
// //   new Edge(1, 3, 4),
// //   new Edge(1, 4, 3),
// //   new Edge(2, 1, 1),
// //   new Edge(2, 4, 5),
// //   new Edge(4, 3, 7)
// // ];
// //
// // const graph = new Graph(numNodes, edges);
// //
// // const root = 0;
// // const minimumSpanningArborescence = graph.findMinimumSpanningArborescence(root);
// //
// // console.log("Minimum Spanning Arborescence:");
// // for (const edge of minimumSpanningArborescence) {
// //   console.log(`${edge.from} -> ${edge.to} (Weight: ${edge.weight})`);
// // }
