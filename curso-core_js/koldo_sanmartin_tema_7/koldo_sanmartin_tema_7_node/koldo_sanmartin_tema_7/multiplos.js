// Ejercicio 7. Crea un programa que pida un valor de tamaño de array por input y
// después el número del cuál se van a obtener múltiplos y devuelva un
// array con el tamaño puesto de múltiplos de ese número (2, 4 => [4, 8]).


const readline = require('readline');

 // Función para obtener múltiplos de un número.

function obtenerMultiplos(tamaño, numero) {
    if (tamaño <= 0) return [];
    const multiplos = [];
    for (let i = 1; i <= tamaño; i++) {
        multiplos.push(i * numero);
    }
    return multiplos;
}

// Solo ejecuta esta parte si no estás en un entorno de prueba.
// Esta sección del código solo se ejecuta si el archivo se está ejecutando directamente
// en la terminal y no si es requerido como módulo en otro archivo 
// (esto se controla con require.main === module).

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Introduce el tamaño del array: ', (tamaño) => {
        rl.question('Introduce el número del cuál obtener múltiplos: ', (numero) => {
            const resultado = obtenerMultiplos(parseInt(tamaño), parseInt(numero));
            console.log(`Array de múltiplos: ${JSON.stringify(resultado)}`);
            rl.close();
        });
    });
}

module.exports = obtenerMultiplos;
