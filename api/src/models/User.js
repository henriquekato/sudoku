const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const sequelize = require("../database/db");
const messages = require("../locales/messages");
const { Hooks } = require("sequelize/lib/hooks");

const User = sequelize.define(
  "user",
  {
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
      type: DataTypes.VIRTUAL,
      allowNull: false,
      primaryKey: false,
      validate: {
        len: {
          args: [4],
          msg: messages.errors.validation.passwordLength,
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate(user) {
        const salt = bcryptjs.genSaltSync();
        user.passwordHash = bcryptjs.hashSync(user.password, salt);
      },
    },
  }
);

User.createHashedPassword = function (password) {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

User.prototype.checkPassword = function (password) {
  return bcryptjs.compareSync(password, this.passwordHash);
};

module.exports = User;
