const passport = require('passport');
const validPassword = require('./passwordUtils').validPassword;
const LocalStrategy = require('passport-local').Strategy;
const User = require("./dbSchema").User;

// We will be using LocalStratagy and it requires verify callback
// username, password GIVEN FROM FORM (SAME NAME) and done is the callback function that it wants
// This values populated by passport js

// VERIFY CALLBACK TO GIVE TO PASSPORT
const verifyCallBack = (username, password, done) =>{

    User.findOne({_id: username})
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