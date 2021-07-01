// displaying current goal
const displayGoal = () => {
  try {
    var goalEntry = JSON.parse(localStorage.getItem("goalEntry"));
    var entries = JSON.parse(localStorage.getItem("entries"));
    var total = goalEntry[0].total;
    var pledge = goalEntry[0].pledge;
    var currentTotal = 0;
    var currentPledge = 0;
    var newTotal = total - currentTotal;
    var newPledgeTotal = pledge - currentPledge;
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

  // initial tables
  if (goalEntry == null) {
    var total = 0;
    var pledge = 0;
  }
  document.getElementById("totalGoalTable").innerHTML = 
  "<table class='centerGoal' id='fundTable'>" +
    "<tr>" +
      "<th>Total Goal</th>" +
      "<td>$" + total + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Current Fundraising</th>" +
      "<td>$" + 0 + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Amount Left to Goal</th>" +
      "<td>$" + newTotal + "</td>" +
    "</tr>" +
  "</table>";

  document.getElementById("pledgeGoalTable").innerHTML =
  "<table class='centerGoal' id='fundTable'>" +
    "<tr>" +
      "<th>Monthly Pledge Goal</th>" +
      "<td>$" + pledge + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Current Pledge Total</th>" +
      "<td>$" + 0 + "</td>" +
    "</tr>" +
    "<tr>" +
      "<th>Amount Left to Goal</th>" +
      "<td>$" + newPledgeTotal + "</td>" +
    "</tr>" +
  "</table>";

  // checking to see if entries exist
  if (goalEntry != null & entries != null) {
    var currentTotal = 0;
    var currentPledge = 0;

    // converting from strings to floats
    total = parseFloat(total);
    pledge = parseFloat(pledge);

    for (var i = 0; i < entries.length; i++) {
      var donatedAmount = entries[i][0].amountDonated;
      var pledgeAmount = entries[i][0].monthlyPledge;

      // converting from strings to floats for calculation
      donatedAmount = parseFloat(donatedAmount);
      pledgeAmount = parseFloat(pledgeAmount);

      // updating the current fundraising total
      currentTotal += donatedAmount;
      currentPledge += pledgeAmount;
    }

    // updating the amount left to goals
    var newTotal = total - currentTotal;
    var newPledgeTotal = pledge - currentPledge;

    // fixing decimals to 2 places
    total = total.toFixed(2);
    pledge = pledge.toFixed(2);
    currentTotal = currentTotal.toFixed(2);
    currentPledge = currentPledge.toFixed(2);
    newTotal = newTotal.toFixed(2);
    newPledgeTotal = newPledgeTotal.toFixed(2);

    // updating results in tables to div containers
    document.getElementById("totalGoalTable").innerHTML = 
    "<table class='centerGoal' id='fundTable'>" +
      "<tr>" +
        "<th>Total Goal</th>" +
        "<td>$" + total + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Current Fundraising</th>" +
        "<td>$" + currentTotal + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Amount Left to Goal</th>" +
        "<td>$" + newTotal + "</td>" +
      "</tr>" +
    "</table>";

    document.getElementById("pledgeGoalTable").innerHTML =
    "<table class='centerGoal' id='fundTable'>" +
      "<tr>" +
        "<th>Monthly Pledge Goal</th>" +
        "<td>$" + pledge + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Current Pledge Total</th>" +
        "<td>$" + currentPledge + "</td>" +
      "</tr>" +
      "<tr>" +
        "<th>Amount Left to Goal</th>" +
        "<td>$" + newPledgeTotal + "</td>" +
      "</tr>" +
    "</table>";
  }
}