// Mostrar error en consola y pasar al siguiente middleware de error.
const logError = (err, req, res, next) => {
  console.log(err);
  next(err);
};

module.exports = logError;
