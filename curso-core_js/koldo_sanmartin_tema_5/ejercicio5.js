// 5. Pedirle al usuario que ingrese un dígito y un número, después llamar a
// una función que diga el número de veces que aparece el dígito en el
// número.

// Función que cuenta cuántas veces aparece un dígito en un número.
function contarDigitos(digito, numero) {

    // Convertimos ambos valores a cadenas para poder recorrer el número.
    let digitoCadena = digito.toString();
    let numeroCadena = numero.toString();
    let contador = 0;

    // Recorremos cada carácter del número.
    for (let i = 0; i < numeroCadena.length; i++) {
        if (numeroCadena[i] === digitoCadena) {
            contador++;
        }
    }
    return contador;
}

// Bucle do ... while hasta que ingreses el dígito y el número validos.
let verdad = true

do {

    // Pedir al usuario que ingrese un dígito y un número.
    let digito = prompt("Ingresa un dígito(una sola cifra):");
    let numero = prompt("Ingresa un número(las cifras que quieras):");

    // Validar que el dígito ingresado sea un solo carácter y ambos son números válidos.
    if (digito.length === 1 && !isNaN(digito) && !isNaN(numero)) {

        // Llamar a la función y mostrar el resultado.
        let cantidad = contarDigitos(digito, numero);

        // Comprobar que los resultados se adapten a cadenas coherentes con el idioma castellano.
        if(cantidad === 0) {
                alert(`El dígito ${digito} no aparece en ${numero} ninguna vez.`);
        } else if(cantidad === 1) {
                alert(`El dígito ${digito} aparece en ${cantidad} vez en el número ${numero}.`);
        } else {
            alert(`El dígito ${digito} aparece en ${cantidad} veces en el número ${numero}.`);
        }  

        // Terminar el bucle do ... while.
        verdad = false

    } else {
        alert("Por favor, ingresa un dígito válido y un número válido.");
    }

} while(verdad)
