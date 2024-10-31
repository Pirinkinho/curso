# Jest Katas

These katas will give you some hands-on experience in writing tests in Jest. To run your tests, run `yarn test` in your terminal. To run a specific test in isolation, run `yarn test -t 'yourTestNameHere'`.

Use [this list of Jest `expect` matchers](https://jestjs.io/docs/en/expect) to help you write your tests.

## 1. TDD: fizzBuzz

Your task is to write a function, `fizzBuzz`, that accepts a number and returns a string:

- 'fizz' if the number is divisible by 3;
- 'buzz' if the number is divisible by 5;
- 'fizzbuzz' if the number is divisible by both 3 and 5.
- '{number}' if the number doesn't fulfil any of the above conditions.

As you create the function in `fizzbuzz.js`, you should also write tests in `index.test.js`. You'll need to create your own test cases as you go.

Edge cases to consider:

- what should `fizzbuzz(0)` return?
- what should happen if the function is passed a string?

## 2. Mocking functions: mapWithCb

The `mapwithCb` function accepts an array and a callback. It maps over the array with the callback, so we can expect the callback function to be called multiple times.

Your task is to write tests for `mapWithCb`, which will involve writing a mock function (aka a spy) for the callback function. The test cases have been provided for you.

## 3. Mocking network responses with nock: getPokemon

The `getPokemon` function uses the `isomorphic-fetch` library to get data from [PokeAPI](https://pokeapi.co/). It returns a JSON object.

Your task is to write tests for `getPokemon`, using the `nock` library to mock network responses. You'll need to create your own test cases.

Things to consider:

- What sort of data does PokeAPI return? Use the 'Try it now' section on the website to inform your mocked data.
- Async functions don't throw errors in the same way as normal functions. `getPokemon()` and `getPokemon('cartman')` will behave differently.
