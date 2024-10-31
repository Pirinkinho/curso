
const { capitalize_last_name, ValueError } = require('./nombre_apellido');

describe('capitalize_last_name', () => {
    test('Debería capitalizar correctamente el nombre y el apellido', () => {
        expect(capitalize_last_name('marisa tomei')).toBe('Marisa TOMEI');
    });

    test('Debería lanzar TypeError si el argumento no es una cadena', () => {
        expect(() => capitalize_last_name(123)).toThrow(TypeError);
        expect(() => capitalize_last_name(null)).toThrow(TypeError);
        expect(() => capitalize_last_name(undefined)).toThrow(TypeError);
        expect(() => capitalize_last_name({})).toThrow(TypeError);
    });

    test('Debería lanzar ValueError si no hay exactamente dos palabras', () => {
        expect(() => capitalize_last_name('marisa')).toThrow(ValueError);
        expect(() => capitalize_last_name('marisa tomei extra')).toThrow(ValueError);
        expect(() => capitalize_last_name('')).toThrow(ValueError);
        expect(() => capitalize_last_name(' ')).toThrow(ValueError);
    });

    test('Debería manejar nombres con mayúsculas en diferentes posiciones', () => {
        expect(capitalize_last_name('MARISA TOMEI')).toBe('Marisa TOMEI');
        expect(capitalize_last_name('marIsa tomeI')).toBe('Marisa TOMEI');
    });
});
