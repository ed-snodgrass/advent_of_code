import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

class Position {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  isEqual(other) {
    if (this === other) {
      return true;
    }
    return other.x === this.x && other.y === this.y
  }
}

class LandingPosition {
  constructor(head, tail) {
    this.head = head
    this.tail = tail
  }

  isEqual(other) {
    if (this === other) {
      return true;
    }
    return other.tail.isEqual(this.tail) && other.head.isEqual(this.head);
  }
}

function moveRight(steps, head, tail, visited) {
  let headX = head.x;
  let headY = head.y;
  let tailX = tail.x;
  let tailY = tail.y;
  for (let i = 0; i < steps; i++) {
    headX++;
    if (headY === tailY && Math.abs(headX - tailX) >= 2) {
      tailX++;
      visited.push(new Position(tailX, tailY));
    } else if (headY !== tailY && Math.abs(headX - tailX) >= 2) {
      tailX++;
      if (tailY < headY) {
        tailY++;
      } else {
        tailY--;
      }
      visited.push(new Position(tailX, tailY));
    }
  }
  return new LandingPosition(new Position(headX, headY), new Position(tailX, tailY));
}

function moveLeft(steps, head, tail, visited) {
  let headX = head.x;
  let headY = head.y;
  let tailX = tail.x;
  let tailY = tail.y;
  for (let i = 0; i < steps; i++) {
    headX--;
    if (headY === tailY && Math.abs(headX - tailX) >= 2) {
      tailX--;
      visited.push(new Position(tailX, tailY));
    } else if (headY !== tailY && Math.abs(headX - tailX) >= 2) {
      tailX--;
      if (tailY > headY) {
        tailY--;
      } else {
        tailY++;
      }
      visited.push(new Position(tailX, tailY));
    }
  }
  return new LandingPosition(new Position(headX, headY), new Position(tailX, tailY));
}

function moveDown(steps, head, tail, visited) {
  let headX = head.x;
  let headY = head.y;
  let tailX = tail.x;
  let tailY = tail.y;
  for (let i = 0; i < steps; i++) {
    headY--;
    if (headX === tailX && Math.abs(headY - tailY) >= 2) {
      tailY--;
      visited.push(new Position(tailX, tailY));
    } else if (headX !== tailX && Math.abs(headY - tailY) >= 2) {
      tailY--;
      if (tailX > headX) {
        tailX--;
      } else {
        tailX++;
      }
      visited.push(new Position(tailX, tailY));
    }
  }
  return new LandingPosition(new Position(headX, headY), new Position(tailX, tailY));
}

function moveUp(steps, head, tail, visited) {
  let headX = head.x;
  let headY = head.y;
  let tailX = tail.x;
  let tailY = tail.y;

  for (let i = 0; i < steps; i++) {
    headY++;
    if (headX === tailX && Math.abs(headY - tailY) >= 2) {
      tailY++;
      visited.push(new Position(tailX, tailY));
    } else if (headX !== tailX && Math.abs(headY - tailY) >= 2) {
      tailY++;
      if (tailX > headX) {
        tailX--;
      } else {
        tailX++;
      }
      visited.push(new Position(tailX, tailY));
    }
  }
  return new LandingPosition(new Position(headX, headY), new Position(tailX, tailY));
}

function performMove(head, tail, move, visited) {
  const direction = move[0];

  const steps = Number.parseInt(move[1]);
  switch (direction) {
    case 'R':
      return moveRight(steps, head, tail, visited);
    case 'U':
      return moveUp(steps, head, tail, visited);
    case 'D':
      return moveDown(steps, head, tail, visited);
    case 'L':
    default:
      return moveLeft(steps, head, tail, visited);
  }
}

function processPuzzle1(dataInput) {
  const visited = [];
  visited.push(new Position(0, 0));

  let headPosition = new Position(0, 0);
  let tailPosition = new Position(0, 0);

  for (let i = 0; i < dataInput.length; i++) {
    const moveParts = dataInput[i].split(' ');
    const newPosition = performMove(headPosition, tailPosition, moveParts, visited);
    headPosition = newPosition.head;
    tailPosition = newPosition.tail;
  }
  const uniqueVisited = new Set(visited.map(position => JSON.stringify(position)))

  return uniqueVisited.size;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return processPuzzle1(input)
}

function goHorizontal(fore, aft) {
  let newAft = new Position(aft.x, aft.y);

  if (fore.x === aft.x) {
    if (fore.y === aft.y) {
      // do nothing
    } else if (fore.y - aft.y >= 2) {
      newAft.y = fore.y - 1;
    } else if (fore.y - aft.y <= -2) {
      newAft.y = fore.y + 1;
    }
  } else {
    if (fore.y === aft.y) {
      if (fore.x === aft.x) {
        // do nothing
      } else if (fore.x - aft.x >= 2) {
        newAft.x = fore.x - 1;
      } else if (fore.x - aft.x <= -2) {
        newAft.x = fore.x + 1;
      }
    } else {
      newAft = goDiagonal(fore, aft);
    }
  }

  return newAft;
}

