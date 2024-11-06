// 1. Cambia el título de la página
document.title = "Título Cambiado por JavaScript";

// 2. Cambia los colores de la página
// Puedes elegir los colores de fondo y texto según tus preferencias.
document.body.style.backgroundColor = "#bdd2ea"; // Fondo azul claro
document.body.style.color = "#333333"; // Texto en color oscuro para contrastar

// Puedes cambiar otros estilos globales como los enlaces o encabezados si lo deseas:
document.querySelectorAll("a").forEach((link) => {
    link.style.color = "#1e90ff"; // Cambia el color de los enlaces a azul
});

document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) => {
    header.style.color = "#4b0082"; // Cambia el color de los encabezados a morado
});

// También puedes usar filtros para dar un tono de color a las imágenes
document.querySelectorAll("img").forEach((img) => {
    img.style.filter = "hue-rotate(240deg)";
});

// 3. Añade un nuevo elemento HTML al DOM
// a) Crear el elemento y el texto que contiene
var miEtiqueta = document.createElement("p");
var miTexto = document.createTextNode("Soy capaz de insertar elementos en el DOM");
miEtiqueta.appendChild(miTexto); // Inserta el texto en el elemento <p>

// b) Identificar el elemento donde se va a añadir el nuevo elemento
// Aquí seleccionamos un elemento con la clase 'fixed-top'
var destino = document.getElementsByClassName("fixed-top")[0];

// c) Añadir el elemento al inicio del destino usando prepend
if (destino) {
    destino.prepend(miEtiqueta); // Inserta el nuevo <p> al inicio del elemento encontrado
} else {
    console.log("No se encontró el elemento destino con la clase 'fixed-top'");
}
