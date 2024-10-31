const suma = require('./suma');

test('sumar 1 + 2 es igual a 3', () => {
  expect(suma(1, 2)).toBe(3);
});

// Utilizando Comparadores

// Marcadores más comunes

// El camino más simple para comprobar un valor es con una igualdad.
// Este código, expect (2 + 2) devuelve un objeto de "expectativa".
// Típicamente no hará mucho con esos objetos de tipo expectations, excepto
// llamar a matchers en ellos. Este código, .toBe(4) es el matcher.
// Cuando Jest es ejecutado, este sigue la huella de los matchers así que 
// puede imprimir un mensaje de error más agradable.

test('dos mas dos son cuatro', () => {
    expect(2 + 2).toBe(4);
  });

// toBe usa Object.is para probar la igualdad exacta.
// Si quieres chequear el valor de un objeto, usa toEqual:
// toEqual verifica recursivamente cada campo de un objeto o de una matriz.

test('asignación de un objeto', () => {
    const datos = {uno: 1};
    datos['dos'] = 2;
    expect(datos).toEqual({uno: 1, dos: 2});
  });

// Puedes testear lo contrario usando not:

  test('agregando un numero positivo que no sea 0', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

//   Veracidad:

// En los tests, a veces es necesario distinguir entre undefined, null,
// y false, pero en otras ocasiones quizás deseas tratarlos por igual. 
// Jest contiene helpers que te permitirán ser explícito acerca de lo que deseas.

// toBeNull coincide solo con null.
// toBeUndefined coincide solo con undefined.
// toBeDefinedes el opuesto a toBeUndefined.
// toBeTruthy coincide con lo que sea que el condicional if devuelva como 
// verdadero.
// toBeFalsy coincide con lo que sea que el condicional if devuelva como falso.

// Deberías usar el matcher que corresponda de manera más precisa a lo que 
// quiera que su código haga.

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('cero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

// Números:

// Existen múltiples matchers equivalentes para la comprobación de números.
  
  test('dos mas dos', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe y toEqual son equivalentes para números
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

// Para la igualdad de puntos flotantes, usa toBeCloseTo en lugar de toEqual,
// porque no quiere que una prueba dependa de un pequeño error de redondeo.

  test('agregando números de punto flotante', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3); //Esto no funcionará debido al error de redondeo
    expect(value).toBeCloseTo(0.3); // Esto funciona.
  });

// Cadenas de Texto:
// Puede probar cadenas contra expresiones regulares con toMatch.

  test('no hay I en Team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('hay "stop" en Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

// Vectores e iterables:
// Puedes comprobar si un array o iterable contiene un elemento en particular 
// usando toContain:

  const listaDeCompras = [
    'pañales',
    'pañuelos',
    'bolsas de basura',
    'toallas de papel',
    'leche',
  ];
  
  test('la leche se encuentra en la lista de compras', () => {
    expect(listaDeCompras).toContain('leche');
    expect(new Set(listaDeCompras)).toContain('leche');
  });

// Excepciones;
// Si quiere probar que si una función particular lanza un error al llamarse,
// usa toThrow.

  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK!');
  }
  
  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use a string that must be contained in the error message
    // or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  
    // Or you can match an exact error message using a regexp like below
    // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/);
    // Test fails
    expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
    // Test pass
  });

