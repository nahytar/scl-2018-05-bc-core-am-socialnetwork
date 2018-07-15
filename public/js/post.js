
const processPostInput = () => {

  firebase.database().ref('posts')
  .limitToLast(1)
  .on('child_added', newPost =>{
    postScreen.innerHTML += `
    <ul class="list-group list-group-flush">
    <li class="list-group-item">
    <h6 class='card-title'>${newPost.val().creatorName}</h6>
    <p class='card-text text-justify'>${newPost.val().text}</p>
    </li>
    </ul>
    `;
  });

  const currentUser = firebase.auth().currentUser;
  const postInputText = postInput.value;
  // para obtener una nueva llave de la coleccion posts
  let newPostsKey = firebase.database().ref().child('posts').push().key;
  
  firebase.database().ref(`posts/${newPostsKey}`).set({
   //creator: currentUser.displayName,
   creatorName: currentUser.displayName || currentUser.email,
   text: postInputText
  });
}

  



