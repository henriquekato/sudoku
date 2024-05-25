const express = require("express");
const router = require("./routes");

const app = express();

app.use(router);

const port = 8000;
app.listen(port);
