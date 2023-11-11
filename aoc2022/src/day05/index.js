import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

function findEndOfStackDescription(lines) {
  let linesUntilRearrangementProcedure = 0;
  let foundStackArrangement = false;
  while (linesUntilRearrangementProcedure < (lines.length - 1) && !foundStackArrangement) {
    if (lines[linesUntilRearrangementProcedure] === '') {
      foundStackArrangement = true;
    } else {
      linesUntilRearrangementProcedure++;
    }
  }
  return linesUntilRearrangementProcedure;
}

function findStackState(inputBreak, lines) {
  const initialCrateStackState = {};
  const stackIndexes = {};
  const indexLine = lines[inputBreak - 1];
  for (let i = 0; i < indexLine.length; i++) {
    if (indexLine[i] !== ' ' && !stackIndexes.hasOwnProperty(`${indexLine[i]}`)) {
      stackIndexes[indexLine[i]] = i;
    }
  }

  for (let inputIndex = inputBreak - 2; inputIndex >= 0; inputIndex--) {
    const stackLine = lines[inputIndex];
    for (let j = 0; j < Object.values(stackIndexes).length; j++) {

      const letterIndex = Object.values(stackIndexes)[j];
      if (letterIndex < stackLine.length && stackLine[letterIndex].trim() !== '') {
        if (initialCrateStackState[j + 1] == null && !initialCrateStackState.hasOwnProperty(`${j + 1}`)) {
          initialCrateStackState[j + 1] = [stackLine[letterIndex]]
        } else {
          initialCrateStackState[j + 1].push(stackLine[letterIndex]);
        }
      }
    }
  }
  return initialCrateStackState;
}

function performMove(howMany, origination, destination, stacks) {
  const originatingStack = stacks[origination];
  const destinationStack = stacks[destination];
  const initialOriginatingLength = originatingStack.length;

  for (let i = 0; i < howMany; i++) {
    const toMove = originatingStack[initialOriginatingLength - (1 + i)];
    destinationStack.push(toMove);
    originatingStack.splice(initialOriginatingLength - (1 + i), 1);
  }
  return {...stacks, origination: originatingStack, destination: destinationStack};
}

function performMoves(moveStartIndex, inputData, initialStackState) {
  for (let i = 0; i < inputData.length - moveStartIndex; i++) {
    const values = inputData[i + moveStartIndex].split(' ');
    initialStackState = performMove(Number.parseInt(values[1]), Number.parseInt(values[3]), Number.parseInt(values[5]), initialStackState);
  }
  return initialStackState;
}

function performMove_9001(howMany, origination, destination, stacks) {
  const originatingStack = stacks[origination];
  const destinationStack = stacks[destination];
  const initialOriginatingLength = originatingStack.length;

  for (let i = 0; i < howMany; i++) {
    const toMove = originatingStack[initialOriginatingLength - howMany];
    destinationStack.push(toMove);
    originatingStack.splice(initialOriginatingLength - howMany, 1);
  }
  return {...stacks, origination: originatingStack, destination: destinationStack};
}

function performMoves_9001(moveStartIndex, inputData, initialStackState) {
  for (let i = 0; i < inputData.length - moveStartIndex; i++) {
    const moves = inputData[i + moveStartIndex].split(' ');
    initialStackState = performMove_9001(Number.parseInt(moves[1]), Number.parseInt(moves[3]), Number.parseInt(moves[5]), initialStackState);
  }
  return initialStackState;
}

const part1 = (rawInput) => {
  const lines = parseInput(rawInput)
  const endOfStackDescription = findEndOfStackDescription(lines)
  const initialCrateStackState = findStackState(endOfStackDescription, lines)

  const stackAfterMoves = performMoves(endOfStackDescription + 1, lines, initialCrateStackState)

  const uniqueValues = [...new Set(Object.values(stackAfterMoves))]
  return uniqueValues.map((value) => value[value.length - 1]).join().replaceAll(',', '')
}

const part2 = (rawInput) => {
  const lines = parseInput(rawInput)
  const endOfStackDescription = findEndOfStackDescription(lines)
  const initialCrateStackState = findStackState(endOfStackDescription, lines)
  const stackAfterMoves = performMoves_9001(endOfStackDescription + 1, lines, initialCrateStackState)

  const uniqueValues = [...new Set(Object.values(stackAfterMoves))]
  return uniqueValues.map((value) => value[value.length - 1]).join().replaceAll(',', '')
}

run({
  part1: {
    tests: [
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
