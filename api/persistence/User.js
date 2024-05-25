const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      len: [4, 10],
    },
  },
});

module.exports = User;
