# Creación de un proyecto de Node.js y trabajo con dependencias

## Introducción

> Capítulo 3: El Poder de la Organización

El proyecto `u.top.ia` empieza a crecer en complejidad. Javier descubre la librería NX y el concepto de monorepos. Organiza el código de manera eficiente, lo que le permite implementar funcionalidades de forma mucho más rápida y escalable.

Javier se siente empoderado al ver cómo las buenas prácticas le facilitan el desarrollo de un proyecto, aparentemente complejo, con una relativa facilidad. La modularidad de NX le inspira nuevas ideas para `u.top.ia`. Piensa en integrar un módulo para controlar la domótica de su hogar, otro para gestionar las finanzas personales, e incluso, un sistema de recomendaciones personalizadas de aprendizaje. Sin embargo deberá enfrentarse al gran reto de las dependencias.

## Objetivos de aprendizaje

Después de completar este módulo, sabrás:

- Inicializar proyectos de Node.js
- Entender en qué consiste el archivo de manifiesto package.json y usarlo para su beneficio
- Agregar y eliminar paquetes del proyecto de Node.js
- Administrar las dependencias de paquete y actualizarlas de forma predecible
- Probar e implementar librerías y frameworks para casi todo.

### Requisitos previos

- Git
- Conocimientos básicos de edición de texto y archivos de código.
- Experiencia básica en JavaScript.
- Experiencia con la línea de comandos.

### Configuración inicial

