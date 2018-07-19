let messagesRef;
const processChatInput = (event) => {
  const inputChat = document.getElementById('chatImput');
  // se le da por defecto el valor true a istyping
  let istyping = true;

  if (inputChat.value.length < 1) {
    istyping = false;
  }
  if (event.key === "Enter" || !event.key) {
    istyping = false;
    event.preventDefault();
    if (inputChat.value.length < 1) {
      alert('Mensaje vacío')
    } else {
      messagesRef.push({
        name: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,
        read: false,
        message: inputChat.value,
        time: Date.now()
      })
      inputChat.value = "";
    }
  }


  // actualiza estado del usuario
  updateUser({ istyping: istyping });
}

// dibuja el chat 
const drawChats = (snapshot) => {
  let chats = "";
  if (snapshot.val()) {
    Object.values(snapshot.val()).forEach((message) => {
      const time = new Date(message.time);
      chats += `<p>${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${message.name}: ${message.message}</p>`;
    });
  }
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
  if (messagesRef) {
    messagesRef.off();
  }
  messagesRef = firebase.database().ref('chats/' + generateId(uid, firebase.auth().currentUser.uid) + '/messages');
  messagesRef.orderByChild('uid').equalTo(uid).once('value', (users) => {
    users.forEach(user => {
      user.ref.update({ read: true })
    })
  });
  messagesRef.on('value', drawChats);
  document.getElementById('chatTitle').innerHTML = `<img src="${picture}" height="32" width="32"> ${name}`;
}
const checkUnread = (chatId) => {
  firebase.database().ref(`/chats/${chatId}`)
    .limitToLast(1)
    .once('child_added', (snapshot) => {
      const message = Object.values(snapshot.val())[snapshot.numChildren() - 1];
      if (message.uid !== firebase.auth().currentUser.uid && !message.read) {
        document.getElementById(generateId(message.uid, firebase.auth().currentUser.uid)).classList.add('unread');
      }
    })
}
// lista de contactos
const drawContacts = (snapshot) => {
  let contactsList = "<ul>";
  let chatId;
  let typing;
  if (snapshot.val()) {
    Object.values(snapshot.val()).forEach((user) => {
      chatId = generateId(user.uid, firebase.auth().currentUser.uid);
      typing = (user.istyping && Date.now() - user.lastAction < 1000) ? '(Escribiendo...)' : '';
      contactsList += `<li id="${chatId}"><img src="${user.profile_picture}" height="16" width="16"> <span onclick="selectChat('${user.uid}', '${user.name}', '${user.profile_picture}')">${user.name} ${typing}</span></li>`;
      checkUnread(chatId);
    })
  }
  document.getElementById('contactsArea').innerHTML = contactsList + "</ul>";
}

//module.exports = { processChatInput, drawChats, generateId, selectChat, checkUnread, drawContacts }