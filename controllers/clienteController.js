const Cliente = require("../models/Cliente");

exports.crearCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, dni } = req.body;

    const cliente = new Cliente({ nombre, email, telefono, dni });
    await cliente.save();

    res.status(201).json({ message: "Cliente creado", cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el cliente" });
  }
};

exports.obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

exports.actualizarCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, dni } = req.body;

    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, dni },
      { new: true }
    );

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json({
      message: "Cliente actualizado con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el cliente" });
  }
};
