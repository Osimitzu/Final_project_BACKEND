const express = require("express");
require("dotenv").config(); // Carga las variables de entorno desde un archivo .env
const apiRoutes = require("./routes"); // Importa las rutas de la API principal
const errorRoutes = require("./routes/errors.routes"); // Importa las rutas para el manejo de errores
const cors = require("cors"); // Importa el middleware para habilitar CORS (Cross-Origin Resource Sharing)

const PORT = process.env.PORT || 8000; // Obtiene el número de puerto desde las variables de entorno o usa el puerto 8000 por defecto

const app = express(); // Crea una instancia de la aplicación Express

app.use(express.json()); // Habilita el middleware para el análisis de JSON en las solicitudes
app.use(cors()); // Habilita el middleware CORS para permitir solicitudes desde otros dominios

app.get("/", (req, res) => {
  // Ruta de inicio, responde con un mensaje JSON
  res.json({
    message: "Servidor OK",
  });
});

// Incluir rutas de la API principal y rutas de manejo de errores
apiRoutes(app);
errorRoutes(app);

const server = app.listen(PORT, () => {
  // Inicia el servidor en el puerto especificado
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = { app, server };
