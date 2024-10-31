// 6. Crea una función para obtener todos los valores de un set que estén
// entre dos rangos (numéricos)

function getValuesInRange(set, min, max) {
    // Filtramos el set para obtener sólo los valores dentro del rango
    return Array.from(set).filter(value => value >= min && value <= max);
}

// Ejemplo de uso:
const mySet = new Set([5, 10, 15, 20, 25, 30]);
const valuesInRange = getValuesInRange(mySet, 10, 25);

console.log(`\nDado este set de números: ${[...mySet]}`)
console.log(`\nQueremos mostrar las cifras que estén en el rango entre 10 y 25:`)
console.log(`\n${valuesInRange}`); // Salida esperada: [10, 15, 20, 25]

module.exports = { getValuesInRange };