Le damos la bienvenida al mundo de la administración de proyectos de Node.js con NPM (Node Package Manager. Vamos a profundizar en los aspectos básicos de las dependencias y cómo puede sobrecargar el proceso de desarrollo. Para facilitar la comprensión de cada una de las piezas del ecosistema de dependencias hemos usado descripciones con ejemplos del día a día que te permitirán recordar mejor para que sirve cada una:

**Empaquetado y Administración de paquetes**

`NPM`, el administrador de paquetes predeterminado para Node.js, es el arma secreta para incorporar código externo en los proyectos. Es como tener un asistente personal para ayudarle a crear aplicaciones de forma más rápida y eficaz. En conclusión la herramienta de cli que usarás para casi todo para desarrollar tu programa o librería.

- Id a la terminar y teclead `npm` para comprobar que teneis la herramienta instalada:

```bash
$ npm
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview

All commands:

    access, adduser, audit, bin, bugs, cache, ci, completion,
    config, dedupe, deprecate, diff, dist-tag, docs, doctor,
    edit, exec, explain, explore, find-dupes, fund, get, help,
    hook, init, install, install-ci-test, install-test, link,
    ll, login, logout, ls, org, outdated, owner, pack, ping,
    pkg, prefix, profile, prune, publish, query, rebuild, repo,
    restart, root, run-script, search, set, set-script,
    shrinkwrap, star, stars, start, stop, team, test, token,
    uninstall, unpublish, unstar, update, version, view, whoami

Specify configs in the ini-formatted file
or on the command line via: npm <command> --key=value

More configuration info: npm help config
Configuration fields: npm help 7 config
```

La administración de paquetes es el arte de controlarlos e implica el uso conjunto de todas las partes:

- La herramienta de la CLI de `npm`, su manitas personal para instalar y administrar paquetes desde el registro npm.

- El archivo `package.json`, el plano técnico del proyecto. Está lleno de metadatos sobre su proyecto y se encarga de administrar las dependencias y los archivos de paquetes.

- El `registro npm`, un tesoro de paquetes públicos listos para usar en sus proyectos.

- El proceso de desarollo empaquetado y publicación de todo el proyecto mediante los tres elementos anteriores. Lo cual es un requisito obligatorio para crear un proyecto y trabajar con dependencias.

**Creación del archivo package.json**

Crear un `package.json` es tan sencillo como ejecutar el comando `npm init`.

Hay dos maneras principales de hacerlo:

- npm init: Este comando es como una guía fácil, lo que le lleva a través de un proceso paso a paso que solicita detalles sobre el proyecto, como su nombre, versión y descripción.

- npm init -y: Este comando es la versión rápida de entrenamiento de npm init. Repasa las preguntas y rellena los valores predeterminados por usted.

> Aquí tiene un anticipo del archivo de package.json que generará.

```json
{
  "name": "my project",
  "version": "1.0.0",
  "description": "",
  "main": "script.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Descripción de las áreas de archivo package.json

Piense en el archivo package.json como un cofre del tesoro, lleno de gemas preciosas que dan a su proyecto su brillo. Estas gemas son las propiedades del archivo package.json y se dividen en tres categorías principales:

**Metainformación:** Estas propiedades son como las joyas de la corona, definiendo la metainformación sobre el proyecto. Incluyen el nombre del proyecto, la descripción, el autor, las palabras clave y mucho más.

**Dependencias:** Estas son las monedas de oro y plata, que representan los paquetes que usa el proyecto. Las propiedades `dependencies` y `devDependencies` contienen estos tesoros.

A medida que avanzamos, aprenderás a usar estas propiedades para `instalar`, `actualizar` y `administrar` las dependencias.

**Scripts:** Estos son los comandos de terminal que hacen que se produzcan las tareas del proyecto. Puede enumerar scripts para tareas como iniciar, compilar, probar y lint.

### Creación de tareas con scripts

En el archivo package.json, debe incluir al menos cuatro scripts comunes:

- **start:** Este script da vida a su proyecto. Por ejemplo, podría usar el comando node ./src/index.js.
- **build:** Este script prepara el proyecto para su gran debut. Puede transformar TypeScript en JavaScript, por ejemplo.
- **test:** Este script comprueba el estado del proyecto, normalmente mediante un paquete de prueba.
- **lint:** Este script ordena el código, comprobando si hay problemas de estilo y formato mediante una herramienta como ESLint.
  Estos nombres de script son como palabras mágicas, reconocidas universalmente en la comunidad de desarrolladores y esenciales para mantener el proyecto organizado.

### Estandarización de nombres de script

En el archivo package.json, los scripts se definen con una acción y un comando:

```json
"scripts" : {
"<action>" : "<command>"
}
```

Este es un ejemplo:

```json
"scripts" : {
"start" : "node ./dist/index.js",
"test": "jest",
"build": "tsc",
"lint": "eslint"
}
```

### Ejecutar un script

Para ejecutar un script en un terminal, escriba el comando `npm run <action>`. Por ejemplo, `npm run lint`.

Las acciones `start` y test son especiales en que puede omitir la palabra run en el comando. En lugar de escribir el comando `npm run start`, puede escribir `npm start`.

### Uso de un entorno de desarrollo predefinido

Este módulo de entrenamiento propone un entorno de desarrollo en el equipo local, en la seccion de detalles puedes encontrar el uso de contenedores de manera opcional.

<details><summary>Detalles contenedores</summary>

### Extras - Contenedores

Revisar `.devcontainer/devcontainer.json`

Este contenedor proporciona todo el entorno necesario para que pueda usar este módulo de entrenamiento sin tener que instalar un IDE o Node.js. No es necesario saber nada sobre el contenedor para completar este módulo de entrenamiento. Pero si te interesa puedes buscar información y hacer el ejercicio en casa usando contenedores, el ejercicio podrá presentarse como ejercicio voluntario.

</details>

### Ejercicio: Configuración del archivo package.json

Es un desarrollador de Node.js en ANFORA. Le interesa mucho saber cómo configurar un nuevo proyecto de Node.js. El programa de instalación incluye la generación de un archivo package.json y la creación de algunos scripts comunes que se usarán durante el ciclo de vida del proyecto.

- Abrir el proyecto y usar el entorno local en Visual Studio Code en el contexto de un directorio vacío.

- Abra un nuevo terminal en el editor.

- Vaya el directorio en `workspace/core-node/code` en el directorio actual.

```bash
cd workspace/core-node/code
```

Compruebe que Node.js está instalado en el entorno:

```bash
node --version
```

### Configuración de un nuevo proyecto de Node.js

Para esta unidad, se le ha proporcionado el código fuente de JavaScript. El trabajo consiste en crear el archivo package.json.

En el terminal, cambie a la carpeta de este ejercicio:

```bash
cd workspace/core-node/code/node-dependencies/3-exercise-package-json
```

Ver el contenido de la carpeta:

```bash`
ls -R

````

En esta carpeta, debería ver una subcarpeta src con un archivo index.js ejecute el siguiente comando para crear el archivo package.json con valores predeterminados:

```bash
npm init -y
````

El archivo package.json que tiene un aspecto similar a este ejemplo:

```json
{
  "name": "3-exercise-package-json",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Modifique package.json con estos valores de propiedad:

```json
name: "anfora-api"
description: "API HTTP para administrar elementos de la base de datos de ANFORA"
main: "index.js"
keywords: ["API", "database"]
author: "Elivan"
```

El archivo package.json ahora debería ser similar a este código:

```json
{
  "name": "anfora-api",
  "version": "1.0.0",
  "description": "HTTP API to manage items from the ANFORA database",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["API", "database"],
  "author": "Elivan",
  "license": "ISC"
}
```

En la sección scripts, agregue un nuevo script denominado start encima del script test:

```json
"start": "node ./src/index.js",
```

Guarde los cambios y cierre el archivo package.json.

Para iniciar el proyecto con la acción start, escriba este comando o use el interfaz interactivo del package.json y tenga en cuenta la serie de instrucciones de la consola:

```bash
npm start
```

Debería ver este resultado:

```bash
Welcome to this application
```

Ahora tiene un buen archivo package.json en el que puede compilar a medida que crece el proyecto.

---

## Incorporación de paquetes al proyecto de Node.js

Node.js tiene paquetes integrados para tareas como la administración de archivos y el control HTTP. Pero también hay una amplia gama de paquetes de terceros que se ofrecen en el [registro NPM](https://www.npmjs.com).

### Cuándo y cómo seleccionar un paquete npm

Como nuevo desarrollador de ANFORA, debe agregar funcionalidad a un proyecto. Podría escribir el código usted mismo, pero decide usar un paquete existente. Esta decisión de desarrollo es un escenario común. Antesde usar código de terceros es importante aplicar el siguiente análisis:

### ¿Cuándo debe usar un paquete existente?

Estos son algunos de factores que se deben tener en cuenta:

- **Calidad:** Para tareas como la seguridad, el uso de paquetes bien establecidos garantiza que sigue los procedimientos recomendados y controla los casos perimetrales.

- **Eficacia:** La escritura de su propio código lleva tiempo. El uso de paquetes existentes puede ahorrar mucho esfuerzo. En muchos casos vienen con test unitarios que aseguran su calidad, y además pueden ser utilizados de forma didáctica.

- **Mantenimiento:** Las bibliotecas necesitan actualizaciones y correcciones de errores. A menudo es más eficaz permitir que un equipo de código abierto lo controle.

Los desarrolladores pueden encontrar y descargar paquetes de varios orígenes, como:

- **Registros:** Los registros son colecciones de paquetes, como el registro npm. También puede hospedar su propio registro.
- **Repositorios:** Puede instalar paquetes directamente desde una dirección URL de GitHub.
- **Archivos:** Los paquetes se pueden instalar desde una carpeta local o un archivo comprimido, lo que resulta útil para probar sus propios paquetes.
- **Directorios:** También puede instalar directamente desde un directorio.

## Instalando paquetes NPM desde diferentes fuentes

Aquí hay algunos ejemplos de cómo instalar paquetes npm desde diferentes fuentes:

**Registros:**

Por defecto, npm usa el registro público de npm (https://registry.npmjs.org/). Puedes instalar paquetes directamente desde allí usando el comando `npm install`:

```bash
npm install <nombre-del-paquete>  # Instala la última versión
npm install <nombre-del-paquete>@<version> # Instala una versión específica
npm install <nombre-del-paquete>@latest # Instala la última versión (explícito)
npm install <nombre-del-paquete>@next # Instala la próxima versión (pre-lanzamiento)
```

Ejemplo:

```bash
npm install react
```

Para usar un registro privado, debes configurarlo en tu archivo `.npmrc`:

```bash
# easter egg one - create your own npm registry, you can use gitea, verdaccio etc.
registry=https://tu-registro-privado.com/
```

Luego, instala paquetes como lo harías normalmente:

```bash
npm install <nombre-del-paquete>
```

**Repositorios (GitHub):**

Puedes instalar paquetes directamente desde GitHub usando la siguiente sintaxis:

```bash
npm install <usuario-github>/<repositorio-github>#<rama-o-commit>
```

Ejemplo:

```bash
npm install user/repo#v1.2.3  # Instala desde un tag específico
npm install user/repo#master  # Instala desde la rama master
npm install user/repo#8e26357 # Instala desde un commit específico
```

**Archivos (tarball o carpeta local):**

Puedes instalar paquetes desde un archivo [tarball](https://www.google.com/search?q=tarball&rlz=1C5CHFA_enES999ES999&oq=tarball&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIGCAcQABgeMgYICBAAGB4yBggJEAAYHtIBCDI3MzZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8) (.tar, .tgz, etc.) o una carpeta local.

- **Tarball:**

```bash
npm install <ruta/al/archivo.tgz>
```

Ejemplo:

```bash
npm install ./mi-paquete-1.0.0.tgz
```

- **Carpeta local:**

```bash
npm install <ruta/a/la/carpeta>
```

Ejemplo:

```bash
npm install ./mi-paquete/
```

Esta opción es útil para probar paquetes locales antes de publicarlos.

**Directorios (enlace simbólico):**

Puedes crear un enlace simbólico a un directorio local para que npm lo trate como un paquete instalado. Esto es útil para desarrollo local.

Primero, navega al directorio de tu proyecto y luego ejecuta:

```bash
npm link <ruta/al/directorio-del-paquete>
```

Ejemplo:

```bash
npm link ../mi-paquete/
```

Luego, en el directorio donde quieras usar el paquete, ejecuta:

```bash
npm link <nombre-del-paquete>
```

Ejemplo:

```bash
npm link mi-paquete
```

Esto creará un [enlace simbólico](https://www.google.com/search?q=enlace+simbolico&num=10&sca_esv=38d63245fe7a3678&rlz=1C5CHFA_enES999ES999&sxsrf=ADLYWIKJ-SwNubeAk880H1WX_q44sx1_lA%3A1730586092505&ei=7KUmZ8LAHsLPhbIPz8um0AI&ved=0ahUKEwjC5q_K176JAxXCZ0EAHc-lCSoQ4dUDCA8&uact=5&oq=enlace+simbolico&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGVubGFjZSBzaW1ib2xpY28yBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMggQABiABBjLAUjUP1CzDVjzM3ADeACQAQCYAdEBoAHUD6oBBjYuMTEuMbgBA8gBAPgBAZgCFKACzA7CAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICDhAAGLADGOQCGNYE2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICFhAuGIAEGLADGEMY1AIYyAMYigXYAQHCAgQQIxgnwgILEC4YgAQY0QMYxwHCAgUQLhiABMICDhAuGIAEGMcBGI4FGK8BwgIFECEYoAGYAwCIBgGQBhG6BgYIARABGAmSBwQ4LjEyoAe_fw&sclient=gws-wiz-serp) desde tu proyecto al paquete en desarrollo. Cualquier cambio que realices en el paquete en desarrollo se reflejará inmediatamente en tu proyecto.

Estos ejemplos muestran cómo instalar paquetes npm desde diferentes fuentes. Selecciona la opción que mejor se adapte a tus necesidades. Recuerda que para registros privados o repositorios privados, podrías necesitar autenticación.

Una vez que seleccione un paquete, compruebe sus dependencias para tener en cuenta los siguientes factores:

- **Tamaño:** Más dependencias significan una superficie mayor. El tamaño de la superficie es importante si tiene limitaciones de ancho de banda o hardware. Recuerde que la instalación de un paquete también instala sus dependencias. Esto puede dar lugar a una carpeta node_modules grande.
- **Popularidad:** La popularidad de un paquete puede indicar su calidad.
- **Licencias:** Si planea vender el software, asegúrese de que todas las licencias del paquete de dependencias permiten reutilizarlas y revenderlas.
- **Mantenimiento activo:** Evite las dependencias que están en desuso o que rara vez se actualizan.

Para obtener más información sobre un paquete, visite su página de paquetes en NPM y su repositorio de GitHub. También puede usar el - comando npm: `npm view <package name>`.

### Procedimiento para instalar un paquete

Para instalar un paquete, use la CLI de npm instalada con Node.js. Puede agregar un paquete al proyecto Node.js con el comando npm install en el terminal.

```bash
npm install <name of package>
```

Al ejecutar el comando install, la herramienta de línea de comandos se conecta a un registro global, captura el código y lo coloca en una carpeta node_modules en la raíz del proyecto.

Algunos modificadores comunes (flags --) para el comando install incluyen:

En el caso de los paquetes de solo desarrollo, use `--save-dev` o `-D`. Este modificador guarda en la propiedad devDependencies de package.json. Estas dependencias suelen ser herramientas de formato, lint, compilación, transpilación y pruebas.

En el caso de los paquetes de solo producción, use `--production`.
Este modificador excluye los paquetes de solo desarrollo.

Para las herramientas disponibles globalmente, use -g. Las herramientas de línea de comandos a menudo se instalan globalmente en lugar de importarlas en proyectos.

<!-- easter egg two - understand and document the use of .bin npx -g and other similar concepts -->

Las dependencias globales se instalan en un directorio de todo el sistema, no en el nivel de instrucción node_modules. Sin embargo, los paquetes globales pueden desordenar el sistema.

El comando npx lo resuelve instalando temporalmente paquetes. Use npx <name> para capturar un paquete, ejecutarlo y, a continuación, quitarlo.

Después de la instalación, el directorio del proyecto tiene el siguiente aspecto:

```bash
package.json
node_modules/
<name of dependency>/
<files included in the dependency>
src
index.js
```

### Comandos de la CLI de npm

La herramienta de línea de comandos de npm tiene bastantes comandos para ayudarle con tareas como instalar paquetes, crear paquetes e inicializar proyectos de Node.js.

Los comandos de NPM se dividen en categorías:

- **Administración de dependencias:** Comandos para instalar, actualizar y quitar paquetes.
- **Ejecución de scripts:** Comandos para administrar flujos de desarrollo, como pruebas y compilación de código.
- **Configuración del entorno:** Comandos para configurar rutas de instalación y orígenes de paquetes.
- **Creación y publicación de paquetes:** Comandos para la creación y publicación de paquetes.

Si quiere obtener una lista detallada de todos los comandos, escriba el comando siguiente en el terminal:

```bash
npm --help
```

### Verificar instalaciones

Para ver lo que hay en la carpeta package.json en cuanto a dependencias instaladas, use `npm list`.

El comando `npm list` enumera todos los paquetes del directorio node_modules que se instalaron. Ten en cuenta que cada paquete instalado instaló todas sus propias dependencias.

Dado que el comando list puede dar lugar a una larga lista, lo que dificulta su comprensión, puedes enumerar paquetes en diferentes profundidades con el comando list. En la profundidad 0, el comando muestra el mismo contenido que tiene en la sección dependencies del archivo package.json.

```bash
npm list --depth=<depth>
```

Si ha instalado el paquete `Jest`, `npm list --depth=0` producirá una salida similar a la siguiente:

```bash
├── jest@26.0.1
```

### Limpieza de dependencias

Si ya no necesita un paquete, quítelo. La eliminación de una dependencia mantiene el proyecto limpio y ahorra espacio.

Esta limpieza es especialmente importante para las aplicaciones de página única (SPA), como Angular, React o Vue como ejemplos conocidos, pero se aplica en general.

Estas aplicaciones agrupan y comprimen el código en un archivo o varios servidos al explorador.

Cuanto mayor sea el archivo, más tiempo tardará en cargarse, lo que puede crear una mala experiencia a los usuarios.

Hay dos maneras de limpiar las dependencias que ya no se necesitan:

- **Desinstalar:** para desinstalar un paquete, ejecute `npm uninstall <name of dependency>`. Este comando quita el paquete del archivo de manifiesto de `package.json` y de la carpeta `node_modules`.

- **Eliminación:** Use `npm prune` para quitar todas las dependencias no incluidas en la lista `node_modules`.

La eliminación es útil cuando desea quitar varias dependencias sin ejecutar la desinstalación de cada una o todas necesitando reinstalar de nuevo las necesarias.

---

## Ejercicio: Instalación de paquetes

El equipo de ANFORA planea desarrollar varias aplicaciones Node.js. Han encontrado Jest, un conocido marco de pruebas de configuración cero, en el registro npm. Quieren instalar Jest, escribir algunas pruebas y ejecutarlas para evaluar su eficacia.

### Adición de un paquete de prueba con la CLI de npm

Tiene algún código que extrae una dirección de una cadena. El trabajo es sencillo, siga los siguientes pasos:

- Instalar el marco de pruebas, escribir algunas pruebas y ejecutarlas.

- En una nueva ventana de terminal (Ctrl + Mayús + `), cambie a la carpeta que contiene los archivos de este ejercicio:

