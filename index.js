const express = require("express");
const conectarDB = require("./config/db");
const config = require("./config/global");
const cors = require("cors");

const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });

  socket.on("chat", (msg) => {
    console.log("mensaje: " + msg);

    io.emit("chat", { text: msg, userId: socket.id });
  });
});

conectarDB();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));

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

server.listen(config.port, () =>
  console.log(`Servidor corriendo en http://localhost:${config.port}`)
);
