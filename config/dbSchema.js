const mongoose = require("mongoose")

// SCHEMAS ( NEED TO REFACTOR TO REQUIRED SOME OF THEM )

// ITEM ( FOR FOOD ITEMS )
const itemSchema = new mongoose.Schema({
    _id: Date,
    items: {
      type: Array, 
    },
  });
  
const Item = mongoose.model("Item", itemSchema);
  

// ORDER ( FOR ORDER OF ARRAY OF ITEMS )
const orderSchema = new mongoose.Schema({
  _id: String, // ORDER ID
  userName: String,
  userEmail: String,
  userPhone: String,
  allItems: Array, // ARRAY OF ITEMS (FIX)
  totalAmount: Number,
  orderStatus: String, // CAN I HAVE ENUM HERE 
  paymentStatus: String,
  timeWhenOrderPlaced: Date
})

const Order =  mongoose.model("Order", orderSchema);

// USER ( CUSTOMER WHO GOING TO BUY ITEMS )
const UserSchema = new mongoose.Schema({
  _id: String, // IT IS USERNAME
  hash: String,
  salt: String,
  admin: Boolean,
  firstname: String,
  lastname: String,
  phone: String,
});

const reviewSchema = new mongoose.Schema({
  _id: String,
  review: String
})

const User = new mongoose.model('User', UserSchema);

// ____________________________________________________________________________________________________________________________________

module.exports = {
    Item: Item,
    Order: Order,
    User: User
}
