const displayResults = () => {
  // getting input from user
  var people = document.getElementById("people").value;
  var days = document.getElementById("days").value;
  var location = document.getElementById("location").value;

  // displaying results in a table to div container
  document.getElementById("results").innerHTML = "<h2>Trip Results</h2><table class='center'><tr><th>Number of People</th><th>Days of Trip</th><th>Location of Trip</th></tr><tr><td>" + people + "</td><td>" + days + "</td><td>" + location + "</td></tr></table>";
}