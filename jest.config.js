module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.svg": "<rootDir>/__mocks__/svgrMock.ts",
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif)$":
      "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setUpTests.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
