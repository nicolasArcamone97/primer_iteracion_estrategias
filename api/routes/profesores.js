var express = require("express");
var router = express.Router();
const { obtenerProfesores, crearProfesor, obtenerProfesor, actualizarProfesor, eliminarProfesor } = require('../controllers/profesorControllers')


router.get("/", obtenerProfesores)

router.post("/", crearProfesor)

router.get("/:id", obtenerProfesor)

router.put("/:id", actualizarProfesor)

router.delete("/:id", eliminarProfesor)


module.exports = router;

