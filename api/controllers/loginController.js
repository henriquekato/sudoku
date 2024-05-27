const User = require("../persistence/User");
const sequelize = require("../persistence/db");

const customErrorMessages = {
  name: "O nome não pode estar vazio.",
  email: "O endereço de e-mail não é válido.",
  password: "A senha deve conter pelo menos 4 caracteres",
};

exports.signUp = async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      message: "Cadastro feito com sucesso",
    });
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      const errorsMessage = [];
      error.errors.forEach((e) => {
        errorsMessage.push(customErrorMessages[e.path]);
      });

      res.status(400).json({
        message: errorsMessage,
      });
    } else if (error.name == "SequelizeUniqueConstraintError") {
      res.status(409).json({
        message: "Email já cadastrado, informe outro",
      });
    } else {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};
