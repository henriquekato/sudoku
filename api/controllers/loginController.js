const User = require("../models/User");
const sequelize = require("../db");

const messages = require("../locales/messages")

exports.signUp = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      message: messages.sucess.userCreated,
    });
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      const errorsMessage = [];
      error.errors.forEach((e) => {
        errorsMessage.push(messages.errors.validation[e.path]);
      });

      res.status(400).json({
        message: errorsMessage,
      });
    } else if (error.name == "SequelizeUniqueConstraintError") {
      res.status(409).json({
        message: messages.errors.emailAlreadyInUse,
      });
    } else {
      res.status(500).json({ message: messages.errors.server });
    }
  }
};
