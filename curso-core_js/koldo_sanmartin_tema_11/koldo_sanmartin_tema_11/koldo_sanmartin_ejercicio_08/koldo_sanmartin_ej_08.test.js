
const { fetchAllArticles } = require('./koldo_sanmartin_ej_08.js');

describe('fetchAllArticles', () => {
    it('debería manejar una respuesta vacía', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([])); // Simula una respuesta vacía (array vacío).
    
        console.error = jest.fn(); // Mockear la función console.error.
    
        await fetchAllArticles();
    
        // Verifica que se llame a console.error con el mensaje correcto.
        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
        expect(console.error.mock.calls[0][1].message).toBe('La respuesta está vacía.'); // Verifica el mensaje de error.
    });

    it('debería manejar un error de respuesta', async () => {
        fetchMock.mockResponseOnce('', { status: 404 }); // Simula una respuesta 404.

        console.error = jest.fn(); // Mockear la función console.error.

        await fetchAllArticles();

        // Verifica que se llame a console.error con el mensaje correcto.
        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
        expect(console.error.mock.calls[0][1].message).toBe('Error en la respuesta: 404'); // Verifica el mensaje de error.
    });

    it('debería obtener todos los artículos y mostrar la cantidad correcta', async () => {
        const mockData = [
            { title: 'Título 1', body: 'Contenido del artículo 1.' },
            { title: 'Título 2', body: 'Contenido del artículo 2.' },
            { title: 'Título 3', body: 'Contenido del artículo 3.' },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        console.log = jest.fn(); // Mocker la función console.log.

        await fetchAllArticles();

        // Verifica que se haya llamado a console.log con el número correcto de artículos.
        expect(console.log).toHaveBeenCalledWith(`\nNúmero total de artículos: ${mockData.length}`);

        // Filtra solo los logs que contienen "Nº:".
        const titleLogs = console.log.mock.calls.filter(call => call[0].includes('Nº:'));

        // Verifica que se haya listado correctamente los títulos.
        titleLogs.forEach((log, index) => {
            expect(log[0]).toBe(`Nº: ${index + 1}   "${mockData[index].title}".`);
        });
    });

    it('debería manejar errores en la respuesta', async () => {
        fetchMock.mockReject(new Error('Error en la red')); // Simula un error en la red.

        console.error = jest.fn(); // Mocker la función console.error.

        await fetchAllArticles();

        expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    it('debería formatear la tabla de títulos y contenidos correctamente', async () => {
        const mockData = [
            { title: 'Título 1 muy largo que debe ser truncado', body: 'Contenido del artículo 1 que también es bastante largo y debe ser truncado al imprimir.' },
            { title: 'Título 2', body: 'Contenido del artículo 2.' },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        console.table = jest.fn(); // Mocker la función console.table.

        await fetchAllArticles();

        // Verifica que se haya llamado a console.table.
        expect(console.table).toHaveBeenCalled();

        // Verifica que se haya pasado el formato correcto.
        const expectedTableData = [
            {
                Título: 'Título 1 muy largo que debe ser truncado',
                Contenido: 'Contenido del artículo 1 que también es bastante largo y debe ser truncado al imprimir.',
            },
            {
                Título: 'Título 2',
                Contenido: 'Contenido del artículo 2.',
            },
        ];
        expect(console.table).toHaveBeenCalledWith(expectedTableData);
    });

    it('debería formatear la tabla de títulos y contenidos correctamente, truncando los textos largos', async () => {
        const mockData = [
            { 
                title: 'Título 1 extremadamente largo que debe ser truncado a 50 caracteres o menos para que sea legible en la tabla', 
                body: 'Contenido del artículo 1, que también es muy largo y debe ser truncado a un máximo de 100 caracteres, incluyendo los puntos suspensivos.' 
            },
            { 
                title: 'Título 2 corto', 
                body: 'Contenido del artículo 2 corto.' 
            },
        ];
    
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
    
        console.table = jest.fn(); // Mockear la función console.table.
    
        await fetchAllArticles();
    
        // Verifica que se haya llamado a console.table con el formato truncado correcto.
        const expectedTableData = [
            {
                Título: 'Título 1 extremadamente largo que debe ser trun...',
                Contenido: 'Contenido del artículo 1, que también es muy largo y debe ser truncado a un máximo de 100 caracte...',
            },
            {
                Título: 'Título 2 corto',
                Contenido: 'Contenido del artículo 2 corto.',
            },
        ];
        expect(console.table).toHaveBeenCalledWith(expectedTableData);
    });
});
