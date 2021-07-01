// validate and save goal entry
const checkGoal = () => {  
  if (($("#totalGoal").val() != "") &&
     ($("#pledgeGoal").val() != "")) {
      return true;
     } else {
       return false;
     }
}

// saving entry to object array
const submitGoal = () => {
  if (checkGoal()) {
    var totalGoal = document.getElementById("totalGoal").value;
    var pledgeGoal = document.getElementById("pledgeGoal").value;

    var goalEntry = [
      {
        total: totalGoal,
        pledge: pledgeGoal
      }
    ];

    try {
      // saving to local storage
      localStorage.setItem("goalEntry", JSON.stringify(goalEntry));

      // alerting user of saved entry
      alert("Goal Saved!");

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