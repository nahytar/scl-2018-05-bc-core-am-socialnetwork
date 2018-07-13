document.addEventListener('DOMContentLoaded', function () {
  try {
  let app = firebase.app();
  var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  
  ],
  // Terms of service url.
  tosUrl: '/'
  };
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  document.getElementById("chatt").style.display = "block";
  document.getElementById("postImput").style.display = "none";
  document.getElementById('userData').innerHTML = 'Apoderada/o: ' + user.displayName + ' <a href="#" onclick="firebase.auth().signOut()">Sign out</a>';
  } else {
  document.getElementById("chatt").style.display = "none";
  document.getElementById("postImput").style.display = "none";
  document.getElementById('userData').innerHTML = '';
  // Initialize the FirebaseUI Widget using Firebase.
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
  }
  });
  
  } catch (e) {
  console.error(e);
  }
  
  });