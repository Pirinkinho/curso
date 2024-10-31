
const TransformadorCadena = require('./transformador_de_cadena.js');

describe('TransformadorCadena', () => {
    const transformer = new TransformadorCadena('Hola mundo');

    test('debería convertir el string a un array de caracteres', () => {
        expect(transformer.deCaracterAMatriz()).toEqual(['H', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']);
    });

    test('debería invertir el orden de caracteres', () => {
        expect(transformer.caracteresInversos()).toBe('odnum aloH');
    });

    test('debería quitar las vocales', () => {
        expect(transformer.quitarVocales()).toBe('Hl mnd');
    });

    test('debería quitar las consonantes', () => {
        expect(transformer.quitarConsonantes()).toBe('oa uo');
    });

    test('debería convertir el string a un array de palabras', () => {
        expect(transformer.dePalabraAMatriz()).toEqual(['Hola', 'mundo']);
    });

    test('debería invertir el orden de las palabras', () => {
        expect(transformer.palabrasInvertidas()).toBe('mundo Hola');
    });
});
