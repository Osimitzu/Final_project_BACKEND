const supertest = require("supertest");
const { app, server } = require("../app");

const api = supertest(app);

describe("Pruebas para el login de un usuario", () => {
  test("Debe marcar error si no pasamos la contraseña", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ email: "angel_aocc@hotmail.com" })
      .expect(400);
  });
  test("Debe marcar error si no pasamos el email", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ password: "12345678" })
      .expect(400);
  });
  test("Debe marcar error si el email es incorrecto", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ email: "usuarioInvalido@gmail.com", password: "12345678" })
      .expect(400);
  });
  test("Debe marcar error si la contraseña es incorrecta", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ email: "cervantes.aocc@gmail.com", password: "1234567890" })
      .expect(400);
  });
  test("Debería responder un 200 si el usuario pudo loggearse", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ email: "cervantes.aocc@gmail.com", password: "12345678" })
      .expect(200);
  });
  test("Debería responder un objeto", async () => {
    const { body } = await api
      .post("/api/v1/users/login")
      .send({ email: "cervantes.aocc@gmail.com", password: "12345678" });
    expect(body).toBeInstanceOf(Object);
  });
  test("Debería responder con formato json", async () => {
    await api
      .post("/api/v1/users/login")
      .send({ email: "cervantes.aocc@gmail.com", password: "12345678" })
      .expect("Content-Type", "application/json; charset=utf-8");
  });
  test("La respuesta debe contener un token", async () => {
    const { body } = await api
      .post("/api/v1/users/login")
      .send({ email: "cervantes.aocc@gmail.com", password: "12345678" });
    expect(body).toHaveProperty("token");
  });
});

afterAll(() => {
  server.close();
});
