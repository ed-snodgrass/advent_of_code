import run from "aocrunner"


const reduceWorry = (worryLevel, worryReducingDivisor) => {
  return Math.floor(worryLevel % worryReducingDivisor)
}

const parseInputIntoMonkeys = (input) => {
  const linesOfInput = input.split('\n')

  const monkeys = []
  linesOfInput.forEach((line, index) => {
    if (line.startsWith('Monkey')) {
      const title = line.match(/Monkey\s(\d):/)[1]
      const items = linesOfInput[index + 1].match(/Starting items: (.*)/)[1].split(', ').map(item => Number(item))
      const operation = linesOfInput[index + 2].match(/Operation: new = (.*)/)[1]
      const operationType = operation.includes(' + ') ? 'add' : 'multiply'
      const operationValue = linesOfInput[index + 2].match(/Operation: new = old [+*] (.*)/)[1]
      const value = operationValue === 'old' ? 'old' : Number(operationValue)
      const divisor = Number(linesOfInput[index + 3].match(/Test: divisible by (.*)/)[1])
      const testTrue = Number(linesOfInput[index + 4].match(/If true: throw to monkey (.*)/)[1])
      const testFalse = Number(linesOfInput[index + 5].match(/If false: throw to monkey (.*)/)[1])

      // console.log({title, items, operation: {type: operationType, value}, test: {divisor, testTrue, testFalse}})
      monkeys.push({title, count: 0, items, operation: {type: operationType, value}, test: {divisor, testTrue, testFalse}})
    }
  })
  return monkeys
}

const operate = (value, operationType, operationValue) => {
  const targetValue = operationValue === 'old' ? value : operationValue
  if (operationType === 'multiply') {
    // console.log(`Worry level is multiplied by ${targetValue} to ${value * targetValue}`)
    return value * targetValue
  } else {
    // console.log(`Worry level is increased by ${targetValue} to ${value + targetValue}`)
    return value + targetValue
  }
}

const sortByCount = (a, b) => {
  if (a.count > b.count) {
    return -1
  }
  if (a.count < b.count) {
    return 1
  }
  return 0
}

const calculate = (monkeys, numberOfRounds, worryReducingDivisor) => {
  let round = 1
  while (round <= numberOfRounds) {
    monkeys.forEach((monkey) => {
      // console.log(`Monkey ${monkey.title}:`)
      monkey.items.forEach(item => {
        // console.log(`Monkey inspects an item with a worry level of ${item}`)
        let worryLevel = operate(item, monkey.operation.type, monkey.operation.value)

        // console.log(`Monkey gets bored with item. Worry level is divided by ${worryReducingDivisor} to ${reduceWorry(worryLevel, worryReducingDivisor)}`)
        worryLevel = reduceWorry(worryLevel, worryReducingDivisor)
        // console.log(`Current worry level is ${worryLevel % monkey.test.divisor === 0 ? '' : 'not'} divisible by ${monkey.test.divisor}`)
        const newMonkey = worryLevel % monkey.test.divisor === 0 ? monkey.test.testTrue : monkey.test.testFalse
        // console.log(`Item with worry level ${worryLevel} is thrown to monkey ${newMonkey}`)

        monkeys[newMonkey].items.push(worryLevel)
        monkey.count++
      })
      monkey.items = []
    })
    if (round === 1 || round === 20 || round === 1000) {
      let output = `After round ${round}...\n`
      monkeys.forEach((monkey) => {
        output += `Monkey ${monkey.title} inspected items ${monkey.count} times.\n`
      })
    }
    round++
  }
  const sortedMonkeys = monkeys.sort(sortByCount)
  return sortedMonkeys[0].count * sortedMonkeys[1].count
}

export function part1(input) {
  const monkeys = parseInputIntoMonkeys(input)
  let round = 1
  while (round <= 20) {
    monkeys.forEach((monkey) => {
      // console.log(`Monkey ${monkey.title}:`)
      monkey.items.forEach(item => {
        // console.log(`Monkey inspects an item with a worry level of ${item}`)
        let worryLevel = operate(item, monkey.operation.type, monkey.operation.value)

        // console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${Math.floor(worryLevel / 3)}`)
        worryLevel = Math.floor(worryLevel / 3)
        // console.log(`Current worry level is ${worryLevel % monkey.test.divisor === 0 ? '' : 'not'} divisible by ${monkey.test.divisor}`)
        const newMonkey = worryLevel % monkey.test.divisor === 0 ? monkey.test.testTrue : monkey.test.testFalse
        // console.log(`Item with worry level ${worryLevel} is thrown to monkey ${newMonkey}`)

        monkeys[newMonkey].items.push(worryLevel)
        monkey.count++
      })
      monkey.items = []
    })
    // console.log(`After round ${round}...`)
    monkeys.forEach((monkey) => {
      // console.log(`Monkey ${monkey.title}: ${monkey.items}`)
    })
    round++
  }
  monkeys.forEach((monkey) => {
    // console.log(`Monkey ${monkey.title} inspected items ${monkey.count} times`)
  })
  const sortedMonkeys = monkeys.sort(sortByCount)
  return sortedMonkeys[0].count * sortedMonkeys[1].count
}

export const findLCM = (num1, num2) => {
  let hcf
  for (let i = 1; i <= num1 && i <= num2; i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      hcf = i
    }
  }
  return (num1 * num2) / hcf
}
const calculateMonkeyDivisor = monkeys => {
  // console.log(JSON.stringify(monkeys))
  return monkeys.reduce((acc, monkeyDivisor) => {
    return findLCM(acc, monkeyDivisor)
  })
}


export function part2(input) {
  const monkeys = parseInputIntoMonkeys(input)
  const monkeyDivisor = calculateMonkeyDivisor(monkeys.map(monkey => monkey.test.divisor))
  return calculate(monkeys, 10000, monkeyDivisor)
}
const testInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
