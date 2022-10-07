const express = require("express");
const adminControllers = require("../controllers/admin");
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
const router = express.Router();

// /admin/...
router
.get("/items", adminControllers.getItemsOnDate)
.get("/items/:date", adminControllers.getItemsOnDate)
.post("/items/date",[parseUrl, parseJson] ,adminControllers.postItemsOnDate) // to get date wise data
// .post("/items/:date", adminControllers.getAdminItemsOnDate), there is already function for that put that in here or use it from there 
.get("/",adminControllers.getAdminPanel)

module.exports = router;