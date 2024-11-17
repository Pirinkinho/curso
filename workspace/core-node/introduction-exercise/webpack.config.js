const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // was dist but... for simplicity use public to avoid more plugins, todo on class, add copy plugin
  },
  mode: 'development',
};
