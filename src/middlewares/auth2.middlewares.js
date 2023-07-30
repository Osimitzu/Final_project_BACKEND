// Este middleware sirve para verificar que el usuario esta autenticado/loggeado, y ademas compara el id que se esta pasando en la ruta para validar que el usuario que genero el token sea el mismo al que se le estan aplicando los cambios o actualizaciones.

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateAndIdCompare = (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return next({
        status: 401,
        name: "not token",
        message: "token is not present on request headers",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_LOGIN, {
      algorithms: "HS512",
    });

    if (!decoded || !decoded.id) {
      return next({
        status: 498,
        name: "Invalid or expired token",
        message: "Invalid token or missing user ID",
      });
    }
    console.log(decoded.id); // decoded.id me lo pasa como numero y
    console.log(req.params.id); // req.params.id recibe el id como char en la ruta, tuve cambiar la comparación en el siguiente if de !== a != // tengo duda si es mala practica o no...
    // Verificar que el ID del usuario en el token coincide con el ID en la ruta
    if (decoded.id != req.params.id) {
      return next({
        status: 401,
        name: "Unauthorized",
        message: "Token does not belong to this user",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return next({
      status: 498,
      name: "Invalid or expired token",
      message: err.message,
    });
  }
};

module.exports = authenticateAndIdCompare;
