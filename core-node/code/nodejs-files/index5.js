
const path = require('path');

const currentPath = path.parse('stores/201/sales.json');
console.log(currentPath);

const fullPath = path.join(__dirname, 'stores', '201', '/sales.json');
console.log(path.parse(fullPath));

// La salida es:
// {
//     root: '',
//     dir: 'stores/201',
//     base: 'sales.json',
//     ext: '.json',
//     name: 'sales'
//   }
//   {
//     root: '/',
//     dir: '/home/curso/workspace/curso/core-node/code/nodejs-files/stores/201',
//     base: 'sales.json',
//     ext: '.json',
//     name: 'sales'
//   }
  
