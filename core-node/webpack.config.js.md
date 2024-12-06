
# <mark>Pregunto a chati</mark> Sobre `webpack.config.js`: <spam style="color: green;"> ¿este archivo lo tengo que crear yo o node o npm?</spam>

El archivo `webpack.config.js` lo debes crear tú si estás configurando un proyecto con `Webpack` y necesitas personalizar su comportamiento. Ni `Node.js` ni `npm` lo generan automáticamente. Sin embargo, algunas herramientas o plantillas preconfiguradas pueden incluir este archivo si decides usarlas (por ejemplo, al iniciar un proyecto con `create-react-app`).

## ¿Qué es `webpack.config.js`?

Es un archivo de configuración que le dice a `Webpack` cómo empaquetar tus archivos. `Webpack` es una herramienta de construcción para proyectos de `JavaScript` que se utiliza para gestionar dependencias, agrupar archivos, y optimizar tu código para producción.

## ¿Cuándo necesitas crearlo?

Cuando deseas personalizar la configuración de `Webpack`, como:

- Cambiar puntos de entrada y salida.
- Configurar `loaders` para manejar `CSS`, imágenes, o `TypeScript`.
- Añadir plugins para optimización.
- Si usas una configuración avanzada de `Webpack`.

## ¿Cómo crear `webpack.config.js`?

1. Asegúrate de tener `Webpack` instalado:

   ```bash
   npm install webpack webpack-cli --save-dev
   ```

2. Crea el archivo en el directorio raíz del proyecto:

   ```bash
   touch webpack.config.js
   ```

3. Configura `Webpack` dentro del archivo. Un ejemplo básico sería:

    ```js
    const path = require('path');
    
    module.exports = {
        entry: './src/index.js', // Punto de entrada de tu aplicación
        output: {
            path: path.resolve(__dirname, 'dist'), // Carpeta de salida
            filename: 'bundle.js', // Nombre del archivo de salida
        },
        module: {
            rules: [
                {
                    test: /\.css$/, // Para procesar archivos CSS
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|gif)$/, // Para imágenes
                    type: 'asset/resource',
                },
            ],
        },
        mode: 'development', // O 'production' para optimización
    };
    ```

4. Usa Webpack con la configuración:

- Para construir el proyecto:

   ```bash
   npx webpack
   ```

- Si necesitas un servidor de desarrollo:

   ```bash
   npm install webpack-dev-server --save-dev
   npx webpack serve
   ```

## ¿Qué pasa si no creas `webpack.config.js`?

Si no defines este archivo, `Webpack` utiliza su configuración predeterminada:

- El archivo de entrada será `./src/index.js`.
- El archivo de salida será `./dist/main.js`.
- Solo manejará `JavaScript` sin loaders ni plugins adicionales.

Sin embargo, para la mayoría de los proyectos, necesitarás un `webpack.config.js` para personalizar cómo se maneja tu código.

# Ejemplo de Jessie Buckland:

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // Antes usábamos 'dist', pero... para simplificar, usa 'public' para evitar más plugins, ToDo en clase, agregar el plugin de copia.
  },
  mode: 'development',
};
```
