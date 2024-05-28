const { Model, DataTypes } = require("sequelize");

const sequelize = require("../db");
const messages = require("../locales/messages")

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
    validate: {
      notEmpty: {
        msg: messages.errors.validation.emptyName,
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      isEmail: {
        msg: messages.errors.validation.invalidEmail,
      },
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    validate: {
      len: {
        args: [4, 10],
        msg: messages.errors.validation.passwordLength,
      },
    },
  },
});

module.exports = User;
