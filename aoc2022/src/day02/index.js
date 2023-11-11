import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let score = 0;
  input.forEach(line => {
    const choices = line.split(' ');
    if (choices[0] === 'A') {
      if (choices[1] === 'X') {
        score += 1;
        score += 3;
      } else if(choices[1] === 'Y') {
        score += 2;
        score += 6;
      } else if(choices[1] === 'Z') {
        score += 3;
        score += 0;
      }
    } else if (choices[0] === 'B') {
      if (choices[1] === 'X') {
        score += 1;
        score += 0;
      } else if(choices[1] === 'Y') {
        score += 2;
        score += 3;
      } else if(choices[1] === 'Z') {
        score += 3;
        score += 6;
      }
    } else if (choices[0] === 'C') {
      if (choices[1] === 'X') {
        score += 1;
        score += 6;
      } else if(choices[1] === 'Y') {
        score += 2;
        score += 0;
      } else if(choices[1] === 'Z') {
        score += 3;
        score += 3;
      }
    }
  })
  return score
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let score = 0;
  input.forEach(line => {
    const choices = line.split(' ');
    if (choices[0] === 'A') {
      if (choices[1] === 'X') {
        score += 3;
        score += 0;
      } else if(choices[1] === 'Y') {
        score += 1;
        score += 3;
      } else if(choices[1] === 'Z') {
        score += 2;
        score += 6;
      }
    } else if (choices[0] === 'B') {
      if (choices[1] === 'X') {
        score += 1;
        score += 0;
      } else if(choices[1] === 'Y') {
        score += 2;
        score += 3;
      } else if(choices[1] === 'Z') {
        score += 3;
        score += 6;
      }
    } else if (choices[0] === 'C') {
      if (choices[1] === 'X') {
        score += 0;
        score += 2;
      } else if(choices[1] === 'Y') {
        score += 3;
        score += 3;
      } else if(choices[1] === 'Z') {
        score += 1;
        score += 6;
      }
    }
  })
  return score
}

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
