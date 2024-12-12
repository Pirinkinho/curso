
--Ejercicio1
create table libros(
  codigo numeric(5),
  titulo varchar(40),
  autor varchar(30),
  codigoeditorial numeric(3)
 );
 create table editoriales(
  codigo numeric(3),
  nombre varchar(20),
  direccion varchar(40),
  primary key (codigo)
);

 insert into editoriales values(1,'Planeta','Colon 120');
 insert into editoriales values(2,'Emece','Estrada 356');
 insert into editoriales values(3,'Siglo XXI','General Paz 700');
 insert into libros values(100,'El aleph','Borges',1);
 insert into libros values(200,'Martin Fierro','Jose Hernandez',2);
 insert into libros values(300,'Aprenda PHP','Mario Molina',3);
 insert into libros values(400,'Java en 10 minutos',null,5);
 insert into libros values(500,'Matematica estas ahi','Paenza',null);


 --Ejercicio2

 create table libros(
  codigo SERIAL,
  titulo varchar(40) not null,
  autor varchar(20) default 'Desconocido',
  primary key (codigo)
 );

 create table socios(
  documento char(8) not null,
  nombre varchar(30),
  domicilio varchar(30),
  primary key (documento)
 );

 create table prestamos(
  documento char(8) not null,
  codigolibro int,
  fechaprestamo date not null,
  fechadevolucion date,
  primary key (codigolibro,fechaprestamo)
 );
 
 
 insert into socios values('22333444','Juan Perez','Colon 345');
 insert into socios values('23333444','Luis Lopez','Caseros 940');
 insert into socios values('25333444','Ana Herrero','Sucre 120');
 insert into libros (titulo, autor) values('Manual de 2º grado','Molina Manuel');
 insert into libros (titulo, autor) values('Aprenda PHP','Oscar Mendez');
 insert into libros (titulo, autor) values('Martin Fierro','Jose Hernandez');
 insert into prestamos values('22333444',1,'2016-08-10','2016-08-12');
 insert into prestamos values('22333444',1,'2016-08-15',null);
 insert into prestamos values('25333444',2,'2016-08-10','2016-08-13');
 insert into prestamos values('25333444',3,'2016-08-10',null);
 insert into prestamos values('25333444',3,'2016-08-15',null);
 insert into prestamos values('30333444',2,'2016-08-02','2016-08-05');