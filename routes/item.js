const express = require("express");
const itemControllers = require("../controllers/items");

const router = express.Router();

router
.get("/", itemControllers.getItems)
.get("/:date", itemControllers.getItemsOnDate)
.post("/", itemControllers.postItems);

module.exports = router;
