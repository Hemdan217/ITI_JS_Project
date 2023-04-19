/// After The Page Loaded, hide the Loader/Spinner CSS
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};
// Get the form element by its ID
const formInp = document.getElementById("signInBorder");

// Add an event listener for the form's submit event
formInp.addEventListener("submit", function (e) {
  // Prevent the default behavior of the form (submitting and reloading the page)
  e.preventDefault();

  // Define regular expressions for valid email, mobile number, and password inputs
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mobileNumberRegex = /^(010|011|012|015)\d{8}$/;
  let passwordRegex = /^[A-z]{2,}[0-9]{2,}$/;

  // Get the values of the email/phone and password input fields
  var emailPhoneInput = document.getElementById("emailPhoneValue").value;
  var passwordInput = document.getElementById("passValue").value;

  // Check if the input values match the defined regular expressions
  if (
    (mobileNumberRegex.test(emailPhoneInput) == false &&
      emailRegex.test(emailPhoneInput) == false) ||
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
      // e.target.reset();
      Swal.close();
    }, 1333);
    return;
  }

  // Create an object containing the email/phone and password input values (with the password encrypted using the ROT13 cipher)
  const formObjects = {
    userEmailPhone: emailPhoneInput,
    userPassword: cipherRot13(passwordInput),
  };

  // Get any stored account data from local storage, or initialize an empty array if there is none
  let storedData = JSON.parse(localStorage.getItem("account")) || [];
  // Filter the stored data to find any duplicates of the current email/phone and encrypted password combination
  let Duplicate = storedData.filter(
    (user) =>
      user.userEmailPhone === formObjects.userEmailPhone &&
      user.userPassword === formObjects.userPassword
  );
  console.log(Duplicate);
  // If there is a duplicate, create a new cookie with the email/phone and encrypted password values and redirect to the home page
  if (Duplicate.length > 0) {
    // to make sure that the new data create new cookie item  for every user and not overwrite the previous one
    // const cookieCount = document.cookie.split(';').filter(cookie => cookie.includes('user')).length;
    // const cookieName = `user${cookieCount + 1}`;

    // Set the cookie name
    const cookieName = `account`;
    // Set the cookie value as a string containing the "userName"
    const cookieValue = `userName=${Duplicate[0].userName}`;
    // Set the expiration date of the cookie to 7 days from now
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    // Set the cookie
    document.cookie = `${cookieName}=${cookieValue}; expires=${expireDate.toUTCString()}`;

    // e.target.reset();
    Swal.fire({
      text: "Thank you for Signing Up. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "index.html";
    }, 1333);
  } else {
    Swal.fire({
      text: "Please Enter Valid Password 😞",
      icon: "error",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
    }, 1333);
  }
});

// ENCRYPTION PROCESS
function cipherRot13(str) {
  // Convert string to upper case
  str = str.toUpperCase();
  // Replace each letter or digit with a letter 13 positions ahead in the alphabet
  return str.replace(/[A-Z0-9]/g, rot13);
  // If adding 13 to the character code results in a character code greater than 90 (the character code for "Z"),
  // subtract 26 to wrap around to the beginning of the alphabet
  function rot13(correspondance) {
    const charCode = correspondance.charCodeAt();
    return String.fromCharCode(
      charCode + 13 <= 90 ? charCode + 13 : ((charCode + 13) % 90) + 64
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                          START Of Adding DarkMode                          */
/* -------------------------------------------------------------------------- */

const options = {
  bottom: "86px", // default: '32px'
  right: "unset", // default: '32px'
  left: "32px", // default: 'unset'
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#000000", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true, // default: true
};
const darkmode = new Darkmode(options);
darkmode.showWidget();

// add to css  that css proberty to stop darke mode from changing style of somthing >>>>>> the next line will do it for you
//  isolation:isolate;

/* -------------------------------------------------------------------------- */
/*                           END Of Adding DarkMode                           */
/* -------------------------------------------------------------------------- */
