document.addEventListener('DOMContentLoaded', function () {
  hideAll();
  try {
    let app = firebase.app();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUser();
        document.getElementById('menuArea').style.display = 'block';
        drawUserData();
        showProfile();
      } else {
        hideAll();
        document.getElementById('menuArea').style.display = 'none';
        document.getElementById('userData').innerHTML = '';
        drawLogin();
      }
    });

  } catch (e) {
    console.error(e);
  }

  document.getElementById('chatImput').addEventListener('keyup', processChatInput);
  document.getElementById('sendButton').addEventListener('click', processChatInput);
  document.getElementById('sendButtonPost').addEventListener('click', processPostInput);
  addListenerToClass('menuChat', showChat);
  addListenerToClass('menuPost', showPost);
  addListenerToClass('menuSingOut', singOut);
  addListenerToClass('menuProfile', showProfile);
  addListenerToClass('menuCalendario', showCalendario)
  addListenerToClass('menuReunion', showReunion)
  addListenerToClass('menuSalida', showAutorizacion)
  addListenerToClass('menuActividades', showActividades)
  firebase.database().ref('/posts').on('value', drawPosts);
  firebase.database().ref('/users').on('value', drawContacts);
  addListenerToClass('sectionreunion', showProfile);
});