const Sequelize = require('sequelize')
const sequelize = require('../db')

const Game = sequelize.define('game', {
  user: {
    type: Sequelize.INTEGER
  },

  board: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  },

  locked: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  }
}, {
  tableName: 'games',
	timestamps: false
})

module.exports = Game
