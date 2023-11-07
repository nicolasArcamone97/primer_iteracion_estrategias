module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('materia', 'id_profesor', {
        type: Sequelize.INTEGER 
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('materia', 'id_profesor')
    ]);
  }
};