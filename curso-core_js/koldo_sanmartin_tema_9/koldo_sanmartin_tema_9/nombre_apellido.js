// Descripción del ejercicio (9.17 del tema 9):

// Glosa original del ejercicio:

// 17.Define a function capitalize_last_name() that accepts as argument
// a string with a (single) first and a (single) last name, and returns a
// string in which only the first letter of the first name is uppercase,
// whereas all letters of the last name are uppercase; in otherwords,
// 'marisa tomei' becomes 'Marisa TOMEI'. (Tip: use str.split() to split
// a str into separate words.) If something other than a str object is
// passed as an argument, the function should raise a TypeError. (Tip:
// you can use isistance() to check whether an object is of a particular
// type.) If the str does not consist of exactly two words, the function
// should raise a ValueError.

// Glosa del ejercicio en castellano:

// 17.Define una función capitalize_last_name() que acepte como argumento 
// una cadena con un (único) nombre y un (único) apellido, y devuelva una
// cadena en la que solo la primera letra del nombre esté en mayúsculas, 
// mientras que todas las letras del apellido estén en mayúsculas; 
// en otras palabras, 'marisa tomei' se convierte en 'Marisa TOMEI'. 
// (Consejo: usa str.split() para dividir una cadena en palabras separadas).
// Si se pasa algo diferente a un objeto de tipo cadena como argumento, 
// la función debe generar un TypeError. (Consejo: puedes usar isinstance() 
// para comprobar si un objeto es de un tipo particular). Si la cadena no
// consiste exactamente en dos palabras, la función debe generar un ValueError.

// Nota:

// El ejercicio da el consejo que:
// "Si se pasa algo diferente a un objeto de tipo cadena como argumento, 
// la función debe generar un TypeError. (Consejo: puedes usar isinstance() 
// para comprobar si un objeto es de un tipo particular)."
// pero isinstance() devuelve error "isinstance is not defined," debido a que 
// isinstance() es una función de Python y no existe en JavaScript. En JavaScript,
// la forma correcta de verificar si una variable es de un tipo específico 
// (como una cadena) es usar typeof.

const readline = require('readline');

// Definición de la clase ValueError:
// Para que la función capitalize_last_name genere un ValueError cuando la cadena 
// no consiste exactamente en dos palabras, necesitas lanzar un error específico 
// de tipo ValueError. Sin embargo, JavaScript no tiene un tipo de error llamado 
// ValueError de forma predeterminada, por lo que puedes utilizar Error o crear 
// tu propio tipo de error.

class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValueError';
    }
}

// Función para capitalizar el nombre y poner el apellido en mayúsculas

function capitalize_last_name(name) {

    // Comprobar si el argumento es de tipo string

    if (typeof name !== 'string') {
        throw new TypeError('El argumento debe ser una cadena de texto.');
    }

    const words = name.trim().split(' ');

    // Comprobar si la cadena tiene exactamente dos palabras

    if (words.length !== 2) {
        throw new ValueError('La cadena debe contener exactamente dos palabras (nombre y apellido).');
    }

    const [firstName, lastName] = words;

    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()} ${lastName.toUpperCase()}`;
}

// Si el script es ejecutado directamente desde Node.js

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Introduce un nombre y apellido: ', (input) => {
        try {
            const result = capitalize_last_name(input);
            console.log(result);
        } catch (error) {
            if (error instanceof ValueError) {
                console.error('ValueError:', error.message);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            rl.close();
        }
    });
}

// Exportar tanto la función como la clase ValueError
module.exports = { capitalize_last_name, ValueError };
