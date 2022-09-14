## Canteen Management System

### Server
Whole processes can be divided into following sub tasks <br>
1. Items ( Show array of items for given date, update items using date, itemId or whatever admin wants to do ) <br>
2. Add Items in cart and checkout and send all details to server wheather to do payment or not, if fine then do.<br>
3. Order ( Once user paid money make order and order id ).<br>
4. Once user got all items then let admin confirm that this orderid got food.<br>
5. Reviews ( itemId, array of reviews, name , stude id, review string, review id )<br>

### Run Server On Local Environment
#### 1. download/clone this project 
#### 2. npm install ( in directory ..../server/)
#### 3. npm run dev ( it will start development server on port 3000 ), Now explore all the routes.

### Items

- /items GET : To retrieve all the Object of dates with array of items embedded inside it. <br>
- /items/:date GET : get all the items available on specific date <br>
- /items POST :  <br>
There are three things that admin can do :  <br>
    1. addItem : add a brand new item to specific date<br>
    2. removeItem : remove specific item on specific date with given id, item id given<br>
    3. updateItem : update the given item on specific date with given id, item id given<br>

NOTE : Only admin should able to use this route.<br>

### It requires following data from admin accordingly 

-   const { itemId, date, func, name, price, type, available, menu } = req.body; // server will get req.body from client using post request<br>


Here we are passing func(simply think function) to let our server know what we want to do.<br>

###

1. addItem : 
if (func == "addItem")<br>
If document of date is not there in database then add it with empty items array.
Then to add item just push item in it each time with given date as id with new itemId.
TODO : Add validation on name, date and all informations, see if added correctly.

###

2. removeItem : 
if (func == "removeItem")

###

3. updateItem :
func == "updateItem"<br>
- Update the given itemId data.


### checkout
send all details to server regarding the order and make orderId for that then proceed to payments page.
and start payment if successfull then let it be store all that info.<br>

checkout -> make order with id -> payment with that orderId -> check payment status -> if failed then cancel order -> if successful then order in ongoing state..<br>

/orders/paynow POST  Make order here it self and redirect to do further transaction 
/orders/orderId GET show the whole order information
