
--
-- * PostgreSQL database dump
-- (volcado de base de datos de PostgreSQL)
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;


--
-- ¡No te asustes! ¡Si pones esto no te va a explotar el ordenador!
-- Sé que soy nuevo en esto e igual no te fías de mi, por eso lo he copiado de northwind.sql y le pregunté a GPT que hace esto. Dice que es seguro y te explico que hace cada línea:
--
-- SET statement_timeout = 0;
--
-- Esta línea establece el tiempo máximo en milisegundos que una consulta puede ejecutar antes de ser cancelada. El valor 0 significa que no hay límite de tiempo.
--
-- SET lock_timeout = 0;
--
-- Establece el tiempo máximo que la consulta esperará para adquirir un bloqueo antes de fallar. Al igual que el anterior, 0 significa que no hay límite de tiempo.
--
-- SET client_encoding = 'UTF8';
--
-- Define la codificación de caracteres para la comunicación entre el cliente y el servidor de la base de datos como UTF-8, que es un estándar que soporta caracteres internacionales.
--
-- SET standard_conforming_strings = on;
--
-- Activar esta opción asegura que las cadenas de texto (strings) se manejen de acuerdo con las normas del estándar SQL, donde las comillas simples no necesitan ser duplicadas dentro de las cadenas.
--
-- SET check_function_bodies = false;
--
-- Desactiva la comprobación de los cuerpos de las funciones al cargar un archivo SQL. Esto puede ser útil para evitar errores si el archivo contiene funciones que todavía no están completamente definidas.
--
-- SET client_min_messages = warning;
--
-- Establece el nivel mínimo de mensajes que el cliente recibirá. En este caso, recibirá advertencias o mensajes de mayor gravedad (como errores).
--
-- SET default_tablespace = '';
--
-- Esta línea especifica el espacio de tablas predeterminado para la base de datos. Al establecerlo en '', se utiliza el espacio de tablas predeterminado global.
--
-- SET default_with_oids = false;
--
-- Configura si las tablas deben tener identificadores de objetos (OIDs). Al ponerlo en false, las tablas no tendrán OIDs de manera predeterminada.
--


--
--Al estar en dentro de docker, hay que borras otros usuarios que se puedad crear, con estos comandos:
--

SELECT pid, usename, application_name, client_addr, state
FROM pg_stat_activity
WHERE datname = 'proyecto_final';


SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'proyecto_final'
  AND pid <> pg_backend_pid();  -- Esto excluye tu propia sesión


--
--Crear una base de datos llamada proyecto_final, asegurándote de que si ya existe se elimine y se vuelva a crear.
--

-- DROP DATABASE IF EXISTS proyecto_final;
-- CREATE DATABASE proyecto_final;


--
-- Estas líneas eliminan tablas si existen en la base de datos. El comando DROP TABLE IF EXISTS garantiza que no se genere un error si la tabla no se encuentra, lo que hace que el script sea seguro y reutilizable.
--

DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS proveedores CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS compras CASCADE;
DROP TABLE IF EXISTS suministro_proveedores CASCADE;



--
-- * Creación de las tablas:
--

--
-- Creación de la tabla clientes:
--

CREATE TABLE clientes (
    cliente_id SERIAL PRIMARY KEY,
    DNI VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(15) NOT NULL,
    apellido1 VARCHAR(15),
    apellido2 VARCHAR(15),
    direccion VARCHAR(100),
    ciudad VARCHAR(15),
    telefono VARCHAR(15),
    fecha_alta DATE NOT NULL DEFAULT CURRENT_DATE
);

--
-- Tabla Proveedores:
--

CREATE TABLE proveedores (
    proveedor_id SERIAL PRIMARY KEY,
    NIF VARCHAR(10) NOT NULL UNIQUE,
    empresa VARCHAR(50) NOT NULL,
    direccion VARCHAR(100),
    ciudad VARCHAR(15),
    telefono VARCHAR(15),
    fecha_alta DATE NOT NULL DEFAULT CURRENT_DATE
);

--
-- Creación de la tabla productos:
--

CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    denominación VARCHAR(30) NOT NULL,
    pvp DECIMAL(10, 2) NOT NULL,
    precio_proveedor DECIMAL(10, 2) NOT NULL,
    cantidad_disponible INTEGER NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    fecha_actualización TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Creación de la tabla intermedia compras (clientes y productos):
--

CREATE TABLE compras (
    compra_id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(cliente_id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(producto_id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    fecha_compra TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Tabla intermedia ProductosProveedores (Productos y Proveedores):
--

CREATE TABLE suministro_proveedores (
    suministro_id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES Productos(producto_id) ON DELETE CASCADE,
    proveedor_id INT REFERENCES Proveedores(proveedor_id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    fecha_suministro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- * Poblar Tablas:
--

--
-- Poblar tabla clientes:
--

INSERT INTO clientes (cliente_id, DNI, nombre, apellido1, apellido2, direccion, ciudad, telefono, fecha_alta)
VALUES
(1, '12345678A', 'Juan', 'Pérez', 'López', 'Calle Mayor 1', 'Madrid', '600123456', '2024-12-01'),
(2, '87654321B', 'María', 'González', 'Martínez', 'Avenida Sol 10', 'Barcelona', '650987654', '2024-12-02'),
(3, '11111111C', 'Luis', 'Rodríguez', 'García', 'Calle Luna 15', 'Sevilla', '620555111', '2024-12-03'),
(4, '22222222D', 'Ana', 'Martínez', 'Hernández', 'Plaza Real 8', 'Valencia', '690333444', '2024-12-04'),
(5, '33333333E', 'Pedro', 'Sánchez', 'Ramírez', 'Calle Jardín 20', 'Bilbao', '630444555', '2024-12-05'),
(6, '44444444F', 'Lucía', 'Fernández', 'Gómez', 'Avenida Norte 5', 'Zaragoza', '610222333', '2024-12-06'),
(7, '55555555G', 'Jorge', 'Ruiz', 'Torres', 'Calle Sur 7', 'Granada', '670888999', '2024-12-07'),
(8, '66666666H', 'Carmen', 'Jiménez', 'Santos', 'Calle Este 3', 'Alicante', '640666777', '2024-12-08'),
(9, '77777777I', 'Manuel', 'Díaz', 'Castro', 'Avenida Oeste 9', 'Málaga', '630555444', '2024-12-09'),
(10, '88888888J', 'Isabel', 'López', 'Núñez', 'Calle Central 12', 'Córdoba', '620123321', '2024-12-10'),
(11, '99999999K', 'Raúl', 'Moreno', 'Delgado', 'Plaza Nueva 11', 'Murcia', '610999888', '2024-12-11'),
(12, '10101010L', 'Laura', 'Vega', 'Blanco', 'Calle Ronda 6', 'Toledo', '690555111', '2024-12-12'),
(13, '12121212M', 'David', 'Navarro', 'Fuentes', 'Avenida Verde 14', 'Santander', '640444555', '2024-12-13'),
(14, '13131313N', 'Marta', 'Castillo', 'Iglesias', 'Calle Azul 2', 'Oviedo', '670123456', '2024-12-14'),
(15, '14141414O', 'Adrián', 'Ramos', 'Pascual', 'Calle Amarilla 10', 'León', '600654321', '2024-12-15'),
(16, '15151515P', 'Elena', 'Ortiz', 'García', 'Plaza Vieja 17', 'Badajoz', '650777888', '2024-12-16'),
(17, '16161616Q', 'Carlos', 'Romero', 'Campos', 'Avenida Roja 19', 'Logroño', '620222333', '2024-12-17'),
(18, '17171717R', 'Paula', 'Aguilar', 'Reyes', 'Calle Blanca 22', 'Pamplona', '690666777', '2024-12-18'),
(19, '18181818S', 'Miguel', 'Soto', 'Carrasco', 'Calle Negra 4', 'Salamanca', '610123999', '2024-12-19'),
(20, '19191919T', 'Sara', 'Méndez', 'Molina', 'Avenida Dorada 13', 'Almería', '670444333', '2024-12-20'),
(21, '20202020U', 'Alberto', 'Cano', 'Suárez', 'Calle Plateada 16', 'Valladolid', '600777666', '2024-12-21'),
(22, '21212121V', 'Rocío', 'Del Valle', 'Gutiérrez', 'Calle Tranquila 18', 'Castellón', '640333555', '2024-12-22'),
(23, '23232323W', 'Hugo', 'Serrano', 'Aranda', 'Plaza Larga 25', 'Huesca', '620999888', '2024-12-23'),
(24, '24242424X', 'Alicia', 'Rivera', 'Salas', 'Avenida Cortes 24', 'Lugo', '690888777', '2024-12-24'),
(25, '25252525Y', 'Ignacio', 'Estevez', 'Lara', 'Calle Primavera 23', 'Vigo', '600555444', '2024-12-25');


--
-- Poblar tabla proveedores:
--

INSERT INTO proveedores (proveedor_id, NIF, empresa, direccion, ciudad, telefono, fecha_alta)
VALUES
(1, 'A12345678', 'AgroSur', 'Calle Limoneros 12', 'Sevilla', '950123456', '2024-11-01'),
(2, 'B87654321', 'CampoVerde', 'Avenida Naranjos 45', 'Valencia', '960654321', '2024-11-02'),
(3, 'C11111111', 'AgroTech', 'Plaza Olivos 8', 'Madrid', '910555111', '2024-11-03'),
(4, 'D22222222', 'EcoFinca', 'Calle Almendros 3', 'Barcelona', '930333222', '2024-11-04'),
(5, 'E33333333', 'Hortalizas Premium', 'Avenida Nogales 20', 'Granada', '958444555', '2024-11-05'),
(6, 'F44444444', 'BioCampo', 'Calle Perales 6', 'Zaragoza', '976222111', '2024-11-06'),
(7, 'G55555555', 'Sierra Productos', 'Plaza Cedros 2', 'Málaga', '952888999', '2024-11-07'),
(8, 'H66666666', 'AgroPlus', 'Avenida Pinos 18', 'Córdoba', '957666777', '2024-11-08'),
(9, 'I77777777', 'VerdeClaro', 'Calle Abedules 5', 'Bilbao', '944555444', '2024-11-09'),
(10, 'J88888888', 'EcoAgri', 'Calle Robles 22', 'Murcia', '968123321', '2024-11-10'),
(11, 'K99999999', 'Productos Naturales', 'Calle Encinas 9', 'Santander', '942999888', '2024-11-11'),
(12, 'L10101010', 'Campo Solar', 'Avenida Sauces 15', 'León', '987555111', '2024-11-12'),
(13, 'M12121212', 'Finca Dorada', 'Calle Parras 19', 'Toledo', '925444555', '2024-11-13'),
(14, 'N13131313', 'AgroOrganics', 'Plaza Higueras 1', 'Pamplona', '948123456', '2024-11-14'),
(15, 'O14141414', 'Productos Sierra', 'Avenida Fresnos 13', 'Logroño', '941654321', '2024-11-15'),
(16, 'P15151515', 'Huerta del Sol', 'Calle Nogales 7', 'Badajoz', '924777888', '2024-11-16'),
(17, 'Q16161616', 'Verde Valle', 'Plaza Pinos 10', 'Oviedo', '985222333', '2024-11-17'),
(18, 'R17171717', 'AgroExport', 'Calle Cipreses 14', 'Huesca', '974666777', '2024-11-18'),
(19, 'S18181818', 'NaturAgro', 'Avenida Olmos 8', 'Lugo', '982123999', '2024-11-19'),
(20, 'T19191919', 'AgroMundo', 'Calle Almendras 21', 'Almería', '950444333', '2024-11-20'),
(21, 'U20202020', 'Campo Natural', 'Calle Alerces 25', 'Castellón', '964777666', '2024-11-21'),
(22, 'V21212121', 'Hortalizas Delicias', 'Avenida Rosales 12', 'Valladolid', '983333555', '2024-11-22'),
(23, 'W23232323', 'Finca VerdeMar', 'Calle Azucenas 4', 'Alicante', '965999888', '2024-11-23'),
(24, 'X24242424', 'Huertos Premium', 'Plaza Jazmines 18', 'Granada', '958888777', '2024-11-24'),
(25, 'Y25252525', 'Campo AgroVerde', 'Avenida Magnolias 3', 'Vigo', '986555444', '2024-11-25');

--
-- Poblar tabla productos:
--

INSERT INTO productos (producto_id, denominación, pvp, precio_proveedor, cantidad_disponible, unidad_medida, fecha_actualización)
VALUES
(1, 'Tomates', 2.50, 1.80, 500, 'kilos', '2024-12-01 10:00:00'),
(2, 'Patatas', 1.20, 0.80, 1000, 'kilos', '2024-12-02 12:30:00'),
(3, 'Zanahorias', 1.50, 1.00, 800, 'kilos', '2024-12-03 09:00:00'),
(4, 'Manzanas', 2.00, 1.50, 600, 'kilos', '2024-12-04 14:00:00'),
(5, 'Naranjas', 1.80, 1.20, 700, 'kilos', '2024-12-05 11:00:00'),
(6, 'Lechugas', 1.00, 0.70, 300, 'unidades', '2024-12-06 08:00:00'),
(7, 'Calabacines', 1.80, 1.30, 450, 'kilos', '2024-12-07 10:00:00'),
(8, 'Pepinos', 1.40, 1.00, 400, 'kilos', '2024-12-08 09:30:00'),
(9, 'Pimientos', 2.50, 2.00, 350, 'kilos', '2024-12-09 13:00:00'),
(10, 'Espinacas', 3.00, 2.50, 200, 'kilos', '2024-12-10 15:00:00'),
(11, 'Judías Verdes', 3.50, 2.80, 250, 'kilos', '2024-12-11 10:00:00'),
(12, 'Cebollas', 1.20, 0.90, 900, 'kilos', '2024-12-12 16:00:00'),
(13, 'Ajos', 5.00, 4.00, 100, 'kilos', '2024-12-13 08:30:00'),
(14, 'Maíz Dulce', 2.00, 1.50, 300, 'botes de 120 gramos', '2024-12-14 11:45:00'),
(15, 'Fresas', 4.00, 3.20, 250, 'kilos', '2024-12-15 14:30:00'),
(16, 'Plátanos', 2.20, 1.80, 700, 'kilos', '2024-12-16 09:15:00'),
(17, 'Peras', 2.50, 2.00, 600, 'kilos', '2024-12-17 12:00:00'),
(18, 'Melones', 1.80, 1.40, 150, 'unidades', '2024-12-18 10:00:00'),
(19, 'Sandías', 1.50, 1.10, 100, 'unidades', '2024-12-19 14:30:00'),
(20, 'Uvas', 3.00, 2.40, 500, 'kilos', '2024-12-20 15:45:00'),
(21, 'Almendras', 6.00, 5.00, 200, 'kilos', '2024-12-21 08:00:00'),
(22, 'Avellanas', 7.00, 6.00, 150, 'kilos', '2024-12-22 11:00:00'),
(23, 'Nueces', 5.50, 4.50, 180, 'kilos', '2024-12-23 13:00:00'),
(24, 'Moras', 4.50, 3.70, 120, 'kilos', '2024-12-24 14:00:00'),
(25, 'Arándanos', 5.00, 4.20, 130, 'kilos', '2024-12-25 10:30:00');


--
-- Poblar tabla compras:
--

INSERT INTO compras (compra_id, cliente_id, producto_id, cantidad, total, fecha_compra)
VALUES
(1, 1, 1, 10, 100.00, '2025-01-01 10:00:00'),
(2, 2, 2, 5, 50.00, '2025-01-02 11:00:00'),
(3, 3, 3, 20, 200.00, '2025-01-03 12:00:00'),
(4, 4, 4, 3, 30.00, '2025-01-04 13:00:00'),
(5, 5, 5, 15, 150.00, '2025-01-05 14:00:00'),
(6, 6, 6, 8, 80.00, '2025-01-06 15:00:00'),
(7, 7, 7, 7, 70.00, '2025-01-07 16:00:00'),
(8, 8, 8, 12, 120.00, '2025-01-08 17:00:00'),
(9, 9, 9, 25, 250.00, '2025-01-09 18:00:00'),
(10, 10, 10, 30, 300.00, '2025-01-10 19:00:00'),
(11, 11, 11, 9, 90.00, '2025-01-11 20:00:00'),
(12, 12, 12, 6, 60.00, '2025-01-12 21:00:00'),
(13, 13, 13, 5, 50.00, '2025-01-13 22:00:00'),
(14, 14, 14, 11, 110.00, '2025-01-14 23:00:00'),
(15, 15, 15, 18, 180.00, '2025-01-15 08:00:00'),
(16, 16, 16, 22, 220.00, '2025-01-16 09:00:00'),
(17, 17, 17, 13, 130.00, '2025-01-17 10:00:00'),
(18, 18, 18, 4, 40.00, '2025-01-18 11:00:00'),
(19, 19, 19, 14, 140.00, '2025-01-19 12:00:00'),
(20, 20, 20, 17, 170.00, '2025-01-20 13:00:00'),
(21, 21, 21, 19, 190.00, '2025-01-21 14:00:00'),
(22, 22, 22, 8, 80.00, '2025-01-22 15:00:00'),
(23, 23, 23, 16, 160.00, '2025-01-23 16:00:00'),
(24, 24, 24, 23, 230.00, '2025-01-24 17:00:00'),
(25, 25, 25, 21, 210.00, '2025-01-25 18:00:00');


--
-- Poblar tabla suministro_proveedores:
--

INSERT INTO suministro_proveedores (suministro_id, producto_id, proveedor_id, cantidad, total, fecha_suministro)
VALUES
(1, 1, 1, 100, 1000.00, '2025-01-01 10:00:00'),
(2, 2, 2, 50, 500.00, '2025-01-02 11:00:00'),
(3, 3, 3, 200, 2000.00, '2025-01-03 12:00:00'),
(4, 4, 4, 30, 300.00, '2025-01-04 13:00:00'),
(5, 5, 5, 150, 1500.00, '2025-01-05 14:00:00'),
(6, 6, 6, 80, 800.00, '2025-01-06 15:00:00'),
(7, 7, 7, 70, 700.00, '2025-01-07 16:00:00'),
(8, 8, 8, 120, 1200.00, '2025-01-08 17:00:00'),
(9, 9, 9, 250, 2500.00, '2025-01-09 18:00:00'),
(10, 10, 10, 300, 3000.00, '2025-01-10 19:00:00'),
(11, 11, 11, 90, 900.00, '2025-01-11 20:00:00'),
(12, 12, 12, 60, 600.00, '2025-01-12 21:00:00'),
(13, 13, 13, 50, 500.00, '2025-01-13 22:00:00'),
(14, 14, 14, 110, 1100.00, '2025-01-14 23:00:00'),
(15, 15, 15, 180, 1800.00, '2025-01-15 08:00:00'),
(16, 16, 16, 220, 2200.00, '2025-01-16 09:00:00'),
(17, 17, 17, 130, 1300.00, '2025-01-17 10:00:00'),
(18, 18, 18, 40, 400.00, '2025-01-18 11:00:00'),
(19, 19, 19, 140, 1400.00, '2025-01-19 12:00:00'),
(20, 20, 20, 170, 1700.00, '2025-01-20 13:00:00'),
(21, 21, 21, 190, 1900.00, '2025-01-21 14:00:00'),
(22, 22, 22, 80, 800.00, '2025-01-22 15:00:00'),
(23, 23, 23, 160, 1600.00, '2025-01-23 16:00:00'),
(24, 24, 24, 230, 2300.00, '2025-01-24 17:00:00'),
(25, 25, 25, 210, 2100.00, '2025-01-25 18:00:00');

