export const parseInput = (
  rawInput: string,
): { towelPatterns: string[]; designs: string[] } => {
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
        attempt += towelPattern + '_'
        designToCheck = designToCheck.substring(index + towelPattern.length)
        break
      }
    }
  }
  return false
}

export const part1 = (rawInput: string): number => {
  const { towelPatterns, designs } = parseInput(rawInput)

  return designs.filter(design => checkDesignViability(design, towelPatterns)).length
}

export const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)

  return -1
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
