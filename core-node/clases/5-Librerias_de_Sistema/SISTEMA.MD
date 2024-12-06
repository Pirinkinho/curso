
# Trabajo con archivos y directorios en una aplicación `Node.js`.

## Introduccion.

> Capítulo 5: <u> El Maestro de las Herramientas. </u>
>
>Javier necesita acceder al sistema de archivos para guardar la configuración de `UTOPIA`. Investiga las librerías del sistema de `Node.js`, aprendiendo a manipular archivos, a usar las librerías de `crypto` para encriptar información sensible y otras funciones del sistema.
>
>Integra en `UTOPIA` un sistema de backup encriptado automático, dándole más robustez a su aplicación. Cuando intenta aplicar este encriptado en **ANFORA** observa que hay algo raro...

## Objetivos de aprendizaje.

Al final de este módulo, podrá hacer lo siguiente:

- Trabajar con directorios.
- Crear y eliminar archivos.
- Leer archivos.
- Escribir en archivos.
- Analizar datos en archivos.

---

## Archivos y directorios en una aplicación `Node.js`.

`Node.js` tiene mecanismos integrados tremendamente eficaces para trabajar con el sistema de archivos y pueden ser usandos desde el `módulo FS`.

## Inclusión del `módulo FS`.

`Node.js` proporciona un módulo integrado, `fs (abreviatura de file system)`, para trabajar con el sistema de archivos. Dado que forma parte del entorno de ejecución de `Node.js`, no es necesario instalarlo; solo úselo como referencia como con cualquier otra dependencia.

```js
import fs from 'fs';
const fs = require('fs');
```

El `módulo fs` tiene un `espacio de nombres promises` que tiene versiones promise de todos los métodos. El uso del `espacio de nombres promise` es la manera preferida de trabajar con el `módulo fs`, ya que le permite usar `async` para evitar el desorden de las devoluciones de llamada o el bloqueo de métodos sincrónicos.

```js
import fs from 'fs/promises';
const fs = require('fs').promises;
```

Puede usar el `módulo fs` para realizar varias operaciones en archivos y directorios. Tiene varios métodos entre los que elegir. Por el momento, nos centraremos únicamente en lo que necesitamos saber para trabajar con directorios.

## Muestra del contenido en un directorio con `fs.readdir`.

Una de las tareas que se harán bastante a menudo con el `módulo fs` es mostrar o enumerar el contenido en un directorio. Por ejemplo, **ANFORA** tiene una carpeta raíz denominada `stores`. En esa carpeta hay subcarpetas organizadas por número de tienda. Dentro de esas carpetas están los archivos de totales de ventas. El aspecto de esta estructura es el siguiente:

```bash
📂 stores
📄 sales.json
📄 totals.txt
📂 201
📂 202
```

Para leer el contenido de la carpeta, se puede usar el `método readdir`. La mayoría de las operaciones del `módulo fs` tienen opciones sincrónicas (seguidas de `Sync`) y asincrónicas. Los resultados se devuelven en orden alfanumérico.

```js
const fs = require('fs').promises;

async function main() {
  const items = await fs.readdir('stores');
  console.log(items);
}
main();
```

La lista ordenada alfanumérica de elementos tiene este aspecto:

```bash
[ '201', '202', '203', '204' ]
```

### Determinación del tipo de contenido con `isDirectory`.

Cuando se lee el contenido de un directorio, se obtienen las carpetas y los archivos como una matriz de cadenas. Para distinguir cuáles son archivos y cuáles directorios, se puede pasar la opción `withFileTypes`. Esta opción devuelve una matriz de `objetos Dirent (directory entity)`, en lugar de una matriz de cadenas. El `objeto Dirent` tiene los métodos `isFile` y `isDirectory`, que se pueden usar para determinar con qué tipo de objeto estamos tratando.

```js
const fs = require('fs').promises;

async function main() {
  const items = await fs.readdir('stores', { withFileTypes: true });
  for (let item of items) {
    const type = item.isDirectory() ? 'folder' : 'file';
    console.log(`${item.name}: ${type}`);
  }
}
main();
```

La lista ordenada alfanumérica de elementos tiene este aspecto:

```bash
201: folder
202: folder
203: folder
204: folder
```

## Un apunte sobre `recursividad`.

A menudo, es posible que deba trabajar con estructuras de directorio complejas que incluyen varias carpetas anidadas, cada una de las cuales puede contener más subcarpetas y archivos. En tales casos, necesita una manera de navegar por esta estructura similar a un árbol para buscar archivos específicos.

Para ello, puede crear una función que identifique si un elemento es una carpeta. Si es así, la función busca más archivos dentro de esa carpeta. Este proceso se repite para cada carpeta que se encuentra.

