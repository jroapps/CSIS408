"use strict"

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

// display user & work info
const workStart = () => {
  displayUserInfo();
  displayWorkHistory();
}