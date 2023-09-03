const supertest = require("supertest");
const { app, server } = require("../app");

const api = supertest(app);

describe("Pruebas para la ruta raiz", () => {
  test("Debo recibir un status 200 en GET /", async () => {
    await api.get("/").expect(200);
  });

  test("Debo recibir como respuesta un formato json", async () => {
    await api
      .get("/")
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("La respuesta debe ser un objeto", async () => {
    const { body } = await api.get("/");
    expect(body).toBeInstanceOf(Object);
  });

  test("La respuesta debe incluir la propiedad message", async () => {
    const { body } = await api.get("/");
    expect(body).toHaveProperty("message");
  });
});

afterAll(() => {
  server.close();
});
