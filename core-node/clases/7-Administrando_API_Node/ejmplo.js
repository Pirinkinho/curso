// Certificados hace falta esto para el servidor:
// Para desarrollo local, puedes generar certificados autofirmados usando OpenSSL:

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

### Router objeto

El router utiliza un objeto para almacenar las rutas por método HTTP:

```javascript
const router = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
  OPTIONS: {},
};
```

### Manejo de parámetros URL
https://localhost:3000/api/users/1234
La función `extractURLParams` extrae parámetros dinámicos de las URLs:

```javascript
const extractURLParams = (path, pattern) => {
  const params = {};
  const pathParts = path.split('/');
  const patternParts = pattern.split('/');

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    }
  }

  return params;
};
```