document.addEventListener('DOMContentLoaded', function () {
  try {
    let app = firebase.app();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        saveChatStatus(false);

        firebase.database().ref('/chatUsers').on('value', drawChatUsers);
        drawUserData();
      } else {
        drawLogin();
      }
    });

  } catch (e) {
    console.error(e);
  }
  
  // se obtiene el elemento chatIMput y se le agrega el evento keypress
  document.getElementById('chatImput').addEventListener('keypress', porcessChatInput);

  // suscribe el dibujado de los mensajes al evento de actualizacion de la coleccion de mensajes de la base de datos
  firebase.database().ref('/messages').on('value', drawChats)

});