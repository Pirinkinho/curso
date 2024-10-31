//  ejercicio 7. Crea un programa que pida un valor de tamaño de array por input y
// después el número del cuál se van a obtener múltiplos y devuelva un
// array con el tamaño puesto de múltiplos de ese número (2, 4 => [4, 8]).

 // Función para obtener múltiplos de un número.
 function obtener_multiplos(tamaño, numero) {
    const multiplos = [];
    for (let i = 1; i <= tamaño; i++) {
        multiplos.push(numero * i);
    }
    return multiplos;
}

let verdad = true;

do {
    
    // Pedir al usuario que ingrese el tamaño de la matriz y un número para obtener los múltiplos.
    
    let tamaño = prompt("Dime el tamaño de la matriz que desees crear (número positivo):");
    let multiplo = prompt("Ingresa un número que desees sacar los múltiplos (número positivo):");

    // Validar que ambos son números válidos y positivos.
    
    if (!isNaN(tamaño) && !isNaN(multiplo)) {
        tamaño = Number(tamaño);
        multiplo = Number(multiplo);
        
        // Comprobar que no son negativos ni cero.
        
        if (tamaño > 0 && multiplo > 0) {

            // Llamar a la función y obtener resultados.
            
            const resultado = obtener_multiplos(tamaño, multiplo);
            
            // Limitar el número de múltiplos por línea.
            
            const maxPorLinea = 40; // Cambia este valor según tus necesidades
            let salida = "Los primeros " + tamaño + " múltiplos de " + multiplo + " son: <br><br>";
            for (let i = 0; i < resultado.length; i++) {
                salida += resultado[i];
                
                // Agregar un punto después del último número, o una coma si no es el último.
                salida += (i === resultado.length - 1) ? '.' : (i % maxPorLinea === maxPorLinea - 1 ? "<br>" : ", ");
            }
            
            document.getElementById("resultado").innerHTML += salida; 

            // Terminar el bucle do ... while.
            verdad = false;
        } else {
            alert("Por favor, ingresa un número positivo mayor que cero.");
        }
    } else {
        alert("Por favor, ingresa un tamaño válido y un múltiplo válido.");
    }
} while (verdad);


