// Realiza una función llamada agregar_una_vez(lista, el) que
// reciba una lista y un elemento. La función debe añadir el elemento
// al final de la lista con la condición de no repetir ningún elemento.
// Además si este elemento ya se encuentra en la lista se debe
// invocar un error de tipo ValueError que debes capturar y mostrar
// un mensaje en su lugar

// Notes:
// 1. Se trata de una función
// 2. Dos argumentos: una lista y un elemento (ojo, hay que comprobar los inputs?)
// 3. Si el elemento ya está en la lista, se lanza un error ValueError
// 3.1 El ValueError debe ser capturado y se muestra un mensaje -> "this element already in list"
// 4. Si el elemento no está en la lista, se añadie AL FINAL de la lista
// 5. OJO -> utilizamos Set??
// 5.1 No se puede usar set (cómo pondríamos al final si no hay orden??) Si no usamos Set -> recorrer la lista / find
// 6. OJO -> no necesariamente son números
// 7. OJO -> el número en string es igual al número en número? -> no -> ===
// 8. OJO -> si el elemento es null or undefined??
// 9. OJO -> qué pasa con la salida? si no está defido!! -> devuelve la lista en el caso correcto

// CHASCARRILLO FUERA DEL EJERCICIO -> HISTORIAS DE DAVID
// {"nonce": "suerte"} JAVASCRIPT
// {"nonce":"suerte"}  JSON.dumps
// in back we had to check strings -> error!


// TEST CASES
// Habría que pensar en los errores de input -> no lo voy a hacer
// 1. lista = [1, 2, 3], el = 4 -> [1, 2, 3, 4]
// 2. lista = [1, 2, 3], el = 3 -> ValueError
// 3. lista = [1, 2, 3], el = 1 -> ValueError
// 4. lista = [1, 3, 2], el = 2 -> ValueError
// 5. lista = [1, 8, 15], el = 5 -> [1, 8, 15, 5]
// 6. lista = [1, 8, 15, "c"], el = "15"  -> [1, 8, 15, "c", "15"]
// 7. lista = [1, 8, 15, "c", "15", 6, "3343"], el = "15"  -> ValueError
// 8. lista = [], el = "3343"  -> ["3343"]


class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValueError";
    }
}


function add_different_element_to_list(array_list, element) {
    let result;
    try {
        array_set = new Set(array_list);
        if (array_set.has(element)) {
            throw new ValueError("this element already in list");
        }
        array_list.push(element);
        result = array_list;
    }
    catch (error) {
        if (error instanceof ValueError) {
            result = "this element already in list";
        }
        else {
            throw Error();
        }
    }
    return result;
}

module.exports = {
    add_different_element_to_list,
    ValueError,
}