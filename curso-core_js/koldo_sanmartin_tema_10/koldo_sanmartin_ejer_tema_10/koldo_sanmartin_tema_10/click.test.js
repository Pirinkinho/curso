/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const { actualizarCronometro, iniciarOPararCronometro } = require('./click.js');

describe('Pruebas del cronómetro', () => {

  beforeAll(() => {
    // Cargar el archivo HTML y simular el DOM.
    const html = fs.readFileSync(path.resolve(__dirname, './click.html'), 'utf8');
    document.body.innerHTML = html;
  });

  beforeEach(() => {
    // Usar temporizadores falsos.
    jest.useFakeTimers(); 
  });

  it('debe iniciar correctamente al hacer clic', () => {
    // Simular clic para iniciar el cronómetro.
    document.dispatchEvent(new Event('click'));

    // Avanzar el temporizador en 2 segundos.
    jest.advanceTimersByTime(2000);

    // Verificar que el cronómetro muestra 2 segundos.
    expect(document.getElementById('cronometro').textContent).toBe('00:02');
  });

  it('debe detenerse al hacer clic de nuevo', () => {
    // Simular clic para detener el cronómetro.
    document.dispatchEvent(new Event('click'));

    // Verificar que el cronómetro muestra 00:02 (el tiempo que corrió previamente).
    expect(document.getElementById('cronometro').textContent).toBe('00:02');
  });

  it('debe continuar desde donde se detuvo', () => {
    // Simular clic para iniciar el cronómetro.
    document.dispatchEvent(new Event('click'));

    // Avanzar el temporizador en 5 segundos (acumulando 2 segundos anteriores).
    jest.advanceTimersByTime(5000);

    // Detener el cronómetro.
    document.dispatchEvent(new Event('click'));

    // Verificar que el cronómetro muestra 00:07 (2 segundos que ya llevaba
    // acumulado + los 5 que le añadimos).
    expect(document.getElementById('cronometro').textContent).toBe('00:07');

     // Reanudarr el cronómetro.
     document.dispatchEvent(new Event('click'));

    // Avanzar 100 ms para simular la pausa.
    jest.advanceTimersByTime(100);

    // Detener el cronómetro.
    document.dispatchEvent(new Event('click'));

    // Verificar que el cronómetro sigue en 00:07.
    expect(document.getElementById('cronometro').textContent).toBe('00:07');

    // Reanudar el cronómetro nuevamente.
    document.dispatchEvent(new Event('click'));

    // Avanzar el temporizador en 1 minuto y 3 segundos.
    jest.advanceTimersByTime(603000);

    // Verificar que el cronómetro muestra 10:10 (7 s. que tenía + 01:03 de ahora).
    // Este minuto y 3 segundos sirven para asegurar 100% de coverage del test.
    expect(document.getElementById('cronometro').textContent).toBe('10:10');
  });
});


