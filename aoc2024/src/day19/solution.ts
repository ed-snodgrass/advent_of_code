export const parseInput = (rawInput: string): { towelPatterns: string[]; designs: string[] } => {
  const lines = rawInput.split("\n\n")
  const towelPatterns = lines[0].split(", ")
  const designs = lines[1].split("\n")
  return { towelPatterns, designs }
}

export function checkDesignViability(design: string, towelPatterns: string[]) {
  let startingIndex = 0
  let patternsToCheck = [...towelPatterns]
  let designToCheck = design
  let attempt = ""
  let numberOfAttempts = 0
  while (numberOfAttempts <= design.length && startingIndex < patternsToCheck.length) {
    if (designToCheck === "" && attempt.replace(/_/g, "") === design) {
      return true
    }
    if (numberOfAttempts === design.length) {
      attempt = ""
      designToCheck = design
      startingIndex++
      numberOfAttempts = 0
      const removed = patternsToCheck.splice(0, startingIndex)
      patternsToCheck = patternsToCheck.concat(removed)
    }
    numberOfAttempts++

    for (let i = 0; i < patternsToCheck.length; i++) {
      const towelPattern = patternsToCheck[i]
      if (designToCheck.startsWith(towelPattern)) {
        const index = designToCheck.indexOf(towelPattern)
        attempt += towelPattern + "_"
        designToCheck = designToCheck.substring(index + towelPattern.length)
        break
      }
    }
  }
  return false
}

export const part1 = (rawInput: string): number => {
  const { towelPatterns, designs } = parseInput(rawInput)

  return designs.filter((design) => checkDesignViability(design, towelPatterns)).length
}

export function findDesignOptions(design: string, towelPatterns: string[]) {
  const matchingPatterns = towelPatterns.filter((towelPattern) => design.includes(towelPattern))
  const memo: Map<string, number> = new Map()

  function backtrack(remaining: string, path: string[]): number {
    if (memo.has(remaining)) {
      return memo.get(remaining)!
    }

    let solutionsCount = 0
    if (remaining === "") {
      return 1
    }

    for (const pattern of matchingPatterns) {
      if (remaining.startsWith(pattern)) {
        const newRemaining = remaining.slice(pattern.length)
        const newPath = [...path, pattern]
        const subSolutions = backtrack(newRemaining, newPath)

        solutionsCount += subSolutions
      }
    }
    memo.set(remaining, solutionsCount)

    return solutionsCount
  }

  return backtrack(design, [])
}

export const part2 = (rawInput: string): number => {
  const { towelPatterns, designs } = parseInput(rawInput)
  const possibleDesigns = designs.map((design) => findDesignOptions(design, towelPatterns))
  return possibleDesigns.reduce((acc, b) => acc + b, 0)
}

export const exampleInputPart1 = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

export const exampleInputPart2 = exampleInputPart1
