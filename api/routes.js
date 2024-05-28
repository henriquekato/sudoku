const express = require("express");
const router = express.Router();

const loginController = require("./controllers/loginController");

router.post("/signup", express.json(), loginController.signUp);

module.exports = router;
