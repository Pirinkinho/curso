// Función que determina si un número es primo
function esPrimo(num) {
    if (num <= 1) return false; // 0 y 1 no son primos
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false; // Divisible por otro número
    }
    return true; // Es primo
}

// Función para obtener números primos hasta un límite
function obtenerPrimos(limite) {
    const primos = [];
    for (let i = 0; i <= limite; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }
    return primos;
}

let verdad = true;

do {
    // Pedir al usuario que ingrese un número
    let limite = prompt("Ingresa un número hasta el que quieras encontrar números primos:");

    // Convertir el valor a un número
    limite = parseInt(limite);

    // Validar que el número es un entero positivo
    if (!isNaN(limite) && limite >= 0) {
        // Obtener y mostrar los números primos
        const primos = obtenerPrimos(limite);
        document.getElementById("resultado").innerHTML = `Los números primos desde 0 hasta ${limite} son:<br><br> ${primos.join(', ')}`;
        
        // Terminar el bucle
        verdad = false;
    } else {
        alert("Por favor, ingresa un número válido mayor o igual a 0.");
    }
} while (verdad);