Esto se logra mediante una técnica denominada `recursividad`, donde la función se llama a sí misma para buscar dentro de las carpetas recién encontradas. Esto permite que el programa "recorra" todo el árbol de directorios, llegando a cada carpeta anidada hasta que se hayan explorado todas las carpetas.

```js
const fs = require('fs').promises;

async function findFiles(folderName) {
  let results = [];

  results.push(`${folderName}`);

  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      // RECURSION - calling the function from within itself
      const resultsReturned = await findFiles(`${folderName}/${item.name}`);
      results = results.concat(resultsReturned);
    } else {
      results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

findFiles('stores').then((results) => console.log(results));
```

El resultado tendrá una apariencia similar a la siguiente:

```bash
[
'stores',
'stores/201',
'stores/201/sales.json',
'stores/202',
'stores/202/sales.json',
'stores/203',
'stores/203/sales.json',
'stores/204',
'stores/204/sales.json'
]
```

## Uso de un `entorno de desarrollo predefinido`.

Este módulo de entrenamiento ofrece un contenedor de desarrollo, ya sea en un explorador o en el equipo local. Este contenedor proporciona todo el entorno necesario para que pueda usar este módulo de entrenamiento sin tener que instalar un `IDE` o `Node.js`. No es necesario saber nada sobre el contenedor para completar este módulo de entrenamiento.

---

## Ejercicio: Trabajar con el sistema de archivos.

**ANFORA** tiene muchas tiendas físicas repartidas por todo el mundo. Cada noche, las tiendas crean un archivo denominado `sales.json` que contiene el total de todas las ventas del día anterior. Estos archivos se organizan en carpetas nombradas por id. de tienda.

En este ejercicio, va a escribir un programa de `Node.js` que busca archivos llamados `sales.json` en una carpeta.

### Inclusión del `módulo fs`.

En la subcarpeta `./workspace/core-node/code/nodejs-files`:

- Cree un archivo `index.js` para abrirlo en el editor.
- En la parte superior del archivo, agregue el código siguiente para incluir el módulo fs en el archivo.

```js
const fs = require('fs').promises;
```

- A continuación, cree la `función main`, que es el punto de entrada del código.
- La última línea de código de este archivo invoca al método main.

```js
const fs = require('fs').promises;

async function main() {}

main();
```

Este es el código reutilizable de `CommonJS` típico para llamar a una función asincrónica. Si se desea utilizarla con `ES6`, se puede usando el siguiente código:

```js
import fs from 'fs/promises';

async function main() {}

main();
```

### Escribir una función para buscar los archivos `sales.json`.

- Cree una función denominada `findSalesFiles` que tome un parámetro `folderName`.

```js
async function findSalesFiles(folderName) {
  // FIND SALES FILES
}
```

Dentro de la función `findSalesFiles`, agregue el código siguiente para completar estas tareas:

1. Agregue una `matriz` al inicio que contenga las rutas de acceso a todos los archivos de ventas que encuentre el programa.
1. Lea `currentFolder` con el método `readdir`.
1. Agregue un bloque para recorrer en bucle cada elemento devuelto desde el método `readdir` mediante el bucle asincrónico `for...of`.
1. Agregue una instrucción `if` para saber si el elemento es un archivo o un directorio.
1. Si el elemento es un directorio, llame recursivamente a la función `findSalesFiles` de nuevo, pasando la ruta de acceso al elemento.
1. Si no lo es, agregue una comprobación para asegurarse de que el nombre del elemento coincide con `sales.json`.

- Llame a esta función nueva de `findSaleFiles` desde el `método main`.
- Pase el nombre de la carpeta `stores` como la ubicación en la que buscar archivos.

```js
async function main() {
  const results = await findSalesFiles('stores');
  console.log(results);
}
```

La aplicación completa tiene el siguiente aspecto:

```js
const fs = require('fs').promises;
async function findSalesFiles(folderName) {
  // (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
  let results = [];

  // (2) Read the currentFolder with the `readdir` method.
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Add a block to loop over each item returned from the `readdir` method using the asynchronous `for...of` loop.
  for (const item of items) {
    // (4) Add an `if` statement to determine if the item is a file or a directory.
    if (item.isDirectory()) {
      // (5) If the item is a directory, recursively call the function `findSalesFiles` again, passing in the path to the item.
      const resultsReturned = await findSalesFiles(
        `${folderName}/${item.name}`,
      );
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (item.name === 'sales.json') {
        results.push(`${folderName}/${item.name}`);
      }
    }
  }

  return results;
}

async function main() {
  const results = await findSalesFiles('stores');
  console.log(results);
}

main();
```

- Ejecutar el programa:

