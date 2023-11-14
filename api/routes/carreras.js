var express = require("express");
var router = express.Router();
const carreraControllers = require('../controllers/carreraControllers')


// middle para proteger rutas

const auth = require('../middleware/auth')




router.get("/", auth ,carreraControllers.obtenerCarreras)

router.post("/", carreraControllers.crearCarrera)

router.get("/:id", carreraControllers.obtenerCarrera)

router.put("/:id", carreraControllers.actualizarCarrera)

router.delete("/:id", carreraControllers.eliminarCarrera)


module.exports = router;
