
const path = require('path');
const fs = require('fs').promises;

async function findSalesFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }); // Lee el contenido del directorio
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Si es un subdirectorio, busca de forma recursiva
      files.push(...await findSalesFiles(fullPath));
    } else if (path.extname(entry.name) === '.json') {
      // Si es un archivo JSON, agrégalo a la lista
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');

  try {
    const salesFiles = await findSalesFiles(salesDir);
    console.log('Archivos encontrados:', salesFiles);
  } catch (err) {
    console.error('Error al buscar archivos:', err.message);
  }
}

main();


// La salida es:

// node index7.js
// Archivos encontrados: [
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/201/totals.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/202/sales.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/203/sales.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/204/sales.json'
// ]


