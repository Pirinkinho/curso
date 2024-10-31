// 8. Modifica el ejercicio anterior y recibe la lista de todos los artículos.
// ¿Cuántos hay? ¿Podrías listar los títulos? ¿Y hacer una tabla con los
// títulos y los contenidos?

async function fetchAllArticles() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(url);
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }
        const data = await response.json(); // Convertimos la respuesta a JSON.
        // Comprueba si la respuesta está vacía
        if (!data || data.length === 0) {
            throw new Error('La respuesta está vacía.');
        }
        // Mensaje inicial
        console.log(`\n8. Modifica el ejercicio anterior y recibe la lista de todos los artículos.
            a) ¿Cuántos hay? 
            b) ¿Podrías listar los títulos?
            c) ¿Y hacer una tabla con los títulos y los contenidos?`);
        
        console.log(`\nLlamando a URL: ${url}`);
        console.log(`\nStatus:`, response.status, response.statusText); // Logueamos el status de la petición.

        console.log(`\na) ¿Cuántos hay?`)

        console.log(`\nNúmero total de artículos: ${data.length}`); // Mostramos cuántos artículos hay

        // Calcula el número de dígitos del artículo más grande
        const maxDigits = data.length.toString().length;
        console.log(`\nb) ¿Podrías listar los títulos?`)
        console.log(`\nLista de títulos:\n`);
        data.forEach((article, index) => {
            const numero = (index + 1).toString().padStart(maxDigits, ' '); // Ajusta el número a la derecha;
            console.log(`Nº: ${numero}   "${article.title}".`);
        });
        // Creación de tabla con títulos y contenidos
        console.log(`\nc) ¿Y hacer una tabla con los títulos y los contenidos?`)
        console.log(`\nTabla de Títulos y Contenidos:\n`);
        console.table(data.map(article => ({
            Título: article.title.length > 50 ? article.title.substring(0, 47) + '...' : article.title, // Limita el título a 50 caracteres
            Contenido: article.body.length > 100 ? article.body.substring(0, 97) + '...' : article.body // Limita el contenido a 100 caracteres
        })));
    } catch (error) {
        console.error('Error:', error); // Manejo de errores.
    }
}

// Llamamos la función para obtener todos los artículos
fetchAllArticles();

module.exports = { fetchAllArticles };

