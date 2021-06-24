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