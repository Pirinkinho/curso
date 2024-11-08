
// * Si copias y pegas el texto entero en consola, ves los resultados.
// Aunque puedes hacerlo por partes, si deseas.


// Para comprobar si la página se ha cargado completamente
// (es importante para que aparezca el elemento añadido):
if (document.readyState === "complete") {
    console.log("La página se ha cargado completamente.");
} else {
    console.log("La página aún se está cargando.");
}


// * Descripción:

// En clase hemos visto cómo interactuar con las diferentes APIs web para manipular
// nuestros documentos, particularmente el DOM.

// Crea un script en javascript para la web : https://navarra.es/ que haga lo
// siguiente:

// 1.Cambie el título de la página
document.title = "Título Cambiado por JavaScript";

// 2.Cambie los colores de la página a tonos azules/verdes/naranjas/morados 
//(a elección del alumno) usando las propiedades CSS ya conocidas como pueden ser:

// a. Fondos: i.e: background: #bdd2ea;
document.body.style.backgroundColor = "#bdd2ea"; // Fondo azul claro

// b. Textos: i.e: color: blue
document.querySelectorAll("body *").forEach((element) => {
    element.style.color = "red"; // O cualquier color que desees
});

// c. Imagenes: i.e: filter: hue-rotate(240deg)
document.querySelectorAll("img").forEach((img) => {
    img.style.filter = "hue-rotate(240deg)";
});

// 3. Añade un elemento HTML al arbol DOM de la página usando javascript:

// a. Crea un elemento nuevo:
//  i. Ejemplo:
//      var miEtiqueta = document.createElement("p");
//      var miTexto = document.createTextNode("Soy capaz de insertar elementos en el DOM");
var miEtiqueta = document.createElement("p"); // Crear el elemento <p>
var miTexto = document.createTextNode("¡Hola, soy un nuevo elemento en el DOM!"); // Crear el texto del párrafo

// b. Identifica el elemento donde lo vas a añadir:
//      i. Ejemplo : var destino=document.getElementsByClassName("fixed-top")[0]
var destino = document.body; // Agregar el nuevo párrafo arriba de todo
// aquí no pongo: var destino=document.getElementsByClassName("fixed-top")[0]
// porque creo que no debe existir ClassName = "fixed-top", pues no funciona con esto.

// c. Añade los elementos usando appendchild o prepend* (no visto en clase):
//      miEtiqueta.appendChild(miTexto);
//      destino.prepend(miEtiqueta);
miEtiqueta.appendChild(miTexto); // Agregar el texto al párrafo
destino.prepend(miEtiqueta); // Agregar el párrafo al principio del body

// * Nota: este apartado 3 de añadir un elemento al árbol DOM, hay que hacerlo
// varias veces para poder verlo, pues, aunque funciona perfectamente (se puede ver en el cuerpo del HTMl,
// en elementos), queda tapado por la barra de menú, si lo haces 3 veces, lo empiezas a ver. 
