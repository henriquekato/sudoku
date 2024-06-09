const messages = require("../locales/messages")

module.exports = (req, res, next) => {
  res.status(404).json({
    message: messages.errors.endpointNotFound,
  });
};
