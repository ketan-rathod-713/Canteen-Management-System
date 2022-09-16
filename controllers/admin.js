const express = require("express")

module.exports = {
    getAdminPanel : (req, res)=>{
        res.render("adminPanel")
    },

    getAdminItemsOnDate : (req, res)=>{
        res.send("get admin panel on date")
    }
}