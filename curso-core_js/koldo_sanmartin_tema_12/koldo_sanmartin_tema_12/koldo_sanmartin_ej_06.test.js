// a.test.js
const { getValuesInRange } = require('./koldo_sanmartin_ej_06.js'); // Asegúrate de exportar la función en a.js

describe('getValuesInRange', () => {
    it('debería devolver los valores dentro del rango', () => {
        const mySet = new Set([5, 10, 15, 20, 25, 30]);
        const result = getValuesInRange(mySet, 10, 25);
        expect(result).toEqual([10, 15, 20, 25]);
    });

    it('debería devolver un array vacío si no hay valores en el rango', () => {
        const mySet = new Set([5, 10, 15, 20, 25, 30]);
        const result = getValuesInRange(mySet, 35, 40);
        expect(result).toEqual([]);
    });

    it('debería devolver un array con un solo valor si está en el rango', () => {
        const mySet = new Set([5, 10, 15, 20, 25, 30]);
        const result = getValuesInRange(mySet, 15, 15);
        expect(result).toEqual([15]);
    });

    it('debería devolver el valor mínimo si está en el set', () => {
        const mySet = new Set([5, 10, 15, 20, 25, 30]);
        const result = getValuesInRange(mySet, 5, 10);
        expect(result).toEqual([5, 10]);
    });

    it('debería devolver el valor máximo si está en el set', () => {
        const mySet = new Set([5, 10, 15, 20, 25, 30]);
        const result = getValuesInRange(mySet, 25, 30);
        expect(result).toEqual([25, 30]);
    });
});
