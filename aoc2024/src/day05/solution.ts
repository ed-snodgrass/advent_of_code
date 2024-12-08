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
  const input = parseInput(rawInput)

  return -1
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
