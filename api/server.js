const express = require("express");
const router = require("./routes");
const createDatabase = require("./persistence/createDatabase");

(async () => {
  await createDatabase();
})();

const app = express();

app.use(router);

const port = 8000;
app.listen(port);
