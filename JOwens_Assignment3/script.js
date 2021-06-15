const clearForm = () => {
  // declaring variables
  var people = document.getElementById("people");
  var days = document.getElementById("days");

  // clearing number inputs
  people.value = people.defaultValue;
  days.value = days.defaultValue;

  // clearing radio inputs
  $("#Tallinn").prop("checked", false).checkboxradio("refresh");
  $("#Kiev").prop("checked", false).checkboxradio("refresh");
  $("#Paris").prop("checked", false).checkboxradio("refresh");

  // removing final table output
  document.getElementById("results").innerHTML = "";
}

const displayResults = () => {
  // getting input value
  var people = document.getElementById("people").value;
  var days = document.getElementById("days").value;

  // validating number input
  if (people == "") {
    document.getElementById("message").innerHTML = "Please complete all fields!"
    return;
  } else {
    document.getElementById("message").innerHTML = "";
  }
  if (days == "") {
    document.getElementById("message").innerHTML = "Please complete all fields!"
    return;
  } else {
    document.getElementById("message").innerHTML = "";
  }

  // validating radio buttons and calculating cost
  if (document.getElementById("Tallinn").checked) {
    var location = "Tallinn, Estonia";
    var locationCost = 100;
    var total = locationCost * people * days;
    if (total > 5000) {
      var message = "A deposit must be made within two weeks of today's date!"
      document.getElementById("message").innerHTML = message;
    }
  } else if (document.getElementById("Kiev").checked) {
    var location = "Kiev, Ukraine";
    var locationCost = 80;
    var total = locationCost * people * days;
    if (total > 5000) {
      var message = "A deposit must be made within two weeks of today's date!"
      document.getElementById("message").innerHTML = message;
    }
  } else if (document.getElementById("Paris").checked) {
    var location = "Paris, France";
    var locationCost = 95;
    var total = locationCost * people * days;
    if (total > 5000) {
      var message = "A deposit must be made within two weeks of today's date!"
      document.getElementById("message").innerHTML = message;
    } 
  } else {
    document.getElementById("message").innerHTML = "Please complete all fields!"
    document.getElementById("results").innerHTML = "";
    return;
  }
  
  // displaying results in a table to div container
  document.getElementById("results").innerHTML = 
    "<h2>Trip Cost</h2>" +
    "<table class='center'>" +
      "<tr>" +
        "<th>Number of People</th>" +
        "<th>Days of Trip</th>" +
        "<th>Location of Trip</th>" +
        "<th>Total Cost of Trip</th>" +
      "</tr>" +
      "<tr>" +
        "<td>" + people + "</td>" +
        "<td>" + days + "</td>" +
        "<td>" + location + "</td>" +
        "<td>$" + total + ".00</td>" +
      "</tr>" +
    "</table>";
}