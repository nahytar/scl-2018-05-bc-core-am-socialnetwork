function chat(){
  firebase.database().ref('messages')
  .limitToLast(5) // filtro
  .once('value')
  .then((messages)=> {
  console.log('mensajes > '+JSON.stringify(messages));
  })
  .catch(()=>{
  
  });
  
  //aca comenzamos a escuchar por nuevos mensajes usando el evento on child_added
  firebase.database().ref('messages')
  .limitToLast(5)
  .on('child_added', (newMessage)=> {
   let date = new Date();
  messageContainer.innerHTML += `
  <p> ${newMessage.val().creatorName}
  (${date.getDate(newMessage.val())} / ${date.getMonth(newMessage.val())+1} - ${date.getHours(newMessage.val())}:${date.getMinutes(newMessage.val())}) : ${newMessage.val().text}</p>`;
  });
  };
  
  function sendMessage(){
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value
  messageArea.value +='';
  
  const newMessageKey = firebase.database().ref().child(`messages`).push().key;
  
  firebase.database().ref(`messages/${newMessageKey}`).set({
  creator : currentUser.uid,
  creatorName : currentUser.displayName || currentUser.email,
  text : messageAreaText,
  fecha: firebase.database.ServerValue.TIMESTAMP
  });
  }
  