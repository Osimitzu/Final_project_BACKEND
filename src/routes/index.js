const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

// recibe como parametro una instancia de expres
const apiRoutes = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = apiRoutes;
