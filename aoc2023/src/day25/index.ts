import run from "aocrunner"

class Edge {
  src: string
  dest: string

  constructor(s:string, d:string) {
    this.src = s;
    this.dest = d;
  }
}

class Graph {
  vertexCount: number
  edgeCount: number
  edges: Edge[]

  constructor(vertexCount: number, edgeCount:number) {
    this.vertexCount = vertexCount;
    this.edgeCount = edgeCount;
    this.edges = [];
  }
}

class Subset {
  parent: string
  rank: number
  constructor(parent: string, rank: number) {
    this.parent = parent;
    this.rank = rank;
  }
}

function Union(subsets: Subset[], sourceRoot: string, destinationRoot: string) {
  if (subsets[sourceRoot].rank < subsets[destinationRoot].rank) {
    subsets[sourceRoot].parent = destinationRoot;
  } else if (subsets[sourceRoot].rank > subsets[destinationRoot].rank) {
    subsets[destinationRoot].parent = sourceRoot;
  } else {
    subsets[destinationRoot].parent = sourceRoot;
    subsets[sourceRoot].rank++;
  }
}

type Component = {  name: string, connections: string[] }
export const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line) => {
    const match = line.match(/(?<name>.*):\s(?<connections>.*)/)
    const name = match.groups.name
    const connections = match.groups.connections.split(' ')
    return {name, connections}
  })
}

const componentsToEdges = (components: Component[]): Edge[] => {
  // console.log(components);
  const edges = []
  components.forEach(value => {
    value.connections.forEach(connection => {
      edges.push([value.name, connection])
    })
  })
  return edges
}

const findIndividualNodes = (components: Component[]) => {
  const graph = {}
  for (let i = 0; i < components.length; i++) {
    const {name, connections} = components[i]
    const allConnections = [...connections]

    const connectedComponents = components.filter(connectedComponent => connectedComponent.connections.includes(name))
    allConnections.push(...connectedComponents.map(connectedComponent => connectedComponent.name))

    graph[name] = Array.from(new Set(allConnections))
    connections.forEach(connection => {
      if (!components.map(component => component.name).includes(connection)) {
        components.push({name: connection, connections: [name]})
      }
    })
  }

  return graph
}

function kargerMinCut(graph: Graph, originalNodeKeys: string[]) {
  let vertexCount = graph.vertexCount;
  let edgeCount = graph.edgeCount;
  let edges = graph.edges;

  let subsets: Subset[] = [];

  for (let i = 0; i < vertexCount; i++) {
    subsets[originalNodeKeys[i]] = new Subset(originalNodeKeys[i], 0);
  }

  let vertices = vertexCount;

  while (vertices > 2) {
    let i = Math.floor(Math.random() * (edgeCount - 1));
    let subset1 = findRootNode(subsets, edges[i].src);
    let subset2 = findRootNode(subsets, edges[i].dest);

    if (subset1 !== subset2) {
      vertices--;
      Union(subsets, subset1, subset2);
    }
  }

  let cutEdges = 0;
  for (let i = 0; i < edgeCount; i++) {
    let subset1 = findRootNode(subsets, edges[i].src);
    let subset2 = findRootNode(subsets, edges[i].dest);
    if (subset1 !== subset2) {
      cutEdges++;
    }
  }

  const components = new Array(vertexCount).fill(0).map((_, i) => findRootNode(subsets, originalNodeKeys[i]));

  return {cutEdges, components};
}

function findRootNode(subsets: Subset[], currentNode: string) {
  if (subsets[currentNode].parent !== currentNode) {
    subsets[currentNode].parent = findRootNode(subsets, subsets[currentNode].parent);
  }
  return subsets[currentNode].parent;
}

export const part1 = (rawInput: string): number => {
  const nodes = findIndividualNodes(parseInput(rawInput))
  const edges = componentsToEdges(parseInput(rawInput))
  let graph = new Graph(Object.keys(nodes).length, edges.length);
  graph.edges = edges.map((edge) => new Edge(edge[0], edge[1]));

  let numberOfExecutions = 0;
  let components: string[];
  while (numberOfExecutions < 1000) {
    numberOfExecutions++;
    const minCutResults = kargerMinCut(graph, Object.keys(nodes));
    components = minCutResults.components
    if (minCutResults.cutEdges === 3) {
      break;
    }
  }

  let list: Record<string, number> = {};
  components.forEach((component: string) => {
    if (!(component in list)) list[component] = 0;
    list[component]++;
  });

  return Object.values(list).reduce((product: number, value: number) => product * value, 1);
};

export const exampleInput = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 54,
       },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
})
