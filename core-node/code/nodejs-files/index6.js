
const path = require('path');
const fs = require('fs').promises;

async function findSalesFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findSalesFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');

  try {
    const salesFiles = await findSalesFiles(salesDir);
    console.log(salesFiles);
  } catch (err) {
    console.error('Error al buscar archivos:', err.message);
  }
}

main();

// La salida es:

// curso@koldo:~/workspace/curso/core-node/code/nodejs-files$ node index6.js

// [
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/201/totals.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/202/sales.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/203/sales.json',
//   '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/204/sales.json'
// ]

