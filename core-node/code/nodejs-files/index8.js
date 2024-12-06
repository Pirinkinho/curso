
const fs = require('fs').promises;
const path = require('path');

async function findSalesFiles(folderName) {
  // (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
  let results = [];

  // (2) Read the currentFolder with the `readdir` method.
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Add a block to loop over each item returned from the `readdir` method using the asynchronous `for...of` loop.
  for (const item of items) {
    // (4) Add an `if` statement to determine if the item is a file or a directory.
    if (item.isDirectory()) {
      // (5) If the item is a directory,  recursively call the function `findSalesFiles` again, passing in the path to the item.
      const resultsReturned = await findSalesFiles(
        path.join(folderName, item.name),
      );
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (path.extname(item.name) === '.json')
        results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

async function main() {
  const salesDir = path.join(__dirname, 'stores');

  // find paths to all the sales files
  const salesFiles = await findSalesFiles(salesDir);
  console.log(salesFiles);
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


