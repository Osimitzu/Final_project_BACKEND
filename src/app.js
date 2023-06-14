const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor OK");
});

apiRoutes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
