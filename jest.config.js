module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/src/__mocks__/imageMock.js",
    "^gsap/ScrollTrigger$": "<rootDir>/src/__mocks__/gsapMock.js",
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironment: "jsdom",
};