```bash
[
'stores/201/sales.json',
'stores/202/sales.json',
'stores/203/sales.json',
'stores/204/sales.json',
]
```

Excelente. Ha escrito correctamente un programa de línea de comandos que puede recorrer cualquier directorio y encontrar todos los archivos `sales.json` que haya en ellos.

A pesar de ello, el modo en que se ha construido la ruta de acceso a las subcarpetas en este ejemplo es un poco engorroso, porque requiere concatenar cadenas. Además, es posible que surjan incidencias en otros sistemas operativos (como Windows) que usan separadores de ruta de acceso diferentes.

En la sección siguiente, obtendremos información sobre cómo construir rutas de acceso que funcionen en varios sistemas operativos mediante el `módulo path`.

---

## Trabajo con rutas de acceso de archivo en `Node.js`.

Como nuevo desarrollador de **ANFORA**, debe saber cómo administrar rutas de acceso a archivos y carpetas. Si se tuvieran muchos archivos o carpetas, crear las rutas de acceso manualmente puede resultar muy tedioso. `Node.js` proporciona algunas constantes y utilidades integradas para que crear rutas de acceso de archivos sea una tarea más sencilla.

## Determinación del directorio actual con `__dirname`.

A veces no sabe en qué directorio se está ejecutando el programa. Solo lo necesita para usar la ruta de acceso del directorio actual.

```bash
📂 stores
📂 201
📂 sales
```

`Node.js` expone la ruta de acceso completa al directorio actual a través de la constante `__dirname`. En los modulos de tipo `CommonJS`, `__dirname` es una `variable global` que contiene la ruta de acceso completa al directorio actual. En los modulos de tipo `ES6`, `__dirname` no está disponible, pero se puede obtener la ruta de acceso al directorio actual mediante el objeto `import.meta.url` veremos un ejemplo al crear la api en el archivo `workspace/core-node/code/core-node-web/libs/api/src/lib/api.js`.

```js
console.log(__dirname);
```

Si ejecuta ese código desde la carpeta sales en la estructura de carpetas siguiente, el valor de `__dirname` es:

```bash
/stores/201/sales
```

### Trabajar con rutas de acceso con el `módulo path`.

Las rutas de acceso es un tema que surge tan a menudo que `Node.js` incluye un módulo denominado `path` dedicado expresamente para funcionar con rutas de acceso.

Al igual que el `módulo fs`, el `módulo path` se distribuye junto con `Node.js` y no es necesario instalarlo. Solo se tiene que hacer referencia a dicho módulo al inicio del archivo.

```js
const path = require('path');
```

### Combinar rutas de acceso con `path.join`

El `módulo path` funciona con el concepto de rutas de acceso de archivos y carpetas, que son simplemente cadenas. Por ejemplo, si se quiere obtener la ruta de acceso a la carpeta `stores/201`, se puede usar el `módulo path` para ello.

```js
const currentPath = path.join('stores', '201');
console.log(currentPath); // stores/201

const fullPath = path.join(__dirname, 'stores', '201');
console.log(fullPath); // /nodejs-files/stores/201
```

El motivo por el que usaríamos el `módulo path` en lugar de concatenar cadenas reside en que, de este modo, el programa puede ejecutarse en Windows o Linux. El `módulo path` aplica el formato adecuado a las rutas de acceso para cualquier sistema operativo en el que se ejecute. En el ejemplo anterior, `path.join` devolvería `stores\201` en Windows, con una `barra diagonal inversa` en lugar de una `barra diagonal`.

### Determinar las extensiones de nombres de archivos con `path.extname`.

El `módulo path` también puede identificar la extensión de un nombre de archivo. Si tiene un archivo y quiere identificar si es `JSON`, puede usar el método `path.extname`.

```js
console.log(path.extname('sales.json'));
```

La salida es la siguiente:

```bash
.json
```

!!! Tip Sugerencia
    El `módulo path` no se preocupa de si algo realmente existe o no. Las rutas de acceso son algo conceptual, no físico. Solo se crean y analizan cadenas automáticamente.

### Obtención de todo lo que es necesario saber sobre un archivo o ruta de acceso.

El `módulo path` contiene muchos métodos diferentes que realizan diversas acciones. Sin embargo, con el `método parse` podemos obtener la mayor parte de la información que se necesita sobre una ruta de acceso o un archivo. Este método devuelve un objeto que contiene el directorio actual en el que se encuentra, el nombre del archivo, la extensión de nombre de archivo e incluso el nombre del archivo sin la extensión.

```js
const currentPath = path.parse('stores/201/sales.json');
console.log(currentPath);

const fullPath = path.join(__dirname, 'stores', '201', '/sales.json');
console.log(path.parse(fullPath));
```

