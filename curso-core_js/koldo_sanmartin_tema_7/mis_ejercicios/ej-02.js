//  2. Cuando defines un array de tamaño 4, ¿puedes asignar un valor al índice
//    26?


Respuesta:

Si. 
En JavaScript, si defines un array de tamaño 4, puedes asignar un valor a un índice 
fuera de los límites del tamaño del array, como el índice 26, pero esto no expandirá 
el tamaño del array de manera convencional. -ejemplo:


let array = new Array(4); // Crea un array de tamaño 4

array[26] = 'valor'; // Asigna un valor al índice 26

console.log(array); // [ <4 empty items>, <26 empty items>, 'valor' ]
console.log(array.length); // 27


En este caso:

El array inicialmente tiene una longitud de 4, pero al asignar un valor al índice 26, 
JavaScript ajusta automáticamente la longitud del array a 27.
Los índices entre 4 y 25 quedarán vacíos (no definidos), y el valor se asignará en el
índice 26.
Por lo tanto, aunque puedes asignar un valor a un índice mucho más allá del tamaño
inicial del array, esto resulta en un array con espacios vacíos y un tamaño mayor.



