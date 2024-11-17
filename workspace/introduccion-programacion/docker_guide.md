# Guía de Docker

## Instalación de Docker

Instalaremos docker siguiendo la documentación oficial:
https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

Actualiza el índice de paquetes e instala dependencias necesarias:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

Añade la clave GPG oficial de docker:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

Configura el repositorio:

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Actualiza el repositorio de paquetes:

```bash
sudo apt-get update
```

Instalar docker engine:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verificar que hemos instalado docker:

```bash
sudo docker run hello-world
```

## Pasos post-instalación

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Reiniciar el ordenador para que los cambios se hagan efectivos.

Prueba a levantar de nuevo el docker hello-world:

```bash
docker run hello-world
```

## Checkpoint: avisa al profesor de que has llegado hasta aquí

Instalaremos docker-compose siguiendo también la documentación oficial:
https://docs.docker.com/compose/install/linux/#install-using-the-repository

Haremos un ejemplo usando un repositorio con muchos ejemplos de archivos
docker-compose para levantar diferentes aplicaciones:
https://github.com/Haxxnet/Compose-Examples

Por ejemplo, cogeremos la aplicación de metube:
https://github.com/Haxxnet/Compose-Examples/tree/main/examples/metube

```bash
mkdir -p ${HOME}/metube
wget -O ${HOME}/metube/docker-compose.yml https://raw.githubusercontent.com/Haxxnet/Compose-Examples/main/examples/metube/docker-compose.yml
```

Ahora, lanzaremos el servicio:

```bash
cd ${HOME}/metube && docker compose up -d
```

Si vemos qué docker tenemos corriendo, veremos uno llamado metube en
el puerto 8081:

```bash
docker ps

CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                                       NAMES
5b254ce13136   alexta69/metube   "./docker-entrypoint…"   18 seconds ago   Up 18 seconds   0.0.0.0:8081->8081/tcp, :::8081->8081/tcp   metube
```

Ahora podremos acceder a través del navegador a la dirección http://localhost:8081/ y veremos la interfaz.

Pararemos el docker y eliminaremos su instancia:

```bash
docker stop metube && docker rm metube
```

## Extra

Jugar con cualquier docker que vean por internet e intentar
levantarlo en local.
Pueden usar ejemplos del repositorio compartido anteriormente.

Propuestas:
- Wordpress
- RetroPie
- Etherpad
- Nextcloud
- Pi-hole
- Bitwarden