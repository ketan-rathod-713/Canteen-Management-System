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
        filename: "data:image/png;base64,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"
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
