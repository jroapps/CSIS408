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
     ($("#username").val() != "") && 
     ($("#password").val() != "")) {
      return true;
     } else {
       return false;
     }
}

// checking for valid email address
const checkEmail = () => {
  var email = document.getElementById("username").value;
  var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  if (!email.match(emailPattern)) {
      document.getElementById("username").innerHTML = "";
      window.location.reload();
      return false;
  } else {
    return true;
  }
}

// saving user input to JSON object
const submitUserInput = () => {
  if (checkUserInput() && checkEmail()) {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var bdate = document.getElementById("bdate").value;
    var phone = document.getElementById("phone").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // creating user array
    var user = [
      {
        firstname: fname,
        lastname: lname,
        birthdate: bdate,
        phonenumber: phone,
        email: username,
        password: password
      }
    ];

    try {
      // saving to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // alerting user of saved information
      alert("Information Saved!");

      // redirecting to fundraising log
      window.location.href = "fundraising.html";

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

  // set executed state for user creation
  if (user == null) {
    var executed = false;
    localStorage.setItem("executed", executed);
  }

  // checking to see if user exists
  if (user != null) {
    var fname = user[0].firstname;
    var lname = user[0].lastname;
    var bdate = user[0].birthdate;
    var phone = user[0].phonenumber;
    var email = user[0].email;
    var password = user[0].password;
    var fullName = fname + " " + lname;

    // getting executed state
    var executed = localStorage.getItem("executed");

    // saving created user to Firebase
    if (!executed) {
      // saving username and password to Firebase
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in automatically
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
      executed = true;
      localStorage.setItem("executed", executed);
    }

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
    "<table class='centerUser'>" +
      "<tr>" +
        "<th>Missionary Name</th>" +
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
        "<th>Email Address</th>" +
        "<td>" + email + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Password</th>" +
        "<td>" + password + "</td>" +
      "</tr>" +
    "</table>";
  }  
}