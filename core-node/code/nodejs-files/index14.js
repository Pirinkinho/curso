
const fs = require('fs').promises;
const path = require('path');

async function createFile() {
  const pathToFile = path.join(__dirname, 'greeting.txt');
  
  try {
    await fs.writeFile(pathToFile, String());
    console.log(`Archivo creado en: ${pathToFile}`);
  } catch (err) {
    console.error('Error al escribir el archivo:', err.message);
  }
}

createFile();

