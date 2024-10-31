// suscriptores.test.js
const createObject = require('./suscriptores');

describe('Tests para createObject', () => {

  test('Debe ser una función', () => {
    expect(typeof createObject).toBe('function');
  });

  test('Debe devolver un objeto', () => {
    const resultado = createObject('Miguel', 100);
    expect(typeof resultado).toBe('object');
  });

  test('El nombre debe ser correcto', () => {
    const resultado = createObject('Miguel', 100);
    expect(resultado.name).toBe('Miguel');
  });

  test('Los suscriptores deben ser correctos', () => {
    const resultado = createObject('Miguel', 100);
    expect(resultado.subscribers).toBe(100);
  });

  test('El método getStatus debe devolver el texto correcto', () => {
    const resultado = createObject('Miguel', 100);
    expect(resultado.getStatus()).toBe('El canal de Miguel tiene 100 suscriptores');
  });

});
