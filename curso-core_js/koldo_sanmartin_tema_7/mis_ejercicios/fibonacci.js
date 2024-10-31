// Función para obtener números de Fibonacci hasta un límite
function obtenerFibonacci(limite) {
    const fibonacci = [];
    let a = 0, b = 1;

    while (a <= limite) {
        fibonacci.push(a);
        const siguiente = a + b; // Calcular el siguiente número
        a = b; // Mover el primer número
        b = siguiente; // Mover el segundo número
    }
    return fibonacci;
}

let verdad = true;

do {
    // Pedir al usuario que ingrese un número
    let limite = prompt("Ingresa un número hasta el que quieras encontrar números de Fibonacci:");

    // Convertir el valor a un número
    limite = parseInt(limite);

    // Validar que el número es un entero y no es negativo
    if (!isNaN(limite) && limite >= 0) {
        // Obtener y mostrar los números de Fibonacci
        const fibonacci = obtenerFibonacci(limite);
        document.getElementById("resultado").innerHTML = `Los números de Fibonacci desde 0 hasta ${limite}
        son:<br><br> ${fibonacci.join(', ')}`;
        
        // Terminar el bucle
        verdad = false;
    } else {
        alert("Por favor, ingresa un número válido mayor o igual a 0.");
    }
} while (verdad);

