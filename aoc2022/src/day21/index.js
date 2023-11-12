import run from "aocrunner"
import nerdamer from 'nerdamer'
import 'nerdamer/Algebra.js'
import 'nerdamer/Calculus.js'
import 'nerdamer/Solve.js'
import 'nerdamer/Extra.js'

const parseInput = (rawInput) => rawInput.split('\n')

const ADD = '+'
const SUBTRACT = '-'
const MULTIPLY = '*'
const DIVIDE = '/'
const EQUALS = '='

export const operations = {ADD, SUBTRACT, MULTIPLY, DIVIDE, EQUALS}

export const parse = (line) => {
  const pattern = /^(.*):\s(.*)/
  const match = line.match(pattern)
  const monkey = {name: match[1]}
  const operationPart = match[2].split(' ')
  if (operationPart.length > 1) {
    monkey.operation = operationPart[1]
    monkey.first = operationPart[0]
    monkey.second = operationPart[2]
  } else {
    monkey.value = Number(operationPart[0])
  }
  return monkey
}

const operate = (first, second, operation) => {
  switch (operation) {
    case ADD:
      return first + second
    case SUBTRACT:
      return first - second
    case MULTIPLY:
      return first * second
    case DIVIDE:
      return first / second
  }
}

export const createNodes = (input) => {
  return input.map((line, lineIndex) => ({...parse(line), order: lineIndex}))
}

export const findNodeValue = (node, allNodes) => {
  if (node.value) {
    return node
  }
  if (isNaN(node.first)) {
    const firstNode = allNodes.find(otherNode => otherNode.name === node.first)
    const firstNodeValue = findNodeValue(firstNode, allNodes)
    node.first = isNaN(firstNodeValue.value) ? firstNodeValue : firstNodeValue.value
  }
  if (isNaN(node.second)) {
    const secondNode = allNodes.find(otherNode => otherNode.name === node.second)
    const secondNodeValue = findNodeValue(secondNode, allNodes)
    node.second = isNaN(secondNodeValue.value) ? secondNodeValue : secondNodeValue.value
  }
  node.value = operate(node.first, node.second, node.operation)
  return node
}

export const processRoot = (nodes) => {
  const root = nodes.find(node => node.name === 'root')
  const nodeValue = findNodeValue(root, nodes)

  return operate(nodeValue.first, nodeValue.second, nodeValue.operation)
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const allNodes = createNodes(input)
  return processRoot(allNodes)
}

const parsePart2 = (line) => {
  const pattern = /^(.*):\s(.*)/
  const match = line.match(pattern)
  const monkey = {name: match[1]}
  const operationPart = match[2].split(' ')

  if (operationPart.length > 1) {
    monkey.operation = monkey.name === 'root' ? EQUALS : operationPart[1]
    monkey.first = operationPart[0]
    monkey.second = operationPart[2]
  } else {
    monkey.value = Number(operationPart[0])
  }
  return monkey
}

const operatePart2 = (first, second, operation) => {
  const firstOperand = !isNaN(first) || first === 'x' ? first : first.job
  const secondOperand = !isNaN(second) || second === 'x' ? second : second.job

  switch (operation) {
    case ADD:
      return `(${firstOperand} + ${secondOperand})`
    case SUBTRACT:
      return `(${firstOperand} - ${secondOperand})`
    case MULTIPLY:
      return `(${firstOperand} * ${secondOperand})`
    case DIVIDE:
      return `(${firstOperand} / ${secondOperand})`
    case EQUALS:
      return `${firstOperand} = ${secondOperand}`
  }
}
export const createNodesPart2 = (input) => {
  return input.map((line, lineIndex) => ({...parsePart2(line), order: lineIndex}))
}

const findNodeValuePart2 = (node, allNodes) => {
  if (node.value || node.job) {
    return node
  }

  if (isNaN(node.first) && node.first !== 'x') {
    if (node.first === 'humn') {
      node.first = 'x'
    } else {
      const firstNode = allNodes.find(otherNode => otherNode.name === node.first)
      const firstNodeValue = findNodeValuePart2(firstNode, allNodes)
      node.first = isNaN(firstNodeValue.value) && node.first !== 'x' ? firstNodeValue : firstNodeValue.value
    }
  }
  if (isNaN(node.second) && node.second !== 'x') {
    if (node.second === 'humn') {
      node.second = 301
    } else {
      const secondNode = allNodes.find(otherNode => otherNode.name === node.second)
      const secondNodeValue = findNodeValuePart2(secondNode, allNodes)
      node.second = isNaN(secondNodeValue.value) && node.second !== 'x' ? secondNodeValue : secondNodeValue.value
    }
  }
  node.job = operatePart2(node.first, node.second, node.operation)
  return node
}
export const calculateHumanYellPart2 = (nodes) => {
  const root = nodes.find(node => node.name === 'root')
  findNodeValuePart2(root, nodes)
  const solution = nerdamer.solveEquations(root.job)

  return solution[0].multiplier.num.value
}
const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const allNodes = createNodesPart2(input)
  return calculateHumanYellPart2(allNodes)
}
const testInput = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`
run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 152,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 301,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
