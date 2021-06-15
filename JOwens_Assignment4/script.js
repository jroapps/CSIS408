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
  localStorage.setItem("password", "9876");
  var password = localStorage.getItem("password");
  var enteredPassword = document.getElementById("passcode").value;
  if (enteredPassword == password) {
    window.location.href = "main.html";
  } else {
    alert("Incorrect password. Please try again.")
    document.getElementById("passcode").value = "";
  }
}

// navigate to User Info page
const userNav = () => {
  window.location.href = "userinfo.html";
}

// navigate to Work Activity page
const workNav = () => {
  window.location.href = "workactivity.html";
}

// navigate to New Entry page
const entryNav = () => {
  window.location.href = "entry.html";
}

// validate and enter update user info
const checkUserInput = () => {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' + 
    (('' + month).length < 2 ? '0' : '') + month + '/' + 
    (('' + date).length < 2 ? '0' : '') + date;
  
  if (($("#fname").val() != "") &&
     ($("#lname").val() != "") &&
     ($("#bdate").val() != "") && ($("#bdate").val() <= currentDate) &&
     ($("#phone").val() != "") &&
     ($("#gender option:selected").val() != "Select Gender")) {
      return true;
     } else {
       return false;
     }
}

// saving user input to JSON object
const submitUserInput = () => {
  if (checkUserInput()) {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var password = document.getElementById("password").value;
    var bdate = document.getElementById("bdate").value;
    var phone = document.getElementById("phone").value;
    var gender = document.getElementById("gender").value;

    try {
      // saving to local storage
      localStorage.setItem("FirstName", fname);
      localStorage.setItem("LastName", lname);
      localStorage.setItem("Password", password);
      localStorage.setItem("Birthdate", bdate);
      localStorage.setItem("PhoneNumber", phone);
      localStorage.setItem("Gender", gender);

      // alerting user of saved information
      alert("Information Saved!");

      // redirecting to main menu
      window.location.href = "main.html";
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Local Storage limit exceeded.");
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Error occurred saving to local storage.");
      }
      console.log(e);
    }
  } else {
    alert("Please fill in all inputs correctly!");
  }
}

// displaying user info
const displayUserInfo = () => {
  var fname = localStorage.getItem("FirstName");
  var lname = localStorage.getItem("LastName");
  var password = localStorage.getItem("Password");
  var bdate = localStorage.getItem("Birthdate");
  var phone = localStorage.getItem("PhoneNumber");
  var gender = localStorage.getItem("Gender");
  var fullName = fname + " " + lname;

  // converting date to mm/dd/yyyy format
  const dateConvert = (date) => {
    var entireDate = date.split(' ');
    var thisDate = entireDate[0].split('-');
    var newDate = [thisDate[1], thisDate[2], thisDate[0] ].join("/");
    return newDate;
  }
  var birthdate = dateConvert(bdate);

  // adding dashes to phone number
  const phoneConvert = (number) => {
    var myNumber = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, phone.length);
    return myNumber;
  }
  var phoneNumber = phoneConvert(phone);

  // displaying results in a table to div container
  document.getElementById("userInfo").innerHTML = 
  "<table class='center'>" +
    "<tr>" +
      "<th>Name</th>" +
      "<td>" + fullName + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Birthdate</th>" +
      "<td>" + birthdate + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Phone Number</th>" +
      "<td>" + phoneNumber + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Gender</th>" +
      "<td>" + gender + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Password</th>" +
      "<td>" + password + "</td>" +
    "</tr>" +
  "</table>";
}

// clear work history
const clearWork = () => {
  // declaring variables
  var date = document.getElementById("date");
  var ministered = document.getElementById("ministered");
  var items = document.getElementById("items");
  var hours = document.getElementById("hours");

  // clearing number inputs
  date.value = date.defaultValue;
  ministered.value = ministered.defaultValue;
  items.value = items.defaultValue;
  hours.value = hours.defaultValue;
  
  // removing final table output
  document.getElementById("history").innerHTML = "";
}

