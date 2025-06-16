module.exports = {
  preset: "ts-jest",
  verbose: false,
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "__coverage__",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: [
    "**/*.{js,ts}",
    "!**/src/domain/**",
    "!**/src/infrastructure/database/**",
    "!**/src/presentation/routes/**",
    "!**/src/presentation/validators/**",
    "!**/src/services/**",
    "!**/src/utils/**",
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  roots: ["<rootDir>/__tests__"],
};
