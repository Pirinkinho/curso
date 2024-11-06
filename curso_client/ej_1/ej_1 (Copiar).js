// 1. Cambiar el título de la página
document.title = "Nuevo Título - Aulas SNE";

// 2. Cambiar los colores de la página
// Creamos una hoja de estilos
const estilos = `
    body {
        background: #e6f3ff !important; /* Azul claro de fondo */
    }
    
    .navbar {
        background-color: #1e90ff !important; /* Azul más intenso para la barra de navegación */
    }
    
    .text-primary {
        color: #004d99 !important; /* Azul oscuro para textos principales */
    }
    
    /* Cambiar color de todos los textos */
    p, h1, h2, h3, h4, h5, h6 {
        color: #003366 !important;
    }
    
    /* Cambiar color de los enlaces */
    a {
        color: #0066cc !important;
    }
    
    /* Aplicar filtro a las imágenes */
    img {
        filter: hue-rotate(210deg);
    }
`;

// Crear y añadir la hoja de estilos
const styleSheet = document.createElement("style");
styleSheet.textContent = estilos;
document.head.appendChild(styleSheet);

// 3. Añadir nuevo elemento al DOM
// Crear los elementos
const miEtiqueta = document.createElement("p");
const miTexto = document.createTextNode("Soy capaz de insertar elementos en el DOM");

// Añadir algunas clases para estilo
miEtiqueta.classList.add("alert", "alert-info", "m-3");

// Combinar el texto con la etiqueta
miEtiqueta.appendChild(miTexto);

// Buscar el elemento donde queremos insertarlo
// Nota: Ajusta el selector según la estructura real de la página
const destino = document.getElementsByClassName("fixed-top")[0];

// Insertar el elemento
if (destino) {
    destino.prepend(miEtiqueta);
} else {
    // Si no encuentra la clase fixed-top, lo añade al inicio del body
    document.body.prepend(miEtiqueta);
}
// Last edited hace 1 minuto