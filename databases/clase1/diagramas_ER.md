
# Diagrama de entidad-relación (ER).

Es una representación visual de la estructura de una base de datos. Este tipo de diagrama se utiliza para mostrar las entidades (tablas o conceptos) dentro de un sistema y las relaciones entre ellas.

Elementos clave de un diagrama ER:

- **Entidades:** Son los objetos o conceptos principales del sistema, como Clientes, Productos, Pedidos, etc. Se representan como rectángulos.

- **Atributos:** Son las características de las entidades. Por ejemplo, un Cliente podría tener atributos como nombre, dirección y teléfono. Se representan como elipses o círculos.

- **Relaciones:** Son las conexiones entre las entidades, que describen cómo interactúan entre sí. Por ejemplo, una relación podría ser que un Cliente realiza un Pedido. Las relaciones se representan como rombos.

- **Cardinalidad:** Se refiere a cuántas instancias de una entidad pueden estar relacionadas con instancias de otra entidad. Algunas cardinalidades comunes son:

  - 1:1 (uno a uno).
  - 1:N (uno a muchos).
  - M:N (muchos a muchos).

- **Claves primarias y foráneas:** En los diagramas ER, se indican las **claves primarias** (atributos que identifican de manera única a una entidad) y **claves foráneas** (atributos que vinculan una entidad con otra).

`Ejemplo básico de un diagrama ER:`

Supongamos un sistema de base de datos para una tienda en línea. Podría haber tres entidades principales:

- Cliente: con atributos como id_cliente (clave primaria), nombre, dirección.
- Pedido: con atributos como id_pedido (clave primaria), fecha, total.
- Producto: con atributos como id_producto (clave primaria), nombre, precio.

Y las relaciones podrían ser:

- Un Cliente realiza Pedidos (1:N).
- Un Pedido contiene Productos (M:N).

Este diagrama ayudaría a comprender cómo se organizan los datos en la base de datos y cómo se relacionan entre sí.

- Herramientas para crear diagramas ER:

MySQL Workbench
Lucidchart
dbdiagram.io
draw.io
Microsoft Visio
