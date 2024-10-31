// 8. Crea un cronómetro en una página web (muy simple, sólo minutos y
// segundos)
// 9. Sobre el ejercicio anterior, haz que con el click del ratón se pueda parar
// o continuar el tiempo. (No hace falta controlar el momento en el que se
//  para el tiempo a la hora de volver a empezar)
    
let minutos = 0;
let segundos = 0;
let intervalo = null;

function actualizarCronometro() {
  segundos++;

  if (segundos === 60) {
    minutos++;
    segundos = 0;
  }

  // Mostrar los minutos y segundos con dos dígitos
  const minutosTexto = minutos < 10 ? '0' + minutos : minutos;
  const segundosTexto = segundos < 10 ? '0' + segundos : segundos;

  document.getElementById('cronometro').textContent = `${minutosTexto}:${segundosTexto}`;
}

function iniciarCronometro() {
  if (!intervalo) {
    intervalo = setInterval(actualizarCronometro, 1000);
  }
}

function pausarCronometro() {
  clearInterval(intervalo);
  intervalo = null;
}

function reiniciarCronometro() {
  clearInterval(intervalo);
  intervalo = null;
  minutos = 0;
  segundos = 0;
  document.getElementById('cronometro').textContent = '00:00';
}
   