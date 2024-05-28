const express = require("express");
const router = express.Router();

const loginController = require("./controllers/loginController");
const boardController = require("./controllers/boardController");

const loginRequired = require("./middlewares/loginRequired");
const endpointNotFound = require("./middlewares/endpointNotFound");

router.post("/signup", express.json(), loginController.signUp);
router.post("/login", express.json(), loginController.login);

router.get("/board/ids", loginRequired, boardController.ids);
router.get("/board/:id", loginRequired, boardController.getBoardById);
router.post("/board/create", loginRequired, express.json(), boardController.create);
router.put("/board/edit/:id", loginRequired, express.json(), boardController.edit);
router.delete("/board/delete/:id", loginRequired, boardController.delete);

router.use(endpointNotFound);

module.exports = router;
