//  Se carga el módulo de Express
const express = require('express');
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

// Defino la ruta que se llamará cuando se 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} (http://localhost:${port})`)
})