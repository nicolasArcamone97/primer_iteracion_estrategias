var models = require("../models");



const obtenerProfesores = (req,res) => {
    models.profesor.findAll({attributes: ["id", "nombre","email"],
    include: [{as:"Materias", model:models.materia, attributes:["id","nombre","id_carrera"]}]
    })
    .then(profesores => res.send(profesores))
    .catch(() => res.sendStatus(500));
}


const crearProfesor = (req,res) => {
    models.profesor
    .create({ nombre: req.body.nombre, email: req.body.email})
    .then(profesor => res.status(201).send({ id: profesor.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
}

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
    models.profesor
      .findOne({
        attributes: ["id", "nombre","email"],
        where: { id }
      })
      .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
      .catch(() => onError());
  };


const obtenerProfesor = (req,res) => {
    findProfesor(req.params.id, {
        onSuccess: profesor => res.send(profesor),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
      });
}


const actualizarProfesor = (req,res) => {
    const onSuccess = profesor =>
    profesor
      .update({ nombre: req.body.nombre, email: req.body.email }, { fields: ["nombre","email"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra materia con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}

const eliminarProfesor = (req,res) => {
    const onSuccess = profesor =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}


module.exports = {
    obtenerProfesores,
    crearProfesor,
    actualizarProfesor,
    obtenerProfesor,
    eliminarProfesor
}