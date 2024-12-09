export const parseInput = (rawInput: string) => {
  const inputSplit = rawInput.split('\n\n');
  const pageOrderingRules = inputSplit[0].split('\n').map(pageOrderingRule => {
    return pageOrderingRule.split('|').map(Number)
  });
  const updateSequences = inputSplit[1].split('\n').map(updateSequence => {
    return updateSequence.split(',').map(Number)
  })
  return [pageOrderingRules, updateSequences]
}
export function fixOrderSequence(orderingRules: number[][], sequence: number[]): number[] {
  // Create a graph representation using adjacency list and indegree count
  const graph: Map<number, number[]> = new Map();
  const indegree: Map<number, number> = new Map();

  // Initialize indegrees and graph
  sequence.forEach(page => {
    graph.set(page, []);
    indegree.set(page, 0);
  });

  // Build the graph and calculate indegrees
  orderingRules.forEach(([before, after]) => {
    if (graph.has(before) && graph.has(after)) { // Focus on pages present in the sequence
      graph.get(before)?.push(after);
      indegree.set(after, (indegree.get(after) || 0) + 1);
    }
  });

  // Collect all nodes with zero indegree
  const zeroIndegree: number[] = [];
  indegree.forEach((deg, page) => {
    if (deg === 0) zeroIndegree.push(page);
  });

  // Result array for the topologically sorted order
  const result: number[] = [];

  // Perform topological sorting using Kahn's algorithm
  while (zeroIndegree.length > 0) {
    const current = zeroIndegree.shift()!;
    result.push(current);

    graph.get(current)?.forEach(neighbor => {
      indegree.set(neighbor, indegree.get(neighbor)! - 1);

      if (indegree.get(neighbor) === 0) {
        zeroIndegree.push(neighbor);
      }
    });
  }

  // Validate and return result
  return result.length === sequence.length ? result : []; // Return empty if cycle is detected
}

export const determineCorrectnessAccordingToRules = (orderingRules: number[][], orderSequence: number[]) => {
  const pageIndexMap: Record<number, number> = {};
  orderSequence.forEach((page, index) => {
    pageIndexMap[page] = index;
  });

  for (const [first, second] of orderingRules) {
    const firstIndex = pageIndexMap[first];
    const secondIndex = pageIndexMap[second];

    if (firstIndex > secondIndex) {
      return false;
    }
  }

  return true;
}

export const summarizeMiddlePageNumbers = (updateSequences: number[][]) => {
  return updateSequences.reduce((acc, orderingSequence) => {
    const middleIndex = Math.floor(orderingSequence.length / 2);
    return acc + orderingSequence[middleIndex];
  }, 0)
}

export const part1 = (rawInput: string):number => {
  const [pageOrderingRules, updateSequences] = parseInput(rawInput)
  const correctUpdateSequences = updateSequences.filter(updateSequence => {
    return determineCorrectnessAccordingToRules(pageOrderingRules, updateSequence)
  })
  return summarizeMiddlePageNumbers(correctUpdateSequences)
}

export const part2 = (rawInput: string): number => {
  const [pageOrderingRules, updateSequences] = parseInput(rawInput)
  const incorrectUpdateSequences = updateSequences.filter(updateSequence => {
    return !determineCorrectnessAccordingToRules(pageOrderingRules, updateSequence)
  })
  const correctedSequences = incorrectUpdateSequences.map(incorrectUpdateSequence => {
    return fixOrderSequence(pageOrderingRules, incorrectUpdateSequence)
  })
  return summarizeMiddlePageNumbers(correctedSequences)
}

export const exampleInputPart1 =  `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

export const exampleInputPart2 = exampleInputPart1
