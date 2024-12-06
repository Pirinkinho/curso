

const fs = require('fs').promises;

async function findFiles(folderName) {
  let results = [];

  results.push(`${folderName}`);

  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      // RECURSION - calling the function from within itself
      const resultsReturned = await findFiles(`${folderName}/${item.name}`);
      results = results.concat(resultsReturned);
    } else {
      results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

findFiles('stores').then((results) => console.log(results));

// El resultado tendrá una apariencia similar a la siguiente:

// [
// 'stores',
// 'stores/201',
// 'stores/201/sales.json',
// 'stores/202',
// 'stores/202/sales.json',
// 'stores/203',
// 'stores/203/sales.json',
// 'stores/204',
// 'stores/204/sales.json'
// ]
