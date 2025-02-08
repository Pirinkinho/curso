//  Se carga el módulo de Express
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
// Creo la aplicación Express
const app = express();
// Declaro el puerto de escucha
const port = 3000;

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.get('/user/:name', (req, res) => {
  res.render('user', { name: req.params.name })
})

// Nuevo endpoint para el estudiante
app.get('/student/:id', (req, res) => {
  res.render('student', {
    id: req.params.id,
    title: "Student",  // Aquí pasas el valor de "Student" al título
    year: new Date().getFullYear() // Pasamos el año al footer
  });
});


// Creo el servidor en el puerto ${port}
app.listen(port, () => {
  // Se escribe la URL para el acceso al servidor
  console.log(`\nExample server listening on http://localhost:${port}`);
  console.log(`\nEscribe: http://localhost:${port}/user/Juan    para que funcione,\n   ... o el nombre que quieras.`);
  console.log(`\nEscribe:  npx nodemon servidor_con_express_y_mustache.js
    para que funcione con mustache.\nCada vez que hagas un cambio en cualquier archivo, se reinicia automáticamente.`);
});