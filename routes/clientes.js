const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.post("/create-cliente", clienteController.crearCliente);
router.get("/obtenerCliente/:id", clienteController.obtenerCliente);
router.put("/actualizarCliente/:id", clienteController.actualizarCliente);
router.delete("/eliminarCliente/:id", clienteController.eliminarCliente);

module.exports = router;
