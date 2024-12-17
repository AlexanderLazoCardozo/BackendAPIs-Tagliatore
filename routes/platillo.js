const express = require("express");
const router = express.Router();
const platilloController = require("../controllers/platilloController");

router.post("/crearPlatillo", platilloController.crearPlatillo);
router.get("/obtenerPlatillo/:id", platilloController.obtenerPlatillo);
router.put("/actualizarPlatillo/:id", platilloController.actualizarPlatillo);
router.delete("/eliminarPlatillo/:id", platilloController.eliminarPlatillo);

module.exports = router;
