const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const sequelize = require("../database/db");
const messages = require("../locales/messages");

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
        args: [4],
        msg: messages.errors.validation.passwordLength,
      },
    },
  },
});

User.createHashedPassword = function (password) {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

User.prototype.checkPassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

module.exports = User;
