const express = require("express");
const dbSchema = require('../config/dbSchema');
const Usr = dbSchema.Order;

module.exports={

getHistory: (req, res)=>{
    console.log(req.user._id)

    const user = req.user._id

    Usr.find({userEmail: user}, function(err,docs){
    if(!err){
        res.render("client",{data: docs})
    }
    else{
        res.send("Something went wrong");
    }

})
}
}

