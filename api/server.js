const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(router);

const port = 8000;
app.listen(port);
