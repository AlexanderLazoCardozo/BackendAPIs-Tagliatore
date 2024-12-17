const Platillo = require("../models/platillos");

exports.crearPlatillo = async (req, res) => {
  try {
    const { nombre, ingredientes, precio, imagenes, disponible } = req.body;

    const nuevoPlatillo = new Platillo({
      nombre,
      ingredientes,
      precio,
      imagenes,
      disponible,
    });

    await nuevoPlatillo.save();

    res.status(201).json({
      success: true,
      message: "Platillo creado exitosamente",
      platillo: nuevoPlatillo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el platillo",
      error: error.message,
    });
  }
};

exports.obtenerPlatillo = async (req, res) => {
  try {
    const platillo = await Platillo.findById(req.params.id);

    if (!platillo) {
      return res.status(404).json({
        success: false,
        message: "Platillo no encontrado",
      });
    }

    res.json({
      success: true,
      platillo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el platillo",
      error: error.message,
    });
  }
};

exports.actualizarPlatillo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ingredientes, precio, imagenes, disponible } = req.body;

    const platilloActualizado = await Platillo.findByIdAndUpdate(
      id,
      { nombre, ingredientes, precio, imagenes, disponible },
      { new: true, runValidators: true }
    );

    if (!platilloActualizado) {
      return res.status(404).json({
        success: false,
        message: "Platillo no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Platillo actualizado exitosamente",
      platillo: platilloActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el platillo",
      error: error.message,
    });
  }
};

//eliminacion solo si el plato no esta disponible
exports.eliminarPlatillo = async (req, res) => {
  try {
    const { id } = req.params;
    const platillo = await Platillo.findById(id);

    if (!platillo) {
      return res.status(404).json({
        success: false,
        message: "Platillo no encontrado",
      });
    }

    if (platillo.disponible) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar un platillo disponible",
      });
    }

    await Platillo.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Platillo eliminado exitosamente",
      platillo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el platillo",
      error: error.message,
    });
  }
};
