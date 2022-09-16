const genPassword = require('../config/passwordUtils').genPassword
const User = require("../config/dbSchema").User


module.exports = {
    
    // HOME PAGE
    homePageGetReq : (req, res)=>{
        res.send("welecome to my canteen")
    },

    // SIGNUP PAGE
    signUpGetReq : (req, res)=>{
        res.render("signup")
    },

    // GET SIGNUP CREDENTIALS (USERNAME AND PASSWORD)
    signUpPostReq : (req, res, next) => {
        const saltHash = genPassword(req.body.password) // see how to use the custom names for this
    
        const salt = saltHash.salt
        const hash = saltHash.hash
    
        const newUser = new User({
            _id: req.body.username,
            hash: hash,
            salt: salt,
            admin: false // Right now manually check 
        })
    
        // check if user exists or not , there may be chances that false user so OTP or like that stuff later
        User.find({_id: req.body.username}, (err, doc)=>{
            if(doc == null){
                newUser.save()
                .then((user)=>{
                console.log(user)
                })
            }
        })

        res.redirect("/") // go to signIn page 
    },
    
    // LOGIN PAGE
    loginGetReq : (req, res)=>{
        res.render("login")
    },

    // GET LOGIN CREDENTIALS ( USERNAME AND PASSWORD )
    loginPostReq : (req, res)=>{
        // NO NEED AS PASSPORT HANDLES THAT 
    },

    // LOGOUT POST REQ.
    logOut : (req, res, next) => {
        req.logout(); // USING PASSPORT
        res.redirect('/');
    }
}
