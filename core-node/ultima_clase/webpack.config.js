
const path = require('path');
const webpack = require('webpack'); // Importa Webpack

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // Output en la carpeta 'public'
  },
  mode: 'development', // Cambia a 'production' si necesitas modo producción
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'), // Polyfill para buffer
      url: require.resolve('url/'),      // Polyfill para url
      http: require.resolve('stream-http'), // Polyfill para http
      fs: false, // Si no necesitas 'fs' en el navegador, desactívalo
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Hace que Buffer esté disponible globalmente
    }),
  ],
};
