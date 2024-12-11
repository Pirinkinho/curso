
<!--

* Curso: Albañiles digitales.

* Nombre del proyecto: "La navaja suíza".

* Autor: Koldo Sanmartín.

* Fecha creación: Martes 10/12/2024.

* Descripción:

   Proyecto final par core-node.

-->

# Proyecto.

## Información.

### Jerarquía de directorios utilizada (sin subdirectorios de node-modules):

.
└── La_navaja_suiza
    ├── node-modules
    │   └── ...
    ├── package.json
    ├── package-lock.json
    ├── public
    │   ├── 404.html
    │   └── index.html
    ├── README.MD
    ├── routes
    │   ├── calculadora
    │   │   └── calculadora.html
    │   ├── currency
    │   │   └── cambio.html
    │   ├── epoch
    │   │   └── epoch_unix.html
    │   ├── fibonacci
    │   │   └── fibonacci.html
    │   ├── index.js
    │   ├── primes
    │   │   └── primos.html
    │   └── weather
    │       └── weather.html
    └── server.js

11 directories, 13 archivos.

### Archivos asociados al proyecto:

- Los que se ven en la jerarquía de directorios.
(Todos ellos encriptados en koldo_sanmartin_core_node.zip)

### Para ejecutar proyecto con node, en una terminal dentro del directirio la_navaja_suiza, escribe:

```bash
node server.js
```

- eso levantará el servidor:

```bash
Servidor corriendo en http://localhost:3000
```

finalmente te vas a : <http://localhost:3000> y allí se desarrolla el proyecto.

## Descripción:

Este proyecto intenta ser un grupo de 6 utilidades para el día a día, de ahí el nombre de "la navaja suíza", una especie de "6 en 1".

Cuentes con 5 utilidades:

- Calculadora: básica con los cálculos más usuales y cálculo de descuentos.

- Cambio de Monedas: con 151 divisas que te permite ver el último cambio actualizado de todas ellas.

- Epoch Unix: permite hacer cambios de medidas detiempo para ordenadores, en formato milisegundos y formato humano.

- Sucesión de Fibonacci: ingresas el número máximo que quieras y te lo calcula.

- Números Primos: ingresas el número máximo que quieras y te lo calcula.

  - (huevo de pascua: todas las cifras tienen colores de fondo, 4 distintos, excepto 2 cifras. Siguen un patrón, haber si adivinas el por qué del patrón)

- El Tiempo: de tu ubicación o cualquier ciudad del mundo que le pongas (y exista en la API).