La salida es:

```bash
{
root: '',
dir: 'stores/201',
base: 'sales.json',
ext: '.json',
name: 'sales'
}
{
root: '/',
dir: '/workspaces/node-essentials/nodejs-files/stores/201',
base: 'sales.json',
ext: '.json',
name: 'sales'
}
```

Aunque existen muchos métodos más útiles en el `módulo path`, los métodos que se explican aquí son los conceptos básicos que probablemente se usen con más frecuencia. En el siguiente ejercicio, se usará el `módulo path` para crear rutas de acceso e identificar archivos `.json`.

---

## Ejercicio: Trabajar con rutas.

- Como desarrollador de **ANFORA**, está a punto de mejorar un programa mediante el `módulo path` de `Node.js` y la variable global `__dirname`. Esto permitirá que el programa busque y procese dinámicamente los archivos `.json`, independientemente de dónde se ejecute el programa.

- Inclusión del `módulo path`
En la parte superior del archivo `index.js`, incluya el `módulo path`.

```js
const path = require('path');
```

### Uso del directorio actual.

En el código `index.js` actual, se pasa la ubicación estática de la carpeta `stores`. Vamos a cambiar ese código para que use el valor `__dirname` en lugar de pasar un nombre de carpeta estática.

En el `método main`, cree una variable para almacenar una ruta de acceso al directorio stores mediante la constante `__dirname`.

```js
async function main() {
  const salesDir = path.join(__dirname, 'stores');

  const salesFiles = await findSalesFiles(salesDir);
  console.log(salesFiles);
};
```

- Ejecute el programa desde la línea de comandos y observe que la ruta de acceso que ahora se muestra para los archivos es la ruta de acceso completa del sistema, ya que la constante `__dirname` devuelve la ruta de acceso completa a la ubicación actual.

```bash
[
'/workspaces/node-essentials/nodejs-files/stores/201/sales.json',
'/workspaces/node-essentials/nodejs-files/stores/202/sales.json',
'/workspaces/node-essentials/nodejs-files/stores/203/sales.json',
'/workspaces/node-essentials/nodejs-files/stores/204/sales.json'
]
```

### Rutas de combinación.

En lugar de concatenar nombres de carpeta para crear una ruta de acceso donde realizar la búsqueda, cambiaremos el código para usar el método `path.join`. Posteriormente, este código puede funcionar en los sistemas operativos.

Cambie el método `findFiles` para usar `path.join`.

```js
// previous code - with string concatentation
const resultsReturned = await findSalesFiles(`${folderName}/${item.name}`);

// current code - with path.join
const resultsReturned = await findSalesFiles(path.join(folderName, item.name));
```

La salida es la misma que en el paso anterior, si bien ahora el programa es más sólido porque usa `path.join` en lugar de concatenar cadenas.

### Búsqueda de todos los archivos `.json`.

En lugar de buscar solo los archivos `sales.json`, este programa necesita encontrar cualquier archivo con la extensión `.json`. Para ello, use el `método path.extname` a fin de comprobar la extensión de nombre de archivo.

Ejecute el siguiente comando en el terminal para cambiar el nombre del archivo `stores/201/sales.json` a `stores/sales/totals.json`.

```bash
mv stores/201/sales.json stores/201/totals.json
```

En la función `findSalesFiles`, cambie la instrucción `if` para que compruebe únicamente la extensión de nombre de archivo.

```js
if (path.extname(item.name) === '.json') {
  results.push(`${folderName}/${item.name}`);
}
```

Ejecute el programa desde la línea de comandos.

```bash
node index.js
```

Ahora, la salida muestra todos los archivos `.json` que están en cualquiera de los directorios de id. de tienda.

```bash
[
'/workspace/core-node/code/nodejs-files/stores/201/totals.json',
'/workspace/core-node/code/nodejs-files/stores/202/sales.json',
'/workspace/core-node/code/nodejs-files/stores/203/sales.json',
'/workspace/core-node/code/nodejs-files/stores/204/sales.json'
]
```

### ¿Se ha bloqueado?

Si se ha bloqueado en algún momento de este ejercicio, aquí tiene el código completo. Quite todo en `index.js` y reemplácelo por esta solución.

```js
const fs = require('fs').promises;
const path = require('path');

async function findSalesFiles(folderName) {
  // (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
  let results = [];

  // (2) Read the currentFolder with the `readdir` method.
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Add a block to loop over each item returned from the `readdir` method using the asynchronous `for...of` loop.
  for (const item of items) {
    // (4) Add an `if` statement to determine if the item is a file or a directory.
    if (item.isDirectory()) {
      // (5) If the item is a directory,  recursively call the function `findSalesFiles` again, passing in the path to the item.
      const resultsReturned = await findSalesFiles(
        path.join(folderName, item.name),
      );
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (path.extname(item.name) === '.json')
        results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');

  // find paths to all the sales files
  const salesFiles = await findSalesFiles(salesDir);
  console.log(salesFiles);
}

main();
```

