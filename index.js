const express = require("express");
const conectarDB = require("./config/db");
const config = require("./config/global");
const cors = require("cors");

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/orden", require("./routes/orden"));
app.use("/api/categoria", require("./routes/categoria"));
app.use("/api/platillo", require("./routes/platillo"));

//crear mesero y obtener token
app.use("/api/mesero", require("./routes/mesero"));

app.listen(config.port, () =>
  console.log(`Servidor corriendo en http://localhost:${config.port}`)
);