```bash
cd workspace/core-node/code/node-dependencies/5-exercise-dependency
```

- Ver el contenido de la carpeta:

```bash
ls -R
```

- En esta carpeta, debería ver dos archivos JavaScript:

```bash
address-parser.js
package.json
```

- Abra el archivo address-parser.js. Debería ser similar a este archivo:

```js
exports.addressParser = function parseOrder(order) {
  const match = order.match(
    /order:\s(?<order>\w+\s\w+).*address:\s(?<address>\w+\s\w+\s\w+).*payment info:\s(?<payment>\w+)/,
  );
  return match.groups;
};
```

- Esta función toma una cadena y analiza la información relativa al pedido que realiza un cliente, el lugar donde debe entregarse y el método de pago. Ahora se agregará Jest y se escribirán algunas pruebas para la función.

- Cierre el archivo address-parser.js.

- Ejecute este comando para instalar el paquete de Jest:

```bash
npm install jest --save-dev
```

- Después de instalar el paquete de Jest, abra el archivo package.json y busque la sección devDependencies. Debería ver una entrada similar a este ejemplo en la que el valor de la propiedad jest es un número de versión semántico:

```json
"devDependencies": {
"jest": "<number.number.number>"
}
```

- En el archivo package.json, busque la sección scripts. Reemplace la entrada de la acción test por el código siguiente:

