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

    var user = [
      {
        firstname: fname,
        lastname: lname,
        password: password,
        birthdate: bdate,
        phonenumber: phone,
        gender: gender
      }
    ];

    try {
      // saving to local storage
      localStorage.setItem("user", JSON.stringify(user));

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
  // trying to get user data
  try {
    var user = JSON.parse(localStorage.getItem("user"));
  }
  catch (e) {
    if (window.navigator.vendor === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Local Storage limit exceeded.");
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Error occurred saving to local storage.");
    }
    console.log(e);
  }

  // checking to see if user exists
  if (user != null) {
    var fname = user[0].firstname;
    var lname = user[0].lastname;
    var password = user[0].password;
    var bdate = user[0].birthdate;
    var phone = user[0].phonenumber;
    var gender = user[0].gender;
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
}