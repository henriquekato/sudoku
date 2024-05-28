const express = require("express");
require("dotenv").config();

const router = require("./routes");
const db = require("./persistence/db");

(async () => {
  await db.sync({ force: true });
})();

const app = express();

app.use(router);

const port = 8000;
app.listen(port);
