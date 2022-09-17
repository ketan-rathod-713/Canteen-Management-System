const express = require("express")
const dbSchema = require('../config/dbSchema')
const Item = dbSchema.Item;

module.exports = {
    getAdminPanel : (req, res)=>{
        let items = [];

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let currDate = year + "-" + month + "-" + day;

        // find items for today's date
    console.log(currDate)
    Item.find({_id: currDate }, function (err, docs) {
        console.log(docs + " just")
        res.render("adminPanel", {itemsToday: docs["items"]})
    });
    },

    getAdminItemsOnDate : (req, res)=>{
        res.send("get admin panel on date")
    }
}