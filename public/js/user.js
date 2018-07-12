const drawUserData = () => {
  document.getElementById('userData').innerHTML = 
    firebase.auth().currentUser.displayName + ' <a href="#" onclick="firebase.auth().signOut()">Sign out</a>';
}