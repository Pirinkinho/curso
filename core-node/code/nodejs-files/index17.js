
const fs = require('fs').promises;
const path = require('path');

async function processFile() {
  const filePath = 'stores/201/sales.json';

  try {
    // Verifica si el archivo existe antes de intentar leerlo
    await fs.access(filePath);
    
    // Lee el archivo como string, especificando que se use UTF-8 para la codificación
    const fileContents = await fs.readFile(filePath, { encoding: 'utf8' });

    // Convierte el string JSON en un objeto
    const data = JSON.parse(fileContents);

    // Asegúrate de que 'data.total' existe antes de continuar
    if (data.total !== undefined) {
      // Crea la ruta para el archivo 'totals.txt'
      const totalsPath = path.join('salesTotals', 'totals.txt');

      // Escribe el total en el archivo totals.txt, agregándolo al final
      await fs.writeFile(totalsPath, `${data.total}\r\n`, { flag: 'a' });
      console.log(`Total escrito en ${totalsPath}`);
    } else {
      console.log('No "total" property found in the file');
    }
  } catch (err) {
    console.error('Error reading or writing file:', err.message);
  }
}

processFile();