```json
"test": "jest"
```

- Guarde los cambios y cierre el archivo package.json.

- En el terminal, cree una subcarpeta denominada **tests**.

```bash
mkdir __tests__
```

Nota

Asegúrese de usar caracteres de subrayado dobles al crear la carpeta **tests**. La carpeta tests es una convención de nomenclatura que usa Jest, el marco de pruebas. Jest reconoce automáticamente los archivos de una carpeta tests (o archivos con .test. o .spec. en sus nombres) como archivos de prueba y los incluye al ejecutar pruebas. Esta convención ayuda a mantener los archivos de prueba organizados y fácilmente identificables en el proyecto.

- En la carpeta **tests**, cree un archivo denominado address-parser.js y agregue el contenido siguiente al archivo:

```js
const { addressParser } = require('../address-parser');

describe('Address Parser', () => {
  test('should parse correctly', () => {
    expect(
      addressParser(
        'I want to to order: 3 books to address: 112 street city here is my payment info: cardnumber',
      ),
    ).toEqual({
      order: '3 books',
      address: '112 street city',
      payment: 'cardnumber',
    });
  });
});
```

### El script de prueba:

La tarea anterior ha sido completada genial, sigue así!

- Comprueba la capacidad de análisis de la función address-parser.js.

- Garantiza que la función puede analizar correctamente la información necesaria.

