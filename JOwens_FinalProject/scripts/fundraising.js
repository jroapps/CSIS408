// displaying fundraising history
const displayFundraisingHistory = () => {
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
  "<table class='centerHistory' id='fundTable'>" +
    "<tr>" +
      "<th>Donation Date</th>" +
      "<th>Donated From</th>" +
      "<th>Amount Donated</th>" +
      "<th>Monthly Pledge</th>" +
    "</tr>" +
  "</table>";

  // checking to see if entries exist
  if (entries != null) {

    // looping entries into tables
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i][0];
      var date = entry.date;
      var donater = entry.donater;
      var amount = entry.amountDonated;
      var pledge = entry.monthlyPledge;

      // converting date to mm/dd/yyyy format
      const dateConvert = (date) => {
      var entireDate = date.split(' ');
      var thisDate = entireDate[0].split('-');
      var newDate = [thisDate[1], thisDate[2], thisDate[0] ].join("/");
      return newDate;
      }
      date = dateConvert(date);

      amount = parseFloat(amount);
      pledge = parseFloat(pledge);
      
      amount = amount.toFixed(2);
      pledge = pledge.toFixed(2);

      // displaying results in a table to div container
      $("#fundTable").append( 
        "<tr>" +
          "<td>" + date + "</td>" +
          "<td>" + donater + "</td>" +
          "<td>$" + amount + "</td>" +
          "<td>$" + pledge + "</td>" +
        "</tr>");
    }
  }
}

// clear fundraising history
const clearFundraising = () => {
  // clearing all entries
  localStorage.removeItem("entries");
  if (confirm("All fundraising entries removed.")) {
    window.location.reload();
  }
}