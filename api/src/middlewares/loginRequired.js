const fs = require("fs");
const jwt = require("jsonwebtoken");

const messages = require("../locales/messages");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({
      message: messages.errors.headerNotFound,
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: messages.errors.tokenNotFound,
    });
  }

  const publicKey = fs.readFileSync("./src/keys/public.key", "utf-8");
  jwt.verify(token, publicKey, { algorithm: "RS256" }, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: messages.errors.invalidToken,
      });
    }
    res.locals.user = { id: decoded.id, name: decoded.name };
    next();
  });
};
