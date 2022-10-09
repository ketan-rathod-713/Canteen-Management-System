// here ar esome of the bugs which are left to solve
// 1- if quantity is 0 then also if we click on add item button then it add that item.
// 2- we have to add a button on bill side through which we can remove the dish from the bill.

const decrease = (itemNumber) => {
  var itemval = document.getElementById(itemNumber);
  if (itemval.value <= 0) {
    itemval.value = 0;
    alert("Negative quantity not allowed");
  } else {
    itemval.value = parseInt(itemval.value) - 1;
  }
};

const increase = (itemNumber) => {
  var itemval = document.getElementById(itemNumber);
  if (itemval.value >= 5) {
    itemval.value = 5;
    alert("max 5 allowed");
  } else {
    itemval.value = parseInt(itemval.value) + 1;
  }
};

let arr = [];

function addDish(element) {
  console.log(element);
  let totalAmount = 0;

  let price = document.querySelector(`#price${element}`).innerHTML;
  let quantity = document.querySelector(`#q${element}`);
  quantity.defaultValue = 0;
  let title = document.getElementById(`name${element}`).innerHTML;

  if(quantity.value == 0){
    alert("Add at least 1 item");
  }

  else{
  if (arr == null) {
    arr.push({
      id: element,
      t: title,
      p: Number(price),
      q: Number(quantity.value),
      r: 0,
    });
  }

  let found = 0;

  arr.forEach((ele) => {
    if (ele.id == element) {
      if((Number(ele.q) + Number(quantity.value))>5){
        alert("Maximum 5 items only.");
        ele.q = 5;
      } else {
      ele.q = Number(ele.q) + Number(quantity.value);
      }
      found = 1;
    }
  });

  if (found == 1) {
  } else {
    arr.push({
      id: element,
      t: title,
      p: Number(price),
      q: quantity.value,
      r: 0,
    });

  document.getElementById("StringData").value = JSON.stringify({arr});
  }

  document.getElementById("appendHere").innerHTML = "";
let removeCount = 0;
  arr.forEach((ele) => {
    ele.r = removeCount;
    
    let billElem = document.createElement("div");
    billElem.innerHTML = `<h4>${ele.t}</h4>
  <div>
      <div>Price :  ${ele.p}</div>
      <div>Quantity : ${ele.q}</div>
      <button class="btn btn-primary" onclick="removeDish(${removeCount})">🗑️</button>
  </div>`;
    billElem.className = "billItems";
    document.querySelector("#appendHere").append(billElem);
    totalAmount = totalAmount + ele.q * ele.p;

    quantity.value = 0;
    removeCount++;
  });

  let productTotal = document.getElementById("product_total_amt");
  let grandTotal = document.getElementById("total_cart_amt");

  productTotal.innerHTML = ` ${totalAmount}`;
  grandTotal.innerHTML = ` ${totalAmount}`;
  }
}



function removeDish(element){
  console.log(element)
  let totalAmount = 0;

  let count = 0;
  arr.forEach((ele) => {
    if (ele.r == element) {
      console.log(ele.q);
      arr.splice(count,1);
    }
    count++;
  });
  document.getElementById("StringData").value = JSON.stringify({arr});
  console.log(arr);
  document.getElementById("appendHere").innerHTML = "";
  console.log('hello')

  let removeCount = 0;
  arr.forEach((ele) => {
    let billElem = document.createElement("div");
    billElem.innerHTML = `<h4>${ele.t}</h4>
  <div>
      <div>Price :  ${ele.p}</div>
      <div>Quantity : ${ele.q}</div>
      <button class="page-link btn" onclick="removeDish(${removeCount})"> 🗑️</button>
     
  </div>`;
    billElem.className = "billItems";
    // billElem.id = `r${element}`
    document.querySelector("#appendHere").append(billElem);
    totalAmount = totalAmount + ele.q * ele.p;

    // quantity.value = 0;
  });

  let productTotal = document.getElementById("product_total_amt");
  let grandTotal = document.getElementById("total_cart_amt");

  productTotal.innerHTML = ` ${totalAmount}`;
  grandTotal.innerHTML = ` ${totalAmount}`;
}