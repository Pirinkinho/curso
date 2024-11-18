
# easter egg one - create your own npm registry, you can use gitea, verdaccio, etc.
## Huevo de pascua uno - crea tu propio registro npm usando gitea, verdaccio, etc
---
### - ¿Dónde está el huevo de pascua?:
- Ejemplo:

```bash
npm install react
```

Para usar un registro privado, debes configurarlo en tu archivo `.npmrc`:


**easter egg one - create your own npm registry, you can use gitea, verdaccio etc**.
```bash
registry=https://tu-registro-privado.com/
```

Luego, instala paquetes como lo harías normalmente:

```bash
npm install <nombre-del-paquete>
```

**Repositorios (GitHub):**

Puedes instalar paquetes directamente desde GitHub usando la siguiente sintaxis:

```bash
npm install <usuario-github>/<repositorio-github>#<rama-o-commit>
```

Ejemplo:

```bash
npm install user/repo#v1.2.3  # Instala desde un tag específico
npm install user/repo#master  # Instala desde la rama master
npm install user/repo#8e26357 # Instala desde un commit específico
```

---
# Crear tu propio registro npm con Verdaccio

Crear tu propio registro npm privado puede ser útil para gestionar dependencias internas, publicar paquetes privados, o controlar el acceso a ciertos paquetes dentro de tu equipo o empresa. **Verdaccio** es una herramienta de código abierto que te permite crear tu propio registro npm privado de manera sencilla.

## Pasos para crear un registro npm privado con Verdaccio

### 1. Instalar Verdaccio

Primero, necesitas instalar **Verdaccio** globalmente usando npm. Ejecuta el siguiente comando en tu terminal:

```bash
npm install -g verdaccio
```

### 2. Iniciar el servidor de Verdaccio

Una vez instalado, puedes iniciar el servidor de Verdaccio con el siguiente comando:

```bash
verdaccio
```

Esto iniciará un servidor en http://localhost:4873 (el puerto por defecto) donde tu registro privado estará disponible. Si deseas cambiar el puerto o configuraciones adicionales, puedes modificar el archivo de configuración de Verdaccio.

### 3. Configurar npm para usar tu registro privado

- **Configuración global**

Para hacer que npm apunte a tu registro privado globalmente, ejecuta el siguiente comando:

```bash
npm set registry http://localhost:4873
```

- **Configuración por proyecto**

Si prefieres configurar un registro privado solo para un proyecto específico, puedes añadir la siguiente configuración en el archivo `package.json` de tu proyecto:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {},
  "publishConfig": {
    "registry": "http://localhost:4873"
  }
}
```

Esto hará que todos los comandos npm publish para ese proyecto se publiquen en tu registro privado en lugar de en el registro público de npm.

### 4. Publicar un paquete en tu registro privado

Una vez configurado el registro, puedes publicar un paquete utilizando el siguiente comando:

```bash
npm publish --registry http://localhost:4873
```

Este comando publicará tu paquete en el **registro privado de Verdaccio** que tienes corriendo localmente. Asegúrate de que el paquete tenga un nombre único, ya que no puede haber conflictos con otros paquetes en el registro.

### 5. Instalar paquetes desde tu registro privado
Para instalar un paquete desde tu registro privado, utiliza el siguiente comando:

```bash
npm install <nombre-paquete> --registry http://localhost:4873
```

Este comando descargará el paquete desde el registro privado en lugar del registro público.

### 6. Configuración de autenticación (Opcional)

Si deseas restringir el acceso a tu registro privado, puedes configurar un sistema de autenticación utilizando usuarios y contraseñas. Esto se puede hacer desde la interfaz de usuario de Verdaccio.

- **Crear un usuario**

Primero, accede a la interfaz web de **Verdaccio** en http://localhost:4873. Luego, crea un nuevo usuario en la interfaz. Después, puedes autenticarte en el registro privado con el siguiente comando:

```bash
npm login --registry http://localhost:4873
```

Se te pedirá que ingreses tu nombre de usuario, contraseña y correo electrónico.

### 7. Configuración avanzada (Opcional)

Si deseas realizar configuraciones más avanzadas, como cambiar el puerto o configurar almacenamiento persistente, puedes modificar el archivo `config.yaml` de **Verdaccio**, que generalmente se encuentra en el directorio `~/.config/verdaccio/` en tu máquina.

- **Cambiar el puerto**

Si deseas cambiar el puerto en el que Verdaccio corre, edita el archivo config.yaml y modifica la configuración de listen:

```yaml
listen:
  - 0.0.0.0:5000
```

Este ejemplo cambiará el puerto de Verdaccio a 5000 en lugar del puerto por defecto 4873.

- **Configuración de almacenamiento persistente**

**Verdaccio** guarda los paquetes en el sistema de archivos local de forma predeterminada. Si deseas que los paquetes se conserven permanentemente, asegúrate de configurar el directorio de almacenamiento en el archivo `config.yaml`:

```yaml
storage: /path/to/your/storage
```

Este parámetro especificará dónde Verdaccio almacenará los paquetes publicados.

### 8. Registro npm Enterprise (Alternativa)

Si prefieres una solución más robusta y empresarial, puedes considerar **npm Enterprise**. Es una solución de pago que ofrece características adicionales como seguridad avanzada, control de acceso, y soporte profesional.

---
## **Resumen:**

1. **Instalar Verdaccio**: Usa `npm install -g verdaccio` para instalar la herramienta.
1. **Iniciar el servidor**: Ejecuta `verdaccio` para iniciar tu registro local.
1. **Configurar npm**: Utiliza `npm set registry http://localhost:4873` para hacer que npm use tu registro privado.
1. **Publicar paquetes**: Usa `npm publish --registry http://localhost:4873` para publicar tus paquetes en tu registro privado.
1. **Instalar paquetes privados**: Ejecuta `npm install <paquete> --registry http://localhost:4873` para consumir tus paquetes privados.
1. **Autenticación**: Configura un sistema de autenticación con `npm login`.
1. **Configuración avanzada**: Modifica el archivo `config.yaml` para ajustar puertos y almacenamiento.

**Verdaccio** es una excelente herramienta para gestionar un registro npm privado, controlando así la distribución de paquetes internos y aumentando la seguridad y eficiencia dentro de tu equipo o empresa.


