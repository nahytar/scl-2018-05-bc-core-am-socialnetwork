let userDb = null;

const porcessChatInput = (event) => {
  // se le da por defecto el valor true a istyping
  let istyping = true;
  if (event.key === "Enter") {
    istyping = false;
    event.preventDefault();
    firebase.database().ref('/messages').push({
      name: firebase.auth().currentUser.displayName,
      message: event.currentTarget.value,
      time: Date.now()
    })
    event.currentTarget.value = "";
  }
  // actualiza estado del usuario
  saveChatStatus(istyping);
}

const drawChats = (snapshot) => {
  document.getElementById('chatArea').style.display = "block";
  let chats = "";
  Object.values(snapshot.val()).forEach((message) => {
    const time = new Date(message.time);
    chats += `<p>${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${message.name} ${message.message}</p>`;
  });
  document.getElementById('chatScreen').innerHTML = chats;
}

const drawChatUsers = (snapshot) => {
  let users = "";
  Object.values(snapshot.val()).forEach((user) => {
    const time = new Date(user.lastAction);
    users += `<p>${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${user.name} ${user.istyping ? 'escribiendo' : ''}</p>`;
  });
  document.getElementById('chatUsers').innerHTML = users;
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