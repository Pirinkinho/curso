// booleanProperties.test.js

const getBooleanProperties = require('./booleano');

describe('Pruebas para getBooleanProperties', () => {

    test('Debe retornar una función', () => {
        expect(typeof getBooleanProperties).toBe('function');
    });

    test('Debe retornar un array', () => {
        expect(Array.isArray(getBooleanProperties({}))).toBe(true);
    });

    test('Debe retornar ["a", "c"] para el objeto { a: true, b: 2, c: false }', () => {
        const result = getBooleanProperties({ a: true, b: 2, c: false });
        expect(result).toEqual(["a", "c"]);
    });

    test('Debe retornar un array vacío para el objeto { a: 1, b: 2, c: 3 }', () => {
        const result = getBooleanProperties({ a: 1, b: 2, c: 3 });
        expect(result).toEqual([]);
    });

    test('Debe retornar ["a", "b", "c"] para el objeto { a: true, b: true, c: false }', () => {
        const result = getBooleanProperties({ a: true, b: true, c: false });
        expect(result).toEqual(["a", "b", "c"]);
    });

});
