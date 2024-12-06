
const path = require('path');

console.log(__dirname);

const currentPath = path.join('stores', '201');
console.log(currentPath); // stores/201

const fullPath = path.join(__dirname, 'stores', '201');
console.log(fullPath); // ... /nodejs-files/stores/201

console.log(path.extname('sales.json'));
