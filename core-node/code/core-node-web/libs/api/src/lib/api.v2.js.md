# Tutorial: Creando una API REST con Node.js nativo

Este tutorial explica cómo crear una API REST completa usando Node.js nativo sin depender de frameworks externos como Express. Cubriremos la implementación de un servidor HTTPS, manejo de rutas, métodos HTTP, archivos estáticos y más.

## Índice
1. [Configuración inicial](#configuración-inicial)
2. [Estructura del servidor HTTPS](#estructura-del-servidor-https)
3. [Sistema de enrutamiento](#sistema-de-enrutamiento)
4. [Manejo de peticiones](#manejo-de-peticiones)
5. [Servicio de archivos estáticos](#servicio-de-archivos-estáticos)
6. [Gestión de CORS](#gestión-de-cors)
7. [Implementación de endpoints](#implementación-de-endpoints)
8. [Seguridad y certificados SSL](#seguridad-y-certificados-ssl)

## Configuración inicial

### Requisitos previos

- Node.js instalado (versión 12 o superior)
- Certificados SSL para HTTPS
- Conocimientos básicos de JavaScript y Node.js

### Estructura del proyecto
```
proyecto/
├── server.js
├── ssl/
│   ├── key.pem
│   └── cert.pem
└── public/
    └── index.html
```

## Estructura del servidor HTTPS

### Configuración básica

El servidor HTTPS requiere certificados SSL. Primero, importamos los módulos necesarios:

```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');
```

### Certificados SSL

Los certificados se cargan al iniciar el servidor:

```javascript
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};
```

Para desarrollo local, puedes generar certificados autofirmados usando OpenSSL:
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## Sistema de enrutamiento

### Router objeto

El router utiliza un objeto para almacenar las rutas por método HTTP:

```javascript
const router = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
  OPTIONS: {}
};
```

### Manejo de parámetros URL

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

## Manejo de peticiones

### Parsing del body

Para peticiones POST y PUT, necesitamos parsear el body:

```javascript
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
  });
};
```

### Manejo de respuestas

Configuramos headers comunes y formato JSON:

```javascript
res.setHeader('Content-Type', 'application/json');
```

## Servicio de archivos estáticos

### Implementación

La función `serveStaticFile` maneja la entrega de archivos estáticos:

```javascript
const serveStaticFile = async (req, res, filepath) => {
  try {
    const fileStream = fs.createReadStream(filepath);
    const stat = await fs.promises.stat(filepath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', getContentType(filepath));
    fileStream.pipe(res);
  } catch (error) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'File not found' }));
  }
};
```

### Tipos MIME

Determinamos el tipo de contenido basado en la extensión del archivo:

```javascript
const getContentType = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };
  return types[ext] || 'text/plain';
};
```

## Gestión de CORS

Implementamos headers CORS para permitir peticiones cross-origin:

```javascript
const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};
```

## Implementación de endpoints

### Definición de rutas

Ejemplo de implementación de CRUD para usuarios:

```javascript
router.GET['/api/users'] = (req, res) => {
  res.end(JSON.stringify(users));
};

router.POST['/api/users'] = async (req, res) => {
  const user = await parseBody(req);
  user.id = Date.now();
  users.push(user);
  res.end(JSON.stringify(user));
};

router.PUT['/api/users/:id'] = async (req, res) => {
  const id = parseInt(req.params.id);
  const userData = await parseBody(req);
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    res.end(JSON.stringify(users[index]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'User not found' }));
  }
};
```

## Seguridad y certificados SSL

### Mejores prácticas

1. Usar HTTPS siempre
2. Implementar rate limiting
3. Validar entrada de usuarios
4. Usar headers de seguridad

### Headers de seguridad recomendados

```javascript
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
```

## Pruebas

### Ejemplos de peticiones
Puedes probar la API usando curl:

```bash
# GET todos los usuarios
curl https://localhost:3000/api/users

# POST nuevo usuario
curl -X POST https://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# PUT actualizar usuario
curl -X PUT https://localhost:3000/api/users/1234 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# DELETE usuario
curl -X DELETE https://localhost:3000/api/users/1234
```

## Conclusión

Esta implementación proporciona una base sólida para una API REST usando Node.js nativo. Algunas ventajas de este enfoque incluyen:

- Control total sobre el código
- Sin dependencias externas
- Mejor comprensión de cómo funciona Node.js
- Mayor flexibilidad para personalizaciones

Para mejorar esta implementación, considera agregar:

1. Sistema de autenticación
2. Rate limiting
3. Validación de datos
4. Logging
5. Manejo de errores más robusto
6. Tests unitarios e integración
7. Documentación API (Swagger/OpenAPI)


<section><details>Click para visualizar el coódigo completo de server.js</details>

```javascript
// server.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

// Opciones para el servidor HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Almacenamiento en memoria para los datos
let users = [];

// Función para parsear el body de las peticiones
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

// Función para manejar los headers CORS
const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

// Router para manejar las rutas
const router = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
  OPTIONS: {}
};

// Middleware para servir archivos estáticos
const serveStaticFile = async (req, res, filepath) => {
  try {
    const fileStream = fs.createReadStream(filepath);
    const stat = await fs.promises.stat(filepath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', getContentType(filepath));
    fileStream.pipe(res);
  } catch (error) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'File not found' }));
  }
};

// Función para obtener el tipo de contenido basado en la extensión del archivo
const getContentType = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
  };
  return types[ext] || 'text/plain';
};

// Definición de rutas
router.GET['/api/users'] = (req, res) => {
  res.end(JSON.stringify(users));
};

router.POST['/api/users'] = async (req, res) => {
  const user = await parseBody(req);
  user.id = Date.now();
  users.push(user);
  res.end(JSON.stringify(user));
};

router.PUT['/api/users/:id'] = async (req, res) => {
  const id = parseInt(req.params.id);
  const userData = await parseBody(req);
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    res.end(JSON.stringify(users[index]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'User not found' }));
  }
};

router.DELETE['/api/users/:id'] = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.end(JSON.stringify(deletedUser));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'User not found' }));
  }
};

router.OPTIONS['*'] = (req, res) => {
  setCORSHeaders(res);
  res.end();
};

// Función para extraer parámetros de la URL
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

// Función para encontrar la ruta coincidente
const findMatchingRoute = (method, path) => {
  const routes = router[method];
  
  for (const pattern in routes) {
    if (pattern === path) {
      return { handler: routes[pattern], params: {} };
    }

    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length === pathParts.length) {
      let match = true;
      for (let i = 0; i < patternParts.length; i++) {
        if (!patternParts[i].startsWith(':') && patternParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        return {
          handler: routes[pattern],
          params: extractURLParams(path, pattern)
        };
      }
    }
  }

  return null;
};

// Creación del servidor
const server = https.createServer(options, async (req, res) => {
  const { pathname } = parse(req.url);
  const method = req.method;

  // Configurar headers por defecto
  res.setHeader('Content-Type', 'application/json');
  setCORSHeaders(res);

  // Buscar ruta coincidente
  const route = findMatchingRoute(method, pathname);

  if (route) {
    req.params = route.params;
    try {
      await route.handler(req, res);
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else if (pathname.startsWith('/public/')) {
    // Servir archivos estáticos
    const filepath = path.join(__dirname, pathname);
    await serveStaticFile(req, res, filepath);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
</section>