module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('carreras', 'duracion', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('carreras', 'descripcion', {
        type: Sequelize.TEXT
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('carreras', 'duracion'),
      queryInterface.removeColumn('carreras', 'descripcion')
    ]);
  }
};
