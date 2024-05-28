const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Board = require("./Board");
const User = require("./User");

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  completionTime: {
    type: DataTypes.TIME,
    allowNull: false,
    primaryKey: false,
  },
});

Game.belongsTo(User);
Game.belongsTo(Board);

module.exports = Game;
