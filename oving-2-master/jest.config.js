module.exports = {
  presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  testEnvironment: 'node',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    '.(css|less)$': './style-mock.js',
  },
  transformIgnorePatterns: ['src/node_modules/'],
    "collectCoverageFrom": ["src/**/*.tsx", "src/**/*.ts", "!**/node_modules/**"],
    "coverageReporters": ["html", "text", "text-summary", "cobertura"],
    "testMatch": ["**/*.test.ts", "**/*.test.tsx"],
  }