const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController.js");

router.post("/crearCategoria", categoriaController.crearCategoria);
router.get("/obtenerCategorias", categoriaController.obtenerCategorias);
router.put("/actualizarCategoria/:id", categoriaController.actualizarCategoria);
router.delete("/eliminarCategoria/:id", categoriaController.eliminarCategoria);

module.exports = router;
