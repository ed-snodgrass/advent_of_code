//
// class PrimsGraph {
//   private adjacencyList: Map<number, { node: number; weight: number }[]>;
//
//   constructor() {
//     this.adjacencyList = new Map<number, { node: number; weight: number }[]>();
//   }
//
//   addVertex(vertex: number): void {
//     this.adjacencyList.set(vertex, []);
//   }
//
//   addEdge(vertex1: number, vertex2: number, weight: number): void {
//     this.adjacencyList.get(vertex1)?.push({ node: vertex2, weight });
//     this.adjacencyList.get(vertex2)?.push({ node: vertex1, weight });
//   }
//
//   prim(startingVertex: number): { parent: number[]; totalWeight: number } {
//     const visited: boolean[] = [];
//     const parent: number[] = [];
//     const key: number[] = [];
//
//     const priorityQueue = new PriorityQueue<{ node: number; weight: number }>((a, b) => a.weight - b.weight);
//
//     for (const vertex of this.adjacencyList.keys()) {
//       visited[vertex] = false;
//       key[vertex] = Infinity;
//       parent[vertex] = -1;
//     }
//
//     key[startingVertex] = 0;
//     priorityQueue.enqueue({ node: startingVertex, weight: 0 });
//
//     while (!priorityQueue.isEmpty()) {
//       const { node: currentVertex } = priorityQueue.dequeue() as { node: number; weight: number };
//
//       if (visited[currentVertex]) continue;
//
//       visited[currentVertex] = true;
//
//       for (const neighbor of this.adjacencyList.get(currentVertex) || []) {
//         const { node, weight } = neighbor;
//         if (!visited[node] && weight < key[node]) {
//           key[node] = weight;
//           parent[node] = currentVertex;
//           priorityQueue.enqueue({ node, weight });
//         }
//       }
//     }
//
//     const totalWeight = key.reduce((sum, weight) => sum + weight, 0);
//
//     return { parent, totalWeight };
//   }
// }
//
//
// // Example usage
// // const graph = new PrimsGraph();
// //
// // graph.addVertex(0);
// // graph.addVertex(1);
// // graph.addVertex(2);
// // graph.addVertex(3);
// //
// // graph.addEdge(0, 1, 2);
// // graph.addEdge(0, 2, 4);
// // graph.addEdge(1, 2, 1);
// // graph.addEdge(1, 3, 5);
// // graph.addEdge(2, 3, 3);
// //
// // const startingVertex = 0;
// // const { parent, totalWeight } = graph.prim(startingVertex);
// //
// // console.log("Minimum Spanning Tree (Prim's Algorithm):");
// // for (let i = 0; i < graph.adjacencyList.size; i++) {
// //   if (i !== startingVertex) {
// //     console.log(`Edge: ${parent[i]} - ${i}, Weight: ${totalWeight}`);
// //   }
// // }
