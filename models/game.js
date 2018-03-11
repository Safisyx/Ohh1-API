'use strict';
module.exports = (sequelize, DataTypes) => {
  var game = sequelize.define('game', {
    users: DataTypes.INTEGER,
    board: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
    locked: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER))
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};

//str.slice(2,-2).split('],[').map(s=> s.split(',').map(v=>parseInt(v)))
