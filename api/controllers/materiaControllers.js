var models = require("../models");

const obtenerMaterias = (req,res) => {
  models.materia.findAll({
    attributes: ["id", "nombre", "id_carrera"],
    include: [
      {
        as: "Carrera-Relacionada",
        model: models.carrera,
        attributes: ["id", "nombre", "descripcion", "duracion"]
      },
      {
        as: "Profesor-Relacionado",
        model: models.profesor,
        attributes: ["id", "nombre", "email"]
      }
    ]
  })
    .then(materias => res.send(materias))
    .catch(() => res.sendStatus(500));
}


const crearMateria = (req,res) => {
    models.materia
    .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera, id_profesor: req.body.id_profesor})
    .then(materia => res.status(201).send({ id: materia.id }))
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


const findMateria = (id, { onSuccess, onNotFound, onError }) => {
    models.materia
      .findOne({
        attributes: ["id", "nombre","id_carrera","id_profesor"],
        where: { id }
      })
      .then(materia => (materia ? onSuccess(materia) : onNotFound()))
      .catch(() => onError());
  };



const obtenerMateria = (req,res) => {
    findMateria(req.params.id, {
        onSuccess: materia => res.send(materia),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
      });
}


const actualizarMateria = (req,res) => {
    const onSuccess = materia =>
    materia
      .update({ nombre: req.body.nombre, id_carrera: req.body.id_carrera, id_profesor: req.body.id_profesor }, { fields: ["nombre","id_carrera","id_profesor"] })
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
    findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}


const eliminarMateria = (req, res) => {
    const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}


module.exports = {
    obtenerMaterias,
    crearMateria,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
}