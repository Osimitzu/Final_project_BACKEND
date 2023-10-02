const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const carsRoutes = require("./cars.routes");
const ordersRoutes = require("./orders.routes");

// Middleware for serving Swagger UI and documentation
// Middleware para servir Swagger UI y la documentación
const apiRoutes = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Configura la ruta '/docs' para mostrar la documentación Swagger
  app.use(usersRoutes); // Agrega las rutas relacionadas con usuarios
  app.use(productsRoutes); // Agrega las rutas relacionadas con productos
  app.use(carsRoutes); // Agrega las rutas relacionadas con automóviles
  app.use(ordersRoutes); // Agrega las rutas relacionadas con órdenes
};

module.exports = apiRoutes; // Exporta el módulo que define las rutas de la API
