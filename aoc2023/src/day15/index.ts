import run from "aocrunner"

export const parseInput = (rawInput: string) => rawInput.split(',')

export const runHash = (value: string) => {
  let currentValue = 0
  const valueArray = value.split('')
  valueArray.forEach((character) => {
    currentValue += character.charCodeAt(0)
    currentValue = currentValue * 17
    currentValue = currentValue % 256
  })
  return currentValue
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const stepValues = input.map(runHash)
  return stepValues.reduce((sum, value) => sum + value, 0)
}

export const calculateFocusingPower = (boxes: {label: string, focalLength: number}[][]) => {
  return boxes.reduce((sum, box, boxIndex ) => {
    return sum + box.reduce((boxSum, slotValue, slotIndex) => {
      return boxSum + ((boxIndex + 1) * (slotIndex + 1) * slotValue.focalLength)
    }, 0)
  }, 0)
}

export const part2 = (rawInput: string) => {
  const initializationSequence = parseInput(rawInput)
  const boxes: {label: string, focalLength: number}[][] = []
  // @ts-ignore
  Array.from(Array(256).keys()).forEach(() => boxes.push([]))

  initializationSequence.forEach((step) => {
    if (step.includes('=')) {
      const parts = step.split('=')
      const label = parts[0]
      const boxNumber = runHash(label)
      const focalLength = parseInt(parts[1])
      const existingBoxItems = boxes[boxNumber]
      const indexOfExistingStep = existingBoxItems.findIndex((boxMapItem) => boxMapItem.label === label)

      if (indexOfExistingStep >= 0) {
        existingBoxItems[indexOfExistingStep] = {label, focalLength}
      } else {
        boxes[boxNumber] = [...existingBoxItems, {label, focalLength}]
      }
    } else if (step.includes('-')) {
      const parts = step.split('-')
      const label = parts[0]
      const boxNumber = runHash(label)
      const existingBoxItems = boxes[boxNumber]
      boxes[boxNumber] = existingBoxItems.filter((boxMapItem) => boxMapItem.label !== label)
    }
  })
  // console.log(boxes.filter(boxLenses => !!boxLenses.length));
  return calculateFocusingPower(boxes)
}

export const exampleInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

run({
  part1: {
    tests: [
       {
         input: exampleInput,
         expected: 1320,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
