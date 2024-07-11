// jest.config.cjs
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/pages/api/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.type.{js,jsx,ts,tsx}",
    "!<rootDir>/src/pages/_app.jsx",
    "!<rootDir>/src/pages/index.jsx",
    "!<rootDir>/src/pages/_document.jsx",
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
