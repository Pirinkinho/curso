//  Se carga el mo1dulo de HTTP
let http = require("http");
// Declaro el puerto de escucha
const port = 3000;
//  Creación del servidor HTTP, y se define la escucha
// de peticiones en el puerto ${port}
http.createServer(function(request, response){
const url = request.url;
const method = request.method;
if (method === 'GET' && url === '/'){
  // Se define la cabecera HTTP, con el estado HTTP (OK: 200) y el tipo de 
  // contenido
  response.writeHead(200, {'Content-Type': 'text/plain'});
  // Se responde la solicitudcon el mensaje "Hello World!!"
  response.end('Hello World!!\n');
} else {
    response.writeHead(404)
    response.end('Not found');
}
}).listen(port);
// Se escribe la URL para el acceso al servidor
console.log(`Example app listening on (http://localhost:${port})`)
