
# Cómo usar dominios locales en Ubuntu con Node.js y Nginx

Para usar **dominios locales en Ubuntu** con **Node.js** y **Nginx**, necesitas configurar tanto tu servidor de desarrollo Node.js como el servidor web Nginx para que se comuniquen y puedas acceder a tus aplicaciones locales con un nombre de dominio personalizado, como `misitio.local`. Aquí te dejo los pasos detallados para hacerlo:

## Paso 1: Editar el archivo `hosts` en Ubuntu

Lo primero es modificar el archivo `hosts` de Ubuntu para que tu dominio local (como `misitio.local`) apunte a tu máquina local (IP `127.0.0.1`).

1. Abre una terminal en Ubuntu.
2. Edita el archivo `hosts` como superusuario:
   ```bash
   sudo nano /etc/hosts
   ```
3. Agrega una línea al final del archivo para redirigir el dominio local a tu máquina local:
   ```
   127.0.0.1    misitio.local
   ```
   Aquí, `misitio.local` es el dominio que usarás para acceder a tu aplicación. Puedes cambiarlo por el nombre de dominio que prefieras.
   
4. Guarda el archivo presionando `Ctrl+O` y luego `Enter`. Para salir de `nano`, presiona `Ctrl+X`.

## Paso 2: Configurar el servidor Node.js

Suponiendo que ya tienes una aplicación Node.js en ejecución, deberás asegurarte de que esté escuchando en el puerto que desees (usualmente `3000` o el que elijas) y que pueda ser accesible a través de Nginx.

1. Crea una aplicación de ejemplo (si no tienes una ya):
   ```bash
   mkdir ~/miapp
   cd ~/miapp
   npm init -y
   npm install express
   ```
   
2. Crea un archivo `app.js` en el directorio de tu aplicación:
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
       res.send('¡Hola, mundo!');
   });

   app.listen(port, () => {
       console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
   });
   ```
   
3. Inicia tu servidor de Node.js:
   ```bash
   node app.js
   ```
   
4. Tu aplicación Node.js debería estar funcionando en `http://localhost:3000`.

## Paso 3: Configurar Nginx como proxy inverso

Ahora que tu aplicación Node.js está funcionando, el siguiente paso es configurar **Nginx** para que maneje las solicitudes a `misitio.local` y las redirija al puerto donde tu aplicación Node.js está corriendo (por ejemplo, `3000`).

1. Asegúrate de tener Nginx instalado en tu sistema. Si no lo tienes, puedes instalarlo con:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Crea un archivo de configuración para tu sitio en Nginx. Crea un nuevo archivo en el directorio `/etc/nginx/sites-available/`:
   ```bash
   sudo nano /etc/nginx/sites-available/misitio.local
   ```

3. Agrega la siguiente configuración al archivo:
   ```nginx
   server {
       listen 80;
       server_name misitio.local;

       location / {
           proxy_pass http://127.0.0.1:3000;  # Redirige las solicitudes al puerto 3000 donde corre Node.js
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Esto le indica a Nginx que cuando alguien visite `misitio.local`, redirija la solicitud al servidor Node.js que está corriendo en `127.0.0.1:3000`.

4. Habilita el nuevo sitio creando un enlace simbólico en el directorio `sites-enabled`:
   ```bash
   sudo ln -s /etc/nginx/sites-available/misitio.local /etc/nginx/sites-enabled/
   ```

5. Verifica la configuración de Nginx para asegurarte de que no haya errores de sintaxis:
   ```bash
   sudo nginx -t
   ```

6. Si la prueba es exitosa, recarga Nginx para aplicar los cambios:
   ```bash
   sudo systemctl reload nginx
   ```

## Paso 4: Verificar la configuración

Ahora que has configurado todo, abre tu navegador y escribe `http://misitio.local`. Deberías ver la página de tu aplicación Node.js.

Si todo está bien configurado, **Nginx** actuará como un proxy inverso y redirigirá las solicitudes de `misitio.local` a tu servidor Node.js en el puerto `3000`.

## Resumen de pasos:
1. Modifica el archivo `hosts` para agregar tu dominio local (como `misitio.local`).
2. Asegúrate de que tu aplicación Node.js esté corriendo en un puerto accesible (por ejemplo, `3000`).
3. Configura Nginx para que redirija las solicitudes de `misitio.local` al puerto de tu aplicación Node.js.
4. Verifica la configuración de Nginx y recarga el servicio.
