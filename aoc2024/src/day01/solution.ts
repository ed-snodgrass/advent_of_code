export const parseInput = (rawInput: string) => {
  const firstArray: number[] = [];
  const secondArray: number[] = [];
  const lines = rawInput.split('\n');

  for (const line of lines) {
    const [first, second] = line.trim().split(/\s+/).map(Number);

    firstArray.push(first);
    secondArray.push(second);
  }

  firstArray.sort((a, b) => a - b);
  secondArray.sort((a, b) => a - b);

  return [firstArray, secondArray]
}

export const calculateDistances = (array1: number[], array2: number[]): number => {
  const minLength = Math.min(array1.length, array2.length);

  let result: number = 0;

  for (let i = 0; i < minLength; i++) {
    result += Math.abs(array2[i] - array1[i]);
  }

  return result;
}

export const exampleInputPart1 =  `3   4
4   3
2   5
1   3
3   9
3   3`

export const exampleInputPart2 = exampleInputPart1

export const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return calculateDistances(input[0], input[1])
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return 0
}
