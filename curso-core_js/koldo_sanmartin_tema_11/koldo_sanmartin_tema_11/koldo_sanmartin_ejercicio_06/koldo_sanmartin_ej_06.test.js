
const fetchPost = require('./koldo_sanmartin_ej_06.js');

// Mockear la función fetch.
global.fetch = jest.fn();

// Mockear console.log y console.error.
console.log = jest.fn();
console.error = jest.fn();

describe('fetchPost', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba.
    });

    test('debería loguear el status y el contenido del artículo', async () => {
        // Simular la respuesta de la API.
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    title: 'Título de prueba',
                    body: 'Cuerpo de prueba'
                }),
            })
        );

        await fetchPost(); // Llamar a la función que queremos probar.

        // Verificar que se llamaron a los métodos console.log con los argumentos correctos.
        expect(console.log).toHaveBeenCalledWith('Status:', 200);
        expect(console.log).toHaveBeenCalledWith('Artículo recibido:');
        expect(console.log).toHaveBeenCalledWith('Título:', 'Título de prueba');
        expect(console.log).toHaveBeenCalledWith('Cuerpo:', 'Cuerpo de prueba');
    });

    test('debería manejar errores en la petición', async () => {
        // Simular un error en la petición.
        global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Error de red')));

        await fetchPost(); // Llamar a la función.

        // Verificar que se llamó a console.error con el mensaje de error correcto.
        expect(console.error).toHaveBeenCalledWith('Error en la petición:', expect.any(Error));
    });

    test('debería manejar respuestas no exitosas', async () => {
        // Simular una respuesta no exitosa.
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 404,
            })
        );

        await fetchPost(); // Llamar a la función.

        // Verificar que se llamó a console.error con un mensaje de error.
        expect(console.error).toHaveBeenCalledWith('Error en la petición:', expect.any(Error));
    });
});
