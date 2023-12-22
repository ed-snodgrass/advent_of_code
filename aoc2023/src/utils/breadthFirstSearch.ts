class BFS_Graph {
  private adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map<number, number[]>();
  }

  addVertex(vertex: number): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: number, vertex2: number): void {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }

  bfs(startingVertex: number): number[] {
    const visited: boolean[] = [];
    const result: number[] = [];
    const queue: number[] = [];

    visited[startingVertex] = true;
    queue.push(startingVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift() as number;
      result.push(currentVertex);

      for (const neighbor of this.adjacencyList.get(currentVertex) || []) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

function runBfsExample() {

  const graph = new BFS_Graph();

  graph.addVertex(0);
  graph.addVertex(1);
  graph.addVertex(2);
  graph.addVertex(3);
  graph.addVertex(4);

  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 4);

  const startingVertex = 0;
  const bfsResult = graph.bfs(startingVertex);

  console.log("BFS Result:", bfsResult);

}
