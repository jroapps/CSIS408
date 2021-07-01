"use strict"

// navigate to User Info page
const userNav = () => {
  window.location.href = "user.html";
}

// navigate to Fundraising Log page
const fundNav = () => {
  window.location.href = "fundraising.html";
}

// navigate to New Entry page
const entryNav = () => {
  window.location.href = "entry.html";
}

// navigate to Fundraising Graph page
const graphNav = () => {
  window.location.href = "graph.html";
}

// navigate to Update Goal page
const goalNav = () => {
  window.location.href = "goal.html";
}

// display user, fundraising history, and goal info
const fundraisingStart = () => {
  displayUserInfo();
  displayFundraisingHistory();
  displayGoal();
}