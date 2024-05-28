const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const sequelize = require("../db");
const messages = require("../locales/messages");

exports.signUp = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      message: messages.success.userCreated,
    });
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      const errorsMessage = [];
      error.errors.forEach((e) => {
        errorsMessage.push(e.message);
      });

      res.status(400).json({
        message: errorsMessage,
      });
    } else if (error.name == "SequelizeUniqueConstraintError") {
      res.status(409).json({
        message: messages.errors.validation.emailAlreadyInUse,
      });
    } else {
      res.status(500).json({ message: messages.errors.server });
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const { email = "", password = "" } = req.body;

    errorsMessage = [];
    if (!email) {
      errorsMessage.push(messages.errors.emailNotFound);
    }
    if (!password) {
      errorsMessage.push(messages.errors.passwordNotFound);
    }
    if (errorsMessage.length > 0) {
      return res.status(401).json({
        message: errorsMessage,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: messages.errors.login,
      });
    }

    if (user.password != password) {
      return res.status(401).json({
        message: messages.errors.login,
      });
    }

    const token = generateToken(user.id, user.name);
    res.status(200).json({
      message: messages.success.login,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: messages.errors.server });
  }
};

function generateToken(id, name) {
  const privateKey = fs.readFileSync("./keys/private.key", "utf-8");
  const token = jwt.sign({ id, name }, privateKey, {
    algorithm: "RS256",
    expiresIn: 120,
  });
  return token;
}