- Guarde los cambios y cierre el archivo.

La estructura del proyecto debería tener un aspecto similar al de este ejemplo:

```bash
-| package.json
-| address-parser.js
-| **tests**/
---| address-parser.js
```

Escriba este comando en el terminal para ejecutar las pruebas:

```bash
npm run test
```

Debería obtener la salida siguiente:

```bash
PASS **tests**/address-parser.js
Address parser
✓ should parse correctly (2 ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
Snapshots: 0 total
Time: 0.4 s
Ran all test suites.
```

Terminado. La prueba se ha superado y ha agregado la función de prueba mediante la instalación de una dependencia.

¡Enhorabuena! Ha instalado correctamente Jest como una dependencia, ha escrito pruebas para el código de la aplicación y ha ejecutado las pruebas. Parece que Jest está a la altura de las expectativas y que probablemente en ANFORA estarán satisfechos con el resultado de esta evaluación.

---

## Administración de actualizaciones de dependencias en el proyecto de Node.js

Como desarrollador en ANFORA, es importante mantener nuestros paquetes actualizados.

Esto ayuda a garantizar nuestro uso de las características y correcciones más recientes.

También nos ayuda a evitar vulnerabilidades de seguridad.

En esta unidad, aprenderás a administrar dependencias en un proyecto de Node.js y a actualizar paquetes, usar el control de versiones semántico y administrar incidencias de seguridad.

### Consideraciones antes de actualizar un paquete

Antes de actualizar un paquete, tenga en cuenta lo siguiente:

- **Tipo de actualización:** Comprenda si se trata de una corrección secundaria, una nueva característica o un cambio importante que podría interrumpir el código. El control de versiones semántico puede ayudar a identificar esto.
- **Configuración del proyecto:** Asegúrese de que el proyecto esté establecido para recibir solo actualizaciones deseadas con el fin de evitar cambios inesperados.
- **Seguridad:** Manténgase al tanto de las posibles vulnerabilidades. Use la característica de auditoría de npm para identificar y actualizar paquetes problemáticos.
- **Pruebas:** Asegúrese de pasar las pruebas después de la actualización. Si no tiene pruebas, considere la posibilidad de agregarlas. La aplicación puede comportarse de forma diferente después de una actualización y las pruebas validan el comportamiento correcto.

### Control de versiones semántico para definir el comportamiento de actualización

El control de versiones semántico es un estándar clave en el desarrollo de software.

Es fundamental tanto para la publicación como para el uso de paquetes de npm Ayuda a administrar los riesgos de actualización indicando el tipo de cambios en una nueva versión.

Un número de versión tiene secciones específicas para reflejar estos cambios:

| Tipo de versión  | Posición | Sintaxis      | Qué sucede                                                                                                                                                   | Enfoque de actualización                                                                                                     |
| ---------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Major            | 1º       | `x.0.0` o `*` | Los cambios de 1.0.0 a 2.0.0 indican cambios importantes. Pueden ser necesarios ajustes de código.                                                           | Comodidad con actualizaciones inmediatas a la versión principal más reciente y reconocimiento de posibles cambios de código. |
| Minor            | 2º       | `1.x.0` o `^` | Los cambios de 1.2.9 a 1.3.0 presentan nuevas características. El código existente debería seguir funcionando. Normalmente, las actualizaciones son seguras. | Aceptación de nuevas características, pero sin cambios importantes.                                                          |
| Revisión (Patch) | 3º       | `1.1.x` o `~` | Los cambios de 1.0.7 a 1.0.8 significan correcciones de errores. Las actualizaciones deberían ser seguras.                                                   | Aceptación de correcciones de errores.                                                                                       |

En el caso de los proyectos de Node.js pequeños, puede actualizar libremente a las versiones más recientes.

En el caso de los proyectos más grandes, sin embargo, las actualizaciones requieren una minuciosa reflexión y no siempre son automáticas.

Por lo general, la actualización de dependencias más pequeñas, con menos dependencias propias, facilita el proceso.

Antes de actualizar una o más dependencias, debe configurar el archivo package.json para obtener un comportamiento predecible al ejecutar el comando `npm update <name of dependency>`.

Node.js usa un conjunto de símbolos que le permiten definir cómo quiere que se actualicen los paquetes.

### Actualización de un paquete con la CLI de npm

Puede instalar un paquete mediante el comando install o update en npm. Ahora estos comandos son principalmente intercambiables. Para actualizar un paquete, normalmente se usa:

Versión más reciente: npm update <package name>@latest.
Versión específica: npm update <package name>@<optional version number>.

El proceso de actualización depende de dos factores:

