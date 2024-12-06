
const fs = require('fs').promises;
const path = require('path');

async function createDirectory() {
  const dirPath = path.join(__dirname, 'stores', '201', 'newDir');

  try {
    // Verifica si el directorio ya existe
    await fs.access(dirPath);
    console.log('El directorio ya existe.');
  } catch {
    // Si no existe, lo crea
    try {
      await fs.mkdir(dirPath, { recursive: true });
      console.log('Directorio creado con éxito.');
    } catch (err) {
      console.error('Error al crear el directorio:', err.message);
    }
  }
}

createDirectory();

