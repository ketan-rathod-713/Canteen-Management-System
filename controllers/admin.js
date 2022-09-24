const express = require("express")
const dbSchema = require('../config/dbSchema')
const Item = dbSchema.Item;

module.exports = {
    getAdminPanel : (req, res)=>{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let currDate = year + "-" + month + "-" + day;
        console.log(currDate)

    Item.find({_id: currDate }, function (err, doc) {
        console.log(doc)  // Ohk the doc is an array, that's why i was getting errors
       
        res.render("adminPanel", {itemsToday: doc[0]["items"]})
        // res.send(doc[0]["items"])
    });
    },

    getAdminItemsOnDate : (req, res)=>{
        res.send("get admin panel on date")
    }
}