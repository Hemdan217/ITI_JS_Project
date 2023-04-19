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

      // sessionStorage.removeItem("productsCart");
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
  autoMatchOsTheme: false,
};
const darkmode = new Darkmode(options);
darkmode.showWidget();

// add to css  that css proberty to stop darke mode from changing style of somthing >>>>>> the next line will do it for you
//  isolation:isolate;

/* -------------------------------------------------------------------------- */
/*                           END Of Adding DarkMode                           */
/* -------------------------------------------------------------------------- */
