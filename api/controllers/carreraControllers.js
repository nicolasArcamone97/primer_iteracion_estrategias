var models = require("../models");



const obtenerCarreras = (req,res) => {
  models.carrera
    .findAll({
      attributes:["id", "nombre", "descripcion", "duracion"],
      include: [{as: "Materias", model: models.materia, attributes: ["id","nombre"]}]
    }).then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
}

  

// const obtenerCarreras = async(req, res) => {
//   const {pagina = 1, elementosPorPagina = 5} = req.query;
  
//   const paginaActual = parseInt(pagina);
//   const elementosPorPaginaInt = parseInt(elementosPorPagina);

//   const offset = (paginaActual - 1) * elementosPorPaginaInt;

//   const options = {
//     limit: elementosPorPaginaInt,
//     offset: offset,
//     attributes: ["id", "nombre", "descripcion", "duracion"],
//     include: [
//       {
//         model: models.materia,
//         attributes: ["id", "nombre"],
//         as: "Materias"
//       }
//     ]
//   };

//   const {count, rows} = await models.carrera.findAndCountAll(options)

//   res.json({
//     status:'success',
//     total:count,
//     carreras:rows
//   })
// }




const crearCarrera = async (req, res) => {
  try {
    const nuevaCarrera = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      duracion: req.body.duracion
    };

    const carrera = await models.carrera.create(nuevaCarrera);

    res.status(201).json({ id: carrera.id, mensaje: 'Carrera agregada exitosamente' });

  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError" && error.parent && error.parent.code === 'ER_DUP_ENTRY') {
      // Manejar el error de duplicado aquí
      res.status(400).send('Bad request: ya existe otra carrera con el mismo nombre');
    } else {
      console.error(`Error al intentar insertar en la base de datos: ${error}`);
      res.sendStatus(500);
    }
  }
};




const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
    models.carrera
      .findOne({
        attributes: ["id", "nombre", "descripcion", "duracion"],
        where: { id }
      })
      .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
      .catch(() => onError());
  };


  
const obtenerCarrera = (req,res) => {
    findCarrera(req.params.id, {
        onSuccess: carrera => res.send(carrera),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
      });
}


const actualizarCarrera = (req,res) => {
    const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre, descripcion: req.body.descripcion, duracion: req.body.duracion }, { fields: ["nombre","descripcion","duracion"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}


const eliminarCarrera = (req,res) => {
    const onSuccess = carrera =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
}


module.exports = {
    obtenerCarreras,
    crearCarrera,
    obtenerCarrera,
    actualizarCarrera,
    eliminarCarrera
}