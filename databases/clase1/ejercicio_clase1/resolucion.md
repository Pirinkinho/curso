
# Resolución.

## Explicación:

- Cliente tiene una relación 1:N con Compra, es decir, un cliente puede hacer muchas compras.

- Compra tiene una relación M:N con Producto, ya que un cliente puede comprar múltiples productos y cada producto puede ser comprado por muchos clientes. Para esto, la tabla Compra contiene claves foráneas de Cliente y Producto.

- Proveedor tiene una relación 1:N con Producto, es decir, cada proveedor puede suministrar múltiples productos, pero cada producto solo es suministrado por un proveedor.

