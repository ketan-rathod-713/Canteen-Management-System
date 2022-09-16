const passport = require('passport');
const validPassword = require('./passwordUtils').validPassword;
const LocalStrategy = require('passport-local').Strategy;
const User = require("./dbSchema").User;

// TODO: passport.use();
// First of all for passport local strategy there is standard that the passport has set so follow it.
// Verify call back

// We will be using LocalStratagy and it requires verify callback and it also requires {username, password, done function}
// this values will be populated by the passport.js
// if you do not name your fields as username and password then passport will not be able to know ...
// what we are doing in verify callback => Our own implementation of passport.js
// It doesn't matter what database you use 
// and how you choose verify credentiales but pass values what passport wants

// VERIFY CALLBACK TO GIVE TO PASSPORT
const verifyCallBack = (username, password, done) =>{

    User.findOne({username: username})
        .then((user)=>{

            if(!user){ return done(null, false)}

            const isValid = validPassword(password, user.hash, user.salt)

            if(isValid){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err)=>{
            done(err);
        })
}

const strategy = new LocalStrategy(verifyCallBack)

passport.use(strategy); // Here we are using passport 

// Now add some code that will be used for user to get into session and get out of the session
// PASSPORT WORKS ON SESSIONS
passport.serializeUser((userId, done)=>{
    done(null, userId)
})

passport.deserializeUser((userId, done)=>{
    User.findById(userId)
        .then((user)=>{
            done(null, user)
        })
        .catch((err)=>{
            done(err)
        })
})