---

## Creación de archivos y directorios (`fs.mkdir`, `fs.writeFile`).

Como desarrollador de **ANFORA**, está a punto de profundizar en el uso práctico de la creación y eliminación de nuevos archivos y directorios mediante programación. Este es un requisito común para las aplicaciones de línea de negocio.

Hasta ahora, ha obtenido información sobre cómo trabajar con archivos y directorios mediante el `módulo fs`. También se puede usar el `módulo fs` para crear, eliminar, copiar, mover o manipular de cualquier otra forma archivos y directorios en un sistema mediante programación.

## Creación de directorios con `fs.mkdir`.

El `método mkdir` permite crear directorios. Con el siguiente método se crea una carpeta denominada `newDir` dentro de la carpeta `201`.

```js
const fs = require('fs').promises;
const path = require('path');

await fs.mkdir(path.join(__dirname, 'stores', '201', 'newDir'));
```

La estructura de archivos `/stores/201` ya debe existir; de lo contrario, se produce un error en este método. Se puede pasar una marca `recursive` opcional si la estructura de archivos no existe y quiere que la operación la cree.

```js
await fs.mkdir(path.join(__dirname, 'newDir', 'stores', '201', 'newDir'), {
  recursive: true,
});
```

### Garantía de que los directorios existen.

Si el directorio que intenta crear ya existe, el `método mkdir` genera un error. Esa situación no es buena, porque el error hace que el programa se detenga abruptamente. Para evitar esta situación, `Node.js` recomienda ajustar el `método mkdir` en un elemento `try/catch` si tiene previsto manipular el archivo o el directorio después de abrirlo, como nosotros.

```js
const pathToCreate = path.join(__dirname, 'stores', '201', 'newDirectory');

// create the salesTotal directory if it doesn't exist
try {
  await fs.mkdir(salesTotalsDir);
} catch {
  console.log(`${salesTotalsDir} already exists.`);
}
```

### Creación de archivos con `fs.writeFile`.

Se pueden crear archivos mediante el método `fs.writeFile`. Este método toma una ruta de acceso al archivo y los datos que se van a escribir en él. Si el archivo ya existe, se sobrescribe.

Por ejemplo, este código crea un archivo denominado `greeting.txt` con el texto "Hola mundo" dentro.

```js
const pathToFile = path.join(__dirname, 'greeting.txt');
await fs.writeFile(pathToFile, 'Hello World!');
```

Si se omite el último parámetro, que son los datos que se van a escribir en el archivo, `Node.js` escribe `"undefined"` en el archivo. Probablemente esta situación no sea lo que busca. Para escribir un archivo vacío, pasaremos una cadena vacía.

Una opción aún mejor sería pasar la `función String()`, que en la práctica hace lo mismo, pero sin dejar comillas vacías en el código.

```js
const pathToFile = path.join(__dirname, 'greeting.txt');
await fs.writeFile(pathToFile, String());
```

En el ejercicio siguiente, se usarán estos conocimientos sobre cómo crear archivos y directorios para ampliar el programa con el fin de crear un directorio en el que almacenar el total de todos los archivos de ventas.

---

## Creación de archivos y directorios.

Como desarrollador de **ANFORA**, ha creado una aplicación de línea de comandos sólida en `Node.js` que puede leer cualquier estructura de carpetas para encontrar archivos con la extensión `.json`. Deberá leer esos archivos para resumir los datos que contengan y, tras ello, escribir los totales en un archivo nuevo, dentro de un directorio nuevo llamado `salesTotals`.

## Ejercicio: creación del directorio `salesTotals`.

En la `función main()`, agregue código para:

- Crear una variable denominada `salesTotalsDir`, que contenga la ruta de acceso del directorio `salesTotals`.
- Crear el directorio si aún no existe.
- Escribir el total en el archivo `totals.txt`.

```js
async function main() {
  const salesDir = path.join(__dirname, 'stores');

  // (1) Create a variable called `salesTotalsDir`, which holds the path of the _salesTotals_ directory.
  const salesTotalsDir = path.join(__dirname, 'salesTotals');

  try {
    // (2) Create the directory if it doesn't already exist.
    await fs.mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }

  // Calculate sales totals
  const salesFiles = await findSalesFiles(salesDir);

  // (3) Write the total to the "totals.txt" file with empty string `String()`
  await fs.writeFile(path.join(salesTotalsDir, 'totals.txt'), String());
  console.log(`Wrote sales totals to ${salesTotalsDir}`);
}
```

