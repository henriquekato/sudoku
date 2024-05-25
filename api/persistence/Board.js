const Sequelize = require("sequelize");
const bd = require("./bd");
const Difficulty = require("./Difficulty");

const Board = bd.define("board", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  matrix: {
    type: Sequelize.JSON,
    allowNull: false,
    primaryKey: false,
  },
});

module.exports = Board;
