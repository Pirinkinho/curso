
const fs = require('fs').promises;
const path = require('path');

async function findSalesFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subDirFiles = await findSalesFiles(fullPath);
      files.push(...subDirFiles);
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');
  const salesTotalsDir = path.join(__dirname, 'salesTotals');

  try {
    // (1) Crear el directorio salesTotals si no existe
    await fs.mkdir(salesTotalsDir, { recursive: true });
    console.log(`${salesTotalsDir} creado o ya existía.`);
  } catch (err) {
    console.error(`Error al crear ${salesTotalsDir}: ${err.message}`);
    return;
  }

  try {
    // (2) Buscar archivos de ventas
    const salesFiles = await findSalesFiles(salesDir);

    // (3) Calcular el total de ventas
    let totalSales = 0;
    for (const file of salesFiles) {
      const data = JSON.parse(await fs.readFile(file, 'utf8'));
      totalSales += data.total || 0;
    }

    // (4) Escribir el total en un archivo
    const totalPath = path.join(salesTotalsDir, 'totals.txt');
    await fs.writeFile(totalPath, `Total de ventas: ${totalSales}\n`);
    console.log(`Total de ventas escrito en: ${totalPath}`);
  } catch (err) {
    console.error('Error al procesar archivos de ventas:', err.message);
  }
}

main();

