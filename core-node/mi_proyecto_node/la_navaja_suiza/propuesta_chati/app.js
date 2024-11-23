
// Configuración del Servidor
// Crea un archivo app.js como punto de entrada principal:

'use strict';
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales (menú y submenús)
app.get('/', (req, res) => {
  res.render('index'); // Página principal del menú
});

// Cargar rutas de utilidades
app.use('/unidad', require('./routes/unidad'));
app.use('/personalidad', require('./routes/personalidad'));
app.use('/prestamos', require('./routes/prestamos'));
app.use('/archivos', require('./routes/archivos'));
app.use('/clima', require('./routes/clima'));
app.use('/monedas', require('./routes/monedas'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

