'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      board: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
        defaultValue: [[]]
      },
      locked: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
        defaultValue: [[]]
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
  }
};
