// 8. Crea un cronómetro en una página web (muy simple, sólo minutos y
// segundos)
// 9. Sobre el ejercicio anterior, haz que con el click del ratón se pueda parar
// o continuar el tiempo. (No hace falta controlar el momento en el que se
//  para el tiempo a la hora de volver a empezar)

let tiempoAcumulado = 0; // Tiempo acumulado en segundos
let intervalo = null;
let corriendo = false;

function actualizarCronometro() {
  // Incrementar el tiempo acumulado
  tiempoAcumulado++; 
  // Mostrar el tiempo acumulado
  console.log(`Tiempo acumulado: ${tiempoAcumulado} segundos`); 

  const minutos = Math.floor(tiempoAcumulado / 60);
  const segundos = tiempoAcumulado % 60;

  const minutosTexto = minutos < 10 ? '0' + minutos : minutos;
  const segundosTexto = segundos < 10 ? '0' + segundos : segundos;

  // Mostrar el tiempo formateado en la consola
  document.getElementById('cronometro').textContent = `${minutosTexto}:${segundosTexto}`;
}

function iniciarOPararCronometro() {
  if (!corriendo) {
    corriendo = true;
    intervalo = setInterval(actualizarCronometro, 1000);
  } else {;
    corriendo = false;
    clearInterval(intervalo);
  }
}

// Evento de clic para parar o continuar el cronómetro
document.addEventListener('click', iniciarOPararCronometro);

// Exportar la las funciones para poder acceder desde el test
module.exports = { actualizarCronometro, iniciarOPararCronometro };

