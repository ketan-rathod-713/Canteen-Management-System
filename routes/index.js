// GENERAL
const express = require("express");
const passport = require('passport');

// FOR FORM DATA
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

// ROUTES
const itemRoutes = require("./item")
const checkoutRoutes = require("./checkout")
const adminRoutes = require("./admin")

// CONTROLLERS
const homeControllers = require("../controllers/home");
const home = require("../controllers/home");
const client = require("../controllers/client");
const { isAuth } = require("../middlewares/authMiddleware");
const { getHistory } = require("../controllers/client");

const uploadController = require("../controllers/upload");


// ROUTER TO EXPORT
const router = express.Router();
// ROUTES
router
.get("/",homeControllers.homePageGetReq)
.get("/signup", homeControllers.signUpGetReq )
.post("/signup",[parseUrl, parseJson] , homeControllers.signUpPostReq)
.get("/login",homeControllers.loginGetReq)
.post('/login',[parseUrl, parseJson],passport.authenticate('local',{failureRedirect: '/login',successRedirect: "/"}))
.get('/logout', function(req, res, next) { // LATER CONVERT IT TO POST REQUEST FOR STANDARD,SO THAT NO ONE ACCIDENTLY DO THIS
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })
.get("/profile",isAuth,  homeControllers.getProfile)
.get("/client", getHistory)
.post("/profile/:username",[parseUrl, parseJson] , isAuth, homeControllers.updateProfile)
.use("/items", isAuth ,itemRoutes)
.use("/checkout", isAuth ,checkoutRoutes)
.use("/admin", adminRoutes)


.post("/upload",isAuth, uploadController.uploadFiles)
.get("/images", isAuth, uploadController.getListFiles)
.get("/images/api",uploadController.getIndex)// to get the api
.get("/images/:name", isAuth, uploadController.download)// can i use this image on home page may be
.get("/images/:name/delete", isAuth, uploadController.deleteImage)
.get("/trial",uploadController.downloadAll)


.post("/upload",isAuth, uploadController.uploadFiles)
.get("/images", isAuth, uploadController.getListFiles)
.get("/images/api",uploadController.getIndex)// to get the api
.get("/images/:name", isAuth, uploadController.download)// can i use this image on home page may be
.get("/images/:name/delete", isAuth, uploadController.deleteImage)
.get("/trial",uploadController.downloadAll)
module.exports = router
