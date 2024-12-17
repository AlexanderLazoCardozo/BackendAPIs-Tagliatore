const Categoria = require("../models/Categoria.js");

// Crear categoría
exports.crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaCategoria = new Categoria({ nombre, descripcion });
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      req.body
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({
      message: "Categoría actualizada con éxito",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
