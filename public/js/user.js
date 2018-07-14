const drawUserData = () => {
  document.getElementById('userData').innerHTML = 
    firebase.auth().currentUser.displayName;
}