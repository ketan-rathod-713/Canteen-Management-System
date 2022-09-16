const express = require("express");
const ejs = require("ejs");
const indexRoutes = require("./routes/index")
const morgan = require("morgan");
const mongoose = require("mongoose")

const session = require('express-session');
var passport = require('passport');
const MongoStore = require('connect-mongo'); // Package documentation - https://www.npmjs.com/package/connect-mongo

const db = require("./config/db").dev
// const db = require("../server/config/db").prod

mongoose.connect(db.database);

const app = express();

// GENERAL MIDDLEWARES
app.use(express.static('public'))
app.set("view engine","ejs");
app.use(express.json());
require('dotenv').config();

// AUTHENTICATION STUFF : 
// MAKE SESSION, SO THAT PASSPORT WORK LATER
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING
})

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, 
  store: sessionStore, // store this item at session store or retrieve from here
  cookie: { // we are storing session id as cookie in browser with expires property with  3 day
      maxAge: 1000* 60* 60* 24 * 10
  }
}));

require('./config/passport');

app.use(passport.initialize()); // CHANCES OF SESSION EXPIRE SO RESTART IT EACH TIME
app.use(passport.session());

// GOOD EXAMPLE TO UNDERSTAND PASSPORT AND SESSION
app.use((req, res, next)=>{
    console.log(req.session) // express sessions make this
    console.log(req.user) // passport do this
    next()
})

// ROUTES
app.use("/" ,indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// to dos with express session middleware , request session persisted in database in sessions collection
// They both work together and what they are going to do 
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045
