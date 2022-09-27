// let array = ["Roti", "Sabji"]

const onClickaddbtn = (menuUlId) => {
  const id = menuUlId.substr(3);
  var list = document.createElement("li");
  list.className = "list-group-item";
  list.style.display = "flex";
  list.style.justifyContent = "space-between";

  var divInsideList = document.createElement("div");
  divInsideList.className = "m-1";

  var input = document.createElement("input");
  input.className = `form-control menuItem${id}`;
  input.value = "";
  input.placeholder = "Menu Item";

  divInsideList.appendChild(input);

  var spanBtns = document.createElement("span");
  var btn = document.createElement("button");
  btn.classList.add("btn", "btn-danger");

  btn.textContent = "Remove";
  spanBtns.append(btn);

  list.appendChild(divInsideList);
  list.appendChild(spanBtns);

  console.log(id);
  document.querySelector(`#menu${id}`).appendChild(list);
};

const onClickRemoveItem = (itemId) => {
  const boxes = document.querySelectorAll(`.${itemId}`);

  boxes.forEach((box) => {
    box.remove();
  });
};

// Post request to update the item menu
const onClickUpdateMenu = (btnId) => {
  console.log(btnId);

  // itemid, name, price, available, Menu (especially)
  const itemId = btnId.substr(6);
  const name = document.getElementById(`name${itemId}`).value;
  const price = document.getElementById(`price${itemId}`).value;
  // const available = document.getElementById(`price${itemId}`).value // Do something here how to know

  const menu = document.querySelectorAll(`.menuItem${itemId}`);

  let menuItems = [];
  console.log(menu);

  menu.forEach((item) => {
    console.log(item.value);
    menuItems.push(item.value);
  });
  console.log(menuItems);

  fetch("http://localhost:3000/items", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      itemId: itemId,
      date: "2022-9-27",
      type: "Dishes",
      name: name,
      menu: menuItems,
      price: price,
      available: true,
      func: "updateItem",
      username: "ketanrtd1@gmail.com",
      password: "123",
    }),
  }).then((response) => {
    console.log(response);
    //do something awesome that makes the world a better place
  });
};


const  onClickAddItem = (btnId)=>{
  console.log(btnId);

  // itemid, name, price, available, Menu (especially)
  const itemId = "newItem";
  const name = document.getElementById(`name${itemId}`).value;
  const price = document.getElementById(`price${itemId}`).value;
  // const available = document.getElementById(`price${itemId}`).value // Do something here how to know

  const menu = document.querySelectorAll(`.menuItem${itemId}`);

  let menuItems = [];
  console.log(menu);

  menu.forEach((item) => {
    console.log(item.value);
    menuItems.push(item.value);
  });
  console.log(menuItems);

  fetch("http://localhost:3000/items", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      itemId: itemId,
      date: "2022-9-27",
      type: "Dishes",
      name: name,
      menu: menuItems,
      price: price,
      available: true,
      func: "addItem", // change here
      username: "ketanrtd1@gmail.com",
      password: "123",
    }),
  }).then((response) => {
    console.log(response);
    //do something awesome that makes the world a better place
  });
}

// fetch("http://localhost:3000/items", {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },

//   //make sure to serialize your JSON body
//   body: JSON.stringify(
//     {
//         "itemId":"3948091f579b",
//         "date": "2022-9-24",
//         "type": "Dish",
//         "name": "Full DIsh",
//         "menu": ["Samosa","Chataney"],
//         "price": 20,
//         "available": false,
//         "func":"addItem",
//         "username":"ketanrtd1@gmail.com",
//         "password":"123"
//       }
//   )
// })
// .then( (response) => {
//     console.log(response)
//    //do something awesome that makes the world a better place
// });