Seleccione el icono `Actualizar` en el `explorador Files` para ver el nuevo archivo. Ha creado el archivo, pero aún no tiene los totales. El siguiente paso es leer los archivos de ventas, sumar los totales y escribir el total general en el nuevo archivo `totals.txt`. Después, obtendrá información sobre cómo leer y analizar los datos incluidos en los archivos.

### ¿Está bloqueado?

Si se ha bloqueado durante este ejercicio, este es el código completo hasta el momento.

```js
const fs = require('fs').promises;
const path = require('path');

async function findSalesFiles(folderName) {
  // (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
  let results = [];

  // (2) Read the currentFolder with the `readdir` method.
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Add a block to loop over each item returned from the `readdir` function using the asynchronous `for...of` loop.
  for (const item of items) {
    // (4) Add an `if` statement to determine if the item is a file or a directory.
    if (item.isDirectory()) {
      // (5) If the item is a directory,  recursively call the function `findSalesFiles` again, passing in the path to the item.
      const resultsReturned = await findSalesFiles(
        path.join(folderName, item.name),
      );
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (path.extname(item.name) === '.json')
        results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');

  // (1) Create a variable called `salesTotalsDir`, which holds the path of the _salesTotals_ directory.
  const salesTotalsDir = path.join(__dirname, 'salesTotals');

  try {
    // (2) Create the directory if it doesn't already exist.
    await fs.mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }

  // Calculate sales totals
  const salesFiles = await findSalesFiles(salesDir);

  // (3) Write the total to the "totals.txt" file with empty string `String()`
  await fs.writeFile(path.join(salesTotalsDir, 'totals.txt'), String());
  console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();
```

---

## Lectura y escritura en archivos.

La aplicación **ANFORA** debe leer los datos de ventas de cada tienda, calcular el total y, a continuación, escribir el total de todos los archivos de ventas de la tienda individuales en un archivo nuevo.

## Lectura de datos de archivos con `fs.readFile`

Los archivos se leen a través del `método readFile` del `módulo fs`.

```js
await fs.readFile('stores/201/sales.json');
```

El objeto devuelto del `método readFile` es un `objeto Buffer`. Tiene el contenido del archivo en formato binario. Por ejemplo, supongamos que tiene el siguiente archivo llamado `sales.json` con el contenido siguiente.

```json
{
  "total": 22385.32
}
```

Al cerrar sesión, el valor devuelto del `método readFile` proporcionará el valor `Buffer`.

```bash
<Buffer 7b 0a 20 20 22 74 6f 74 61 6c 22 3a 20 32 32 33 38 35 2e 33 32 0a 7d>
```

Ese resultado no resulta útil. Posiblemente se haya leído el archivo, pero es cierto que se pueden "leer" estos datos. No pasa nada. `JavaScript` puede convertir un `valor Buffer` en un `valor de cadena` que puede usar para calcular el total. Para ello, invoque el `objeto String` y pase el `búfer`.

```js
const bufferData = await fs.readFile('stores/201/sales.json');
console.log(String(bufferData));
```

La salida es la siguiente:

```bash
{
"total": 22385.32
}
```

### Análisis de datos con `JSON.parse`.

Estos datos en su formato de cadena no nos aportan demasiado. Son solo caracteres, si bien ahora tienen un formato que se puede leer. Quiere tener la capacidad de convertir esta cadena en datos accesibles mediante programación (conocidos como `datos de análisis`).

`JavaScript` incluye un analizador integrado de archivos `JSON`. No es necesario incluir nada para usarlo, solo el objeto `JSON`. Como ventaja extra, tampoco es necesario convertir un `valor Buffer` en una cadena antes de analizarlo. De eso se encarga el método `JSON.parse`. `JSON.parse` es un método común que se usará con frecuencia en el desarrollo web cuando una `API` reciba datos (como cadenas) a través de Internet, que luego deben convertirse en `objetos JSON`.

```js
// read the file as string
const fileContents = await fs.readFile('stores/201/sales.json');

// turn string into JSON
const data = JSON.parse(fileContents);

// access the value by the property key `total`
console.log(data.total);
```

La salida es la siguiente:

```bash
22385.32
```

!!! Tip Sugerencia
    Los archivos presentan una gran variedad de formatos. Los archivos `.JSON` son los que más nos conviene usar debido a su compatibilidad integrada en el lenguaje, pero se puede encontrar con archivos `.csv`, de ancho fijo o con cualquier otro formato. En tal caso, lo mejor es buscar en `npmjs.org` un analizador acorde a ese tipo de archivo.

