let userDb = null;

const porcessChatInput = (event) => {
  const inputChat = document.getElementById('chatImput');
  // se le da por defecto el valor true a istyping
  let istyping = true;
  if (event.key === "Enter" || !event.key) {
    istyping = false;
    event.preventDefault();
    firebase.database().ref('/messages').push({
      name: firebase.auth().currentUser.displayName,
      message: inputChat.value,
      time: Date.now()
    })
    inputChat.value = "";
  }
  // actualiza estado del usuario
  saveChatStatus(istyping);
}

const drawChats = (snapshot) => {
  let chats = "";
  Object.values(snapshot.val()).forEach((message) => {
    const time = new Date(message.time);
    chats += `<p>${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${message.name}: ${message.message}</p>`;
  });
  document.getElementById('chatScreen').innerHTML = chats;
}

const saveChatStatus = (istyping) => {
  const user = firebase.auth().currentUser;
  if (!userDb) {
    userDb = firebase.database().ref('/chatUsers/' + user.uid);
  }
  userDb.update({
    lastAction: Date.now(),
    name: user.displayName,
    istyping: istyping
  })
}

document.getElementById('imgLogo')