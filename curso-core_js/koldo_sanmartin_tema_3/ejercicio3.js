 // Función para pedir el tamaño de la rueda.

 function tamaño() {

    // Pide el diámetro y grosor como cadena, permitiendo comas decimales en lugar de puntos.
    let diametro = prompt("Dime el diámetro de la rueda (en metros, usa coma para decimales)");
    let grosor = prompt("Dime el grosor de la rueda (en metros, usa coma para decimales)");

    // Reemplazar la coma por punto para convertirlo a número válido.
    diametro = parseFloat(diametro.replace(",", "."));
    grosor = parseFloat(grosor.replace(",", "."));

    return { diametro, grosor };
}

// Bucle do ... while hasta que ingrese valores numéricos válidos.
let validar = true;

do {

    // Llamamos a la función y obtenemos los valores.
    let { diametro, grosor } = tamaño();

    // Validar que los valores sean números válidos y no estén vacíos.
    if (!isNaN(diametro) && !isNaN(grosor)) {

      // Formatear los números con comas como separador de decimales en lugar de puntos para mostrarlos.
      let diametroConComa = diametro.toLocaleString('es-ES');
      let grosorConComa = grosor.toLocaleString('es-ES');

      // Mostrar el tamaño ingresado.
      let texto = `El diámetro de la rueda es de ${diametroConComa} metros.<br>El grosor de la rueda es de ${grosorConComa} metros.`;
      document.getElementById("resultado").innerHTML = texto;

      // Condicionales para tamaños de ruedas.
        if ((diametro > 1.4 && grosor < 0.4) || (diametro <= 1.4 && diametro > 0.8 && grosor < 0.25)) {

            // Añadir el mensaje de recomendación, usando += para no borrar el contenido anterior.
            document.getElementById("resultado").innerHTML += "<br>El grosor para esta rueda es inferior al recomendado.";
            } else if (diametro > 1.4) {
                document.getElementById("resultado").innerHTML += "<br>La rueda es para un vehículo grande.";
            } else if (diametro <= 1.4 && diametro > 0.8) {
                document.getElementById("resultado").innerHTML += "<br>La rueda es para un vehículo mediano.";   
            } else {document.getElementById("resultado").innerHTML += "<br>La rueda es para un vehículo pequeño.";
            }

        // Finaliza el bucle.
        validar = false;
    }
} while (validar);