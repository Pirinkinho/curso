

// Ejemplo de Ruta (Convertidor de Unidades)
// Crea un archivo en routes/unidad.js:

const express = require('express');
const router = express.Router();
const math = require('mathjs');

// Página principal de la utilidad
router.get('/', (req, res) => {
  res.render('unidad', { result: null });
});

// Procesar la conversión
router.post('/', (req, res) => {
  const { value, fromUnit, toUnit } = req.body;
  try {
    const result = math.unit(value, fromUnit).toNumber(toUnit);
    res.render('unidad', { result });
  } catch (err) {
    res.render('unidad', { result: 'Error en la conversión' });
  }
});

module.exports = router;
