

// Importa la función a testear.
const { fetchArticle } = require('./koldo_sanmartin_ej_07.js'); // Ajusta la ruta si es necesario.
const fetchMock = require('jest-fetch-mock');

beforeEach(() => {
    fetchMock.enableMocks(); // Habilita los mocks de fetch antes de cada prueba.
});

afterEach(() => {
    fetchMock.resetMocks(); // Resetea los mocks después de cada prueba.
});

describe('fetchArticle', () => {
    test('debería loguear el status y devolver el contenido del artículo 1', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            userId: 1,
            id: 1,
            title: "Artículo 1",
            body: "Este es el contenido del artículo 1."
        }), { status: 200 });

        console.log = jest.fn(); // Mocks console.log.
        await fetchArticle(1); // Llamamos a la función.

        expect(console.log).toHaveBeenCalledWith('Status:', 200);
        expect(console.log).toHaveBeenCalledWith('Artículo recibido:', {
            userId: 1,
            id: 1,
            title: "Artículo 1",
            body: "Este es el contenido del artículo 1."
        });
    });

    test('debería loguear el status y devolver el contenido del artículo 2', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            userId: 1,
            id: 2,
            title: "Artículo 2",
            body: "Este es el contenido del artículo 2."
        }), { status: 200 });

        console.log = jest.fn(); // Mocks console.log.
        await fetchArticle(2); // Llamamos a la función.

        expect(console.log).toHaveBeenCalledWith('Status:', 200);
        expect(console.log).toHaveBeenCalledWith('Artículo recibido:', {
            userId: 1,
            id: 2,
            title: "Artículo 2",
            body: "Este es el contenido del artículo 2."
        });
    });

    test('debería manejar un error de red', async () => {
        fetchMock.mockReject(new Error('Network Error'));

        console.error = jest.fn(); // Mocks console.error.
        await fetchArticle(1); // Llamamos a la función.

        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    test('debería manejar errores de respuesta no exitosa', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });


        console.error = jest.fn(); // Mocks console.error.
        await fetchArticle(1); // Llamamos a la función.

        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
});
