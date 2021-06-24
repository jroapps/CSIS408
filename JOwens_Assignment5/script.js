"use strict"

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

// navigate to Activity Graph page
const graphNav = () => {
  window.location.href = "graph.html";
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

// validate and save new entries
const checkEntry = () => {
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' + 
    (('' + month).length < 2 ? '0' : '') + month + '/' + 
    (('' + date).length < 2 ? '0' : '') + date;
  
  if (($("#donationDate").val() != "") && ($("#donationDate").val() <= currentDate) &&
     ($("#ministered").val() != "") &&
     ($("#hours").val() != "")) {
      return true;
     } else {
       return false;
     }
}

// saving entry to object array
const submitEntry = () => {
  if (checkEntry()) {
    var donationDate = document.getElementById("donationDate").value;
    var ministered = document.getElementById("ministered").value;
    var items = document.getElementById("items").value;
    var hours = document.getElementById("hours").value;

    var entry = [
      {
        date: donationDate,
        person: ministered,
        itemsDonated: items,
        hoursWorked: hours
      }
    ];

    try {
      // getting entries if available
      var entries = JSON.parse(localStorage.getItem("entries"));
      if (entries == null) {
        entries = [];
      }

      // pushing new entry and saving
      entries.push(entry);
      localStorage.setItem("entries", JSON.stringify(entries));

      // alerting user of saved entry
      alert("Entry Saved!");

      // redirecting to main menu
      window.location.href = "workactivity.html";
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

// displaying work history
const displayWorkHistory = () => {
  try {
    var entries = JSON.parse(localStorage.getItem("entries"));
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

  // initial table
  document.getElementById("history").innerHTML = 
  "<table class='center' id='workTable'>" +
    "<tr>" +
      "<th>Donation Date</th>" +
      "<th>Person Ministered To</th>" +
      "<th>Items Donated</th>" +
      "<th>Hours Worked</th>" +
    "</tr>" +
  "</table>";

  // checking to see if entries exist
  if (entries != null) {

    // looping entries into tables
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i][0];
      var date = entry.date;
      var person = entry.person;
      var items = entry.itemsDonated;
      var hours = entry.hoursWorked;

      // converting date to mm/dd/yyyy format
      const dateConvert = (date) => {
      var entireDate = date.split(' ');
      var thisDate = entireDate[0].split('-');
      var newDate = [thisDate[1], thisDate[2], thisDate[0] ].join("/");
      return newDate;
      }
      date = dateConvert(date);

      // displaying results in a table to div container
      $("#workTable").append( 
        "<tr>" +
          "<td>" + date + "</td>" +
          "<td>" + person + "</td>" +
          "<td>" + items + "</td>" +
          "<td>" + hours + "</td>" +
        "</tr>");
    }
  }
}

// clear work history
const clearWork = () => {
  // clearing all entries
  localStorage.removeItem("entries");
  if (confirm("All work entries removed.")) {
    window.location.reload();
  }
}

// display user & work info
const workStart = () => {
  displayUserInfo();
  displayWorkHistory();
}

// About page canvas shape
const drawShape = () => {
  var canvas = document.getElementById("aboutCanvas");
  var context = canvas.getContext("2d");
  
  // top horizontal line
  drawLine(context, 100, 10, 150, 10);

  // top vertical lines
  drawLine(context, 100, 10, 100, 60);
  drawLine(context, 150, 10, 150, 60);

  // top middle horizontal lines
  drawLine(context, 50, 60, 100, 60);
  drawLine(context, 150, 60, 200, 60);

  // top middle vertical lines
  drawLine(context, 50, 60, 50, 110);
  drawLine(context, 200, 60, 200, 110);

  // bottom middle horizontal lines
  drawLine(context, 50, 110, 100, 110);
  drawLine(context, 150, 110, 200, 110);

  // bottom vertical lines
  drawLine(context, 100, 110, 100, 210);
  drawLine(context, 150, 110, 150, 210);

  // bottom horizontal line
  drawLine(context, 100, 210, 150, 210);

  // top fill
  context.rect(100, 10, 50, 200);

  // middle portion fill
  context.rect(50, 60, 150, 50);

  // fill shape
  context.fillStyle = "#007578";
  context.fill();
  
}

const drawLine = (context, startX, startY, endX, endY) => {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

// verify if data exists for graph
const dataVerify = () => {
  var entries = localStorage.getItem("entries");
  if (entries == null) {
    var message = "There is no work activity to display.";
    document.getElementById("verify").innerHTML = message;
    document.getElementById("activityCanvas").style = "";
    document.getElementById("activityCanvas").innerHTML = "";
  }
}

// setting up canvas
const setupCanvas = () => {
  var canvas = document.getElementById("activityCanvas");
  var context = canvas.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, 550, 550);
}

// activity graph canvas creation
const activityGraph = () => {
  if (localStorage.getItem("entries") === null) {
    alert("No records exist.");
    window.location.href = "menu.html";
  } else {
    setupCanvas();

  var dateArray = new Array();
  var hoursArray = new Array();
  getHistory(dateArray, hoursArray);

  var hoursLower = new Array(2);
  var hoursUpper = new Array(2);
  getHoursBounds(hoursLower, hoursUpper);

  labelAxes();
  drawLines(hoursArray, hoursUpper, hoursLower, dateArray);
  }
}

// setting the chart bounds
const getHoursBounds = (hoursLower, hoursUpper) => {
  var entries = JSON.parse(localStorage.getItem("entries"));
  var hoursLevel = new Array();
  
  for (var i = 0; i < entries.length; i++) {
    hoursLevel[i] = parseFloat(entries[i][0].hoursWorked);
  }

  hoursLevel.sort(function(a, b){return a - b});
  var upper = hoursLevel.length - 1;

  hoursLower[0] = hoursLower[1] = hoursLevel[0];
  hoursUpper[0] = hoursUpper[1] = hoursLevel[upper];
}

// getting the history
const getHistory = (dateArray, hoursArray) => {
  var entries = JSON.parse(localStorage.getItem("entries"));

  for (var i = 0; i < entries.length; i++) {
    var date = new Date(entries[i][0].date);

    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;

    // x-axis label
    dateArray[i] = (month + "/" + day);

    // point to plot on graph
    hoursArray[i] = parseFloat(entries[i][0].hoursWorked);
  }
}

// drawing lines for graph
const drawLines = (hoursArray, hoursUpper, hoursLower, dateArray) => {
  var hoursLine = new RGraph.Line("activityCanvas", hoursArray, hoursUpper, hoursLower)
    .Set("labels", dateArray)
    .Set("colors", ["blue", "green", "red"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph",
      [,, ["hours", "blue", "yellow", 1, 80],, ])
    .Set("chart.title", "Work Activity Graph")
    .Draw();
}

// labeling axes for graph
const labelAxes = () => {
  var canvas = document.getElementById("activityCanvas");
  var context = canvas.getContext("2d");
  context.font = "11px Georgia";
  context.fillStyle = "green";
  context.fillText("Date (MM/DD)", 400, 470);
  context.rotate(-Math.PI/2);
  context.textAlign = "center";
  context.fillText("Hours Worked", -250, 10);
}

// loading functions for graph page
const graphLoad = () => {
  //dataVerify();
  activityGraph();
}