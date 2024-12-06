
const fs = require('fs').promises;
const path = require('path');

async function createDirectory() {
  const pathToCreate = path.join(__dirname, 'stores', '201', 'newDirectory');

  try {
    // Verifica si el directorio ya existe
    await fs.access(pathToCreate);
    console.log(`${pathToCreate} ya existe.`);
  } catch {
    // Si no existe, intenta crearlo
    try {
      await fs.mkdir(pathToCreate, { recursive: true });
      console.log(`${pathToCreate} creado con éxito.`);
    } catch (err) {
      console.error(`Error al crear ${pathToCreate}: ${err.message}`);
    }
  }
}

createDirectory();

