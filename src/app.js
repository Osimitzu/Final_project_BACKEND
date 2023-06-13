const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes/index");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor OK");
});

apiRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
