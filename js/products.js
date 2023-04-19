window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};
let pageNumber = parseInt(location.search.split("=")[1]) || 1;

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
console.log(location.search.split("=")[1]);
let specificPageProducts = [];
let xhr = new XMLHttpRequest();
xhr.open("GET", "data.json");

xhr.send();

let data;

let cards = document.getElementsByClassName("card");

let content = document.getElementById("content");

xhr.addEventListener("readystatechange", () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = JSON.parse(xhr.response);
    console.log(data);
    displayData(data);
  }
});

function displayData(data) {
  specificPageProducts = data.slice(0 + 24 * (pageNumber - 1), pageNumber * 24);
  content.innerHTML = "";
  checkIt();
  for (let i = 0; i < specificPageProducts.length; i++) {
    let ID = specificPageProducts[i].id;
    let card = `
<div class="col-4">
  <div class="card" style="width: 18rem; ;">
    <a href="./productDetails.html?${specificPageProducts[i].id}" id="card-link">
      <img src="${specificPageProducts[i].url}" class="card-img-top prod_${ID}_image" alt="...">
      <div class="card-body">
        <h4 class="prod_${ID}_name">${specificPageProducts[i].name}</h4>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <div class="star-rating">
          <span>★★★★</span>★
          48,191 ratings
        </div>
      </div>
    </a>
    <br>
    <h5 class="prod_${ID}_price">${specificPageProducts[i].price}$   <button onclick="addToCart(event)"class="btn btn-primary ${ID}_button">Add To Cart</button></h5>

  </div>

</div>
     `;

    content.insertAdjacentHTML("beforeend", card);
  }
}

function displayCour(filteredData) {
  content.innerHTML = "";

  for (let i = 0; i < filteredData.length; i++) {
    let ID = filteredData[i].id;
    content.innerHTML += `
<div class="col-4">
  <div class="card" style="width: 18rem; ;">
    <a href="./productDetails.html?${filteredData[i].id}" id="card-link">
      <img src="${filteredData[i].url}" class="card-img-top prod_${ID}_image" alt="...">
      <div class="card-body">
        <h4 class="prod_${ID}_name">${filteredData[i].name}</h4>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <div class="star-rating">
          <span>★★★★</span>★
          48,191 ratings
        </div>
      </div>
    </a>
    <br>
    <h5 class="prod_${ID}_price">${filteredData[i].price}$   <button onclick="addToCart(event)"class="btn btn-primary ${ID}_button">Add To Cart</button></h5>
  
  </div>

</div>

    `;
  }
}

let searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", (e) => {
  e.target.value;
  filtered = specificPageProducts.filter((ele) =>
    ele.name.toUpperCase().includes(e.target.value.toUpperCase())
  );

  displayCour(filtered);
});
function addToCart(eve) {
  const Id = parseInt(eve.target.classList[eve.target.classList.length - 1]);

  console.log("clicked");
  let divAlert = document.createElement("div");
  divAlert.classList.add("message");
  document.body.appendChild(divAlert);
  let productName = document.querySelector(`.prod_${Id}_name`).textContent;
  let productPrice = document.querySelector(`.prod_${Id}_price`).textContent;
  let productImage = document.querySelector(`.prod_${Id}_image`).src;

  let newProduct = {
    name: productName,
    price: parseFloat(productPrice),
    quantity: 1,
    image: productImage,
  };
  let productInCart = [];
  if (!sessionStorage.getItem("productsCart")) {
    sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
  } else {
    productInCart = JSON.parse(sessionStorage.getItem("productsCart"));
  }
  productInCart = productInCart.filter((ele) => ele.name !== productName);
  productInCart.push(newProduct);
  divAlert.innerHTML = ` <div class="alert alert-success alert-white rounded">
    
      <div class="icon"><i class="fa fa-check"></i></div>
      <strong>Success! ${productName}</strong>
    </div>`;
  setTimeout(() => {
    divAlert.remove();
  }, 2000);
  sessionStorage.setItem("productsCart", JSON.stringify(productInCart));
}

function checkIt() {
  document.querySelectorAll("nav li a").forEach((a) => {
    if (a.textContent == pageNumber) {
      a.style.backgroundColor = "black";
    }
  });
}
/* -------------------------------------------------------------------------- */
/*                          START Of Adding DarkMode                          */
/* -------------------------------------------------------------------------- */

const options = {
  bottom: "246px",
  right: "unset",
  left: "1px",
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
