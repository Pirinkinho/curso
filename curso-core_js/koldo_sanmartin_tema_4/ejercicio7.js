// Bucle do ... while hasta que no confirmes que quieres salir de la calculadora.
let continuar = true;
do {

    // Pedir al usuario que ingrese los dos números.
    let num1 = prompt("Ingresa el primer número (usa coma para decimales):");
    let num2 = prompt("Ingresa el segundo número (usa coma para decimales):");

    // Reemplazar la coma por punto para convertirlo a número válido.
    num1 = parseFloat(num1.replace(",", "."));
    num2 = parseFloat(num2.replace(",", "."));

    // Validar que las entradas son números.
    if (!isNaN(num1) && !isNaN(num2)) {
        let resultado = num1 * num2;
        
        // Formatear el resultado para mostrarlo con coma como separador decimal.
        let resultadoConComa = resultado.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 3 });

       // Preguntar si desea continuar, al mismo tiempo que muestras el resultado. 
        continuar = confirm(`El resultado de ${num1.toLocaleString('es-ES')} x ${num2.toLocaleString('es-ES')} es ${resultadoConComa}.\n
        ¿Quieres realizar otra multiplicación?`);

    } else {
        alert("Por favor, ingresa números válidos.");
    }

    
} while (continuar);

alert("Gracias por usar la calculadora de multiplicación.");