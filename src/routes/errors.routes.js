const logError = require("../middlewares/logError.middlewares");
const ormErrorHandler = require("../middlewares/ormErrorHandler.middlewares");
const errorHandler = require("../middlewares/errorHandler.middlewares");

const errorRoutes = (app) => {
  // errorHandlers:
  app.use(logError); // mostramos el error
  app.use(ormErrorHandler); // si es error del orm se ejecuta este middleware
  app.use(errorHandler); // si NO es error del orm se ejecuta este middleware

  // error 404
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Sorry, we couldn't found this route :c",
    });
  });
};

module.exports = errorRoutes;