function goVertical(fore, aft) {
  let newAft = new Position(aft.x, aft.y);
  // print('{fore: $fore, aft: $aft}');
  if (fore.y === aft.y) {
    if (fore.x === aft.x) {
      // do nothing
    } else if (fore.x - aft.x >= 2) {
      newAft.x = fore.x - 1;
    } else if (fore.x - aft.x <= -2) {
      newAft.x = fore.x + 1;
    }
  } else {
    if (fore.x === aft.x) {
      if (fore.y === aft.y) {
        // do nothing
      } else if (fore.y - aft.y >= 2) {
        newAft.y = fore.y - 1;
      } else if (fore.y - aft.y <= -2) {
        newAft.y = fore.y + 1;
      }
    } else {
      newAft = goDiagonal(fore, aft);
    }
  }

  return newAft;
}

function goDiagonal(fore, aft) {
  let newAft = new Position(aft.x, aft.y);
  const xDiffAbsolute = Math.abs(fore.x - aft.x);
  const yDiffAbsolute = Math.abs(fore.y - aft.y);

  if (xDiffAbsolute === 2 && yDiffAbsolute === 2) {
    fore.x - aft.x > 0 ? newAft.x = fore.x - 1 : newAft.x = fore.x + 1;
    fore.y - aft.y > 0 ? newAft.y = fore.y - 1 : newAft.y = fore.y + 1;
  } else if (xDiffAbsolute >= 2 && yDiffAbsolute >= 2) {
    fore.x - aft.x > 0 ? newAft.x = fore.x - 1 : newAft.x = fore.x + 1;
    fore.y - aft.y > 0 ? newAft.y = fore.y - 1 : newAft.y = fore.y + 1;
  } else if (xDiffAbsolute >= 2 || yDiffAbsolute >= 2) {
    if (xDiffAbsolute >= 2) {
      if (yDiffAbsolute === 1) {
        newAft.y = fore.y;
        fore.x - aft.x > 0 ? newAft.x = fore.x - 1 : newAft.x = fore.x + 1;
      }
    }
    if (yDiffAbsolute >= 2) {
      if (xDiffAbsolute === 1) {
        newAft.x = fore.x;
        fore.y - aft.y > 0 ? newAft.y = fore.y - 1 : newAft.y = fore.y + 1;
      }
    }
  }
  return newAft;
}

function multiMoveRight(steps,  positions, visited) {
  for (let i = 0; i < steps; i++) {
    positions[0].x = positions[0].x + 1;
    for (let j = 1; j < positions.length; j++) {
      positions[j] = goHorizontal(positions[j - 1], positions[j]);
    }
    visited.push(positions[positions.length - 1]);
  }
  return positions;
}

function multiMoveLeft(steps,  positions, visited) {
  for (let i = 0; i < steps; i++) {
    positions[0].x = positions[0].x - 1;
    for (let j = 1; j < positions.length; j++) {
      positions[j] = goHorizontal(positions[j - 1], positions[j]);
    }
    visited.push(positions[positions.length - 1]);
  }
  return positions;
}

function multiMoveDown(steps,  positions, visited) {
  for (let i = 0; i < steps; i++) {
    positions[0].y = positions[0].y - 1;
    for (let j = 1; j < positions.length; j++) {
      positions[j] = goVertical(positions[j - 1], positions[j]);
    }
    visited.push(positions[positions.length - 1]);
  }
  return positions;
}

function multiMoveUp(steps,  positions, visited) {
  for (let i = 0; i < steps; i++) {
    positions[0].y = positions[0].y + 1;
    for (let j = 1; j < positions.length; j++) {
      positions[j] = goVertical(positions[j - 1], positions[j]);
    }
    visited.push(positions[positions.length - 1]);
  }
  return positions;
}

function performMultiMove(positions, move, visited) {
  const direction = move[0];
  const steps = Number.parseInt(move[1]);

  switch (direction) {
    case 'R':
      return multiMoveRight(steps, positions, visited);
    case 'U':
      return multiMoveUp(steps, positions, visited);
    case 'D':
      return multiMoveDown(steps, positions, visited);
    case 'L':
    default:
      return multiMoveLeft(steps, positions, visited);
  }
}

function processPuzzle2(dataInput) {
  const visited = [];
  visited.push(new Position(0, 0));

  let positions = [
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0),
    new Position(0, 0)
  ];

  for (let i = 0; i < dataInput.length; i++) {
    const moveParts = dataInput[i].split(' ');
    positions = performMultiMove(positions, moveParts, visited);
  }
  const uniqueVisited = new Set(visited.map(position => JSON.stringify(position)))
  return uniqueVisited.size;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return processPuzzle2(input)
}

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
