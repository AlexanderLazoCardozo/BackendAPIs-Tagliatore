const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  idMesa: { type: Number, required: true },
  Platillos: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
    },
  ],
  Estado: {
    type: String,
    enum: ["pendiente", "entregado", "cancelado"],
    required: true,
  },
});

module.exports = model("ordenes", orderSchema);