- **Argumento de versión:** Si se especifica un número de versión en el comando npm update, npm captura e instala esa versión específica.

- **Entrada del archivo de manifiesto:** El archivo package.json contiene reglas para actualizar las dependencias. Por ejemplo, "dependencyName": "1.1.x" significa que npm capturará la versión que coincida con este patrón.

### Descripción del control de versiones

Tres archivos se complementan en el control de versiones de las dependencias:

- **package.json:**

Este archivo define la versión del paquete que desea usar.

Es el archivo de manifiesto del proyecto. Contiene los metadatos del proyecto, incluidas las dependencias.

- **package-lock.json:** Este archivo describe el árbol exacto que se generó, de modo que las instalaciones posteriores pueden generar árboles idénticos, independientemente de las actualizaciones de dependencias intermedias.

Este archivo está pensado para enviarse a repositorios de origen.

- **shrinkwrap.json:** El comando de la CLI npm shrinkwrap crea este archivo y es similar a package-lock.json.

La principal diferencia entre los comandos es que los usuarios no pueden invalidar las versiones del paquete especificadas en npm-shrinkwrap.json.

Además, el archivo npm-shrinkwrap.json es compatible con versiones anteriores de npm (versiones 2-4), mientras que package-lock.json es compatible con npm versión 5 y posteriores.

Por lo tanto, puede encontrar npm-shrinkwrap.json al mantener los código base heredados. La mayoría de los desarrolladores usarán package-lock.json en lugar de npm-shrinkwrap.json.

Una excepción en la que se prefiere npm-shrinkwrap.json es para las instalaciones globales de demonios y herramientas de línea de comandos en las que los desarrolladores desean asegurarse de que se instalan las versiones exactas de los paquetes especificados.

### Ejemplo de determinación de la versión del paquete

Imagine que usa la versión 1.2 en el código y, luego, se publica la versión 1.4 y se interrumpe el código por un bug en la nueva versión.

Si alguien instala la aplicación en este momento, obtendrá una aplicación que no funciona.

Sin embargo, si hay un archivo package-lock.json que especifica la versión 1.2, esa versión se instalará.

Este es un ejemplo de cómo determinar la versión instalada de un paquete:

Si los archivos package.json y package-lock.json coinciden en la versión, no hay ningún conflicto.

Por ejemplo, si package.json especifica 1.x y package-lock.json especifica la versión 1.4, se instalará la versión 1.4.

Si package.json especifica una versión más específica, como 1.8.x, invalida el archivo package-lock.json, que indica la versión anterior de 1.4.

En este caso, se instalará la versión 1.8.0 o una versión de revisión posterior, si existe.

### Búsqueda y actualización de paquetes obsoletos con npm obsoleto

El comando npm outdated se usa para identificar los paquetes con versiones más recientes disponibles.

Cuando se ejecuta, proporciona una lista de estos paquetes obsoletos(add-example-review):

```bash
Package       Current    Wanted   Latest     Location     Depended by
lodash        1.0.0      1.0.0    4.17.19    lock-test    main-code-file
node-fetch    1.2.0      1.2.0    2.6.0      lock-test    function-code-file
```

Las columnas de la salida incluyen lo siguiente:

| Columna          | Descripción                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paquete**      | El paquete obsoleto.                                                                                                                                                                                                                                                 |
| **Actuales**     | La versión instalada actual del paquete.                                                                                                                                                                                                                             |
| **Deseado**      | La versión más reciente que coincide con el patrón semántico especificado en el archivo `package.json`.                                                                                                                                                              |
| **Más reciente** | La versión más reciente del paquete disponible en el registro.                                                                                                                                                                                                       |
| **Ubicación**    | La ubicación de la dependencia del paquete. El comando `npm outdated` rastrea todos los paquetes instalados en las diversas carpetas `node_modules`. Muestra la ruta relativa desde el directorio actual hasta el directorio `node_modules` donde reside el paquete. |
| **Dependiente**  | El paquete que tiene la dependencia del paquete obsoleto. Indica qué paquete de tu proyecto está utilizando la versión obsoleta.                                                                                                                                     |

**Acerca de `npm audit`:**

Después de ejecutar `npm install` o `npm update`, npm realiza automáticamente una auditoría de seguridad (`npm audit`). El registro mostrará:

- La versión del paquete instalado.
- Una lista de vulnerabilidades encontradas, categorizadas por nivel de severidad (crítica, alta, moderada, baja).

Es **crucial** abordar las vulnerabilidades críticas y altas actualizando los paquetes afectados. Puedes usar `npm audit fix` para intentar aplicar correcciones automáticamente. Sin embargo, a veces se requiere una actualización manual.

Un ejemplo de respuesta de registro es:

```bash
- lodash@1.3.1
  added 1 package from 4 contributors and audited 1 package in 0.949s
  found 3 vulnerabilities (1 low, 2 high)
  run `npm audit fix` to fix them, or `npm audit` for summary
```

Para corregir un problema y aplicar una actualización, puede ejecutar el comando `npm audit`. Este comando enumera cada vulnerabilidad.

El comando `npm audit fix` intenta resolver las vulnerabilidades mediante la actualización a una versión secundaria en la que el problema no existe. Sin embargo, es posible que no esté disponible si la corrección se encuentra realmente en la siguiente versión principal.

En tales casos, tal vez tenga que usar `npm audit fix --force`, que puede introducir cambios importantes mediante la actualización a la versión principal. La ejecución de este comando es una decisión que no debería tomar a la ligera. Debe tener en cuenta los cambios importantes y usar npm update para actualizar el código, incluidas las vulnerabilidades.

Una vulnerabilidad es un error de código que los atacantes pueden aprovechar para realizar acciones malintencionadas, lo que puede poner en riesgo los datos y sistemas. Es fundamental abordar estas vulnerabilidades rápidamente.

