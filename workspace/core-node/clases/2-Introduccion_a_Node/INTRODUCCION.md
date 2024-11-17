# Introducción a Node.js

## Introducción

> Capítulo 2: El Ascenso y el Nuevo Proyecto

Enhorabuena Javier! Has sido contratado por ANFORA y se enfrenta al desafío de aprender Node.js para resolver problemas reales.

ANFORA, impresionada con las respuestas y la rápida adaptación que promete Javier, su actitud le permite dejar constancia en la herramienta de contratación, lo muchísimo que aportará su curiosidad y su pasión por prototipar rápido para ganar expertise a base de practicar y conocer los errores, lo ascienden a desarrollador senior de producto y establece un plan contrato de... 5 años.

Su primera tarea: desarrollar un nuevo proyecto. Javier siente el peso de la responsabilidad, pero también la emoción del desafío. El proyecto inicial parece sencillo, pero Javier sueña con algo más grande.

Investigando descubre que podría aplicar Node.js a una idea personal, de una web llamada:

##### https://u.top.ia

- TAREA OPCIONAL (para subir nota, investigar como usar dominios locales)

`u.top.ia`: Un software para hogares inteligentes que enseña a programar y a automatizar tareas, a medida que genera un perfil optimizado de ti en un modelo de IA que se va entrenando con los datos diarios para mejorar tu rutina con mejores recomendaciones.

