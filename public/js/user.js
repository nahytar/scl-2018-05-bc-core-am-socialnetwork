const drawUserData = () => {
  document.getElementById('userData').innerHTML = 
    firebase.auth().currentUser.displayName;
}

const updateUser = (data) => {
  const user = firebase.auth().currentUser;
  firebase.database().ref('users/' + user.uid).update({
    name: user.displayName,
    email: user.email,
    lastAction: Date.now(),
    ...data
  })
}