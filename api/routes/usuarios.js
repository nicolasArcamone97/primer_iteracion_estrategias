var express = require("express");
var router = express.Router();
const { registrarUsuario, autenticarUsuario, obtenerUsuarios} = require('../controllers/usuariosControllers')



router.get('/', obtenerUsuarios)


router.post('/crear-cuenta', registrarUsuario)


router.post('/iniciar-sesion', autenticarUsuario)



module.exports = router;