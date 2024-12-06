
// src/index.js

const { add, subtract, divide, multiply } = require('./calculator.js');

try {
  if (window) alert('¡Abre la consola de desarrollo y verifica los mensajes!');
} catch (error) {
  console.log('No se detectó una instancia de navegador, el mensaje de alerta no es necesario.');
}

const suma = add(5, 3)
const resta = subtract(10, 8)
const division = divide(15, 3)
const multiplicacion = multiply(4, 6)

const texto = "Este es el contenido que viene desde el archivo JavaScript: index.js.";

if (typeof window !== "undefined" && typeof document !== "undefined") {

  // Código para el navegador
  document.getElementById("contenido").innerText = texto;
  document.getElementById("suma").innerText = suma; 
  document.getElementById("resta").innerText = resta;
  document.getElementById("division").innerText = division;
  document.getElementById("multiplicacion").innerText = multiplicacion;

} else {
  // Código para Node.js
  console.log('\n',texto);
  console.log('\nSuma de 5 y 3:', suma);
  console.log('Resta de 10 menos 8:', resta);
  console.log('División de 15 entre 5:', division);
  console.log('Multiplicación de 4 por 6:', multiplicacion);
}



