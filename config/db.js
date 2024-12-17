const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Tagliatore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar a la base de datos");
    process.exit(1);
  }
};

module.exports = conectarDB;
