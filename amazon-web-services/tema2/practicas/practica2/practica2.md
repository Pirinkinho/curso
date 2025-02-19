<!-- 

* Curso: Albañiles digitales.

* Autor: Koldo Sanmartín Bocelo.

* Nombre del proyecto: "Práctica 2".

* Fecha creación: Miércoles 19/02/2025.

* Fecha de entrega: Miércoles 19/02/2025 16:00 h.

* Descripción: EC2 en una VPC.

-->

# Práctica 2: EC2 en una VPC.

<span style="color:gray"> Albañiles Digitales: Cloud (Amazon Web Services) </span>

## Descripción

En esta práctica, vamos a explorar y entender algunas nociones básicas de EC2 (cómputo en la nube), así como los principios más fundamentales de VPC (networking en la nube). Vamos a crear una “virtual private cloud” (VPC), subredes en diferentes zonas de disponibilidad (“Availability Zones” / AZs), rutas, una puerta de salida a internet y más.

## Objetivos

Para finalizar satisfactoriamente esta práctica, hay que completar los siguientes objetivos:

Crear una VPC

- Navega al servicio VPC en la consola de AWS.

- Crea una VPC con los siguientes valores:

  - my-vpc
  - 10.0.0.0/16
  - No IPv6 CIDR block
  - Default tenancy

Crear una subred pública

- Construye una subred privada dentro de la VPC que has creado.

- Asegura asignar bloques CIDR válidos cuando creas tu subnet.

Crear rutas y configura el Internet Gateway

- Habilita la autoasignación de direcciones IPv4 públicas.

- Crea un internet gateway y adjúntalo a la VPC.

- Crea una nueva tabla de rutas para dirigir tráfico en la subnet pública.

Lanzar una instancia EC2 dentro de la subnet

- Launch an EC2 instance in your subnet.

- Select Amazon Linux 2 AMI, 64-bit (x86), t2.micro.

- Select the Vockey key pair

Accede a la instancia EC2

- Conéctate a tu instancia recién creada usando EC2 Instance Connect.

## Pasos

### Create a VPC (Crear una VPC)

1. Navega a **VPC** > **Your VPCs**.

    ![alt text](./capturas-pantalla/captura01.png)

    No aparece your VPC, sino que pone crear VPC directamente.

    ![alt text](./capturas-pantalla/captura02.png)

2. Haz click en **Create VPC**, y configura los siguientes valores:

    -Select: **VPC Only**

    -Name tag: **my-vpc**

    -IPv4 CIDR block: **10.0.0.0/24**

    ![alt text](./capturas-pantalla/captura03.png)

3. Deja los campos IPv6 CIDR block y Tenancy con sus valores por defecto.

    ![alt text](./capturas-pantalla/captura04.png)

4. Haz click en **Create VPC**.

    ![alt text](./capturas-pantalla/captura05.png)

    ![alt text](./capturas-pantalla/captura06.png)

### Create a Public Subnet (Crear una subnet pública)

1. Haz click en **Subnets** en el menú de la izquierda.

    ![alt text](./capturas-pantalla/captura07.png)

2. Haz click en **Create subnet**, y configura los siguientes valores:

    ![alt text](./capturas-pantalla/captura08.png)

    - VPC ID: **my-vpc**

    - Subnet name: **my-public-subnet**

    - Availability Zone: **us-east-1a**

    - IPv4 VPC CIDR block: **10.0.0.0/24**

    - IPv4 subnet CIDR block: **10.0.0.0/24**

    ![alt text](./capturas-pantalla/captura09.png)

3. Haz click en **Create subnet**.

    ![alt text](./capturas-pantalla/captura10.png)

### Create Routes and Configure Internet Gateway (Crear tabla de rutas e internet gateway)

1. Con my-public-subnet seleccionado, haz click en **Actions** > **Edit subnet settings**.

    ![alt text](./capturas-pantalla/captura11.png)

2. Marca la casilla **Enable auto-assign public IPv4 address**.

3. Haz click en **Save**.

    ![alt text](./capturas-pantalla/captura12.png)

    ![alt text](./capturas-pantalla/captura13.png)

