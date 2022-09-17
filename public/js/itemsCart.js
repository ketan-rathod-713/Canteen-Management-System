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
  let totalAmount = 0;

  let price = document.querySelector(`#price${element}`).innerHTML;
  let quantity = document.querySelector(`#q${element}`);
  quantity.defaultValue = 0;
  let title =
    document.getElementsByClassName("product_name")[element - 1].innerHTML;

  if (arr == null) {
    arr.push({
      id: element,
      t: title,
      p: Number(price),
      q: Number(quantity.value),
    });
  }

  let found = 0;

  arr.forEach((ele) => {
    if (ele.id == element) {
      ele.q = Number(ele.q) + Number(quantity.value);
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
    });
  }

  document.getElementById("appendHere").innerHTML = "";

  arr.forEach((ele) => {
    let billElem = document.createElement("div");
    billElem.innerHTML = `<h4>${ele.t}</h4>
  <div>
      <div>Price :  ${ele.p}</div><hr>
      <div>Quantity : ${ele.q}</div>
  </div>`;
    billElem.className = "billItems";
    document.querySelector("#appendHere").append(billElem);
    totalAmount = totalAmount + ele.q * ele.p;

    quantity.value = 0;
  });

  let productTotal = document.getElementById("product_total_amt");
  let grandTotal = document.getElementById("total_cart_amt");

  productTotal.innerHTML = ` ${totalAmount}`;
  grandTotal.innerHTML = ` ${totalAmount}`;
}
