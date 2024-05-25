const Sequelize = require("sequelize");
const bd = require("./bd");
const Board = require("./Board");
const User = require("./User");

const Game = bd.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  completionTime: {
    type: Sequelize.TIME,
    allowNull: false,
    primaryKey: false,
  },
});

Game.belongsTo(User);
Game.belongsTo(Board);

module.exports = Game;
