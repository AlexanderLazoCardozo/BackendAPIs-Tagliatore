const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const meseroSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, required: true },
});

meseroSchema.methods.encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

meseroSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("Mesero", meseroSchema);
