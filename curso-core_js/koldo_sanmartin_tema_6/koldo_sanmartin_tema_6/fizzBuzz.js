// 1. TDD: fizzBuzz
// Your task is to write a function, fizzBuzz, that accepts a number and returns a string:

// 'fizz' if the number is divisible by 3;
// 'buzz' if the number is divisible by 5;
// 'fizzbuzz' if the number is divisible by both 3 and 5.
// '{number}' if the number doesn't fulfil any of the above conditions.
// As you create the function in fizzbuzz.js, you should also write tests in index.test.js. You'll need to create your own test cases as you go.

// Edge cases to consider:

// what should fizzbuzz(0) return?
// what should happen if the function is passed a string?


function fizzBuzz(num) {
    if (typeof num !== 'number') {
        return 'Input must be a number';
    }
    if (num === 0) {
        return '0';
    }
    if (num % 3 === 0 && num % 5 === 0) {
        return 'fizzbuzz';
    }
    if (num % 3 === 0) {
        return 'fizz';
    }
    if (num % 5 === 0) {
        return 'buzz';
    }
    return num.toString();
}

module.exports = fizzBuzz;
