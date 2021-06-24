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