Dada la frecuente detección de vulnerabilidades, GitHub tiene una característica que examina los repositorios y crea solicitudes de cambios de forma automática en las que se sugieren actualizaciones a versiones más seguras.

Ejecutar `npm audit` con regularidad es un procedimiento recomendado para identificar y corregir vulnerabilidades, lo que contribuye a la seguridad general del proyecto.

### Flujo de trabajo de actualización recomendado

El flujo de trabajo recomendado para las actualizaciones es:

- **npm run test:** compruebe que las pruebas existentes se pasan antes de iniciar este proceso de actualización.
- **npm audit: ** para comprobar si hay vulnerabilidades en la versión actual que usa. En la información de npm audit es posible que se recomiende la actualización a una versión principal. Debe revisar cuidadosamente los cambios importantes si se enumeran.
- **npm outdated: ** para enumerar todos los paquetes obsoletos. Este comando proporciona información en las columnas Deseado, Último y Ubicación.

### Actualice con npm update:

- Para proyectos más pequeños (algunas dependencias en package.json: puede probar npm update para actualizar todas las dependencias y, a continuación, ejecutar las pruebas.

- Para proyectos más grandes (con muchas dependencias en package.json: actualice un único paquete o una familia de paquetes (como Next.js y React) y, a continuación, ejecute las pruebas.

- npm audit: compruebe que no hay vulnerabilidades críticas o de nivel alto. Si todavía hay vulnerabilidades, use npm update con el nombre del paquete y la versión principal recomendada en npm audit.

- Ejecute npm run test otra vez.

---

## Ejercicio: Administración de actualizaciones de dependencias en el proyecto de Node.js

ANFORA le ha asignado la tarea de trabajar en una aplicación que tiene algunas dependencias no actualizadas. La aplicación es pequeña y solo tiene algunas dependencias. La actualización del código debería ser sencilla. Vea si puede actualizar la aplicación para aprovechar las características más recientes. Durante el proceso, si encuentra alguna vulnerabilidad, corríjala.

- En una nueva ventana de terminal (Ctrl + Mayús + `), cambie a la carpeta que contiene los archivos de este ejercicio:

```bash
cd ../7-exercise-dependency-management
```

- Ejecute este comando para instalar las dependencias:

```bash
npm install
```

Debería ver la salida sobre los paquetes instalados y las vulnerabilidades.

- Abra el archivo package.json y busque la sección dependencies:

```json
"lodash": "^1.1.0",
"node-fetch": "^1.0.2"
```

- Observe que los patrones especifican el carácter de inserción (^), que indica las actualizaciones de la versión secundaria para admitir dependencias: 1.x.

- Abra el archivo index.js para comprender cómo se usan las dependencias del paquete en la aplicación:

```js
const fetch = require('node-fetch')
const \_ = require('lodash');
const path = require('path');
const fs = require('fs');

async function run() {
const response = await fetch("https://dev.to/api/articles?state=rising");
const json = await response.json();
const sorted = _.sortBy(json, ["public_reactions_count"], ['desc']);
const top3 = _.take(sorted, 3);

const filePrefix = new Date().toISOString().split('T')[0];
fs.writeFileSync(path.join(\_\_dirname, `${filePrefix}-feed.json`), JSON.stringify(top3, null, 2));
}

run();
```

Este código extrae datos de una API de REST mediante el paquete node-fetch. Procesa la respuesta ordenándola y toma los tres resultados principales mediante el paquete lodash. El resultado se almacena en un archivo.

```bash
npm audit
```

Debería mostrarse una salida similar a esta de ejemplo:

```bash
# npm audit report

lodash <=4.17.20
Severity: critical
Regular Expression Denial of Service (ReDoS) in lodash - https://github.com/advisories/GHSA-x5rq-j2xg-h7qm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-fvqr-27wr-82fm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-jf85-cpcp-j695
Command Injection in lodash - https://github.com/advisories/GHSA-35jh-r3h4-6jhm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-4xc9-xhrj-v574
Regular Expression Denial of Service (ReDoS) in lodash - https://github.com/advisories/GHSA-29mw-wpgm-hmr9
fix available via `npm audit fix --force`
Will install lodash@4.17.21, which is a breaking change
node_modules/lodash

node-fetch <=2.6.6
Severity: high
The `size` option isn't honored after following a redirect in node-fetch - https://github.com/advisories/GHSA-w7rc-rwvf-8q5r
node-fetch forwards secure headers to untrusted sites - https://github.com/advisories/GHSA-r683-j2x4-v87g
fix available via `npm audit fix --force`
Will install node-fetch@3.3.2, which is a breaking change
node_modules/node-fetch

2 vulnerabilities (1 high, 1 critical)

To address all issues (including breaking changes), run:
npm audit fix --force
```

La salida indica las vulnerabilidades y la versión del paquete que corrige el problema.

```bash
Will install lodash@4.17.21, which is a breaking change
Will install node-fetch@3.3.2, which is a breaking change
```

En el terminal, ejecute `npm outdated
` para comprobar si hay dependencias obsoletas:

```bash
npm outdated
```

Debería mostrarse una salida similar a esta de ejemplo:

```bash
Package Current Wanted Latest Location Depended by
lodash 1.3.1 1.3.1 4.17.21 node_modules/lodash 7-exercise-dependency-management
node-fetch 1.7.3 1.7.3 3.3.2 node_modules/node-fetch 7-exercise-dependency-management
```

Las versiones actuales y deseadas son las mismas, pero la versión más reciente es diferente. Se ha cumplido la estrategia de actualización semántica especificada en el package.json, pero las vulnerabilidades siguen existiendo.

Edite el archivo package.json para permitir explícitamente cambios importantes para corregir las vulnerabilidades a partir del paquete más significativo:

```json
"node-fetch": "^2.6.6"
```

Ejecute este comando para ver lo que haría la actualización:

```bash
npm update --dry-run
```

```bash
added 3 packages, removed 4 packages, and changed 1 package in 508ms
```

Ejecute este comando para actualizar el proyecto en función de package.json:

```bash
npm update
```

Ejecute este comando para ver si se ha corregido la vulnerabilidad de node-fetch:

```bash
npm audit
# npm audit report

lodash <=4.17.20
Severity: critical
Regular Expression Denial of Service (ReDoS) in lodash - https://github.com/advisories/GHSA-x5rq-j2xg-h7qm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-fvqr-27wr-82fm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-jf85-cpcp-j695
Command Injection in lodash - https://github.com/advisories/GHSA-35jh-r3h4-6jhm
Prototype Pollution in lodash - https://github.com/advisories/GHSA-4xc9-xhrj-v574
Regular Expression Denial of Service (ReDoS) in lodash - https://github.com/advisories/GHSA-29mw-wpgm-hmr9
fix available via `npm audit fix --force`
Will install lodash@4.17.21, which is a breaking change
node_modules/lodash

1 critical severity vulnerability

To address all issues (including breaking changes), run:
npm audit fix --force
```

Si su proyecto tiene alguna prueba, ejecútela para verificar que la actualización no ha dañado nada.

Siga estos mismos pasos para actualizar lo-dash a la versión 4.17.20 sin vulnerabilidades.

Las vulnerabilidades se han corregido, pero la versión node-fetch sigue siendo una versión principal. Si se superan todas las pruebas, corrija la versión especificada en el archivo package.json a la versión más reciente:

```json
"node-fetch": "^3.3.2"
```

A continuación, ejecute el siguiente comando para actualizar el proyecto:

```bash
npm update
```

Ahora su proyecto no debería tener vulnerabilidades npm y debería estar en la versión principal actual.Felicidades. Ha actualizado las dependencias y ha corregido las vulnerabilidades del proyecto.

## Prueba de conocimientos

Elija la mejor respuesta para cada pregunta y, después, seleccione Comprobar las respuestas.

Comprobación de conocimientos

1. ¿Cómo se instala un marco de pruebas como Jest?

- [ ] Ejecute npm install jest:

- [ ] Ejecute npm install jest --save-dev:

- [ ] Mediante la ejecución de npm install jest --save.

- [ ] Mediante la ejecución de npm download jest --save-dev.

2. ¿Cuál es la razón principal para usar npx?

- [ ] La dependencia se descarga directamente en el proceso de Node.js y se quita después de que se ejecute el comando. Esta herramienta resulta útil cuando se quieren ejecutar comandos con poca frecuencia.

- [ ] La instalación de dependencias mediante npx es más segura que la instalación global de estas.

- [ ] La instalación de dependencias mediante npx es más rápida que la instalación global de estas.

- [ ] No es necesario usar sudo antes de ejecutarlo, como en el caso de una instalación global.

3. ¿Cómo se configura un archivo package.json para que solo obtenga actualizaciones de revisión (corrección de errores)?

- [ ]Busque la entrada en dependencies o devDependencies. Establezca la entrada para que se parezca a esta: "<library>": "\*"

- [ ]Busque la entrada en dependencies o devDependencies. Establezca la entrada para que se parezca a esta: "<library>": "1.x.0"

- [ ]Busque la entrada en dependencies o devDependencies. Establezca la entrada para que se parezca a esta: "<library>": "1.0.x"

- [ ]Busque la entrada en dependencies o devDependencies. Establezca la entrada para que se parezca a esta: "<library>": "^1.0.x"

4. ¿Cuáles son algunos de los scripts que se recomienda configurar en un archivo package.json al principio de un proyecto?

- [ ]start, test y build

- [ ]start y test

- [ ]start

- [ ]start, test, lint, build

---

## Resumen

En primer lugar, has aprendido a instalar dependencias que la aplicación puede usar.

El uso de dependencias en la aplicación permite crear la aplicación más rápido porque el código ya está escrito.

Además, es una buena idea confiar en paquetes probados en lugar de escribir algo usted mismo. El uso de estos paquetes es una buena idea especialmente cuando se agrega autenticación y autorización a la aplicación.

Después, se han presentado varias formas de instalar una dependencia: de manera local, global y a través de la herramienta npm. Normalmente, instalará las dependencias localmente.

Después, ha aprendido a actualizar las dependencias. Las dependencias se actualizan por varias razones en forma de correcciones de errores, características nuevas o cambios más grandes. En el archivo package.json, puede configurar los tipos de actualizaciones que le interesan por cada dependencia. Si trabaja en un entorno empresarial, se recomienda considerar cuidadosamente el enfoque en relación con los tipos de actualizaciones que acepta.

Para finalizar, en la última unidad del módulo, ha obtenido más información sobre el archivo package.json. Ha visto varios campos, en concreto los de metadatos que describen una aplicación. También se han descrito los scripts que puede crear para administrar el proyecto de Node.js durante la fase de desarrollo.

> Capítulo 3: El Poder de la Organización

NX y los monorepos le abrieron los ojos a Javier. Su proyecto `u.top.ia` ya no es un amasijo de código, sino una obra de arte arquitectónica digital (o eso cree él).

Ahora sueña con integrar domótica, control financiero y hasta un tutor de programación IA. "Si consigo esto, ¡me nombro emperador de `u.top.ia`!" exclama mientras se frota los ojos después de haber reordenado todo su código con el proyecto Crystal de NX, mientras ignora la extraña sensación de ser observado por una bandada de palomas sospechosamente sincronizadas.
