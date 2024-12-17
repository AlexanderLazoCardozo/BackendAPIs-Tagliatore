const Orden = require("../models/ordenmodel");

exports.crearOrden = async (req, res) => {
  try {
    const { idMesa, Platillos, Estado } = req.body;
    const orden = new Orden({
      idMesa,
      Platillos,
      Estado,
    });
    await orden.save();
    res.status(201).json({
      message: "La Orden fue creada con exito",
      respuesta: orden,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.DetallesOrden = async (req, res) => {
  try {
    const { idMesa } = req.params;

    const ordendetalle = await Orden.findOne({ idMesa: idMesa });

    if (!ordendetalle) {
      return res.status(404).json({
        message: "No se encontro la id de Mesa",
      });
    }
    res.status(201).json(ordendetalle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.ActualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { Estado } = req.body;

    const ordenActualizada = await Orden.findOneAndUpdate(
      { _id: id },
      { Estado: Estado }
    );

    if (!ordenActualizada) {
      return res.status(404).json({
        message: "No se encontro la Orden",
      });
    }
    res.status(201).json({
      message: "El Estado de la orden actualizada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarOrden = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminar = await Orden.deleteOne({ _id: id });

    if (!eliminar) {
      return res.status(404).json({
        message: "No se encontro la Orden",
      });
    }

    res.status(201).json({
      message: "La Orden se elimino con Exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
