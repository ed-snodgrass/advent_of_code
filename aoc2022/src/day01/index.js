import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const elves = input.split('\n\n').map(elfString => elfString.split('\n').map(caloriesString => Number.parseInt(caloriesString)))
  const totals = []
  elves.forEach(elf => {
    const elfSum = elf.reduce((accumulator, currentValue) => {

      return +accumulator + +currentValue
    }, 0)
    totals.push( elfSum)
  })
  totals.sort((a,b) => {
    return b - a
  })
  return totals[0];
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const elves = input.split('\n\n').map(elfString => elfString.split('\n').map(caloriesString => Number.parseInt(caloriesString)))
  const totals = []
  elves.forEach(elf => {
    const elfSum = elf.reduce((accumulator, currentValue) => {

      return +accumulator + +currentValue
    }, 0)
    totals.push( elfSum)
  })
  totals.sort((a,b) => {
    return b - a
  })
  return totals[0] + totals[1] + totals[2];
}

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
