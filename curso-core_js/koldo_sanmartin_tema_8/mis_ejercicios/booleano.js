// Tienes una función que recibe un objeto como parámetro. La función debe retornar
// un array con el nombre de las propiedades que su tipo sea boolean.

// Por ejemplo, para el objeto { a: true, b: 42, c: false } la función debe retornar 
// ['a', 'c'] ya que son las dos propiedades que tienen valores booleanos.

function getKeysOfBooleanValues(obj) {
    // tu código aquí
    // Crear un array vacío para almacenar las claves booleanas
    const booleanKeys = [];

    // Recorrer las propiedades del objeto
    for (let key in obj) {
        // Verificar si el valor de la propiedad es un booleano
        if (typeof obj[key] === 'boolean') {
            // Si es booleano, agregar la clave al array
            booleanKeys.push(key);
        }
    }
    // Devolver el array con las claves booleanas
    return booleanKeys;
}
module.exports = getKeysOfBooleanValues;