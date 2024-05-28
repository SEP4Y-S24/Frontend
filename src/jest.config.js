module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^../utils/storage.ts": "<rootDir>/mocks/storage.ts",
  },
};
