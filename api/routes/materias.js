var express = require("express");
var router = express.Router();
const { obtenerMaterias, crearMateria, obtenerMateria, actualizarMateria, eliminarMateria} = require('../controllers/materiaControllers')

// middle para proteger rutas

const auth = require('../verificarToken/auth')



router.get("/", auth,obtenerMaterias)

router.post("/", crearMateria)

router.get("/:id", obtenerMateria)

router.put("/:id", actualizarMateria)

router.delete("/:id", eliminarMateria)

// router.post("/busqueda/:query", buscarMateria)


module.exports = router;
