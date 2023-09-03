const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");
const cors = require("cors");
// const multer = require("multer");

const PORT = process.env.PORT || 8000;

const app = express();

//Multer configuration
// const types = ["image/jpeg", "image/png"];
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./src/files",
//     filename: (req, file, cb) => {
//       const date = Date.now();
//       cb(null, `${date}-${file.originalname}`);
//     },
//   }),
//   limits: {
//     fileSize: 1000000, // 1000 KyloBytes o un mega aprox
//   },
//   fileFilter: (req, file, cb) => {
//     // Solo aceptaremos archivos .jpeg y .png

//     if (!types.includes(file.mimetype)) {
//       cb(
//         {
//           error: "file not supported",
//           message: `Only ${types.join(", ")} mimetypes are allowed`,
//         },
//         false
//       );
//     } else {
//       cb(null, true);
//     }
//   },
// });

// app.post("/files", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   req.file
//     ? res.status(201).json({ message: "image loaded successfully" })
//     : res.status(400).json({ message: "something went wrong" });
// });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // res.send("Servidor OK");
  res.json({
    message: "Servidor OK",
  });
});

apiRoutes(app);
errorRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = { app, server };
