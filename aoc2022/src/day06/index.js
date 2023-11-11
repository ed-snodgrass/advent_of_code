import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

function mineForSequence(inputData, sequenceLength) {
  let lastFour = inputData.slice(0, sequenceLength - 1);

  for (let i = sequenceLength - 1; i < inputData.length; i++) {
    if (new Set(lastFour).size === sequenceLength) {
      return i;
    }
    const tempBeginning = i - (sequenceLength - 1);
    const tempEnd = tempBeginning + sequenceLength;
    lastFour = inputData.slice(i - (sequenceLength - 1), tempEnd);
    lastFour.push(inputData[i]);
  }
  return inputData.length;
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const dataStream = input[0].split('');
  return mineForSequence(dataStream, 4);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const dataStream = input[0].split('');
  return mineForSequence(dataStream, 14);
}

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
