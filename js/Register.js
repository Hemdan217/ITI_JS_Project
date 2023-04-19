/// After The Page Loaded, hide the Loader/Spinner CSS
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};
// get the form element from the HTML document by its ID
let formInp = document.getElementById("myForm");

// add a submit event listener to the form
formInp.addEventListener("submit", function (e) {
  // prevent the default form submission behavior
  e.preventDefault();

  // define regular expressions for name, email/phone, mobile number, and password
  let nameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;
  let emailRegex = /^[a-z]{3,}[0-9]*@(gmail|yahoo|hotmail).(com|net)$/;
  let mobileNumberRegex = /^(010|011|012|015)\d{8}$/;
  let passwordRegex = /^[A-z]{2,}[0-9]{2,}$/;

  // get the input values for name, email/phone, password, and confirm password
  var nameInput = document.getElementById("nameValue").value;
  var emailPhoneInput = document.getElementById("emailPhoneValue").value;
  var passwordInput = document.getElementById("passValue").value;
  var rePasswordInput = document.getElementById("rePassValue").value;

  // check if the input values are valid using the regular expressions
  if (
    nameRegex.test(nameInput) == false ||
    (mobileNumberRegex.test(emailPhoneInput) == false &&
      emailRegex.test(emailPhoneInput) == false) ||
    passwordInput !== rePasswordInput ||
    passwordRegex.test(passwordInput) == false
  ) {
    // Display an alert if the input values do not match the regular expressions
    Swal.fire({
      text: "You have entered wrong data.😞",
      icon: "error",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
    }, 1333);
    return;
  }

  // create an object with the input values for name, email/phone, and password
  const formObjects = {
    userName: nameInput,
    userEmailPhone: emailPhoneInput,
    userPassword: cipherRot13(passwordInput),
  };

  // print the user's email/phone to the console for testing purposes
  // console.log(formObjects.userEmailPhone);

  // get the stored data from localStorage, or create an empty array if there is no stored data
  let storedData = JSON.parse(localStorage.getItem("account")) || [];

  // print the stored data to the console for testing purposes
  // console.log(storedData);

  // check if there is a duplicate account with the same email/phone in the stored data
  const isDuplicate = storedData.some(
    (account) => account.userEmailPhone === formObjects.userEmailPhone
  );
  console.log(isDuplicate);

  // if there is no duplicate account, add the new account object to the stored data and save it to localStorage
  if (!isDuplicate) {
    storedData.push(formObjects);
    localStorage.setItem("account", JSON.stringify(storedData));
    Swal.fire({
      text: "Thank you for registering with Us. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "LogIn.html";
    }, 1333);
  }
  // if there is a duplicate account, display an alert and redirect to the login page
  else {
    Swal.fire({
      text: "You already have an account. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "LogIn.html";
    }, 1333);
  }
});
function cipherRot13(str) {
  // Convert the string to uppercase
  str = str.toUpperCase();
  // Replace each character in the string with its rot13 equivalent using the rot13 function
  return str.replace(/[A-Z0-9]/g, rot13);
  // Define the rot13 function that converts a single character to its rot13 equivalent
  function rot13(correspondance) {
    // Get the ASCII code for the character
    const charCode = correspondance.charCodeAt();
    // Shift the character's ASCII code by 13 places, wrapping around if necessary
    return String.fromCharCode(
      charCode + 13 <= 90 ? charCode + 13 : ((charCode + 13) % 90) + 64
    );
  }
}
/* -------------------------------------------------------------------------- */
/*                          START Of Adding DarkMode                          */
/* -------------------------------------------------------------------------- */

const options = {
  bottom: "86px",
  right: "unset",
  left: "32px",
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

// add to css  that css proberty to stop darke mode from changing style of somthing >>>>>> the next line will do it for you
//  isolation:isolate;

/* -------------------------------------------------------------------------- */
/*                           END Of Adding DarkMode                           */
/* -------------------------------------------------------------------------- */
