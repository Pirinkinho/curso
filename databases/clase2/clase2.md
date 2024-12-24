
## Lenguaje SQL
 SQL (Structured Query Language) es el lenguaje de programción que permite realizar operaciones con las bases de datos. 
 SQL permite hacer las siguientes acciones: 
 - Asignar permisos en tablas, procedimientos y vistas
 - Crear vistas
 - Crear nuevas tablas
 - Crear procedimientos 
 - Ejecutar consultas
 - Insertar, actualizar y borrar registros
 - Crear base de datos

 Está compuesto por:

 __Comandos DDL__ (Data Definition Language), crear y definir nuevas base de datos, campos e índices.

| Comando | Descripción |
|---------|-------------|
| CREATE | Crear nuevas tablas, campos, índices, base de datos |
| DROP | Eliminar tablas, índices, base de datos |
| ALTER | Modificar tablas, índices |


__Comandos DML__ (Data Manipulation Language), generar consultas.

| Comando | Descripción |
|---------|-------------|
| SELECT  | Consultar registros de las tablas  |
| INSERT  | Insertar registros de las tablas  |
| UPDATE  | Actualizar registros de las tablas  |
| DELETE  | Borrar registros de las tablas  |


__Claúsulas__, condiciones que se quiere cumplir en la búsqueda de los datos.

| Comando | Descripción |
|---------|-------------|
| FROM  | Para indicar la tabla de la que se quiere consultar los registros |
| WHERE | Para indicar condiciones que deben cumplir los registros que se quieren seleccionar |
| GROUP BY | Para separar los registros seleccionados en grupos |
| ORDER BY | Para ordenar los registros selecciones en un orden específico |


__Operadores__, lógicos y de comparación

| Comando | Descripción |
|---------|-------------|
| AND | Evalúa dos condiciones y ambas se deben cumplir |
| OR | Evalúa dos condiciones y se debe cumplir al menos una |
| < | Menor que |
| > | Mayor que |
| <> | Distinto de |
| <= | Menor o igual que |
| >= | Mayor o igual que |
| = | Igual que |
| BETWEEN | Entre intervalo de valores |
| LIKE | Comparación de modelos |
| IN | Registros incluidos en una tabla |


__Funciones de agregado__, se utiliza en las consultas SELECT en grupos de registros para devolver un único valor.

| Función | Descripción |
|---------|-------------|
| AVG | Devuelve la media de los valores de un campo determinado |
| COUNT | Devuelve el número de registros de la consulta |
| SUM | Suma todos los valores de un campo determinado |
| MAX | Devuelve el valor más alto de un campo determinado |
| MIN | Devuelve el valor más bajo de un campo determinado |



## Para practicar

- https://www.w3schools.com/sql/default.asp
- https://launchschool.com/books/sql/read/add_data