### Escritura de datos en archivos con `fs.writeFile`.

Ha obtenido información sobre cómo escribir archivos en el ejercicio anterior, solo que escribimos en uno vacío. Para escribir datos en un archivo, deberemos usar el mismo `método writeFile`, pero pasando los datos que queremos escribir como tercer parámetro.

```js
// read the file as string
const fileContents = await fs.readFile('stores/201/sales.json');

// turn string into JSON
const data = JSON.parse(fileContents);

// file name is totals.txt
const filePath = path.join('salesTotals', 'totals.txt');

// write the total to the "totals.json" file
await fs.writeFile(filePath, data.total);
```

El contenido del archivo `totals.txt` es:

```bash
22385.32
```

### Anexar datos a archivos con `fs.writeFile`.

En el ejemplo anterior, el archivo se sobrescribe cada vez que se escribe en él. A veces, lo que quiere es anexar datos al archivo en lugar de reemplazarlos por completo. Para ello, se puede pasar una marca al `método writeFile`. La marca está establecida de forma predeterminada en `w`, que significa reemplazar el archivo. Para anexar datos al archivo en vez de reemplazarlo, pasaremos la `marca a`, que significa anexar.

```js
// read the file as string
const fileContents = await fs.readFile('stores/201/sales.json');

// turn string into JSON
const data = JSON.parse(fileContents);

// file name is totals.txt
const filePath = path.join('salesTotals', 'totals.txt');

// write the total to the "totals.json" file
await fs.writeFile(filePath, `${data.total}\r\n`, { flag: 'a' });
```

El contenido del archivo `totals.txt` es: 22385.32

!!! tip Sugerencia
    En el código de ejemplo anterior, `\r\n` indica a `JavaScript` que ponga el valor en su propia línea. Si no se pasara este valor (conocido como `avance de línea de retorno de carro`), se obtendrían todos los números en la misma línea, apelotonados.

En el ejercicio siguiente, finalizaremos el proyecto de totales de ventas de **ANFORA** mediante la lectura de todos los archivos de ventas y la escritura del total general en un `archivo .txt`. Posteriormente, el sistema comercial de la empresa puede procesar el archivo.

---

### Ejercicio: Lectura de archivos y escritura en ellos.

Ya casi hemos terminado de crear una aplicación `Node.js` maravillosa para **ANFORA**. Hasta ahora, el código lee cualquier carpeta, busca todos los archivos `.json` y crea un archivo `totals.txt` en la carpeta `salesTotals`.

En este ejercicio, se completa el proyecto; para ello, se leen los archivos `.json`, se suman los totales de todas las tiendas y se escribe el total general en el archivo `salesTotals/totals.txt`.

- Creación de un método para calcular totales de ventas:

En la parte superior de `index.js`, justo debajo de la instrucción `require("path")`, cree una función que calcule el total de ventas. Este método debe tomar la matriz de rutas de acceso de archivo en la que pueda iterar.

```js
async function calculateSalesTotal(salesFiles) {
  let salesTotal = 0;

  // READ FILES LOOP

  return salesTotal;
}
```

- Dentro de esa función, reemplace `// READ FILES LOOP` por un bucle que:

- Itere la matriz `salesFiles`.
- Lea el archivo.
- Analice el contenido como `JSON`.
- Incremente la variable `salesTotal` con el valor del archivo total.

```js
async function calculateSalesTotal(salesFiles) {
  // Final sales total
  let salesTotal = 0;

  // (1) Tterates over the `salesFiles` array.
  for (file of salesFiles) {
    // (2) Reads the file.
    const fileContents = await fs.readFile(file);

    // (3) Parses the content as JSON.
    const data = JSON.parse(fileContents);

    // (4) Increments the `salesTotal` variable with the `total` value from the file.
    salesTotal += data.total;
  }
  return salesTotal;
}
```

### Llamada al `método calculateSalesTotals`.

En la `función main()`, modifique el código para:

- Agregar una llamada a la función `calculateSalesTotals` justo encima de la llamada a `fs.writeFile`.
- Modificar el bloque `fs.writeFile` para escribir el valor de la variable `salesTotal` en el archivo `totals.txt`.

```js
async function main() {
const salesDir = path.join(**dirname, "stores");
const salesTotalsDir = path.join(**dirname, "salesTotals");

try {
await fs.mkdir(salesTotalsDir);
} catch {
console.log(`${salesTotalsDir} already exists.`);
}

const salesFiles = await findSalesFiles(salesDir);

// (1) Add a call to the `calculateSalesTotals` function just above the `fs.writeFile` call.
const salesTotal = await calculateSalesTotal(salesFiles);

// (2) Modify the `fs.writeFile` block to write the value of the `salesTotal` variable to the _totals.txt_ file.
await fs.writeFile(
path.join(salesTotalsDir, "totals.txt"),
`${salesTotal}\r\n`,
{ flag: "a" }
);
}
```

