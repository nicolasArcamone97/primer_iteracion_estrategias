var models = require("../models");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const obtenerUsuarios = (req,res) => {
    models.usuario.findAll({
        attributes: ["id", "nombre","email","password"]
    })
    .then(usuarios => res.send(usuarios))
    .catch(() => res.sendStatus(500));
}




const registrarUsuario = async (req,res) => {
    // leer los datos del usuario y colocarlo en usuarios
    const usuario = new models.usuario(req.body);

    // hasheo de password
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: "Usuario creado correctamente"})
    } catch(error) {
        console.log(error);
        res.json({mensaje: "Hubo un error"})
    }
}





const autenticarUsuario = async (req, res) => {
    try {
        // Buscar usuario
        const usuario = await models.usuario.findOne({ where: { email: req.body.email } });

        if (!usuario) {
            // Si el usuario no existe
            return res.status(401).json({ mensaje: "Ese usuario no existe" });
        }

        // El usuario existe, verificar si el password es correcto o incorrecto
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            // Si el usuario existe pero el password es incorrecto
            return res.status(401).json({ mensaje: "Password Incorrecto" });
        }

        // Password correcto, firma de token
        const token = jwt.sign({
            email: usuario.email,
            nombre: usuario.nombre,
            id: usuario.id
        }, 'LLAVESECRETA', {
            expiresIn: '1h'
        });

        // Retornar el token
        return res.json({ token });
    } catch (error) {
        // Manejar errores inesperados
        console.error(error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}


module.exports = {
    registrarUsuario,
    autenticarUsuario,
    obtenerUsuarios
}