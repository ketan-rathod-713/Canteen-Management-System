const genPassword = require('../config/passwordUtils').genPassword
const User = require("../config/dbSchema").User

module.exports = {
    homePageGetReq : (req, res)=>{
        res.send("welecome to my canteen")
    },

    signUpGetReq : (req, res)=>{
        res.render("signup")
    },

    signUpPostReq : (req, res, next) => {
        const saltHash = genPassword(req.body.password) // see how to use the custom names for this
    
        const salt = saltHash.salt
        const hash = saltHash.hash
    
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
            admin: false // Right now manually check 
        })
    
        // check if user exists or not , there may be chances that false user so OTP or like that stuff later
        newUser.save()
        .then((user)=>{
            console.log(user)
        })
    
        res.redirect("/") // go to signIn page 
     },

    loginGetReq : (req, res)=>{
        res.render("login")
    },

    loginPostReq : (req, res)=>{
        // NO NEED AS PASSPORT HANDLES THAT 
    }
}