- Ejecute el programa desde el terminal.

```bash
node index.js
```

```bash
185933.76
```

- Abra el archivo `./salesTotals/totals.txt` para ver el total de todas las ventas de los archivos `sales.json` y `totals.json`: 185933.76.

- Vuelva a ejecutar el programa desde el terminal.

```bash
node index.js
185933.76
185933.76
```

El archivo `totals.txt` ahora tiene una segunda línea. Cada vez que el programa se ejecute, los totales se volverán a sumar y se escribirá una nueva línea en el archivo.

Hemos escrito una herramienta inteligente, eficaz y útil que **ANFORA** puede usar para procesar todas las ventas de sus tiendas cada noche, sin tener que hacerlo manualmente.

Estos son algunos aspectos que hemos aprendido en este módulo y algunas recomendaciones extras:

- Hay que usar siempre el `espacio de nombres promises` en los módulos integrados.
- Se pueden usar los operadores `async` y `await` para que el código sea asincrónico sin que la ejecución del programa se bloquee.
- Siempre que cree un directorio, asegúrese de encapsularlo en un elemento `try/catch`.
- El comportamiento predeterminado de `Node.js` es producir un error si se intenta crear un directorio que ya existe.
- Si solo quiere comprobar si un directorio existe o no, puede utilizar el método `stat`. Este método no existe en el `espacio de nombres promises`, sino en el objeto `fs principal`.
- En caso de que sea necesario analizar otros tipos de archivo, consulte los paquetes disponibles en `npmjs.org`. Por ejemplo, puede usar el paquete `papaparse` para los archivos `.csv`.
- Puede usar el paquete `[fixy]()` para los archivos de ancho fijo.

### ¿Se ha perdido?

Si se ha bloqueado durante este ejercicio, aquí tiene el código completo de este proyecto.

```js
const fs = require("fs").promises;
const path = require("path");

async function calculateSalesTotal(salesFiles) {

// Final sales total
let salesTotal = 0;

// (1) Tterates over the `salesFiles` array.
for (file of salesFiles) {

    // (2) Reads the file.
    const fileContents = await fs.readFile(file)

    // (3) Parses the content as JSON.
    const data = JSON.parse(fileContents);

    // (4) Increments the `salesTotal` variable with the `total` value from the file.
    salesTotal += data.total;

}
return salesTotal;
}

async function findSalesFiles(folderName) {

// (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
let results = [];

// (2) Read the currentFolder with the `readdir` method.
const items = await fs.readdir(folderName, { withFileTypes: true });

// (3) Add a block to loop over each item returned from the `readdir` function using the asynchronous `for...of` loop.
for (const item of items) {

    // (4) Add an `if` statement to determine if the item is a file or a directory.
    if (item.isDirectory()) {

      // (5) If the item is a directory, recursively call the function `findSalesFiles` again, passing in the path to the item.
      const resultsReturned = await findSalesFiles(path.join(folderName, item.name));
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (path.extname(item.name) === ".json")
        results.push(`${folderName}/${item.name}`);
    }

}

return results;
}

async function main() {

const salesDir = path.join(**dirname, "stores");
const salesTotalsDir = path.join(**dirname, "salesTotals");

// create the salesTotal directory if it doesn't exist
try {
await fs.mkdir(salesTotalsDir);
} catch {
console.log(`${salesTotalsDir} already exists.`);
}

// find paths to all the sales files
const salesFiles = await findSalesFiles(salesDir);

// read through each sales file to calculate the sales total
const salesTotal = await calculateSalesTotal(salesFiles);

// write the total to the "totals.json" file
await fs.writeFile(path.join(salesTotalsDir, "totals.txt"),`${salesTotal}\r\n`,{ flag: "a" });

console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();
```

---

## Resumen.

En este módulo, hemos aprendido a leer archivos y directorios, a crear archivos y directorios y a escribir datos en archivos.

> Capítulo 5: <u> El Maestro de las Herramientas. </u>
>
>Sistemas de archivos, crear, editar, mover, actualizar... Javier maneja las librerías de `Node.js` como un chef con sus cuchillos. `UTOPIA` ahora tiene backups encriptados y una seguridad a prueba de (casi) todo. "Mis datos están más seguros que Fort Knox, pero no entiendo que pasa con el cifrado en **ANFORA**... ", se jacta mientras cierra los ojos para descansar la vista, ajeno a la sonrisa cómplice de un jardinero que poda los arbustos con una precisión... robótica.
