const drawUserData = () => {
  const user = firebase.auth().currentUser;

  document.getElementById('userData').innerHTML = 
    `<img src="${user.photoURL}" height="50" width="50">${user.displayName}`;
}

const updateUser = (data) => {
  const user = firebase.auth().currentUser;
  firebase.database().ref('users/' + user.uid).update({
    name: user.displayName,
    uid: user.uid,
    email: user.email,
    profile_picture : user.photoURL,
    lastAction: Date.now(),
    ...data
  })
}