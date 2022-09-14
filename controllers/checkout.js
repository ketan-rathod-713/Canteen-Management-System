const express = require("express");
const https = require("https");
const qs = require("querystring");
const crypto = require("crypto");
const config = require("../Paytm/config")
const checksum_lib = require("../Paytm/checksum")
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
const Order = require("../config/dbSchema").Order;

module.exports = {
    // It is getting items (add to cart) values and now our work is to procced for payments and order  stuff
    payNow :  (req, res) => {
        // Route for making payment
        // need to add dates for the items before placing order so that user can't order items that doesn't exist now
        const allItems = [{      
            "itemId": "44f93222e56d",
            "type": "Lunch",
            "name": "Dinner Full Dish",
            "menu": [
            "Roti",
            "Sabji",
            "Sabji",
            "Chas",
            "Salad"
            ],
            "price": 50,
            "available": true,
            "lastUpdated": "2022-09-13T13:51:46.445Z"
                    },
        {
            "itemId": "cc3ad60ddc15",
            "type": "Dinner",
            "name": "Dinner Half Dish",
            "menu": [
            "Roti",
            "Sabji"
            ],
            "price": 30,
            "available": true,
            "lastUpdated": "2022-09-13T13:52:35.588Z"
            },
    ];
    const totalAmount = 1; //default

        const orderId = crypto.randomBytes(12).toString('hex');
        const currTime = new Date();
        const orderDetails = {
            orderId : orderId,
            totalAmount : totalAmount,
            allItems: allItems,
            paymentStatus: "pending",
            paymentStatus: "pending",
            timeWhenOrderPlaced: currTime
        }

        console.log(orderDetails)

        var paymentDetails = {
          amount: req.body.amount,
          customerId: "@" + req.body.name,
          customerEmail: req.body.email,
          customerPhone: req.body.phone,
        };
        if (
          !paymentDetails.amount ||
          !paymentDetails.customerId ||
          !paymentDetails.customerEmail ||
          !paymentDetails.customerPhone
        ) { // If one of them is not present
          res.status(400).send("Payment failed");
        } else { // send request to the paytm's server from our server
          var params = {}; // make an params object
          params["MID"] = config.PaytmConfig.mid;
          params["WEBSITE"] = config.PaytmConfig.website;
          params["CHANNEL_ID"] = "WEB";
          params["INDUSTRY_TYPE_ID"] = "Retail";
          params["ORDER_ID"] = "TEST_" + new Date().getTime();  // we have made this ?? how can we use it.
          params["CUST_ID"] = paymentDetails.customerId;
          params["TXN_AMOUNT"] = paymentDetails.amount; // we are passing this
          params["CALLBACK_URL"] = "http://localhost:4000/callback"; // callback to call when payment done or success so need to add entries in database when such event occurs
          params["EMAIL"] = paymentDetails.customerEmail;
          params["MOBILE_NO"] = paymentDetails.customerPhone; 
      
          // in my case user cann't temper anything i will change everything
          checksum_lib.genchecksum(
            params,
            config.PaytmConfig.key,
            function (err, checksum) {
              var txn_url =
                "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
              // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
      
              var form_fields = "";
              for (var x in params) {
                form_fields +=
                  "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
              }
              form_fields +=
                "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
      
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(
                '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
                  txn_url +
                  '" name="f1">' +
                  form_fields +
                  '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
              );
              res.end();
            }
          );
        }
    },

    }