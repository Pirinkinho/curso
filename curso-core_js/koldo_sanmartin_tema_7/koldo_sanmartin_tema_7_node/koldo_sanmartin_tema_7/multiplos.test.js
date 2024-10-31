
const obtenerMultiplos = require('./multiplos');

describe('Pruebas de la función obtenerMultiplos', () => {
    test('Debería devolver los primeros 5 múltiplos de 2', () => {
        expect(obtenerMultiplos(5, 2)).toEqual([2, 4, 6, 8, 10]);
    });

    test('Debería devolver los primeros 4 múltiplos de 3', () => {
        expect(obtenerMultiplos(4, 3)).toEqual([3, 6, 9, 12]);
    });

    test('Debería devolver un array vacío si el tamaño es 0', () => {
        expect(obtenerMultiplos(0, 5)).toEqual([]);
    });

    test('Debería devolver un array vacío si el tamaño es negativo', () => {
        expect(obtenerMultiplos(-3, 5)).toEqual([]);
    });

    test('Debería devolver los primeros 3 múltiplos de 1', () => {
        expect(obtenerMultiplos(3, 1)).toEqual([1, 2, 3]);
    });

    test('Debería devolver los primeros 3 múltiplos de 10', () => {
        expect(obtenerMultiplos(3, 10)).toEqual([10, 20, 30]);
    });
});
