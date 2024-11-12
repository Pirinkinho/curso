// test/calculator.test.js
const { add, subtract } = require('../src/calculator');

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    expect(subtract(7, 2)).toBe(5);
  });
});
