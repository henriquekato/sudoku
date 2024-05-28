const express = require("express");
const router = express.Router();

const loginController = require("./controllers/loginController");
const loginRequired = require("./middlewares/loginRequired");

const endpointNotFound = require("./middlewares/endpointNotFound");

router.post("/signup", express.json(), loginController.signUp);
router.post("/login", express.json(), loginController.login);

router.use(endpointNotFound);

module.exports = router;
