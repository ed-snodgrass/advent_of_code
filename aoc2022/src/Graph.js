import Queue from "./Queue.js";

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

        graph.adjacencyList.get(value.label).forEach(edge => {
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
}
