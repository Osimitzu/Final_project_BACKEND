// Para un test se necesita:
// Una descripcion de la prueba y una función callback para ejecutar la prueba.

const isEven = (a) => {
  if (typeof a !== "number") return "El valor no es un numero";
  return a % 2 === 0;
};

test("Si ingresamos un 5 debe retornar false (no es par)", () => {
  // Arrange
  const a = 5;
  // Act
  const result = isEven(a);
  // Assert
  // * Matcher
  expect(result).toBeFalsy();
});

test("Si ingresamos el 20 debe retornar true (es par)", () => {
  // Arrange
  const a = 20;
  // Act
  const result = isEven(a);
  // Assert
  expect(result).toBeTruthy();
});

test("Si ingresamos un valor no numerico debemos regresar 'El valor no es un numero'", () => {
  const value = "Hola";
  const result = isEven(value);
  expect(result).toMatch("El valor no es un numero");
});
