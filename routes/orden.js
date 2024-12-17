const express = require("express");
const router = express.Router();
const ordenController = require("../controllers/ordenController.js");

router.post("/crearOrden", ordenController.crearOrden);
router.get("/DetallesOrden/:idMesa", ordenController.DetallesOrden);
router.put("/ActualizarEstado/:id", ordenController.ActualizarEstado);
router.delete("/eliminarOrden/:id", ordenController.eliminarOrden);

module.exports = router;
