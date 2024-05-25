const Sequelize = require("sequelize");
const bd = require("./bd");

const User = bd.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      len: [4, 10],
    },
  },
});

module.exports = User;
