// 7. Modifica el ejercicio anterior o crea uno nuevo que permita cambiar el
// número del artículo que se recibe.

console.log(`\nLlamando a URL: https://jsonplaceholder.typicode.com/posts/ID\n`);

async function fetchArticle(articleId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${articleId}`;
  try {
      const response = await fetch(url);
      console.log('Status:', response.status); // Logueamos el status de la petición.
      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
      }
      const data = await response.json(); // Convertimos la respuesta a JSON.
      console.log('Artículo recibido:', data);
  } catch (error) {
      console.error('Error:', error); // Manejo de errores.
  }
}

// Llamamos la función pasando el número del artículo que queremos.
fetchArticle(1); // Cambia este número para obtener otro artículo.
fetchArticle(2); 
fetchArticle(3); 
fetchArticle(7); 

module.exports = { fetchArticle };
