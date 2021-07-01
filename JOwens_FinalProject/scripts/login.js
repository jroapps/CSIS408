// verify entered password
const enterPassword = () => {
  // getting info from existing user
  var email = document.getElementById("emailAddress").value;
  var password = document.getElementById("passcode").value;

  // authenticating credentials
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = "main.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Incorrect credentials. Please try again.");
    document.getElementById("emailAddress").value = "";
    document.getElementById("passcode").value = "";
  });
}

// check login status
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      window.location.href = "main.html";
    } else {
      // User is signed out
      window.location.href = "index.html";
    }
  });
}

// logout and go to password screen
const logOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Sign out not successful.");
  });  
}