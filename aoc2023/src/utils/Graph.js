import Queue from "./Queue.js";

const node = (x, y, v) => {
  return {x, y, v}
}
export default class Graph {

  constructor() {
    this.nodes = []
    this.adjacencyList = new Map()
  }

   addNode(vertex) {
    this.nodes.push(JSON.stringify(vertex))
    this.adjacencyList.set(JSON.stringify(vertex), [])
   }

  addEdge(vertex, otherEdgeVertex, weight) {
    const theOtherEdge = {node: JSON.stringify(otherEdgeVertex), weight}
    this.adjacencyList.get(JSON.stringify(vertex)).push(theOtherEdge)
  }

  bfs(start, end) {
    const queue = new Queue()
    const explored = []
    queue.enqueue({label: start})
    explored.push({label: start})
    let keepOn = true
    while (!queue.isEmpty() && keepOn) {
      const value = queue.dequeue()
      if (value.label === end) {
        queue.clear()
      } else {

        this.adjacencyList.get(value.label).forEach(edge => {
          if (!explored.find(someNode => someNode.label === edge.node) && keepOn) {
            explored.push({label: edge.node, parent: value.label})
            if (edge.node === end) {
              keepOn = false
            } else {
              queue.enqueue({label: edge.node, parent: value.label})
            }
          }
        })
      }
    }
    const shortestPath = []
    for (let i = explored.length - 1; i >= 0;) {
      shortestPath.push(explored[i])
      i = explored.findIndex(someNode => someNode.label === explored[i].parent)
    }
    return shortestPath.length - 1
  }

  buildGraph(grid, findEdgeNodes, processEdgeNode) {
    const graph = new Graph(grid.length * grid[0].length)

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
        const vertex = node(columnIndex, rowIndex, grid[rowIndex][columnIndex])
        graph.addNode(vertex)
        const edgeNodes = findEdgeNodes(grid, columnIndex, rowIndex)
        edgeNodes.forEach(processEdgeNode)
      }
    }

    return graph
  }

}
