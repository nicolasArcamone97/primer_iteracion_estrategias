'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuarios', 'email', {
      type: Sequelize.STRING,
      unique: true,
      lowercase: true,
      trim: true,
    }).then(() => {
      return queryInterface.addColumn('usuarios', 'password', {
        type: Sequelize.STRING,
        required:true,
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('usuarios', 'email').then(() => {
      return queryInterface.removeColumn('usuarios', 'password');
    });
  }
};

