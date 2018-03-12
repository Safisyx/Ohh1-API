const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
  game: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: 'users',
	timestamps: false
})

module.exports = User
