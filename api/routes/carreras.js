var express = require("express");
var router = express.Router();
const {obtenerCarreras, crearCarrera, obtenerCarrera, actualizarCarrera, eliminarCarrera} = require('../controllers/carreraControllers')


router.get("/obtener-carreras", obtenerCarreras)

router.post("/",crearCarrera)

router.get("/:id", obtenerCarrera)

router.put("/:id", actualizarCarrera)

router.delete("/:id", eliminarCarrera)




module.exports = router;
