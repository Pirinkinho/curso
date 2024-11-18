
# -1. Id a la terminal y teclead `npm` para comprobar que teneis la herramienta instalada:

```bash
curso@koldo:~/workspace/curso$ npm
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

    access, adduser, audit, bugs, cache, ci, completion,
    config, dedupe, deprecate, diff, dist-tag, docs, doctor,
    edit, exec, explain, explore, find-dupes, fund, get, help,
    hook, init, install, install-ci-test, install-test, link,
    ll, login, logout, ls, org, outdated, owner, pack, ping,
    pkg, prefix, profile, prune, publish, query, rebuild, repo,
    restart, root, run-script, search, set, shrinkwrap, star,
    stars, start, stop, team, test, token, uninstall, unpublish,
    unstar, update, version, view, whoami

Specify configs in the ini-formatted file:
    /home/curso/.npmrc
or on the command line via: npm <command> --key=value

More configuration info: npm help config
Configuration fields: npm help 7 config

npm@9.2.0 /usr/share/nodejs/npm
curso@koldo:~/workspace/curso$ 

```
# -2. Crear un `package.json` es tan sencillo como ejecutar el comando `npm init`.

Hay dos maneras principales de hacerlo:

- `npm init`: Este comando es como una guía fácil, lo que le lleva a través de un proceso paso a paso que solicita detalles sobre el proyecto, como su nombre, versión y descripción.

- `npm init -y`: Este comando es la versión rápida de entrenamiento de npm init. Repasa las preguntas y rellena los valores predeterminados por usted.

```json
curso@video11:~/workspace/curso/core-node/clases/3-Dependencias_de_un_proyecto_Node$ npm init -y
Wrote to /home/curso/workspace/curso/core-node/clases/3-Dependencias_de_un_proyecto_Node/package.json:

{
  "name": "3-dependencias_de_un_proyecto_node",
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

