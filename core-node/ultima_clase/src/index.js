console.log('Hello, world!');

const http = require('http');
const fs = require('fs');
const { api, web } = require('./api');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    
    if (req.url === '/api' && req.method === 'POST') {
        api(req, res);
    } else if (req.url === '/api/posts' && req.method === 'GET') {
        api(req, res);
    } else {
        web(req, res);
    }
});

const texto = "Este es el contenido que viene desde el archivo JavaScript: index.js.";

if (typeof window !== "undefined" && typeof document !== "undefined") {

  // Código para el navegador
  document.getElementById("contenido").innerText = texto;

} else {
  // Código para Node.js
  console.log('\n',texto);
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost/${PORT}`);
});
