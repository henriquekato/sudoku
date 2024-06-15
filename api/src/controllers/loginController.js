const fs = require("fs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const sequelize = require("../database/db");
const messages = require("../locales/messages");

exports.signUp = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      success: messages.success.userCreated,
    });
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      const errorsMessage = [];
      error.errors.forEach((e) => {
        errorsMessage.push(e.message);
      });

      res.status(400).json({
        errors: errorsMessage,
      });
    } else if (error.name == "SequelizeUniqueConstraintError") {
      res.status(409).json({
        errors: [messages.errors.validation.emailAlreadyInUse],
      });
    } else {
      res.status(500).json({ errors: [messages.errors.server] });
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
        errors: errorsMessage,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: [messages.errors.login],
      });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({
        errors: [messages.errors.login],
      });
    }

    const token = generateToken(user.id, user.name);
    res.status(200).json({
      success: messages.success.login,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ errors: [messages.errors.server] });
  }
};

function generateToken(id, name) {
  const privateKey = fs.readFileSync("./src/keys/private.key", "utf-8");
  const token = jwt.sign({ id, name }, privateKey, {
    algorithm: "RS256",
    expiresIn: 1800,
  });
  return token;
}
