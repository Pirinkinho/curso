
const fs = require('fs').promises;
const path = require('path');

async function createDirectory() {
  try {
    await fs.mkdir(path.join(__dirname, 'stores', '201', 'newDir'));
    console.log('Directorio creado con éxito');
  } catch (err) {
    console.error('Error al crear el directorio:', err.message);
  }
}

createDirectory();



