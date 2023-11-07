'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING,
    duracion: DataTypes.INTEGER, 
    descripcion: DataTypes.TEXT 
  }, {});

  carrera.associate = function(models) {
    carrera.hasMany(models.materia, {
      foreignKey: 'id_carrera', 
      as: 'Materias' 
    });
  };

  return carrera;
};