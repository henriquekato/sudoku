const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(cors());
app.use(router);

const port = 8000;
app.listen(port);
