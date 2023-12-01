
export const dijkstras = (vertices, edges, startNode, endNode) => {
  const processNode = (currentVertexIndex) => {
    const currentVertex = vertexList[currentVertexIndex]
    const unvisitedNeighbors = adjacencyMatrix.get(currentVertex.label).filter(neighbor => {
      return unvisited.includes(neighbor.node)
    })
    let nextIndex
    let nextWeight = Number.MIN_SAFE_INTEGER
    unvisitedNeighbors.forEach(neighbor => {
      const neighborIndex = vertexList.findIndex(vertex => vertex.label === neighbor.node)

      const currentNeighborVertex = vertexList[neighborIndex]
      if (neighbor.weight > nextWeight) {
        nextWeight = neighbor.weight
        nextIndex = neighborIndex
      }
      const tempDistance = currentVertex.distanceFromStart + 1
      if (currentNeighborVertex.distanceFromStart > tempDistance) {
        vertexList[neighborIndex] = {...currentNeighborVertex, distanceFromStart: tempDistance}
      }
    })
    vertexList[currentVertexIndex] = {...vertexList[currentVertexIndex], visited: true}
    shortestPath.push(vertexList[currentVertexIndex])
    const unvisitedIndex = unvisited.indexOf(currentVertex.label)
    unvisited.splice(unvisitedIndex, 1)
    return nextIndex
  }

  const vertexList = vertices.map(vertex => ({label: vertex, visited: false, distanceFromStart: Infinity}))
  const endNodeIndex = vertexList.findIndex(vertex => vertex.label === endNode)
  const unvisited = [...vertices]
  const adjacencyMatrix = edges
  const shortestPath = []
  const startNodeIndex = vertexList.findIndex(vertex => vertex.label === startNode)
  vertexList[startNodeIndex] = {...vertexList[startNodeIndex], distanceFromStart: 0, visited: true}
  let nextNodeIndex = processNode(startNodeIndex)
  while (!vertexList[endNodeIndex].visited) {
    // TODO need to handle what happens when our node hits a dead end?
    nextNodeIndex = processNode(nextNodeIndex)
  }

  return shortestPath.length - 1
}
