const express = require('express');
const path = require('path');
const router = express.Router();

// Sirve los archivos estáticos desde la carpeta 'public'
router.use(express.static(path.join(__dirname, '../public')));

// Ruta para la página principal
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;