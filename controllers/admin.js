const express = require("express")
const dbSchema = require('../config/dbSchema')
const Item = dbSchema.Item;

module.exports = {
    getItemsOnDate : (req, res)=>{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let currDate = year + "-" + month + "-" + day;
        console.log(currDate)

    if(req.params.date){
        date = req.params.date;
        Item.find({_id: date }, function (err, doc) {
            console.log(doc)  // Ohk the doc is an array, that's why i was getting errors
            if(typeof doc ==='undefined' || doc.length == 0){
            res.render("itemsOnDate", {itemsToday: [], date: date})
            } else {
                res.render("itemsOnDate", {itemsToday: doc[0]["items"], date: date})
            }
            // res.send(doc[0]["items"])
        });
    } else {
    Item.find({_id: currDate }, function (err, doc) {
        console.log(doc)  // Ohk the doc is an array, that's why i was getting errors
        if(doc.length == 0){
        res.render("itemsOnDate", {itemsToday: [], date: currDate})
        } else {
            res.render("itemsOnDate", {itemsToday: doc[0]["items"], date: currDate})
        }
        // res.send(doc[0]["items"])
    });
    }
    },

    postItemsOnDate : (req, res)=>{
        // need to change singular date, months like 01 or 06 like that
        const date = req.body.date;
        console.log("date is " + typeof date)

        if(date.length == 0){
            res.redirect("/admin/items")
        } 
        else 
        {
        const year = parseInt(date.substr(0,4));
        const month = parseInt(date.substr(5,6));
        const day = parseInt(date.substr(8,9));

        const finalDate = year+"-"+month+"-"+day;
        res.redirect(finalDate);
        }
    }

   , 
    getAdminItemsOnDate : (req, res)=>{
        res.send("get admin panel on date")
    },

    getAdminPanel: (req, res)=>{
        res.render("adminPanel")
    }
}