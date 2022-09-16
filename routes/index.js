const express = require("express");
const passport = require('passport');

// FOR FORM DATA
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

// ROUTES
const itemRoutes = require("./item")
const checkoutRoutes = require("./checkout")

// CONTROLLERS
const homeControllers = require("../controllers/home");
const home = require("../controllers/home");

const router = express.Router();


router
.get("/",homeControllers.homePageGetReq)
.get("/signup", homeControllers.signUpGetReq )
.post("/signup",[parseUrl, parseJson] , homeControllers.signUpPostReq)
.get("/login",homeControllers.loginGetReq)
.post('/login',passport.authenticate('local',{failureRedirect: '/login-failure',successRedirect: "/login-success"}))
.use("/items",itemRoutes)
.use("/checkout",checkoutRoutes)


module.exports = router
