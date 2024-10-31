// 1.7 Crea una clase para trabajar diferentes transformaciones de un string
// inicial con diferentes métodos:
// - Conversión de todo el string a array de caracteres uno por uno.
// - La ordenación de los caracteres de manera aleatoria.
// - La inversión del orden de caracteres.
// - Quitar las vocales.
// - Quitar las consonantes.
// - Array de palabras.
// - Inversión del orden de las palabras del string.

const readline = require('readline');

// Creando la clase.
class TransformadorCadena {
    constructor(entradaCadena) {
        this.entradaCadena = entradaCadena;
    }

    // Conversión de todo el string a array de caracteres.
    deCaracterAMatriz() {
        return [...this.entradaCadena];
    }

    // Ordenación de los caracteres de manera aleatoria.
    OrdenAleatirio() {
        const array = this.deCaracterAMatriz();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Intercambiar.
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Inversión del orden de caracteres.
    caracteresInversos() {
        return this.entradaCadena.split('').reverse().join('');
    }

    // Quitar las vocales.
    quitarVocales() {
        return this.entradaCadena.replace(/[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/g, '');
    }

    // Quitar las consonantes.
    quitarConsonantes() {
        return this.entradaCadena.replace(/[bcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ]/g, '');
    }
    

    // Array de palabras.
    dePalabraAMatriz() {
        return this.entradaCadena.split(' ');
    }

    // Inversión del orden de las palabras.
    palabrasInvertidas() {
        return this.entradaCadena.split(' ').reverse().join(' ');
    }
}

// Función para interactuar con el usuario.
if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ingresar la cadena.
    rl.question('Introduce una cadena de palabras: ', (entradaCadena) => {
        const transformador = new TransformadorCadena(entradaCadena);
        
        // Mostrar resultados por pantalla.
        console.log('Array de caracteres:', transformador.deCaracterAMatriz());
        console.log('Orden aleatorio de caracteres:', transformador.OrdenAleatirio());
        console.log('Inversión de caracteres:', transformador.caracteresInversos());
        console.log('Sin vocales:', transformador.quitarVocales());
        console.log('Sin consonantes:', transformador.quitarConsonantes());
        console.log('Array de palabras:', transformador.dePalabraAMatriz());
        console.log('Inversión de palabras:', transformador.palabrasInvertidas());

        rl.close();
    });
}

module.exports = TransformadorCadena;