4. Haz click en **Internet Gateways** en el menú de la izquierda.

    ![alt text](./capturas-pantalla/captura14.png)

5. Haz click en **Create internet gateway**.

    ![alt text](./capturas-pantalla/captura15.png)

6. Coloca el *Name tag* como "my-internet-gateway".

    ![alt text](./capturas-pantalla/captura16.png)

7. Haz click en **Create internet gateway**.

    ![alt text](./capturas-pantalla/captura17.png)

8. En la siguiente pantalla, haz click en **Actions** > **Attach to VPC**.

    ![alt text](./capturas-pantalla/captura18.png)

9. En el desplegable Available VPCs, selecciona **my-vpc**.

    ![alt text](./capturas-pantalla/captura19.png)

10. Haz click en **Attach internet gateway**.

    ![alt text](./capturas-pantalla/captura20.png)

11. Haz click en **Route Tables** en el menú de la izquierda.

    ![alt text](./capturas-pantalla/captura21.png)

12. Haz click en **Create route table**, y configura los siguientes valores:

    ![alt text](./capturas-pantalla/captura22.png)

    - Name: **publicRT**

    - VPC: **my-vpc**

    ![alt text](./capturas-pantalla/captura23.png)

13. Haz click en **Create route table**.

    ![alt text](./capturas-pantalla/captura24.png)

14. En la siguiente pantalla, haz click en **Actions** > **Edit routes**.

    ![alt text](./capturas-pantalla/captura25.png)

15. Haz click en **Add route**, y configura los siguientes valores:

    ![alt text](./capturas-pantalla/captura26.png)

    - Destination: **0.0.0.0/0**

    - Target: **Internet Gateway, my-internet-gateway**

    ![alt text](./capturas-pantalla/captura27.png)

16. Haz click en **Save changes**.

    ![alt text](./capturas-pantalla/captura28.png)

17. Haz click en la pestaña **Subnet associations**.

18. Haz click en **Edit subnet associations**.

19. Selecciona la casilla de **my-public-subnet**.

    ![alt text](./capturas-pantalla/captura29.png)

20. Haz click en **Save associations**.

    ![alt text](./capturas-pantalla/captura30.png)

### Launch EC2 Instance in Subnet (Lanzar una instancia EC2 en la subnet)

1. Navega a **EC2** > **Instances**.

    ![alt text](./capturas-pantalla/captura31.png)

2. Haz click en **Launch instances**.

    ![alt text](./capturas-pantalla/captura32.png)

3. Ponle nombre “my-ec2”

4. En la página de AMI, selecciona Amazon Linux 2023 AMI.

    ![alt text](./capturas-pantalla/captura33.png)

5. Asegúrate de que t2.micro está seleccionado.

6. En el desplegable de par de claves, selecciona **“vockey”**

    ![alt text](./capturas-pantalla/captura34.png)

7. En **Network Settings** modifica la configuración y selecciona la vpc creada anteriormente (my-vpc)

8. La subnet selecciona **“my-public-subnet”** que hemos creado anteriormente

    ![alt text](./capturas-pantalla/captura35.png)

9. El resto dejalo tal cual y haz click en **Launch Instance**.

    ![alt text](./capturas-pantalla/captura36.png)

10. Haz click en el **id de la instancia (i-0XXXXXXXXX)**, y dale un par de minutos para entrar en estado Running.

    ![alt text](./capturas-pantalla/captura37.png)

### Access EC2 Instance (Acceder a la instancia EC2)

1. Cuando la instancia esté en estado *Running*, selecciona la casilla a su lado.

2. Haz click en **Connect** arriba.

3. En la sección *EC2 Instance Connect*, haz click en **Connect**.

    - Esto abrirá una nueva pestaña enseñando una línea de comandos.

    ![alt text](./capturas-pantalla/captura38.png)

## Evaluación

Esta práctica se evaluará en base a los pasos que logréis avanzar. Para ello, será necesario enviar un PDF con los pantallazos de las diferentes etapas de esta práctica, mostrando el
trabajo realizado:

- Crear una VPC
- Crear una subnet pública
- Crear tabla de rutas e internet gateway
- Lanzar una instancia EC2 en la subnet
- Acceder a la instancia EC2
