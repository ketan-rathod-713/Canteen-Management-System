## Hackathon

### Problem Statement
    Sachivalaya has canteens within campus premises.
    Employees in Sachivalaya needs information about all available items in canteens and give the order for the items directly through online mobile application.
    The online payment of item purchased should also be supported through the application. 
    Officers with KOT (Kitchen Order Ticket) within 5000 Rs/Year should be supported by the application. The individual canteen wallet support is required in the application.
    Employees can also book the order in advance for purchasing items in bulk. Employees can also give rating for the food items supplied to improve the quality of the items.
    The canteen should supply the item purchased by employee with order closure.
    
### Solution

### Tech Stack Used 
- Nodejs, mongodb, html, css, javascript, ejs 
- passport, bootstrap, paytm gatway

### Solution 

### Modules
We can divide our problems into four major sections. 
  1. Admin 
  2. User
  3. Order/Payment
  4. General stuff
#### Admin
Admin will be able to manage the items, reviews, users, orders and much more.

- Routes Implemented
    - GET localhost:3000/admin : Show admin panel
    - GET & POST localhost:3000/admin/items : Show today's items inventary. Add/Update Items.
    - GET localhost:3000/admin/orders : Show all the orders to be handled and take appropriate action on each of them.
    - GET localhost:3000/admin/users : Show all the users with their appropriate information and remove/update user information.

#### User
User will be able to see menu items and able to order and pay for it. 
- Routes Implemented
    - GET localhost:3000/profile : Show User Profile if logged in.
    - POST localhost:3000/profile : Update User Profile if logged in.
    - GET localhost:3000/items : Show all the items that user can order today at this time.
    - GET localhost:3000/orders : Show all past and current orders of user.

#### Order/Payment
Once this module got the data of the total amount and order details, It will generate order and proceeds for payment.
- Routes Implemented
    - POST localhost:3000/checkout : send data of order and it will do it's job
    - GET localhost:3000/checkout/order/:orderId : after successfull/failure transaction, user will be redirected here to see the status of transaction. POST Req. to update the order details later.
 
#### General Stuff
Showing beautiful UI and information about canteen. Also adding authentication services inside here.
- Routes Implemented
    - GET localhost:3000/ : Get the home page of our canteen.
