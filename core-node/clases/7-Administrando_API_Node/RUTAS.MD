# Introducción a la administración de API en Node.js con JavaScript

## Introduccion

> Capítulo 7: El Director del Tráfico

Javier perfecciona las rutas de su API en UTOPIA, creando una estructura flexible y escalable para las futuras funcionalidades. Define endpoints específicos para controlar los diferentes módulos, como la domótica, finanzas y aprendizaje. Se siente cómodo gestionando el flujo de información de la aplicación. En ANFORA su API ya funciona a la perfección, cumpliendo los requisitos de la empresa, cree es hora de dar un paso más y buscar queso nuevo.

Usaremos el proyecto code/code-node-web basado en NX para crear una API que será parte lógica de nuestro proyecto.

La api sera una api node sencilla sin express, al igual que la ui, tendras test bien hechos que al modificar fallaran.

---

## API REST con Node.js nativo

Esta clase explica cómo crear una API REST completa usando Node.js nativo sin depender de frameworks externos como Express. Cubriremos la implementación de un servidor HTTPS, manejo de rutas, métodos HTTP, archivos estáticos y más.

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
- Certificados SSL para HTTPS (OPCIONAL)
- Conocimientos básicos de JavaScript y Node.js

### Estructura del proyecto

```
lib/
├── api.js
├── api.v2.js
├── ssl/
│   ├── server.cert // key.pem
│   └── server.key // cert.pem
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
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
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
  OPTIONS: {},
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
    req.on('data', (chunk) => {
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
    '.jpg': 'image/jpeg',
  };
  return types[ext] || 'text/plain';
};
```

## Gestión de CORS

Implementamos headers CORS para permitir peticiones cross-origin:

```javascript
const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
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
  const index = users.findIndex((user) => user.id === id);

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

Puedes probar la API usando curl o postman:

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

# Resumen

> Capítulo 7: El Director del Tráfico

Rutas, endpoints, control de flujo... Javier orquesta la información en UTOPIA como un director de orquesta dirigiendo una sinfonía digital.

ANFORA está contenta con su API. Él está contento con UTOPIA. Todo parece perfecto y eso ... le inquieta, su ultimo experimento IA le recuerda que debe probar lo del podcast de las palomas.

Sin embargo decide usar un sistema de camaras de bajo coste y una API de camaras publicas para analizar el comportamiento de las palomas que le rodean en tiempo real.
