// After The Page Loaded, hide the Loader/Spinner CSS
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};
var cart = document.querySelector(".carts");
var cart = document.getElementsByClassName("carts")[0];
var quants = document.getElementById("quant");
var total = 0;
var totals = 0;
var totale = 0;
var userName = document.cookie.split("=")[2];
if (userName && userName.trim() != "") {
  console.log("user has a value");
}
function displayData() {
  productInCart = JSON.parse(sessionStorage.getItem("productsCart"));
  total = 0;
  var cartShopBox = document.getElementsByClassName("carts")[0];
  var cartBoxContent = "";
  cartShopBox.innerHTML = "";
  for (var i = 0; i < productInCart.length; i++) {
    cartBoxContent += `
    <div class="clear product_${i}_container">
    <div class="col-lg-5">
    <div class="me-lg-5">
      <div class="d-flex">
        <img src="${productInCart[i].image}" class="border rounded me-3 product_${i}_image" style="width: 96px; height: 96px;" />
        <div class="">
          <a href="#" class="nav-link product_${i}_name">${productInCart[i].name}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
    <div class="">
      <input onchange="updateItem(event)" id="quant" type="number" min=1 value="${productInCart[i].quantity}" style="width: 100px;" class="btn btn-light border px-2 icon-hover-primary mt-2 mb-2 product_${i}_update"/>
    </div>
    <div class="">
      <small class="text-muted text-nowrap m-3 product_${i}_price"> ${productInCart[i].price}$ </small>
      <small class="text-muted text-nowrap m-4">quantity:${productInCart[i].quantity}</small>
    </div>
  </div>
  <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
    <div class="float-md-end">
  
      <button class="btn btn-light border px-2 icon-hover-primary carts-remove product_${i}_button" onclick="removeItem(event)">remove</button>
    </div>
  </div></div>
                `;

    cartShopBox.innerHTML = cartBoxContent;

    total += productInCart[i].price * productInCart[i].quantity;
    totals = total;
  }
  document.getElementsByClassName("total-price")[0].innerText =
    "$" + total.toFixed(2);
  document.getElementsByClassName("totals-price")[0].innerText =
    total.toFixed(1) > 0 ? "$" + totals.toFixed(1) : "$" + "0";
}

if (sessionStorage.getItem("productsCart")) {
  displayData();
}
var couponCode = document.getElementById("copne");

function applyCoupon(event) {
  event.preventDefault();
  var discount = 0; // Discount amount

  // Check if coupon code is valid
  if (couponCode.value === "SAVE10") {
    discount = 10;
  } else if (couponCode.value === "SAVE15") {
    discount = 15;
  } else if (couponCode.value === "SAVE30") {
    discount = 30;
  } else if (couponCode.value === "MONA") {
    discount = 50;
  }

  // Apply discount to total
  totale = (totals * (100 - discount)) / 100;

  // Return updated total
  document.getElementsByClassName("disc")[0].innerHTML = "-" + discount + "%";
  document.getElementsByClassName("totals-price")[0].innerHTML =
    "$" + totale.toFixed(2);
}

console.log(totals);
console.log(totale);

var removebtns = document.getElementsByClassName("carts-remove");
// remove functionZ
function removeItem(event) {
  console.log(
    event.target.classList[event.target.classList.length - 1].split("_")[1]
  );
  let index =
    event.target.classList[event.target.classList.length - 1].split("_")[1];
  let productName = document.querySelector(
    `.product_${index}_name`
  ).textContent;

  let productInCart = [];
  if (!sessionStorage.getItem("productsCart")) {
    sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
  } else {
    productInCart = JSON.parse(sessionStorage.getItem("productsCart"));
  }
  productInCart = productInCart.filter((ele) => ele.name !== productName);
  sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
  document.querySelector(`.product_${index}_container`).remove();
  let divAlert = document.createElement("div");
  divAlert.classList.add("message");
  document.body.appendChild(divAlert);
  divAlert.innerHTML = ` <div class="alert alert-info alert-white rounded">
    
      <div class="icon"><i class="fa fa-check"></i></div>
      <strong>Success! ${productName} Was Removed</strong>
    </div>`;
  setTimeout(() => {
    divAlert.remove();
  }, 2000);
  displayData();
}
function updateItem(event) {
  console.log(
    event.target.classList[event.target.classList.length - 1].split("_")[1]
  );
  let index =
    event.target.classList[event.target.classList.length - 1].split("_")[1];
  let productName = document.querySelector(
    `.product_${index}_name`
  ).textContent;
  let productPrice = document.querySelector(
    `.product_${index}_price`
  ).textContent;
  let productImage = document.querySelector(`.product_${index}_image`);

  let productInCart = [];
  if (!sessionStorage.getItem("productsCart")) {
    sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
  } else {
    productInCart = JSON.parse(sessionStorage.getItem("productsCart"));
  }
  console.log(event.target.value);
  let productIndex = productInCart.findIndex((ele) => ele.name === productName);
  productInCart.splice(productIndex, 1, {
    name: productName,
    image: productImage.src,
    price: parseFloat(productPrice),
    quantity: event.target.value,
  });
  sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
  displayData();
}

function checkTotal() {
  if (totals == " " || !(userName && userName.trim() != "")) {
    var btn = document.getElementsByClassName("buy")[0];
    btn.style.display = "none";
  } else {
    console.log("total is not zero");
  }
}
checkTotal();

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  sessionStorage.removeItem("productsCart");
  location.reload();
  displayData();
}
// }
// else
// {
//   console.log('user is not exsit');
//   window.location.href='logIn.html'
// }
/* -------------------------------------------------------------------------- */
/*                                 USER HEADER                                */
/* -------------------------------------------------------------------------- */
window.onload = function () {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
  const userName = document.cookie.split("=")[2];

  if (userName && userName.trim() !== "") {
    document.getElementById("logInOut").innerHTML = `
        &nbsp;<a href="cart.html">Hello,<P>${userName}</P></a>&nbsp;<span id="logOUT"><a href="#" id=OUT>Log Out</a></span>
    `;

    const logOutButton = document.getElementById("logOUT");

    logOutButton.addEventListener("click", function () {
      document.cookie = `${`account`}=${``}`;

      // ^_^ and here another code to clear cookies more efficient ^_^ not only clear value of  cookie's item
      // document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

      // add this line to remove session storage
      sessionStorage.clear();

      location.href = "index.html";
    });
  } else {
    document.getElementById(
      "logInOut"
    ).innerHTML = `<span id=logIn ><a href="LogIn.html">login</a></span>`;
  }
};
/* -------------------------------------------------------------------------- */
/*                                 USER HEADER END                            */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                          START Of Adding DarkMode                          */
/* -------------------------------------------------------------------------- */

const options = {
  bottom: "280px",
  right: "unset",
  left: "2px",
  time: "0.5s",
  mixColor: "#fff",
  backgroundColor: "#fff",
  buttonColorDark: "#000000",
  buttonColorLight: "#fff",
  saveInCookies: true,
  label: "🌓",
  autoMatchOsTheme: true,
};
const darkmode = new Darkmode(options);
darkmode.showWidget();
