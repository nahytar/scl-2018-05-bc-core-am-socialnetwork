document.addEventListener('DOMContentLoaded', function () {
  let userDb;
  try {
    let app = firebase.app();
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '/'
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userDb = firebase.database().ref('/users/' + user.uid);
        userDb.set({
          lastAction: Date.now(),
          name: user.displayName,
          istyping: false
        })


        firebase.database().ref('/users').on('value', (snapshot) => {
          let users = "";
          Object.values(snapshot.val()).forEach((user) => {
            const time = new Date(user.lastAction);
            users += `<p>${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${user.name} ${user.istyping ? 'escribiendo' : ''}</p>`;
          });
          document.getElementById('chatUsers').innerHTML = users;
        })
        document.getElementById('chatArea').style.display = "block";
        document.getElementById('userData').innerHTML = user.displayName + ' <a href="#" onclick="firebase.auth().signOut()">Sign out</a>';
      } else {
        document.getElementById('userData').innerHTML = '';
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });

  } catch (e) {
    console.error(e);
  }
  // se llama la base de dato de firebase pide la referencia de messages 
  const messages = firebase.database().ref('/messages');
  // se obtiene el elemento chatIMput y se le agrega el evento keypress
  document.getElementById('chatImput').addEventListener('keypress', (event) => {
    // se le da por defecto el valor true a istyping
    let istyping = true;
    if (event.key === "Enter") {
      istyping = false;
      event.preventDefault();
      messages.push({
        name: firebase.auth().currentUser.displayName,
        message: event.currentTarget.value,
        time: Date.now()
      })
      event.currentTarget.value = "";
    }
    // actualiza estado del usuario
    userDb.update({
      lastAction: Date.now(),
      istyping: istyping
    })
  });

  // suscribe el dibujado de los mensajes al evento de actualizacion de la coleccion de mensajes de la base de datos
  messages.on('value', (snapshot) => {
    let chats = "";
    Object.values(snapshot.val()).forEach((message) => {
      const time = new Date(message.time);
      chats += `<p>${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${message.name} ${message.message}</p>`;
    });
    document.getElementById('chatScreen').innerHTML = chats;
  })

});