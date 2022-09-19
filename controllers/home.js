const genPassword = require('../config/passwordUtils').genPassword
const User = require("../config/dbSchema").User


module.exports = {
    
    // HOME PAGE
    homePageGetReq : (req, res)=>{
        res.render("home")
    },

    // SIGNUP PAGE
    signUpGetReq : (req, res)=>{
        res.render("signup")
    },

    // GET SIGNUP CREDENTIALS (USERNAME AND PASSWORD)
    signUpPostReq : (req, res, next) => {
        const saltHash = genPassword(req.body.password) // see how to use the custom names for this
        console.log(req.body)
        console.log(req.body.username)
        const salt = saltHash.salt
        const hash = saltHash.hash
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const phone = req.body.phone

        const newUser = new User({
            _id: req.body.username,
            hash: hash,
            salt: salt,
            admin: false, // Right now manually check 
            firstname: firstname,
            lastname: lastname,
            phone: phone
        })
        // check if user exists or not , there may be chances that false user so OTP or like that stuff later
        User.find({_id: req.body.username}, (err, doc)=>{
            console.log(doc +" doc")
            if(doc == null || doc.length === 0){
                newUser.save()
                .then((user)=>{
                console.log(user)
                res.redirect("/login") // go to signIn page 
                })
            } else {
                // res.send(doc)
                res.send("username already exists")
            }
        })

        
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
    },

    // GET PROFILE
    getProfile : (req, res)=>{
        // get other informations from database
        // Only come to this route if authenticated
        const username = req.user._id;
        console.log(username)

        User.find({_id : username },(err, user)=>{
            // i think see it in req.user yes
            console.log(user)
            // don't send all information including salt
            if(user)
            res.render("profile", {user: user[0]})
            
        })
    },

    // POST REQ. UPDATE PROFILE INFORMATION ( CRUCIAL WHEN UPDATING USERNAME OR PASSWORD )
    updateProfile : (req, res)=>{
        const username = req.params.username
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const phone = req.body.phone

        console.log(req.body)
        User.findOneAndUpdate({_id: username}, {firstname:firstname, lastname: lastname, phone: phone}, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.redirect('/profile')
        });
    }
}
