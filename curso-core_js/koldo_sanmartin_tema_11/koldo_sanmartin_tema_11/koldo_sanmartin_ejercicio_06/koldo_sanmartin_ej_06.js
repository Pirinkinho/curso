// 6. Pide información con fetch a la url:
// https://jsonplaceholder.typicode.com/posts/1. Loguea el status de
// la petición e imprime por pantalla el contenido del artículo que has
// recibido.

console.log(`\nLlamando a URL: https://jsonplaceholder.typicode.com/posts/1\n`)
// Hacer la petición fetch a la URL.
const fetchPost = () => {
    // Hacer la petición fetch a la URL.
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        // Loguear el status de la petición.
        console.log('Status:', response.status);
        // Verificar si la respuesta es exitosa (código de estado 200 Ok).
        if (!response.ok) {
          throw new Error('Error en la petición: ' + response.status + response.statusText);
        }
        // Convertir la respuesta a JSON y devolverla para el siguiente .then.
        return response.json();
      })
      .then(data => {
        // Imprimir el contenido del artículo.
        console.log('Artículo recibido:');
        console.log('Título:', data.title);
        console.log('Cuerpo:', data.body);
      })
      .catch(error => {
        // Manejar cualquier error que ocurra durante la petición.
        console.error('Error en la petición:', error);
      });
  };

  fetchPost();
  
  // Exportar la función
  module.exports = fetchPost;
  