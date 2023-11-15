var express = require("express");
var router = express.Router();
const { obtenerProfesores, crearProfesor, obtenerProfesor, actualizarProfesor, eliminarProfesor } = require('../controllers/profesorControllers')

// middle para proteger rutas

const auth = require('../verificarToken/auth')



router.get("/", auth,obtenerProfesores)

router.post("/", crearProfesor)

router.get("/:id", obtenerProfesor)

router.put("/:id", actualizarProfesor)

router.delete("/:id", eliminarProfesor)


module.exports = router;

