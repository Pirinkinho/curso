
// test/calculator.test.js
const { add, subtract, divide, multiply } = require('../src/calculator.js');

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    expect(subtract(10, 8)).toBe(2);
  });
  it('should divide two numbers correctly', () => {
    expect(divide(15, 5)).toBe(3);
  });

  it('should multiply two numbers correctly', () => {
    expect(multiply(4, 6)).toBe(24);
  });
});
