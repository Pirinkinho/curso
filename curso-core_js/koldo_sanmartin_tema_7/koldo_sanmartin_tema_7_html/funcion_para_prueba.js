// Función para obtener múltiplos de un número
function obtener_multiplos(tamaño, numero) {
    const multiplos = [];
    for (let i = 1; i <= tamaño; i++) {
        multiplos.push(numero * i);
    }
    return multiplos;
}

// Exporta la función para que pueda ser probada
module.exports = obtener_multiplos; 
