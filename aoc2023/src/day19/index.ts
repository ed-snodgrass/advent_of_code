import run from "aocrunner"

export type PartRating = {
  x: number
  m: number
  a: number
  s: number
}

export type Condition = {
  partRatingCategory: string
  operator: string
  rating: number
}

export type Rule = {
  condition?: Condition,
  nextWorkflow: string
}
export type Workflow = {
  name: string
  rules: Rule[]
}
export type Workflow2 = {
  name: string
  rules: Rule[]
  fallback: string
}

enum Status {
  ACCEPTED = 'A',
  REJECTED = 'R',
}

const buildWorkflowRules = (rulesStringArray: string[]) => {
  return rulesStringArray.map(rulesString => {
    const ruleParts = rulesString.split(':')
    if (ruleParts.length === 1) {
      return {
        nextWorkflow: ruleParts[0],
      }
    }
    const nextWorkflow = ruleParts[1]
    const conditionString = ruleParts[0]
    const conditionMatcher = conditionString.match(/(?<partRatingCategory>[xmas])(?<operator>[<>=])(?<rating>\d+)/)

    let condition: Condition | undefined
    if (conditionMatcher) {
      condition = {
        partRatingCategory: conditionMatcher.groups.partRatingCategory,
        operator: conditionMatcher.groups.operator,
        rating: Number.parseInt(conditionMatcher.groups.rating)
      }
    }
    return {
      nextWorkflow,
      condition,
    }
  })
}

const buildWorkflows = (workflowPart: string) => {
  return workflowPart.split('\n').map(workflowString => {
    const workflowMatch = workflowString.match(/^(?<name>.*)\{(?<rules>.*)\}$/u)
    const rulesStringArray = workflowMatch.groups.rules.split(',')
    const rules = buildWorkflowRules(rulesStringArray)
    return {name: workflowMatch.groups.name, rules}
  })
}
const buildWorkflows2 = (workflowPart: string) => {
  return workflowPart.split('\n').map(workflowString => {
    const workflowMatch = workflowString.match(/^(?<name>.*)\{(?<rules>.*)\}$/u)
    const rulesStringArray = workflowMatch.groups.rules.split(',')
    const rules = buildWorkflowRules(rulesStringArray)
    const fallback = rules.find(rule => !rule.condition)
    return {name: workflowMatch.groups.name, rules: rules.filter(rule => !!rule.condition), fallback: fallback.nextWorkflow}
  })
}

const buildPartRatings = (partRatingsPart: string) => {
  return partRatingsPart.split('\n').map(partRatingString => {
    const partRatingMatch = partRatingString.match(/^\{x=(?<xValue>\d+),m=(?<mValue>\d+),a=(?<aValue>\d+),s=(?<sValue>\d+)}$/)
    return {
      x: Number.parseInt(partRatingMatch.groups.xValue),
      m: Number.parseInt(partRatingMatch.groups.mValue),
      a: Number.parseInt(partRatingMatch.groups.aValue),
      s: Number.parseInt(partRatingMatch.groups.sValue),
    }
  })
}

export const parseInput = (rawInput: string) : {workflows: Workflow[], partRatings: PartRating[]} => {
  const inputParts= rawInput.split('\n\n')
  const workflows = buildWorkflows(inputParts[0])
  const partRatings = buildPartRatings(inputParts[1])

  return {workflows, partRatings}
}
export const parseInput2 = (rawInput: string) : {workflows: Workflow2[], partRatings: PartRating[]} => {
  const inputParts= rawInput.split('\n\n')
  const workflows = buildWorkflows2(inputParts[0])
  const partRatings = buildPartRatings(inputParts[1])

  return {workflows, partRatings}
}
export const sumUpAcceptedPartRatings = (partRatings: PartRating[]) => {
  return partRatings.reduce((sum, partRating) => {
    sum += partRating.x + partRating.m + partRating.a + partRating.s
    return sum
  }, 0)
}

export const isAcceptedPart = (partRating: PartRating, workflows: Workflow[]) => {
  // start at 'in'
  const start = workflows.find(workflow => workflow.name === 'in')
  let result = ''
  let currentWorkflow = start
  while (result !== Status.ACCEPTED && result !== Status.REJECTED) {
    for (let i = 0; i < currentWorkflow.rules.length; i++) {
      if (i === currentWorkflow.rules.length - 1) {
        result = currentWorkflow.rules[i].nextWorkflow
        currentWorkflow = workflows.find(workflow => workflow.name === result)
        break
      } else {
        const currentRule = currentWorkflow.rules[i]
        const categoryValue: number = partRating[currentRule.condition.partRatingCategory]
        const conditionRating = currentRule.condition.rating
        if ((currentRule.condition.operator === '<' && categoryValue < conditionRating) || (currentRule.condition.operator === '>' && categoryValue > conditionRating)) {
          result = currentRule.nextWorkflow
          currentWorkflow = workflows.find(workflow => workflow.name === result)
          break
        }
      }
    }
  }
  return result === Status.ACCEPTED
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const acceptedParts = input.partRatings.filter(partRating => {
    return isAcceptedPart(partRating, input.workflows)
  })
  return sumUpAcceptedPartRatings(acceptedParts)
}

export const countAll = (workflows: Workflow2[]) => {
  const ratingRanges = {}
  'xmas'.split('').forEach(key => {
    ratingRanges[key] = [1, 4000]
  })
  const countOne = (target: string, ranges: Record<string, number[]>) => {
    if (target === 'R') {
      return 0
    }
    if (target === 'A') {
      let product = 1
      Object.keys(ranges).forEach(rangeKey => {
        const [min, max] = ranges[rangeKey]
        product *= (1 + max - min)
      })
      return product
    }
    let total = 0
    const targetWorkflow = workflows.find(workflow => workflow.name === target)
    targetWorkflow.rules.forEach(({nextWorkflow, condition}) => {
      const category = condition.partRatingCategory
      const ratingValue = condition.rating
      const operator = condition.operator

      const [min, max] = ranges[category]
      let acceptedRanges: number[], otherRanges: number[]
      if (operator === '<') {
        acceptedRanges = [min, Math.min(max, ratingValue - 1)]
        otherRanges = [Math.max(min, ratingValue), max]
      } else {
        acceptedRanges = [Math.max(min, ratingValue + 1), max]
        otherRanges = [min, Math.min(max, ratingValue)]
      }
      if (acceptedRanges[0] <= acceptedRanges[1]) {
        const newRanges = JSON.parse(JSON.stringify(ranges))
        newRanges[category] = acceptedRanges
        total += countOne(nextWorkflow, newRanges)
      }
      if (otherRanges[0] <= otherRanges[1]) {
        ranges[category] = otherRanges
      }
    })
    total += countOne(targetWorkflow.fallback, ranges)
    return total
  }

  return countOne('in', ratingRanges)
}

export const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput)
  return countAll(input.workflows)
}

export const exampleInput = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 19114,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 167409079868000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
