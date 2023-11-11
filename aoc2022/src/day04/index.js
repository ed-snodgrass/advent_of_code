import run from "aocrunner"

function getElfSectionRange(inputLine) {
  const elfPair = inputLine.split(',');
  return [elfPair[0].split('-').map((e) => Number.parseInt(e)), elfPair[1].split('-').map((e) => Number.parseInt(e))];
}

function fullyContains(elfSectionList) {
  const range1 = elfSectionList[0]
  const range2 = elfSectionList[1]
  return ((range1[0] >= range2[0] && range1[1] <= range2[1]) || (range2[0] >= range1[0] && range2[1] <= range1[1]))
}
function containsAny(elfSectionList) {
  const range1 = elfSectionList[0];
  const range2 = elfSectionList[1];
  return ((range1[0] >= range2[0] && range1[0] <= range2[1]) || (range2[0] >= range1[0] && range2[0] <= range1[1]));
}
const parseInput = (rawInput) => rawInput.split('\n').map(line => getElfSectionRange(line))

const part1 = (rawInput) => {
  const elfSectionRange = parseInput(rawInput)
  return elfSectionRange.filter(fullyContains).length;
}

const part2 = (rawInput) => {
  const elfSectionRange = parseInput(rawInput)
  return elfSectionRange.filter(containsAny).length
}

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
