const mongoose = require("mongoose");
const crypto = require("crypto");

const dbSchema = require('../config/dbSchema')
const Item = dbSchema.Item;

module.exports = {
  // GET all the items sorted by date
  // TODO : Sorting with date
  getItems: (req, res) => {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let currDate = year + "-" + month + "-" + day; // today's date automatically from server

    console.log(currDate)

    Item.find({_id: currDate}, function (err, docs) {

      if(docs.length === 0){
      res.render("itemsCart", {items: []})
      } else {
      const items = docs[0].items;
     

      console.log(items)
      res.render("itemsCart", {items: items})
      }
     
    });
  },

  
  getItemsOnDate: (req, res)=>{
    Item.find({_id: req.params.date}, function (err, docs) {
      // res.send(docs);
      res.render("itemsCart")
    });
    
  },

  // ADD, REMOVE, UPDATE item
  postItems: (req, res) => { 
    const { itemId, date, func, name, price, type, available, menu } = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let currDate = day + "-" + month + "-" + year;

    if (func == "addItem") {
      let isDateAddedInDb = true;

      // check if date already in DB
      Item.findById(date, (err, doc) => {
        if (doc == null) isDateAddedInDb = false;
      });

      if (!isDateAddedInDb) {
        const item = new Item({
          _id: date,
          items: [],
        });
        item.save();
      }

      const itemToBeAdded = {
        itemId: crypto.randomBytes(6).toString("hex"),
        type: type,
        name: name,
        menu: menu,
        price: price,
        available: available,
        lastUpdated: dateObj,
      };

      // add validations like if item already added by seeing names of it.
      Item.findByIdAndUpdate(
        date,
        { $push: { items: itemToBeAdded } },
        { new: true, upsert: true },
        function (err, managerparent) {
          if (err) throw err;
          console.log(managerparent); // updated value here
        }
      );
    }

    if (func === "removeItem") {
      // no need to implement now
    }

    if (func === "updateItem") {

      // TODO : add validations on each data items, make middleware for that
      Item.updateOne(
        {_id: date, "items.itemId":itemId},
        {
            $set: {
                "items.$.name": name,
                "items.$.price": price,
                "items.$.type": type,
                "items.$.menu": menu,
                "items.$.available": available,
                "items.$.lastUpdated": new Date(),
               // add other items to update
             }
        },function(err, docs){
          console.log(docs); 
        }
    )
    }
    res.send({
      success: "true",
      message: "post request handled successfuly"
    });
  },
};
