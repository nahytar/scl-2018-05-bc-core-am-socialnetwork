document.addEventListener('DOMContentLoaded', function () {
  hideAll();
  try {
    let app = firebase.app();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        document.getElementById('menuArea').style.display = 'block';
        drawUserData();
        saveChatStatus(false);
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

  document.getElementById('chatImput').addEventListener('keypress', porcessChatInput);
  document.getElementById('sendButton').addEventListener('click', porcessChatInput);
  document.getElementById('menuChat').addEventListener('click', showChat);
  document.getElementById('menuPost').addEventListener('click', showPost);
  document.getElementById('sendButtonPost').addEventListener('click', processPostInput);
  document.getElementById('menuSingOut').addEventListener('click', singOut);
  firebase.database().ref('/messages').on('value', drawChats);
});