const jwt = require("jsonwebtoken");
const Mesero = require("../models/Mesero");
const config = require("../config/global");

exports.createMesero = async (req, res) => {
  try {
    const { name, email, password, estado } = req.body;
    const mesero = new Mesero({ name, email, password, estado });

    mesero.password = await mesero.encryptPassword(mesero.password);
    await mesero.save();

    const token = jwt.sign({ id: mesero._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "Mesero creado",
      mesero: mesero,
      auth: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el mesero" });
  }
};

exports.obtenerMeseros = async (req, res) => {
  try {
    const meseros = await Mesero.find({ estado: true });
    res.status(200).json(meseros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const mesero = await Mesero.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "Mesero actualizado",
      mesero: mesero,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eliminarMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const mesero = await Mesero.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
      message: "Mesero eliminado",
      mesero: mesero,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginMesero = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mesero = await Mesero.findOne({ email: email, estado: true });
    if (!mesero) {
      return res.status(404).json({ message: "Mesero no encontrado" });
    }
    const validContra = await mesero.validatePassword(password);
    if (!validContra) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: mesero._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Inicio exitoso",
      mesero: mesero,
      auth: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
