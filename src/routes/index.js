const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

const usersRoutes = require("./users.routes");

// recibe como parametro una instancia de expres
const apiRoutes = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(usersRoutes);
};

module.exports = apiRoutes;
