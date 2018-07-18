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

  document.getElementById('chatImput').addEventListener('keypress', processChatInput);
  document.getElementById('sendButton').addEventListener('click', processChatInput);
  document.getElementById('sendButtonPost').addEventListener('click', processPostInput);
  addListenerToClass('menuChat', showChat);
  addListenerToClass('menuPost', showPost);
  addListenerToClass('menuSingOut', singOut);
  addListenerToClass('menuProfile', showProfile);
  firebase.database().ref('/messages').on('value', drawChats);
  firebase.database().ref('/posts').on('value', drawPosts);
  firebase.database().ref('/users').on('value', drawContacts);
});

// función apagado
// const sectionProfile = document.getElementById('sectionProfile');
// const sectionfixedMenu = document.getElementById('fixedMenu');
// ​
// const btnProfile = document.getElementById('nameIconFooterProfile');
// btnProfile.addEventListener('click', () => {
//  sectionProfile.style.display = 'block';
//  seccionLogin.style.display = 'none';
//  seccionCenter.style.display = 'none';
//  sectionfixedMenu.style.display = 'block';
// });
