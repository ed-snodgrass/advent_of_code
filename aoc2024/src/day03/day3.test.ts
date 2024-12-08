import * as fs from "fs"
import { part1, part2, exampleInputPart1, exampleInputPart2, isEnabled, updateNext } from "./solution"

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

describe('Day3Test tests', () => {
  describe('part1', () => {
    describe('example input', () => {
      it('part1 should be...', () => {
        expect(part1(exampleInputPart1)).toBe(161)
      })
    })
    describe('real input', () => {
      it('part1 should be...', () => {
        expect(part1(input)).toBe(189527826)
      })
    })
  })
  describe('part2', () => {
    describe("updateNext tests", () => {
      describe("when current is less than do and dont", () => {
        it("should not change anything", () => {
          expect(updateNext(1, 2, [5], 3, [6])).toEqual([false, false])
        })
      })
      describe("when current is less than do and dont and dos has no more numbers", () => {
        it("should not change anything", () => {
          expect(updateNext(1, 2, [5], 3, [])).toEqual([false, false])
        })
      })
      describe("when current is less than do and dont and dont has no more numbers", () => {
        it("should not change anything", () => {
          expect(updateNext(1, 2, [], 3, [6])).toEqual([false, false])
        })
      })
      describe("when current is less than do and greater than dont and dont has no more numbers", () => {
        it("should update dont", () => {
          const actual = updateNext(4, 2, [], 8, [10])
          expect(actual).toEqual([true, false])
        })
      })
      describe("when current is greater than do and less than dont and dont has no more numbers", () => {
        it("should update dont", () => {
          const actual = updateNext(4, 2, [], 8, [10])
          expect(actual).toEqual([true, false])
        })
      })
      describe("when current is greater than dont and greater than do and dont has no more numbers", () => {
        it("should update both", () => {
          const actual = updateNext(4, 2, [], 3, [10])
          expect(actual).toEqual([true, true])
        })
      })
      describe("when current is greater than dont and greater than do and do has no more numbers", () => {
        it("should update both", () => {
          const actual = updateNext(4, 2, [5], 3, [])
          expect(actual).toEqual([true, true])
        })
      })

      describe("when current is 652", () => {
        it("should update dont", () => {
          const actual = updateNext(652, 640, [928, 1473], 680, [2480])
          expect(actual).toEqual([true, false])
        })
      })
      describe("when current is 684", () => {
        it("should update do", () => {
          const actual = updateNext(684, 928, [1473], 680, [2480])
          expect(actual).toEqual([false, true])
        })
      })
    })
    describe("isEnabled tests", () => {
      describe('when enabled and current is less than dont and less than do', () => {
        it("should return enabled", () => {
          expect(isEnabled(true, 1, 2, 3)).toBe(true)
        })
      })
      describe('when enabled and current is greater than dont and less than do', () => {
        it("should return disabled", () => {
          expect(isEnabled(true, 5, 1, 10)).toBe(false)
        })
      })
      describe('when enabled and current is greater than dont and less than do 2', () => {
        it("should return disabled", () => {
          expect(isEnabled(true, 28, 20, 59)).toBe(false)
        })
      })
      describe('when enabled and current is greater than dont and greater than do and do is greater than dont', () => {
        it("should return enabled", () => {
          expect(isEnabled(true, 10, 1, 5)).toBe(true)
        })
      })
      describe('when enabled and current is greater than dont and greater than do and do is less than dont', () => {
        it("should return disabled", () => {
          expect(isEnabled(true, 10, 5, 1)).toBe(false)
        })
      })
      describe('when enabled and current is greater than dont and do is -1', () => {
        it("should return disabled", () => {
          expect(isEnabled(true, 10, 5, -1)).toBe(false)
        })
      })
      describe('when enabled and current is greater than do and dont is -1', () => {
        it("should return disabled", () => {
          expect(isEnabled(true, 10, -1, 5)).toBe(true)
        })
      })
      describe('when disabled and current is less than dont and less than do and dont less than do', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 1, 5, 10)).toBe(false)
        })
      })
      describe('when disabled and current is less than dont and less than do and do less than dont', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 1, 10, 5)).toBe(false)
        })
      })
      describe('when disabled and current is greater than dont and greater than do and dont less than do', () => {
        it("should return enabled", () => {
          expect(isEnabled(false, 10, 1, 5)).toBe(true)
        })
      })
      describe('when disabled and current is greater than dont and greater than do and do less than dont', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 10, 5, 1)).toBe(false)
        })
      })
      describe('when disabled and current is greater than dont and less than do', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 7, 5, 10)).toBe(false)
        })
      })
      describe('when disabled and current is less than dont and greater than do', () => {
        it("should return enabled", () => {
          expect(isEnabled(false, 7, 10, 5)).toBe(true)
        })
      })
      describe('when disabled and current is greater than dont and do is -1', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 10, 1, -1)).toBe(false)
        })
      })
      describe('when disabled and current is less than dont and do is -1', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 1, 10, -1)).toBe(false)
        })
      })
      describe('when disabled and current is greater than do and dont is -1', () => {
        it("should return enabled", () => {
          expect(isEnabled(false, 10, -1, 1)).toBe(true)
        })
      })
      describe('when disabled and current is less than do and dont is -1', () => {
        it("should return disabled", () => {
          expect(isEnabled(false, 1, -1, 5)).toBe(false)
        })
      })

      describe('when enabled and current is greater than dont and less than do and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 48, 41, 680)).toBe(false)
        })
      })
      describe('when disabled and current is less than dont and greater than do and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 684, 928, 680)).toBe(true)
        })
      })

      describe('when enabled and current (48) is greater than dont 41 and less than do 680  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 48, 41, 680)).toBe(false)
        })
      })
      describe('when disabled and current (684) is less than dont 928 and greater than do 680  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 684, 928, 680)).toBe(true)
        })
      })
      describe('when enabled and current (942) is greater than dont 928 and less than do 2480  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 942, 928, 2480)).toBe(false)
        })
      })
      describe('when disabled and current (2491) is less than dont 2699 and greater than do 2480  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 2491, 2699, 2480)).toBe(true)
        })
      })
      describe('when enabled and current (2717) is greater than dont 2699 and less than do 3617  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 2717, 2699, 3617)).toBe(false)
        })
      })
      describe('when disabled and current (3630) is less than dont 3916 and greater than do 3617  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 3630, 3916, 3617)).toBe(true)
        })
      })
      describe('when enabled and current (3948) is greater than dont 3916 and less than do 5707  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 3948, 3916, 5707)).toBe(false)
        })
      })
      describe('when disabled and current (5726) is less than dont 6484 and greater than do 5707  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 5726, 6484, 5707)).toBe(true)
        })
      })
      describe('when enabled and current (6504) is greater than dont 6484 and less than do 7015  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 6504, 6484, 7015)).toBe(false)
        })
      })
      describe('when disabled and current (7021) is less than dont 7265 and greater than do 7015  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 7021, 7265, 7015)).toBe(true)
        })
      })
      describe('when enabled and current (7318) is greater than dont 7265 and less than do 7807  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 7318, 7265, 7807)).toBe(false)
        })
      })
      describe('when disabled and current (7814) is less than dont 8089 and greater than do 7807  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 7814, 8089, 7807)).toBe(true)
        })
      })
      describe('when enabled and current (8121) is greater than dont 8089 and less than do 8145  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 8121, 8089, 8145)).toBe(false)
        })
      })
      describe('when disabled and current (8184) is less than dont 8334 and greater than do 8145  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 8184, 8334, 8145)).toBe(true)
        })
      })
      describe('when enabled and current (8351) is greater than dont 8334 and less than do 10707  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 8351, 8334, 10707)).toBe(false)
        })
      })
      describe('when disabled and current (10719) is less than dont 11729 and greater than do 10707  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 10719, 11729, 10707)).toBe(true)
        })
      })
      describe('when enabled and current (11762) is greater than dont 11729 and less than do 12329  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 11762, 11729, 12329)).toBe(false)
        })
      })
      describe('when disabled and current (12340) is less than dont 13159 and greater than do 12329  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 12340, 13159, 12329)).toBe(true)
        })
      })
      describe('when enabled and current (13179) is greater than dont 13159 and less than do 13192  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 13179, 13159, 13192)).toBe(false)
        })
      })
      describe('when disabled and current (13218) is less than dont 13775 and greater than do 13192  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 13218, 13775, 13192)).toBe(true)
        })
      })
      describe('when enabled and current (13785) is greater than dont 13775 and less than do 14218  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 13785, 13775, 14218)).toBe(false)
        })
      })
      describe('when disabled and current (14226) is less than dont 14274 and greater than do 14218  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 14226, 14274, 14218)).toBe(true)
        })
      })
      describe('when enabled and current (14292) is greater than dont 14274 and less than do 14465  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 14292, 14274, 14465)).toBe(false)
        })
      })
      describe('when disabled and current (14489) is less than dont 14924 and greater than do 14465  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 14489, 14924, 14465)).toBe(true)
        })
      })
      describe('when enabled and current (14961) is greater than dont 14924 and less than do 15714  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 14961, 14924, 15714)).toBe(false)
        })
      })
      describe('when disabled and current (15750) is less than dont 15942 and greater than do 15714  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 15750, 15942, 15714)).toBe(true)
        })
      })
      describe('when enabled and current (15951) is greater than dont 15942 and less than do 16129  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 15951, 15942, 16129)).toBe(false)
        })
      })
      describe('when disabled and current (16153) is less than dont 16308 and greater than do 16129  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 16153, 16308, 16129)).toBe(true)
        })
      })
      describe('when enabled and current (16338) is greater than dont 16308 and less than do 16732  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 16338, 16308, 16732)).toBe(false)
        })
      })
      describe('when disabled and current (16736) is less than dont 17043 and greater than do 16732  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 16736, 17043, 16732)).toBe(true)
        })
      })
      describe('when enabled and current (17073) is greater than dont 17043 and less than do 18342  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 17073, 17043, 18342)).toBe(false)
        })
      })
      describe('when disabled and current (18346) is less than dont 18538 and greater than do 18342  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 18346, 18538, 18342)).toBe(true)
        })
      })
      describe('when enabled and current (18551) is greater than dont 18538 and less than do 18839  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 18551, 18538, 18839)).toBe(false)
        })
      })
      describe('when disabled and current (18850) is less than dont 19570 and greater than do 18839  and dont less than do', () => {
        it('should return enabled', () => {
          expect(isEnabled(false, 18850, 19570, 18839)).toBe(true)
        })
      })
      describe('when enabled and current (19577) is greater than dont 19570 and greater than do -1  and dont less than do', () => {
        it('should return disabled', () => {
          expect(isEnabled(true, 19577, 19570, -1)).toBe(false)
        })
      })
    })
    describe('example input', () => {
      it('part2 should be...', () => {
        expect(part2(exampleInputPart2)).toBe(48)
      })
    })
    describe('real input', () => {
      it('part2 should be less than ', () => {
        expect(part2(input)).toBeLessThan(183507042)
      })
      it('part2 should be 63013756', () => {
        expect(part2(input)).toBe(63013756)
      })
    })
  })
})
