const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Board = sequelize.define("board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  matrix: {
    type: DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
});

module.exports = Board;
