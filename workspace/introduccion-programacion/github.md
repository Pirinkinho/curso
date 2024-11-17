# GitHub

En este módulo, aprenderemos a utilizar GitHub para gestionar nuestros
proyectos de programación durante el bootcamp.
GitHub es una plataforma que nos permite trabajar en equipo, gestionar
versiones de nuestro código y alojar nuestros proyectos de manera profesional.
Vamos a seguir una serie de pasos para asegurarnos de que todos estamos
listos para empezar a usar GitHub.

1. Registro en GitHub.

   Si no tienes una cuenta en GitHub, ve a github.com
   y regístrate. **Importante**: el email que uses para registrarte en
   GitHub es el mismo que utilizaremos más adelante para configurar git en tu PC.

2. Instalación y Configuración de git en Ubuntu.

   Abre el terminal en tu máquina Ubuntu y ejecuta los siguientes comandos
   para instalar git:

   ```bash
   sudo apt update
   sudo apt install git
   ```

3. Configurar git con tu nombre y email.

   Ejecuta los siguientes comandos en el terminal para configurar tu nombre
   y email en git:

   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tuemail@example.com"
   ```

   Para asegurarte de que la configuración se ha realizado correctamente,
   puedes ejecutar el siguiente comando:

   ```bash
   git config --list
   ```

   Deberías ver tu nombre y email en la lista de configuraciones.

4. Configuración de Claves SSH para GitHub.

   Para que puedas trabajar de manera segura con GitHub desde tu terminal,
   vamos a configurar una clave SSH.

   - Generar una clave SSH:

     En el terminal, genera una nueva clave SSH con el siguiente comando.
     Cuando te lo pida, simplemente presiona `Enter` para aceptar las opciones
     predeterminadas:

     ```bash
     ssh-keygen -t ed25519 -C "tuemail@example.com"
     ```

     Esto generará una clave SSH en la ubicación predeterminada: `~/.ssh/id_ed25519`.

   - Agregar la clave SSH al agente SSH.

     Primero, debemos iniciar el agente SSH para que pueda gestionar nuestras claves:

     ```bash
     eval "$(ssh-agent -s)"
     ```

     Luego, añade tu nueva clave SSH al agente:

     ```bash
     ssh-add ~/.ssh/id_ed25519
     ```

   - Agregar la clave SSH a tu cuenta de GitHub.

     Copia la clave SSH pública al portapapeles:

     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```

     Ve a tu perfil de GitHub y haz clic en `Settings` -> `SSH and GPG keys`
     -> `New SSH key` y pega la clave SSH en el campo `Key`.

   - Probar la conexión SSH con GitHub.

     Para probar la conexión SSH con GitHub, ejecuta el siguiente comando:

     ```bash
     ssh -T git@github.com
     ```

     Deberías ver un mensaje de confirmación de conexión exitosa.

5. El profesor os dará acceso a la Organización.

6. Clonar los Repositorios de la Organización.

   Te recomendamos organizar tus proyectos de programación en una carpeta
   específica en tu PC. En el terminal, crea una nueva carpeta y accede a ella:

   ```bash
   mkdir ~/projects
   cd ~/projects
   ```

   Ahora vamos a clonar los repositorios `workspace` y `common-project-back-front`
   desde la organización del bootcamp en GitHub.

   - Clonar el repositorio `workspace`:

     ```bash
     git clone git@github.com:albaniles-digitales/workspace.git
     ```

   - Clonar el repositorio `common-project-back-front`:

     ```bash
     git clone git@github.com:albaniles-digitales/common-project-back-front.git
     ```

7. Crear Repositorios Personales para Workspace y Proyecto Final.

   Cada alumno creará repositorios personales en sus cuentas de GitHub, que usaremos
   para trabajar durante el bootcamp.

   - Crear repositorios en GitHub:
   
     Ve a tu perfil de GitHub y crea dos nuevos repositorios:

     - `workspace`
     - `common-project-back-front`

   - Activar GitHub Actions:

     Dentro de cada nuevo repositorio (workspace y final-project), ve a la pestaña
     Actions.
     Si es necesario, sigue las instrucciones para habilitar GitHub Actions, lo cual
     permitirá que puedas automatizar tareas como la ejecución de pipelines de CI/CD.

8. Cambiar los Remotes, Hacer Commit y Push.

   Ahora que tienes tus repositorios personales, vamos a cambiar los remotos
   de los repositorios clonados en tu PC para que apunten a tus repositorios
   personales.

   Navega al directorio del repositorio `workspace`:

   ```bash
   cd ~/projects/workspace
   ```

   Cambia el remote `origin` para que apunte a tu repositorio personal:

   ```bash
   git remote set-url origin git@github.com:<tu-usuario>/workspace.git
   ```

   Ahora, haz un commit y un push de los cambios a tu repositorio personal:

   ```bash
   git add .
   git commit -m "First commit"
   git push origin master
   ```

   Esto subirá tu primer commit a tu repositorio personal en GitHub.

   Repite el mismo proceso para el repositorio `common-project-back-front`.

9. ¡Listo!

   Finalmente, revisa tu cuenta de GitHub para asegurarte de que los
   cambios se han subido correctamente y que GitHub Actions está configurado
   y funcionando.
   En tus repositorios personales (`workspace` y `final-project`), deberías
   ver el commit que acabas de hacer y los pipelines de CI/CD ejecutándose.

   Ahora estás listo para empezar a trabajar en tus proyectos de programación
   durante el bootcamp. Si tienes alguna duda, no dudes en preguntar a tu
   profesor o compañeros de clase.
