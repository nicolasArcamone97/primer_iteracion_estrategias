var express = require("express");
var router = express.Router();
const { obtenerMaterias, crearMateria, obtenerMateria, actualizarMateria, eliminarMateria } = require('../controllers/materiaControllers')


router.get("/", obtenerMaterias)

router.post("/", crearMateria)

router.get("/:id", obtenerMateria)

router.put("/:id", actualizarMateria)

router.delete("/:id", eliminarMateria)

module.exports = router;
