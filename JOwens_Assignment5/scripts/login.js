// add number to password entry
const addValue = (button) => {
  var currentValue = document.getElementById("passcode").value;
  if (button == 'bksp') {
    $("#passcode").val(currentValue.substring(0, currentValue.length - 1));
  } else {
    $("#passcode").val(currentValue.concat(button));
  }
}

// verify entered password
const enterPassword = () => {
  // setting initial logged in state
  loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn == null) {
    localStorage.setItem("loggedIn", false);
  }
  
  // setting initial password
  localStorage.setItem("tempPassword", "0000");
  var tempPassword = localStorage.getItem("tempPassword");

  // getting user password if available
  var user = JSON.parse(localStorage.getItem("user"));
  if (user != null) {
    var password = user[0].password;
  }

  // comparing login credentials
  var enteredPassword = document.getElementById("passcode").value;
  if (enteredPassword == password || enteredPassword == tempPassword) {
    localStorage.setItem("loggedIn", true);
    window.location.href = "main.html";
  } else {
    alert("Incorrect password. Please try again.")
    document.getElementById("passcode").value = "";
  }
}

// check login status
const checkLoginStatus = () => {
  var loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn != "true") {
    window.location.href = "index.html";
  } else {
    window.location.href = "main.html";
  }
}

// logout and go to password screen
const logOut = () => {
  localStorage.setItem("loggedIn", false);
  window.location.href = "index.html";
}