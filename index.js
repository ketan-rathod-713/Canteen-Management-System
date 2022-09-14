const express = require("express");
const app = express();
const itemRoutes = require("../server/routes/item");
const checkoutRoutes = require("../server/routes/checkout");
const ejs = require("ejs");
const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
