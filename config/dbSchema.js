const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    _id: Date,
    items: {
      type: Array, // TO DO : DEFINE PROPER SCHEMA HERE
    },
  });
  
const Item = mongoose.model("Item", itemSchema);
  

// add validations like required and all that to have the consistency in documents
const orderSchema = new mongoose.Schema({
  _id: String, // order Id
  items: Array, // an array of items
  totalAmount: Number,
  status: String, // can i have enum data type here or like that to select
  paymentStatus: String,
  timeWhenOrderPlaced: Date
})

const Order =  mongoose.model("Order", orderSchema);

module.exports = {
    Item: Item,
    Order: Order
}
