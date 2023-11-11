import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')
function isVisible(lines, i, j) {
  const currentValue = Number.parseInt(lines[i][j]);
  //check up
  for (let heightIndex = i - 1; heightIndex >= 0; heightIndex--) {
    if (heightIndex === 0 && Number.parseInt(lines[heightIndex][j]) < currentValue) {
      return true;
    } else {
      if (Number.parseInt(lines[heightIndex][j]) >= currentValue) {
        break;
      }
    }
  }
  //check down
  for (let heightIndex = i + 1; heightIndex < lines.length; heightIndex++) {
    if (heightIndex === lines.length - 1 && Number.parseInt(lines[heightIndex][j]) < currentValue) {
      return true;
    } else {
      if (Number.parseInt(lines[heightIndex][j]) >= currentValue) {
        break;
      }
    }
  }
  //check left
  for (let widthIndex = j - 1; widthIndex >= 0; widthIndex--) {
    if (widthIndex === 0 && Number.parseInt(lines[i][widthIndex]) < currentValue) {
      return true;
    } else {
      if (Number.parseInt(lines[i][widthIndex]) >= currentValue) {
        break;
      }
    }
  }
  //check right
  for (let widthIndex = j + 1; widthIndex < lines.length; widthIndex++) {
    if (widthIndex === lines.length - 1 && Number.parseInt(lines[i][widthIndex]) < currentValue) {
      return true;
    } else {
      if (Number.parseInt(lines[i][widthIndex]) >= currentValue) {
        break;
      }
    }
  }
  return false;
}

function findTreesVisibleFromOutsideGrid(lines) {
  let countOfVisibleTrees = (lines.length * 2) + ((lines[0].length - 2) * 2);
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    for (let j = 1; j < line.length - 1; j++) {
      if (isVisible(lines, i, j)) {
        countOfVisibleTrees++;
      }
    }
  }
  return countOfVisibleTrees;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return findTreesVisibleFromOutsideGrid(input);
}
function calculateScenicScore(lines, i, j) {
  const currentValue = Number.parseInt(lines[i][j]);
  let up = 0;
  let down = 0;
  let left = 0;
  let right = 0;

  // check up
  for (let heightIndex = i - 1; heightIndex >= 0; heightIndex--) {
    if (Number.parseInt(lines[heightIndex][j]) >= currentValue) {
      up++;
      break;
    } else {
      up++;
    }
  }
  //check down
  for (let heightIndex = i + 1; heightIndex < lines.length; heightIndex++) {
    if (Number.parseInt(lines[heightIndex][j]) >= currentValue) {
      down++;
      break;
    } else {
      down++;
    }
  }
  //check left
  for (let widthIndex = j - 1; widthIndex >= 0; widthIndex--) {
    if (Number.parseInt(lines[i][widthIndex]) >= currentValue) {
      left++;
      break;
    } else {
      left++;
    }
  }
  //check right
  for (let widthIndex = j + 1; widthIndex < lines.length; widthIndex++) {
    if (Number.parseInt(lines[i][widthIndex]) >= currentValue) {
      right++;
      break;
    } else {
      right++;
    }
  }
  return up * down * left * right;
}
function findHighestScenicScore(lines) {
  let highestScenicScore = 0;
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    for (let j = 1; j < line.length - 1; j++) {
      if (calculateScenicScore(lines, i, j) > highestScenicScore) {
        highestScenicScore = calculateScenicScore(lines, i, j);
      }
    }
  }
  return highestScenicScore;
}
const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return findHighestScenicScore(input)
}
const testInput = `30373
25512
65332
33549
35390`
run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
