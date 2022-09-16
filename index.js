const express = require("express");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const indexRoutes = require("../server/routes/index")
const morgan = require("morgan");

const app = express();


// GENERAL MIDDLEWARES
app.use(express.static('public'))
app.set("view engine","ejs");
app.use(express.json());
require('dotenv').config();

app.use("/" ,indexRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
