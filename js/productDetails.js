/// After The Page Loaded, hide the Loader/Spinner CSS
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};
// Check the index of  the current product => if the http:url.html?id
// This part represents ?id search
let index = parseInt(location.search.replace(/\?/, "")); //Exctract the index of the product
let allProducts = [];
let productInCart = [];

const Xhr = new XMLHttpRequest();
// Make get request
Xhr.open("GET", "data.json");
// Send the request
Xhr.send();
Xhr.onreadystatechange = () => {
  if (Xhr.readyState == 4) {
    allProducts = JSON.parse(Xhr.response);
    // Access the  product from all product
    let product = allProducts[index - 1];
    // Display the product in the page
    if (product) {
      displayProductDetails(product);
      displayRecommendedProducts(allProducts);
    } else {
      displayErrorPage();
    }
  }

  function displayProductDetails(product) {
    document.querySelector(".product__image").src = product.url;
    document.querySelector(".product__info h1.product__name").textContent =
      product.name;
    document.querySelector(".product__info h3.product__price").textContent =
      product.price;

    let productDetails = product.description;
    for (let key in productDetails) {
      let description = document.createElement("div");
      description.innerHTML = `<span style="font-weight: 700">${key}</span>: ${productDetails[key]}`;
      document
        .querySelector("div.product__description")
        .appendChild(description);
    }
  }

  function displayErrorPage() {
    document.querySelector("section").innerHTML = `	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		</div>
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		<p>the page you are looking for not avaible!</p>
		<a href="./index.html" class="link_404">Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>`;
  }
};

function displayRecommendedProducts(products) {
  let recommendedProducts = [];
  for (let i = 0; i < 16; i++) {
    let randomProduct = Math.round(Math.random() * products.length);
    recommendedProducts.push(products[randomProduct]);
  }
  let Recommended = document.querySelector(".Recommended");
  console.log(recommendedProducts);
  recommendedProducts.forEach((pro, ind) => {
    // console.log(Math.floor(ind / 5));
    // console.log(cards);
    Recommended.innerHTML += `
                   <div class="col-lg-3 col-md-6 col-sm-6" >
          <div class="card px-4 border shadow-0 mb-4 mb-lg-0">
            <div class="mask px-2" style="height: 50px;">
              <div class="d-flex justify-content-between">
                <h6><span class="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                <a href=./productDetails.html?${(id =
        pro.id)}><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
              </div>
            </div>
            <a href=./productDetails.html?${(id = pro.id)} class="">
              <img src=${pro.url
      } class="card-img-top rounded-2" style="height:200px"/>
            </a>
            <div class="card-body d-flex flex-column pt-3 border-top">
              <a href=./productDetails.html?${(id =
        pro.id)} class="nav-link">${pro.name.substring(0, 20)} </a>
              <div class="price-wrap mb-2">
                <strong class="">${pro.price.toFixed(
          0
        )} <sup>99</sup> $ </strong>
                <del class="">${(pro.price * 1.2).toFixed(2)} </del>
              </div>
              <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                <a href=./productDetails.html?${(id =
        pro.id)} class="btn btn-outline-primary w-100">View Details</a>
              </div>
            </div>
   `;
  });
}

let button = document.querySelector("button.fullProduct-buy");
button.addEventListener("click", () => {
  console.log("clicked");
  let divAlert = document.createElement("div");
  divAlert.classList.add("message");
  document.body.appendChild(divAlert);
  let productName = document.querySelector(
    ".product__info h1.product__name"
  ).textContent;
  let productPrice = document.querySelector(".product__price").textContent;
  let productQuantity = document.querySelector(".product__quantity").value;
  let productImage = document.querySelector(".product__image").src;

  let newProduct = {
    name: productName,
    price: productPrice,
    quantity: productQuantity || 1,
    image: productImage,
  };

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
});

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
  bottom: "200px",
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
