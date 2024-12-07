export const parseInput = (rawInput: string) => {
  const input = rawInput.split('\n');
  return input.map(report => report.split(' ').map(Number));
}

export const exampleInputPart1 =  `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

export const exampleInputPart2 = exampleInputPart1

function isMonotonic(levels: number[]): boolean {
  if (levels.length < 2) {
    return true; // An array with 0 or 1 element is trivially monotonic
  }

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1]) {
      isDecreasing = false;
    } else if (levels[i] < levels[i - 1]) {
      isIncreasing = false;
    } else if (levels[i] === levels[i - 1]) {
      isDecreasing = false;
      isIncreasing = false;
    }
  }

  return isIncreasing || isDecreasing;
}

function isMonotonicWithOneBadLevel(levels: number[]): { result: boolean, badIndex: number } {

  if (isMonotonic(levels)) {
    return { result: true, badIndex: -1 };
  }

  for (let i = 0; i < levels.length; i++) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isMonotonic(modifiedLevels)) {
      return { result: true, badIndex: i };
    }
  }

  return { result: false, badIndex: -1 };
}

function areAdjacentDifferByOneToThree(levels: number[]): boolean {
  for (let i = 0; i < levels.length - 1; i++) {
    const difference = Math.abs(levels[i] - levels[i + 1]);
    if (difference < 1 || difference > 3) {
      return false
    }
  }

  return true
}

function areAdjacentDifferByOneToThreeWithOneBadLevel(levels: number[]): { result: boolean, badIndex: number } {
  let badLevelIndex = -1;

  for (let i = 1; i < levels.length; i++) {
    const difference = Math.abs(levels[i] - levels[i - 1]);
    if (difference < 1 || difference > 3) {
      if (badLevelIndex !== -1) {
        return { result: false, badIndex: -1 };
      }
      const monotonicCheck = isMonotonicWithOneBadLevel(levels);
      if (monotonicCheck.result && i === levels.length - 1) {
        badLevelIndex = i;
      } else {
        badLevelIndex = i - 1
      }
    }
  }

  if (badLevelIndex === -1) {
    return { result: true, badIndex: -1 };
  }

  const canRemoveBadIndex = (badLevelIndex === 0 || Math.abs(levels[badLevelIndex - 1] - levels[badLevelIndex + 1]) <= 3) ||
    (badLevelIndex + 1 >= levels.length - 1 || Math.abs(levels[badLevelIndex] - levels[badLevelIndex + 2]) <= 3);

  return { result: canRemoveBadIndex, badIndex: badLevelIndex };
}
export const isSafe = (report: number[]): boolean => {
  return isMonotonic(report) && areAdjacentDifferByOneToThree(report);
}

export const isSafeWithDampener = (report: number[]): boolean => {
  if (isMonotonic(report) && areAdjacentDifferByOneToThree(report)) {
    return true;
  }
  const monotonicCheck = isMonotonicWithOneBadLevel(report);
  const adjacentCheck = areAdjacentDifferByOneToThreeWithOneBadLevel(report);

  if (monotonicCheck.badIndex !== -1 && adjacentCheck.badIndex !== -1 && Math.abs(Math.abs(monotonicCheck.badIndex) - Math.abs(adjacentCheck.badIndex)) > 1) {
    return false
  }

  let corrected = false;
  if (monotonicCheck.badIndex !== -1 && adjacentCheck.result) {
    const modifiedReport = report.slice(0, monotonicCheck.badIndex).concat(report.slice(monotonicCheck.badIndex + 1));
    corrected = areAdjacentDifferByOneToThree(modifiedReport) && isMonotonic(modifiedReport);
  }

  if (adjacentCheck.badIndex !== -1 && monotonicCheck.result) {
    const modifiedReport = report.slice(0, adjacentCheck.badIndex).concat(report.slice(adjacentCheck.badIndex + 1));
    return corrected || isMonotonic(modifiedReport) && areAdjacentDifferByOneToThree(modifiedReport);
  }

  return corrected;
}

export const part1 = (rawInput: string):number => {
  const reports = parseInput(rawInput)

  return reports.reduce((count, report) => (isSafe(report) ? count + 1 : count), 0)
}

export const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput)

  return reports.reduce((count, report) => (isSafeWithDampener(report) ? count + 1 : count), 0)

}
