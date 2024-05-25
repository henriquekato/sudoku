const Sequelize = require("sequelize");
const bd = require("./bd");

const Difficulty = bd.define("difficulty", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
  },
});

module.exports = Difficulty;
