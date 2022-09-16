const express = require("express");
const adminControllers = require("../controllers/admin");

const router = express.Router();

// /admin/...
router
.get("/", adminControllers.getAdminPanel)
.get("/items/:date", adminControllers.getAdminItemsOnDate)
// .post("/items/:date", adminControllers.getAdminItemsOnDate), there is already function for that put that in here or use it from there 


module.exports = router;