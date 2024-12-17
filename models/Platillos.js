const { Schema, model } = require("mongoose");

const platilloSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    ingredientes: {
      type: [String],
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    imagenes: {
      type: [String],
      default: [],
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Platillo", platilloSchema);
