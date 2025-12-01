import { createDefaultPreset, JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: "node",
  ...createDefaultPreset(),
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
}
export default jestConfig
