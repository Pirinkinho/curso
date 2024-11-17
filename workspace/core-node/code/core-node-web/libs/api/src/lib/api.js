// import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Important lesson about __filename and __dirname
// __filename and __dirname are not available in ES6 modules

const __filename = fileURLToPath(import.meta.url);
// 👇️ "./workspace/core-node/code/core-node-web/libs/api/src/lib/api.js"
// console.log(__filename);

const __dirname = path.dirname(__filename);
// 👇️ "./workspace/core-node/code/core-node-web/libs/api/src/lib"
// console.log('directory-name 👉️', __dirname);

// 👇️ "./workspace/core-node/code/core-node-web/libs/api/src/lib/dist/index.html"
// console.log(path.join(__dirname, '/dist', 'index.html'));

// Tarea Clase: getFilenameAndDirname

/* import path from 'path';
import {fileURLToPath} from 'url';

export function getFilename(metaUrl) {
  const __filename = fileURLToPath(metaUrl);

  return __filename;
}

export function getDirname(metaUrl) {
  const __dirname = path.dirname(getFilename(metaUrl));

  return __dirname;
}
 */

// Create a request handler function
const requestHandler = (req, res) => {
  const { method, url, headers } = req;

  // Parse the request body based on the Content-Type header
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    let parsedBody;
    const contentType = headers['content-type'];

    if (contentType === 'application/json') {
      parsedBody = JSON.parse(body);
    } else {
      parsedBody = body;
    }

    switch (method) {
      // Si el método es GET
      case 'GET':
        if (url === '/') {
          // Se responde con un texto plano y un código de estado 200
          res.writeHead(200, { 'Content-Type': 'text/plain' });

          // Se lee el archivo index.html y se envía como respuesta
          // Para comprender todo lo anterior, es necesario entender cómo funciona el módulo fs de Node.js
          //  y conocer el concepto de streams.
          // fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);

          // En lugar de leer un archivo, se envía una respuesta HTML directamente al cliente
          // Esto es útil para respuestas pequeñas de ejemplo como la de esta clase
          // Como tarea opcional, puedes modificar este código para leer un archivo HTML
          // y enviarlo como respuesta usando el método fs.createReadStream

          // console.log('GET / from', req.connection.remoteAddress);

          // Enviar una respuesta al cliente
          res.body = 'Hello World!';
          res.write('Hello World!');
          res.end();
        } else if (url === '/api/users') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(
            JSON.stringify([
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Jane Smith' },
            ])
          );
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
        break;
      case 'POST':
        if (url === '/api/users') {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ id: 3, name: parsedBody.name }));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
        break;
      case 'PUT':
        if (url === '/api/users/1') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ id: 1, name: parsedBody.name }));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
        break;
      case 'DELETE':
        if (url === '/api/users/1') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Use 204 for no content ;)' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
  });
};

// command to generate a key.pem and cert.pem file
// openssl req -nodes -new -x509 -keyout server.key -out server.cert

// Use fs and path to read the certificate and key files
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert')),
};

// const server = https.createServer(requestHandler, options);
const server = http.createServer(requestHandler, options);
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
