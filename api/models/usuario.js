'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nombre: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: DataTypes.STRING,
      required:true,
    }
  }, {});


  
  usuario.associate = function(models) {
    // associations can be defined here
  };
  
  return usuario;
};