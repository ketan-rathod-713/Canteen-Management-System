// GENERAL
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
const { isAuth } = require("../middlewares/authMiddleware");

// ROUTER TO EXPORT
const router = express.Router();


// ROUTES
router
.get("/",homeControllers.homePageGetReq)
.get("/signup", homeControllers.signUpGetReq )
.post("/signup",[parseUrl, parseJson] , homeControllers.signUpPostReq)
.get("/login",homeControllers.loginGetReq)
.post('/login',[parseUrl, parseJson],passport.authenticate('local',{failureRedirect: '/login',successRedirect: "/checkout"}))
.get('/logout', function(req, res, next) { // LATER CONVERT IT TO POST REQUEST FOR STANDARD,SO THAT NO ONE ACCIDENTLY DO THIS
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })
.use("/items", isAuth ,itemRoutes)
.use("/checkout", isAuth ,checkoutRoutes)


module.exports = router
