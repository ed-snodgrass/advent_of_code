import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  let cycles = 1;
  let xRegister = 1;
  let signalStrength = 0;
  const input = parseInput(rawInput)
  const commands = input.split('\n')
  const signalCapturePoints = [20, 60, 100, 140, 180, 220]
  commands.forEach((command) => {
    if (command === 'noop') {
      if (signalCapturePoints.includes(cycles)) {
        console.log(`command: ${command}, cycles: ${cycles}, xRegister: ${xRegister}, new signal strength: ${cycles * xRegister}`)
        signalStrength += (cycles * xRegister)
      }
      cycles++;
    } else if (command.startsWith('addx')) {
      const value = Number(command.split(' ')[1]);
      if (signalCapturePoints.includes(cycles)) {
        console.log(`command: ${command}, cycles: ${cycles}, xRegister: ${xRegister}, new signal strength: ${cycles * xRegister}`)
        signalStrength += (cycles * xRegister)
      }
      cycles++;
      if (signalCapturePoints.includes(cycles)) {
        console.log(`command: ${command}, cycles: ${cycles}, xRegister: ${xRegister}, new signal strength: ${cycles * xRegister}`)
        signalStrength += (cycles * xRegister)
      }
      cycles++;
      xRegister += value
    }
  })

  return signalStrength
}

const printCrt = (crt) => {
  let crtOutput = ''
  for (let i = 0; i < 6; i++) {
    const start = i * 40
    const end = (i + 1) * 40
    // console.log(`slice(${start}, ${end})`)
    const row = crt.slice(start, end);
    row.forEach(pixelInRow => {
      crtOutput += pixelInRow
    })
    crtOutput += '\n'
  }
  // crt.forEach((crtPixel, index) => {
  //   crtOutput += crtPixel
  //   // if (index > 0 && index % 39 === 0) {
  //   //   crtOutput += '\n'
  //   // }
  // })
  return crtOutput
}

const part2 = (rawInput) => {
  const crt = []
  for (let i = 0; i < 240; i++) {
    crt.push('.')
  }

  let cycle = 1;
  let xRegister = 1;
  let spritePosition = [xRegister - 1, xRegister, xRegister + 1]
  const input = parseInput(rawInput)
  const commands = input.split('\n')


  commands.forEach((command, index) => {
    // console.log(`Sprite Position: ${spritePosition}\n`)
    // console.log(`Math.floor(${cycles} / 40): ${Math.floor(cycles / 40)}`)
    const row = Math.floor((cycle) / 40)
    let currentPixel = (cycle - 1) - (40 * row)
    if (command === 'noop') {
      // console.log(`Start cycle ${cycle}: begin executing ${command}`)
      // console.log(`During cycle ${cycle}: crt draws pixel in position ${currentPixel}`)
      if (spritePosition.includes(currentPixel)) {
        crt[cycle - 1] = '#'
      }
      // console.log(`Current CRT row: ${printCrt(crt.slice(0, currentPixel + 1))}`)
      // console.log(`End of cycle ${cycle}: finish executing  ${command}\n`)
      cycle++;
    } else if (command.startsWith('addx')) {
      // console.log(`Start cycle ${cycle}: begin executing: ${command}`)
      // console.log(`During cycle ${cycle}: crt draws pixel in position ${currentPixel}`)
      const value = Number(command.split(' ')[1]);
      if (spritePosition.includes(currentPixel)) {
        crt[cycle - 1] = '#'
      }
      // console.log(`Current CRT row: ${printCrt(crt.slice(0, currentPixel + 1))}\n`)
      cycle++;
      currentPixel = (cycle - 1) - (40 * row)

      // console.log(`During cycle ${cycle}: crt draws pixel in position ${currentPixel}`)
      if (spritePosition.includes(currentPixel)) {
        crt[cycle - 1] = '#'
      }
      // console.log(`Current CRT row: ${printCrt(crt.slice(0, currentPixel + 1))}`)
      xRegister += value
      spritePosition = [xRegister - 1, xRegister, xRegister + 1]
      // console.log(`End of cycle ${cycle}: finish executing  ${command} (Register X is now ${xRegister})\n`)
      cycle++
    }
  })
  return printCrt(crt)
}

run({
  part1: {
    tests: [
      {
        input: `noop\naddx 3\naddx -5`,
        expected: 0,
      },
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....\n`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