Este proyecto personal, que comienza como una simple prueba, será el hilo conductor de la historia y el catalizador de su aprendizaje, existe una propuesta que podremos ver mas adelante sobre este proyecto [Veridas Health Home Identity plugin](https://gitlab.com) que fue generada con IA y que se puede revisar como opción a proyecto final.

### Objetivos de aprendizaje

Al término de este módulo, sabrás:

- Explicar qué es Node.js.
- Entender el funcionamiento de Node.js y su arquitectura de eventos.
- Crear y ejecutar un script de Node.js desde la línea de comandos.
- Revisar técnicas asíncronas: devoluciones de llamada (callbacks), promesas y async/await.

### Requisitos previos valorables

- GitHub
- Conocimientos básicos de edición de texto y archivos de código.
- Experiencia básica en JavaScript.
- Experiencia con la línea de comandos.

## ¿Qué es Node.js?

Node.js, o Node, es un entorno de ejecución de JavaScript del lado del servidor de código abierto. Puedes usarlo para ejecutar aplicaciones y código JavaScript fuera de un navegador, como en un servidor o en una canalización CI/CD.

Node.js es un contenedor del motor JavaScript V8, que impulsa navegadores\* como Google Chrome, Opera, Safari, Microsoft Edge y Firefox. Puedes usar Node.js para ejecutar JavaScript mediante V8 fuera de un navegador. Las APIs de Node.js dan acceso a sistemas como HTTP, sistema operativo, sistema de archivos, criptografía y subprocesos de trabajo, lo que lo hace ideal para construir servidores web.

Node usa JavaScript como lenguaje de programación principal, por tanto es imprescindible ganar conocimientos y confianza en este. Puede ser la elección adecuada para escribir aplicaciones robustas y modulares porque JavaScript también ofrece algunas ventajas únicas.

> Por ejemplo, puedes usar Node.js para compartir lógica, como reglas de validación de formularios, entre el navegador y el servidor. Para ello revisaremos conceptos como librerías, paquetes, monorepositorios y workspaces.

JavaScript es relevante con el auge de las SPA (Single Page Applications) y soporta JSON. Muchas bases de datos, incluyendo SQL y NoSQL, se apoyan en JavaScript y JSON para consultas y esquemas.

**Bases de datos SQL:**

- PostgreSQL
- MySQL
- Microsoft SQL Server

**Bases de datos NoSQL:**

- MongoDB
- CouchDB
- Cassandra

**Con Node.js puedes construir:**

- Servidores web HTTP
- Microservicios o backends de API sin servidor
- Interfaces de línea de comandos (CLI)
- Bibliotecas de código y utilidades
- Scripts de automatización

## ¿Por qué podrías necesitar Node.js?

### Tecnología multiusos

Puedes usar Node.js para construir diversas aplicaciones, desde programas de chat ligeros con alto tráfico hasta herramientas de línea de comandos y servidores web. Node.js está diseñado para manejar muchas solicitudes simultáneas.

### JavaScript

"Toda aplicación que se pueda escribir en JavaScript, se escribirá finalmente en JavaScript". – Jeff Atwood, escritor, empresario, cofundador de StackOverflow.

Muchas aplicaciones fuera del navegador están en JavaScript o lo soportan:

- Editores de código como VS Code y Atom (escritos en JavaScript o TypeScript).
- Aplicaciones de backend escritas en JavaScript y ejecutadas en Node.js.
- Aplicaciones IoT y en tiempo real que usan JavaScript y dependen de Node.js.
- Tecnologías como NativeScript para construir apps móviles nativas con JavaScript/TypeScript.
- Aplicaciones con sistemas de plugins en JavaScript, como Sketch, Adobe XD y Google Apps Script.
- Electron te permite hacer aplicaciones de escritorio, un proyecto interesante es
  [agent.exe](git@github.com:corbt/agent.exe.git)

### Comunidad

Hay más de un millón de módulos y bibliotecas para Node.js en npm (Node Package Manager). Los desarrolladores pueden descargar e integrar fácilmente estos módulos en sus proyectos.

### Código abierto

Node.js es de código abierto, respaldado por la OpenJS Foundation, con una gran comunidad y colaboradores.

### Integración

Los paquetes y módulos de código abierto para Node.js se integran con muchas tecnologías. Puedes, por ejemplo, construir un servidor web con Express.js y conectarlo a MongoDB, o una herramienta CLI con Commander.js y conectarla a MySQL.

## Funcionamiento de Node.js

El sistema se apoya en varios pilares que es necesario mencionar ahora, y posteriormente si es necesario, profundizaremos en ellos.

### Tipos de tareas

Las aplicaciones JavaScript tienen dos tipos de tareas:

- **Síncronas:** Se ejecutan en orden, sin depender de otros recursos (ej. operaciones matemáticas).
- **Asíncronas:** Dependen de otros recursos y pueden no completarse inmediatamente (ej. solicitudes de red).

Node.js usa una cola de tareas para las operaciones asíncronas, permitiendo que el motor siga trabajando mientras espera.

### Bucle de eventos

Node.js usa la arquitectura controlada por eventos para procesar solicitudes asíncronas. Una tarea asíncrona se agrega al bucle de eventos con una función de callback. Cuando la operación se completa, la callback se ejecuta con los resultados. Lo veremos con detalle paso a paso mas adelante.

### Operaciones síncronas vs. asíncronas

Node.js ofrece versiones síncronas y asíncronas para algunas operaciones (ej. manejo de archivos). Aunque lo ideal es usar asíncrono, las síncronas son útiles en casos específicos, como en una CLI que lee un archivo y usa los datos inmediatamente. En servidores web, siempre usa asíncrono para no bloquear el único hilo de ejecución.

### Rendimiento con operaciones asíncronas

Node.js aprovecha la arquitectura controlada por eventos de JavaScript para un alto rendimiento. Las técnicas asíncronas incluyen:

- **Async/await (recomendado):** Usa `async` y `await` para obtener resultados de operaciones asíncronas.
- **Callbacks:** Funciones que se pasan como argumentos y se ejecutan al completar una tarea.
- **Promesas:** Objetos que representan la eventual finalización (o fallo) de una operación asíncrona.

**(Ejemplos de código para Async/await, Promesas y Callbacks)**

### Lectura de archivo asíncrona

```js
// async/await asynchronous example

const fs = require('fs').promises;

const filePath = './file.txt';

// `async` before the parent function
async function readFileAsync() {
  try {
    // `await` before the async method
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
    console.log('Done!');
  } catch (error) {
    console.log('An error occurred...: ', error);
  }
}

readFileAsync()
  .then(() => {
    console.log('Success!');
  })
  .catch((error) => {
    console.log('An error occurred...: ', error);
  });
```

Cuando se publicó async/await en ES2017, las palabras clave solo podían usarse en funciones cuya función de nivel superior\* fuera una promesa. Aunque la promesa no tenía que tener secciones then y catch, todavía era necesario tener sintaxis promise para ejecutarse.
Una función async siempre devuelve una promesa, incluso si no tiene una llamada await dentro de ella. La promesa se resolverá con el valor devuelto por la función. Si la función produce un error, la promesa se rechazará con el valor producido.

### El alma de una promesa

Ejemplo sencillo de una función "no asíncrona" que retorna una promesa. Dado que las devoluciones de llamada anidadas pueden ser difíciles de leer y administrar, Node.js agregó compatibilidad con promesas. Una promesa es un objeto que representa la eventual finalización (o error) de una operación asincrónica.

```js
// Create a basic promise function
function promiseFunction() {
  return new Promise((resolve, reject) => {
    // do something

    if (error) {
      // indicate success
      reject(error);
    } else {
      // indicate error
      resolve(data);
    }
  });
}

// Call a basic promise function
promiseFunction()
  .then((data) => {
    // handle success
  })
  .catch((error) => {
    // handle error
  });
```

### Async/await de nivel superior

Que pasa si queremos librarnos del then y usar directamente await como en el primer ejemplo fuera de una función asíncrona.

1. Necesitamos que nuestro paquete sea un modulo, esto además a lo largo del curso veremos que trae ciertos cambios sobre commonjs:

```json
{
  "type": "module"
}
```

2. Y entonces podemos hacer lo siguiente:

```js
// top-level async/await asynchronous example

const fs = require('fs').promises; // points extra if you fix this ;)

const filePath = './file.txt';

// `async` before the parent function
try {
  // `await` before the async method
  const data = await fs.readFile(filePath, 'utf-8');
  console.log(data);
  console.log('Done!');
} catch (error) {
  console.log('An error occurred...: ', error);
}
console.log("I'm the last line of the file!");
```

### Callbacks

La esencia de javascript han sido los callbacks desde un inicio, para que lo veas de manera directa y lo entiendas, un callback es:

```js
// callback asynchronous example

// file system module from Node.js
const fs = require('fs');

// relative path to file
const filePath = './file.txt';

// callback
const callback = (error, data) => {
  if (error) {
    console.log('An error occurred...: ', error);
  } else {
    console.log(data); // Hi, developers!
    console.log('Done!');
  }
};

// async request to read a file

// parameter 1: filePath
// parameter 2: encoding of utf-8
// parmeter 3: callback function
fs.readFile(filePath, 'utf-8', callback);

console.log("I'm the last line of the file!");
```

Una función que se para como parametro para que se ejecute cuando tu quieras\*, por eso el resultado del script arriba es:

```bash
I'm the last line of the file!
Hi, developers!
Done!
```

De la misma manera puedes "incrustar" el callback en la propia llamada de la siguiente manera:

```js
// callback asynchronous example

// file system module from Node.js
const fs = require('fs');

// relative path to file
const filePath = './file.txt';

// async request to read a file
//
// parameter 1: filePath
// parameter 2: encoding of utf-8
// parmeter 3: callback function () => {}
fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.log('An error occurred...: ', error);
  } else {
    console.log(data); // Hi, developers!
    console.log('Done!');
  }
});

console.log("I'm the last line of the file!");
```

### Devoluciones de llamada anidadas

> Lo mejor es evitar esto, pero si no queda mas remedio...

Dado que es posible que tenga que llamar a una devolución de llamada asincrónica posterior y, a continuación, otra, el código de devolución de llamada podría estar anidado. Esto se denomina infierno de devolución de llamada(callback hell) y es difícil de leer y mantener. Para que te hagas una idea, imagina que estamos leyendo y escribiendo archivos:

```js
// nested callback example

// file system module from Node.js
const fs = require('fs');

fs.readFile(param1, param2, (error, data) => {
  if (!error) {
    fs.writeFile(paramsWrite, (error, data) => {
      if (!error) {
        fs.readFile(paramsRead, (error, data) => {
          if (!error) {
            // do something
          }
        });
      }
    });
  }
});
```

Una alternativa es usar la API sincrona mediante:

```js
// synchronous example

const fs = require('fs');

const filePath = './file.txt';

try {
  // request to read a file
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log(data);
  console.log('Done!');
  // request to write a file
  // fs.writeFileSync(filename, data[, options])
} catch (error) {
  console.log('An error occurred...: ', error);
}
```

### Introducción al bucle de eventos

- El bucle de eventos de Node es muy útil, pero su comprensión requiere un análisis que no es trivial simplificar, por ello vamos a ver un esquema simplificado pero os animo a leer el articulo sugerido y la serie de vídeos para que os vayáis familiarizando con el concepto y la naturaleza de node. Este conocimiento no se exige de manera teórica en el curso pero se recomienda intentar comprenderlo poco a poco.

Vayamos a https://developer.mozilla.org/es/docs/Web/JavaScript/Event_loop y hagamos un interesante viaje por el núcleo de Javascript.

Visto esto, vamos a probar código en nuestro primer modulo NPM!

## Prueba de Node.js

### REPL

Node.js tiene un REPL (Read-Eval-Print Loop) para evaluar código rápidamente. Para iniciarlo, ejecuta `node` en la terminal.

### Creación de un script

1. Crea una carpeta `hello-world`.
1. Abre la carpeta en una terminal.
1. Inicializa el proyecto: `npm init -y`
1. Agrega `"type": "module"` a `package.json`.
1. Crea `index.js` con el código: `console.log('Hello World, from a script file.');`
1. Ejecuta: `node index.js`

## Prueba de conocimientos

1. ¿Qué es Node.js?

   - Un entorno de ejecución de JavaScript.

2. ¿Cómo maneja Node.js las tareas simultáneas?

   - Usa un solo bucle de eventos.

3. ¿Cuándo es Node.js una buena opción?
   - Cuando la aplicación requiere un servidor sin bloqueo controlado por eventos.

## Resumen

En este módulo has aprendido que Node.js es un entorno de ejecución para aplicaciones JavaScript fuera del navegador. Has visto cómo funciona y por qué es una buena opción para construir aplicaciones debido a su control de código síncrono y asíncrono, desde servidores hasta aplicaciones en tiempo real con dispositivos embebidos.

> Capítulo 2: El Ascenso y el Nuevo Proyecto

Javier, después de una intensa semana aprendiendo los fundamentos de JavaScript, se siente como si hubiera absorbido toda la biblioteca de Alejandría en 7 días. Decide analizar las librerias más potentes y con más funcionalidades que se usan en el mercado usando github y la pagina del registro npm, esto le hace descubrir una cantidad increible de conocimiento que puede aprovechar para aplicar en la empresa y lanza su propuesta...

Lo que no esperaba era que ANFORA, en un acto de aparente locura (o genialidad), lo ascendiera a desarrollador de producto. "Debe ser por mi irresistible encanto..." pensó Javier irónicamente, ignorando por completo que un misterioso grupo de "eco-espías" movía los hilos tras bambalinas para acelerar un plan de cambio bastante valioso. ¡A por el módulo 3!
