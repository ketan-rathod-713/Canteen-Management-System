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
  userName: String,
  userEmail: String,
  userPhone: String,
  allItems: Array, // an array of items
  totalAmount: Number,
  orderStatus: String, // can i have enum data type here or like that to select
  paymentStatus: String,
  timeWhenOrderPlaced: Date
})

const Order =  mongoose.model("Order", orderSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean
});

const User = new mongoose.model('User', UserSchema);

module.exports = {
    Item: Item,
    Order: Order,
    User: User
}
