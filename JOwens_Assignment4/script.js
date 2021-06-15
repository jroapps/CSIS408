// add number to password entry
const addValue = (button) => {
  var currentValue = document.getElementById("passcode").value;
  if (button == 'bksp') {
    $("#passcode").val(currentValue.substring(0, currentValue.length - 1));
  } else {
    $("#passcode").val(currentValue.concat(button));
  }
}

// enter password
const enterPassword = () => {
  var password = getPassword();
  var enteredPassword = document.getElementById("passcode").value;
  if (enteredPassword == password) {
    window.location.href = "main.html";
  } else {
    alert("Incorrect password. Please try again.")
    document.getElementById("passcode").value = "";
  }
}

// password return
const getPassword = () => {
  if (typeof(Storage) == "undefined") {
    alert("Your browser does not support HTML5 localStorage. Try upgrading your browser.");
  } else {
    return "9876";
  }
}