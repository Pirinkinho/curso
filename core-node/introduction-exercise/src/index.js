// src/index.js
const { add, subtract } = require('./calculator');

try {
  if (window) alert('Open your development console and check the messages!');
} catch (error) {
  console.log('No browser instance detected, alert message is not necessary');
}

console.log('Adding 5 and 3:', add(5, 3));
console.log('Subtracting 8 from 10:', subtract(10, 8));
