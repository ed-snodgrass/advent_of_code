
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
}
