
// Importamos el módulo express
const express = require('express');

// Creamos una instancia de Express
const app = express();

// Definimos un puerto para la aplicación
const port = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Mi aplicación está corriendo. En serio.');
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
