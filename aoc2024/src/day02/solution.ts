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

function isMonotonic(arr: number[]): boolean {
  if (arr.length < 2) {
    return true; // An array with 0 or 1 element is trivially monotonic
  }

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      isDecreasing = false;
    } else if (arr[i] < arr[i - 1]) {
      isIncreasing = false;
    }
  }

  return isIncreasing || isDecreasing;
}
function areAdjacentDifferByOneToThree(report: number[]): boolean {
  // Check each pair of adjacent elements in the array
  for (let i = 0; i < report.length - 1; i++) {
    const difference = Math.abs(report[i] - report[i + 1]);
    if (difference < 1 || difference > 3) {
      return false; // Return false if any adjacent difference is outside the range [1, 3]
    }
  }

  return true; // Return true if all adjacent differences are within the range [1, 3]
}

export const isSafe = (report: number[]): boolean => {
  return isMonotonic(report) && areAdjacentDifferByOneToThree(report);
}
export const isSafeWithDampener = (report: number[]): boolean => {
  return isMonotonic(report) && areAdjacentDifferByOneToThree(report);
}

export const part1 = (rawInput: string):number => {
  const reports = parseInput(rawInput)

  return reports.reduce((count, report) => (isSafe(report) ? count + 1 : count), 0)
}

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}
