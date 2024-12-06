

const fs = require('fs').promises;

async function findSalesFiles(folderName) {

  // (1) Agregue una matriz al inicio que contenga las rutas de acceso a todos los archivos de ventas que encuentre el programa.
  let results = [];

  // (2) Lea currentFolder con el método readdir.
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Agregue un bloque para recorrer en bucle cada elemento devuelto desde el método readdir mediante el bucle asincrónico for...of.
  for (const item of items) {

    // (4) Agregue una instrucción if para saber si el elemento es un archivo o un directorio.    
    if (item.isDirectory()) {

      // (5) Si el elemento es un directorio, llame recursivamente a la función findSalesFiles de nuevo, pasando la ruta de acceso al elemento.
      const resultsReturned = await findSalesFiles(
        `${folderName}/${item.name}`,
      );
      results = results.concat(resultsReturned);
    } else {

      // (6) Si no lo es, agregue una comprobación para asegurarse de que el nombre del elemento coincide con sales.json.
      if (item.name === 'sales.json') {
        results.push(`${folderName}/${item.name}`);
      }
    }
  }

  return results;
}

async function main() {
  const results = await findSalesFiles('stores');
  console.log(results);
}

main();

// El resultado tendrá una apariencia similar a la siguiente:

// [
//   'stores/201/sales.json',
//   'stores/202/sales.json',
//   'stores/203/sales.json',
//   'stores/204/sales.json',
//   ]
