const express = require("express");
const router = express.Router();
const meseroController = require("../controllers/meseroController.js");
const auth = require("../config/verifyToken");

router.post("/crearMesero", meseroController.createMesero);
router.get("/obtenerMeseros", auth, meseroController.obtenerMeseros);
router.put("/actualizarMesero/:id", auth, meseroController.actualizarMesero);
router.delete("/eliminarMesero/:id", auth, meseroController.eliminarMesero);
router.post("/login", meseroController.loginMesero);

module.exports = router;
