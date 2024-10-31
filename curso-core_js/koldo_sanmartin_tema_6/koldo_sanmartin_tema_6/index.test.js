// index.test.js (para fizzBuzz)
const fizzBuzz = require('./fizzBuzz');

test('debería devolver "fizz" para números divisibles por 3', () => {
    expect(fizzBuzz(3)).toBe('fizz');
});

test('debería devolver "buzz" para números divisibles por 5', () => {
    expect(fizzBuzz(5)).toBe('buzz');
});

test('debería devolver "fizzbuzz" para números divisibles por 3 y 5', () => {
    expect(fizzBuzz(15)).toBe('fizzbuzz');
});

test('debería devolver el número si no es divisible por 3 o 5', () => {
    expect(fizzBuzz(7)).toBe('7');
});

test('debería devolver "0" para fizzBuzz(0)', () => {
    expect(fizzBuzz(0)).toBe('0');
});

test('debería manejar entradas no numéricas', () => {
    expect(fizzBuzz('texto')).toBe('Input must be a number');
});


// index.test.js (para mapWithCb).
const mapWithCb = require('./mapWithCb');

test('debería llamar al callback para cada elemento del array', () => {
    const mockCallback = jest.fn(x => x * 2);
    const result = mapWithCb([1, 2, 3], mockCallback);

    // Verificamos que el callback fue llamado 3 veces.
    expect(mockCallback.mock.calls.length).toBe(3);

    // Verificamos que el callback fue llamado con los valores correctos.
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    expect(mockCallback.mock.calls[1][0]).toBe(2);
    expect(mockCallback.mock.calls[2][0]).toBe(3);

    // Verificamos el resultado final
    expect(result).toEqual([2, 4, 6]);
});

