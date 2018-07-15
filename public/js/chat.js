let messagesRef;
const porcessChatInput = (event) => {
  const inputChat = document.getElementById('chatImput');
  // se le da por defecto el valor true a istyping
  let istyping = true;
  if (event.key === "Enter" || !event.key) {
    istyping = false;
    event.preventDefault();
    messagesRef.push({
      name: firebase.auth().currentUser.displayName,
      message: inputChat.value,
      time: Date.now()
    })
    inputChat.value = "";
  }
  // actualiza estado del usuario
  updateUser({ istyping: istyping });
}

const drawChats = (snapshot) => {
  let chats = "";
  Object.values(snapshot.val()).forEach((message) => {
    const time = new Date(message.time);
    chats += `<p>${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${message.name}: ${message.message}</p>`;
  });
  document.getElementById('chatScreen').innerHTML = chats;
}

// genera id de cada chat
const generateId = (uid1, uid2) => {
  if (uid1 < uid2) {
    return uid1 + uid2;
  } else {
    return uid2 + uid1;
  }
}

// selecciona con quien va a chatear
const selectChat = (uid, name, picture) => {
  if(messagesRef) {
    messagesRef.off();
  }
  messagesRef = firebase.database().ref('chats/' + generateId(uid, firebase.auth().currentUser.uid) + '/messages');
  messagesRef.on('value', drawChats);
  document.getElementById('chatTitle').innerHTML = `<img src="${picture}" height="32" width="32"> ${name}`;
}
// lista de contactos
const drawContacts = (snapshot) => {
  let contactsList = "<ul>";
  Object.values(snapshot.val()).forEach((user) => {
    contactsList += `<li><img src="${user.profile_picture}" height="16" width="16"> <a href="#" onclick="selectChat('${user.uid}', '${user.name}', '${user.profile_picture}')">${user.name}</a></li>`
  })
  document.getElementById('contactsArea').innerHTML = contactsList + "</ul>";
}